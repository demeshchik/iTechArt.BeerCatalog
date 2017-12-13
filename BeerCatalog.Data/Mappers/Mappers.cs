using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BeerCatalog.Data.Mappers
{
    public class UserMap
    {
        public UserMap(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.BornDate).IsRequired();

            builder.HasMany(t => t.Posts)
                .WithOne(p => p.Author)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(t => t.Comments)
                .WithOne(p => p.Author)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(t => t.Preferences);
            builder.HasMany(t => t.Friends);
        }
    }

    public class CommentMap
    {
        public CommentMap(EntityTypeBuilder<Comment> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Text).IsRequired();
            builder.Property(t => t.Date).IsRequired();
        }
    }

    public class BrewingMap
    {
        public BrewingMap(EntityTypeBuilder<Brewing> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Title).IsRequired();
            builder.Property(t => t.Description).IsRequired();
            builder.Property(t => t.Components).IsRequired();
            builder.Property(t => t.Rate).IsRequired();

            builder.HasMany(t => t.Comments)
                .WithOne(t => t.Post)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }

    public class PreferenceMap
    {
        public PreferenceMap(EntityTypeBuilder<Preference> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Text).IsRequired();
        }
    }
}
