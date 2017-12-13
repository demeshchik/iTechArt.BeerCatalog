using System;

namespace BeerCatalog.Data
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public User Author { get; set; }
        public Brewing Post { get; set; }
    }
}
