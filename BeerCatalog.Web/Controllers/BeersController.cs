using BeerCatalog.Web.Infrastructure;
using BeerCatalog.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BeerCatalog.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Beers")]
    public class BeersController : Controller
    {
        [HttpGet]
        public IActionResult Get([FromQuery]ClientRequest request)
        {
            try
            {
                var beers = PunkApiProxy.GetBeers(request);
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