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

        //POST: api/Missions/StartMission/1
        [HttpPost("StartMission/{id}")]
        public async Task<ActionResult<string>> PostHeroToMission(int id, int[] heroIds)
        {
            List<Hero> heroes = await getHeroesByIds(heroIds);
            Mission mission = await _context.Missions.FindAsync(id);

            int skillSum = 0;

            foreach(Hero hero in heroes)
            {
                skillSum += hero.Skill;

                var link = new HeroToMission
                {
                    HeroId = hero.Id,
                    MissionId = id
                };

                _context.Heroes_to_missions.Add(link);
            }

            string result = "";
            if (skillSum >= mission.SkillCost)
            {
                await _context.SaveChangesAsync();
                result = "Success";
            }
            else
            {
                _context.RejectChanges();
                result = "Heroes need more skill";
            }

            return result;
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

        private async Task<List<Hero>> getHeroesByIds(int[] heroIds)
        {
            List<Hero> heroes = new List<Hero>();
            foreach(int id in heroIds)
            {
                var hero = await _context.Heroes.FindAsync(id);
                if (hero != null) heroes.Add(hero);
            }

            return heroes;
        }
    }
}
