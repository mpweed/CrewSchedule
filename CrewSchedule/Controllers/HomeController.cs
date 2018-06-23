using System.Web.Mvc;

namespace CrewSchedule.Controllers
{
    [OutputCacheAttribute(VaryByParam = "*", Duration = 0, NoStore = true)] // Disable caching for controller
    public class HomeController : Controller
    {        
        public ActionResult Index()
        {
            return View();
        }
    }
}