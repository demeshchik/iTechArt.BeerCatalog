using System.Collections.Generic;

namespace BeerCatalog.Data
{
    public class Brewing
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Components { get; set; }
        public int Rate { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public User Author { get; set; }

        public Brewing()
        {
            Comments = new List<Comment>();
        }
    }
}
