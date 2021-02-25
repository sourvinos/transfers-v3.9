using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    public class AppDbContext : IdentityDbContext<IdentityUser> {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<PickupPoint> PickupPoints { get; set; }
        public DbSet<Port> Ports { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<Transfer> Transfers { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<Token> Tokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "Admin", NormalizedName = "Admin".ToUpper() });
        }

    }
    
}