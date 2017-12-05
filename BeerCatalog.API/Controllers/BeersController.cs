using BeerCatalog.API.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace BeerCatalog.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Beers")]
    public class BeersController : Controller
    {
        [HttpGet]
        public IActionResult Get([FromQuery]int page, int per_page)
        { 
            try
            {
                var beers = PunkApiRequest.GetBeers(page, per_page);
                return Json(beers);
            }
            catch (RequestApiException exception)
            {
                return StatusCode((int)exception.StatusCode, exception.Message);
            }
        }
    }
}
