using Microsoft.EntityFrameworkCore;

namespace HeroCommandAPI.Models
{
    public class HeroCommandContext : DbContext
    {
        public DbSet<Hero> Heroes { get; set; }
        public DbSet<Mission> Missions { get; set; }
        public DbSet<HeroToMission> Heroes_to_missions { get; set; }

        public HeroCommandContext(DbContextOptions<HeroCommandContext> options)
            : base(options) { }
    }
}
