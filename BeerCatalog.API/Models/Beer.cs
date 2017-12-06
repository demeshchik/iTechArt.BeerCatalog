using Newtonsoft.Json;
using System.Collections.Generic;
using System.Dynamic;

namespace BeerCatalog.API.Models
{
    public class Beer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Tagline { get; set; }

        [JsonProperty("image_url")]
        public string Image { get; set; }
        public double? Abv { get; set; }
        public double? Ibu { get; set; }
        public double? Ebc { get; set; }
        public ExpandoObject Method { get; set; }
        public ExpandoObject Ingredients { get; set; }

        [JsonProperty("food_pairing")]
        public List<string> Foods { get; set; }

        [JsonProperty("brewers_tips")]
        public string Tips { get; set; }
    }
}
