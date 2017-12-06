using System;
using System.Reflection;

namespace BeerCatalog.API.Models
{
    public class Request
    {
        public string Page { get; set; }
        public string Count { get; set; }
        public string Name { get; set; }
        public string Abv { get; set; }
        public string Ibu { get; set; }
        public string Ebc { get; set; }
        public string Ids { get; set; }

        public string GetQueryString()
        {
            string queryString = "";
            Type type = GetType();
            PropertyInfo[] pi = type.GetProperties();
            foreach(PropertyInfo p in pi)
            {
                object value = p.GetValue(this);
                if (value != null)
                {
                    queryString += $"{PunkParamName(p.Name)}={value}&";
                }
            }

            return queryString.Substring(0, queryString.Length - 1);
        }

        private string PunkParamName(string appName)
        {
            if (appName == "Count")
            {
                return "per_page";
            }
            else if (appName == "Abv" || appName == "Ibu" || appName == "Ebc")
            {
                return appName.ToLower() + "_gt";
            }
            else if (appName == "Name")
            {
                return "beer_name";
            }

            return appName.ToLower();
        }
    }
}
