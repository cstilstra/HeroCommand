using Microsoft.EntityFrameworkCore;

namespace HeroCommandAPI.Models
{
    public class HeroContext : DbContext
    {
        public DbSet<Hero> Heroes { get; set; }
        
        public HeroContext(DbContextOptions<HeroContext> options)
            : base(options) { }
    }
}
