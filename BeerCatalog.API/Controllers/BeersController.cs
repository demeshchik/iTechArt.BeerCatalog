using BeerCatalog.API.Infrastructure;
using BeerCatalog.API.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BeerCatalog.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Beers")]
    public class BeersController : Controller
    {
        [HttpGet]
        public IActionResult Get([FromQuery]Request request)
        { 
            try
            {
                string queryString = request.GetQueryString();
                var beers = PunkApiRequest.GetBeers(queryString);
                return Json(beers);
            }
            catch (RequestApiException exception)
            {
                return StatusCode((int)exception.StatusCode, exception.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
