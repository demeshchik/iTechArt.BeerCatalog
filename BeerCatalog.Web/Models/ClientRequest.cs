using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace BeerCatalog.Web.Models
{
    public class ClientRequest
    {
        public string Page { get; set; }
        public string Count { get; set; }
        public string Name { get; set; }
        public string Abv { get; set; }
        public string Ibu { get; set; }
        public string Ebc { get; set; }
        public string Ids { get; set; }

        public string GetFullPath(string basePath)
        {
            Dictionary<string, string> queryString = new Dictionary<string, string>();
            Type type = GetType();
            PropertyInfo[] pi = type.GetProperties();

            foreach (PropertyInfo p in pi)
            {
                object value = p.GetValue(this);
                if (value != null)
                {
                    queryString.Add(GetPunkParameter(p.Name), value.ToString());
                }
            }

            return QueryHelpers.AddQueryString(basePath, queryString);
        }

        private string GetPunkParameter(string parameter)
        {
            switch(parameter)
            {
                case "Count":
                    return "per_page";

                case "Abv":
                case "Ibu":
                case "Ebc":
                    return parameter.ToLower() + "_gt";

                case "Name":
                    return "beer_" + parameter.ToLower();

                default:
                    return parameter.ToLower();
            }
        }
    }
}
