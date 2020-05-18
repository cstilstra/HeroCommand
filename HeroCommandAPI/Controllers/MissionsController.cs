using HeroCommandAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeroCommandAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionsController : ControllerBase
    {
        private const int MISSIONS_TO_PROGRESS = 2;

        private readonly HeroCommandContext _context;

        public MissionsController(HeroCommandContext context)
        {
            _context = context;
        }

        // GET: api/Missions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mission>>> GetMissions()
        {
            return await _context.Missions.ToListAsync();
        }

        // GET: api/Missions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Mission>> GetMission(int id)
        {
            var mission = await _context.Missions.FindAsync(id);

            if (mission == null)
            {
                return NotFound();
            }

            return mission;
        }

        // GET: api/Missions/VisibleByLevel/1
        [HttpGet("VisibleByLevel/{playerLevel}")]
        public async Task<ActionResult<IEnumerable<Mission>>> GetHeroesVisibleByPlayerLevel(int playerLevel)
        {
            return await _context.Missions.Where(mission => mission.PlayerLevelVisible <= playerLevel).ToListAsync();
        }

        // PUT: api/Missions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMission(int id, Mission mission)
        {
            if (id != mission.Id)
            {
                return BadRequest();
            }

            _context.Entry(mission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MissionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Missions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Mission>> PostMission(Mission mission)
        {
            _context.Missions.Add(mission);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMission), new { id = mission.Id }, mission);
        }

        //POST: api/Missions/StartMission/1?playerId=1
        [HttpPost("StartMission/{id}")]
        public async Task<ActionResult<string>> PostHeroesToMission(int id, int playerId, int[] heroIds)
        {
            List<Hero> heroes = await GetHeroesByIds(heroIds);
            Mission mission = await _context.Missions.FindAsync(id);

            if (HeroesSkilledEnoughForMission(heroes, mission))
            {
                SendHeroesOnMission(heroes, mission, playerId);
                await _context.SaveChangesAsync();
                return "Success";
            }
            else
            {
                _context.RejectChanges();
                return "Heroes need more skill";
            }
        }

        // DELETE: api/Missions/TryEndMission/1?playerId=1
        [HttpDelete("TryEndMission/{id}")]
        public async Task<ActionResult<string>> TryEndMission(int id, int playerId)
        {
            List<HeroToMission> heroesToMissions = await _context.Heroes_to_missions.Where(entry => entry.MissionId == id && entry.PlayerId == playerId).ToListAsync();
            if (heroesToMissions.Count == 0) return "Mission not underway.";
            DateTime finishedAt = heroesToMissions.FirstOrDefault().FinishesAt;

            if(DateTime.Now > finishedAt) // mission finished
            {
                Mission mission = await _context.Missions.FindAsync(id);
                List<Hero> heroes = new List<Hero>();
                foreach(HeroToMission htm in heroesToMissions)
                {
                    Hero hero = await _context.Heroes.FindAsync(htm.HeroId);
                    if(hero != null)
                    {
                        heroes.Add(hero);
                    }
                }

                BoostHeroes(heroes);
                await RewardPlayer(playerId, mission.Reward);
                _context.Heroes_to_missions.RemoveRange(heroesToMissions);
                await _context.SaveChangesAsync();

                return "Mission complete";
            }
            else
            {
                return "Mission not yet completed";
            }
        }

        // DELETE: api/Missions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Mission>> DeleteMission(int id)
        {
            var mission = await _context.Missions.FindAsync(id);
            if (mission == null)
            {
                return NotFound();
            }

            _context.Missions.Remove(mission);
            await _context.SaveChangesAsync();

            return mission;
        }

        private bool MissionExists(int id)
        {
            return _context.Missions.Any(e => e.Id == id);
        }

        private async Task<List<Hero>> GetHeroesByIds(int[] heroIds)
        {
            List<Hero> heroes = new List<Hero>();
            foreach(int id in heroIds)
            {
                var hero = await _context.Heroes.FindAsync(id);
                if (hero != null) heroes.Add(hero);
            }

            return heroes;
        }

        private bool HeroesSkilledEnoughForMission(List<Hero> heroes, Mission mission)
        {
            int skillSum = 0;

            foreach (Hero hero in heroes)
            {
                skillSum += hero.Skill;
            }

            if (skillSum >= mission.SkillCost) return true;
            else return false;
        }

        private void SendHeroesOnMission(List<Hero> heroes, Mission mission, int playerId)
        {
            DateTime doneAt = DateTime.Now.AddMilliseconds(mission.DurationMs);
            foreach (Hero hero in heroes)
            {
                var link = new HeroToMission
                {
                    HeroId = hero.Id,
                    MissionId = mission.Id,
                    FinishesAt = doneAt,
                    PlayerId = playerId
                };

                _context.Heroes_to_missions.Add(link);
            }
        }

        private void BoostHeroes(List<Hero> heroes)
        {
            foreach(Hero hero in heroes)
            {
                hero.Skill++;
                _context.Heroes.Update(hero);
            }
        }

        private async Task RewardPlayer(int playerId, int reward)
        {
            Player player = await _context.Players.FindAsync(playerId);
            if(player != null)
            {
                player.Coin += reward;

                player.MissionsSinceUpgrade++;
                if(player.MissionsSinceUpgrade >= MISSIONS_TO_PROGRESS)
                {
                    player.MissionsSinceUpgrade = 0;
                    player.Level++;
                }

                _context.Players.Update(player);
            }
        }
    }
}
