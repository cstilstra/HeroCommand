using Microsoft.EntityFrameworkCore;

namespace HeroCommandAPI.Models
{
    public class MissionContext : DbContext
    {
        public DbSet<Mission> Missions { get; set; }

        public MissionContext(DbContextOptions<MissionContext> options)
            : base(options) { }
    }
}
