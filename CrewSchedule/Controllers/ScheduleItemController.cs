using CrewSchedule.Models;
using System.Web.Http;
using System.Web.Mvc;

namespace CrewSchedule.Controllers
{
    [OutputCacheAttribute(VaryByParam = "*", Duration = 0, NoStore = true)] // Disable caching for controller
    public class ScheduleItemController : ApiController
    {
        // POST: api/ScheduleItem
        public ReferenceData Post([FromBody] UpdateParameter updateParameter) => ScheduleItemRepository.CreateScheduleItem(updateParameter);
    }
}