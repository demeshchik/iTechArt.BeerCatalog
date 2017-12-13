using BeerCatalog.Web.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

namespace BeerCatalog.Web.Infrastructure
{
    public static class PunkApiRequest
    {
        private static IConfigurationRoot configuration;
        static PunkApiRequest()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");
            configuration = builder.Build();
        }

        public static List<Beer> GetBeers(string queryString)
        {
            using (HttpClient client = new HttpClient())
            {
                string uri = configuration.GetValue<string>("BaseUri");
                client.BaseAddress = new Uri(uri);
                MediaTypeWithQualityHeaderValue contentType = new MediaTypeWithQualityHeaderValue("application/json");
                client.DefaultRequestHeaders.Accept.Add(contentType);

                HttpResponseMessage responseMessage = client.GetAsync($"/v2/beers/?{queryString}").Result;

                if (!responseMessage.IsSuccessStatusCode && responseMessage.StatusCode != HttpStatusCode.NotModified)
                {
                    throw new RequestApiException(responseMessage.ReasonPhrase, responseMessage.StatusCode);
                }

                string responseData = responseMessage.Content.ReadAsStringAsync().Result;

                List<Beer> beers = JsonConvert.DeserializeObject<List<Beer>>(responseData);

                return beers;
            }
        }
    }
}
