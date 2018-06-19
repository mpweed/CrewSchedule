using System.Configuration;

namespace CrewSchedule.Models
{
    internal class Repository
    {
        protected static string GetConnectionString()
        {            
            return ConfigurationManager.ConnectionStrings["db"].ConnectionString;
        }
    }
}