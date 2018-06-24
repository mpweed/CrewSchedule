using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrewSchedule.Models
{
    public class Task
    {
        public long Id { get; set; }

        public int CompanyId { get; set; }       

        public string Name { get; set; }
    }
}