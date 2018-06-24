using System;
using System.Collections.Generic;

namespace CrewSchedule.Models
{
    public class ReferenceData
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public Employee ApplicationUser { get; set; }

        public List<Employee> ProjectManagers { get; set; }

        public List<Employee> CrewChiefs { get; set; }

        public List<Employee> InstrumentOperators { get; set; }

        public List<Task> Tasks { get; set; }

        public List<Equipment> Equipment { get; set; }
        
        public Exception Exception { get; set; }
    }
}