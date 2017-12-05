using BeerCatalog.API.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

//TODO: change request URI

namespace BeerCatalog.API.Infrastructure
{
    public static class PunkApiRequest
    {
        public static List<Beer> GetBeers(int page, int per_page)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://46270a70-d6f5-4e99-b87d-d101e38ccdaa.mock.pstmn.io");
                MediaTypeWithQualityHeaderValue contentType = new MediaTypeWithQualityHeaderValue("application/json");
                client.DefaultRequestHeaders.Accept.Add(contentType);

                HttpResponseMessage responseMessage = client.GetAsync($"/v2/beers/?per_page={per_page}&page={page}").Result;

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
