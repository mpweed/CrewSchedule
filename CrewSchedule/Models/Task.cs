using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrewSchedule.Models
{
    public class Task
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }       

        public string Name { get; set; }
    }
}