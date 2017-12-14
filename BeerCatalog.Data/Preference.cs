using System.Collections.Generic;

namespace BeerCatalog.Data
{
    public class Preference
    {
        public int Id { get; set; }
        public string Text { get; set; }

        public ICollection<UserPreference> UserPreferences { get; set; }

        public Preference()
        {
            UserPreferences = new List<UserPreference>();
        }
    }
}
