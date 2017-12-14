using BeerCatalog.Data;
using BeerCatalog.Data.Mappers;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BeerCatalog.Repositories
{
    public class ApplicationContext: IdentityDbContext<User>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            new UserMap(builder.Entity<User>());
            new PreferenceMap(builder.Entity<Preference>());
            new UserPreferenceMap(builder.Entity<UserPreference>());
            new CommentMap(builder.Entity<Comment>());
            new BrewingMap(builder.Entity<Brewing>());
        }
    }
}
