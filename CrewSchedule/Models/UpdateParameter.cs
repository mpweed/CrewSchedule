using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrewSchedule.Models
{
    public class UpdateParameter
    {
        public ScheduleParameters ScheduleParameters { get; set; }

        public ScheduleItem ScheduleItem { get; set; }
    }
}