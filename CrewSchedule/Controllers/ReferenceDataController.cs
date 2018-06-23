using CrewSchedule.Models;
using System.Web.Http;
using System.Web.Mvc;

namespace CrewSchedule.Controllers
{
    [OutputCacheAttribute(VaryByParam = "*", Duration = 0, NoStore = true)] // Disable caching for controller
    public class ReferenceDataController : ApiController
    {
        // POST: api/ReferenceData
        public ReferenceData Post([FromBody] ScheduleParameters scheduleParameters) => ReferenceDataRepository.GetReferenceData(scheduleParameters);
    }
}