using HeroCommandAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeroCommandAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroesController : ControllerBase
    {
        private readonly HeroCommandContext _context;

        public HeroesController(HeroCommandContext context)
        {
            _context = context;
        }

        // GET: api/Heroes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hero>>> GetHeroes()
        {
            return await _context.Heroes.ToListAsync();
        }

        // GET: api/Heroes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hero>> GetHero(int id)
        {
            var hero = await _context.Heroes.FindAsync(id);

            if (hero == null)
            {
                return NotFound();
            }

            return hero;
        }

        // GET: api/Heroes/VisibleByLevel/1
        [HttpGet("VisibleByLevel/{playerLevel}")]
        public async Task<ActionResult<IEnumerable<Hero>>> GetHeroesVisibleByPlayerLevel(int playerLevel)
        {
            return await _context.Heroes.Where(hero => hero.PlayerLevelVisible <= playerLevel).ToListAsync();
        }

        // GET: api/Heroes/OnMission/1?playerId=1
        [HttpGet("OnMission/{id}")]
        public async Task<ActionResult<IEnumerable<Hero>>> GetHeroesOnMission(int id, int playerId)
        {
            List<Hero> heroes = new List<Hero>();
            if (playerId == 0) return heroes;

            List<HeroToMission> heroesToMission = await _context.Heroes_to_missions.Where(entry => entry.MissionId == id && entry.PlayerId == playerId).ToListAsync();

            foreach (HeroToMission link in heroesToMission)
            {
                var hero = await _context.Heroes.FindAsync(link.HeroId);
                if (hero != null) heroes.Add(hero);
            }

            return heroes;
        }

        // GET: api/Heroes/ToPlayer/1
        [HttpGet("ToPlayer/{playerId}")]
        public async Task<ActionResult<IEnumerable<HeroToPlayer>>> GetHeroesToPlayer(int playerId)
        {
            List<HeroToPlayer> heroesToPlayer = await _context.Heroes_to_players.Where(entry => entry.PlayerId == playerId).ToListAsync();
            return heroesToPlayer;
        }

        // PUT: api/Heroes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHero(int id, Hero hero)
        {
            if (id != hero.Id)
            {
                return BadRequest();
            }

            _context.Entry(hero).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HeroExists(id))
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

        // POST: api/Heroes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Hero>> PostHero(Hero hero)
        {
            _context.Heroes.Add(hero);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHero), new { id = hero.Id }, hero);
        }

        // DELETE: api/Heroes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Hero>> DeleteHero(int id)
        {
            var hero = await _context.Heroes.FindAsync(id);
            if (hero == null)
            {
                return NotFound();
            }

            _context.Heroes.Remove(hero);
            await _context.SaveChangesAsync();

            return hero;
        }

        private bool HeroExists(int id)
        {
            return _context.Heroes.Any(e => e.Id == id);
        }
    }
}
