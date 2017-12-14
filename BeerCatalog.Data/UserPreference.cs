namespace BeerCatalog.Data
{
    public class UserPreference
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public int PreferenceId { get; set;}
        public Preference Preference { get; set; }

    }
}
