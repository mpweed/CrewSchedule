using CrewSchedule.Models;
using System.Web.Http;

namespace CrewSchedule.Controllers
{
    public class ReferenceDataController : ApiController
    {
        // POST: api/ReferenceData
        public ReferenceData Post([FromBody] BootstrapParameters bootstrapParameters) => ReferenceDataRepository.GetBootstrapData(bootstrapParameters);
    }
}