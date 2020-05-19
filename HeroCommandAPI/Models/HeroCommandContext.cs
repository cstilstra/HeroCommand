using Microsoft.EntityFrameworkCore;

namespace HeroCommandAPI.Models
{
    public class HeroCommandContext : DbContext
    {
        public DbSet<Hero> Heroes { get; set; }
        public DbSet<Mission> Missions { get; set; }
        public DbSet<HeroToMission> Heroes_to_missions { get; set; }
        public DbSet<HeroToPlayer> Heroes_to_players { get; set; }
        public DbSet<Player> Players { get; set; }

        public HeroCommandContext(DbContextOptions<HeroCommandContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HeroToPlayer>()
                .HasKey(k => new { k.HeroId, k.PlayerId });
        }

        public void RejectChanges()
        {
            foreach(var entry in ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Modified:
                    case EntityState.Deleted:
                        entry.State = EntityState.Modified; //Revert changes made to deleted entity.
                        entry.State = EntityState.Unchanged;
                        break;
                    case EntityState.Added:
                        entry.State = EntityState.Detached;
                        break;
                }
            }
        }
    }
}
