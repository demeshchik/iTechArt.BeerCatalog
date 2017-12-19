using BeerCatalog.Web.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace BeerCatalog.Web.Infrastructure
{
    public static class PunkApiProxy
    {
        private static IConfigurationRoot configuration;
        static PunkApiProxy()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");
            configuration = builder.Build();
        }

        public static async Task<List<Beer>> GetBeers(ClientRequest clientRequest)
        {
            HttpClient client = new HttpClient();
            string uri = configuration.GetValue<string>("BaseUri");

            MediaTypeWithQualityHeaderValue contentType = new MediaTypeWithQualityHeaderValue("application/json");
            client.DefaultRequestHeaders.Accept.Add(contentType);

            HttpResponseMessage responseMessage = await client.GetAsync($"{clientRequest.GetFullPath(uri)}");

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
