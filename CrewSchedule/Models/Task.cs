using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrewSchedule.Models
{
    public class Task
    {
        public long Id { get; set; }

        public long ScheduleItemId { get; set; }

        public int TaskItemTypeId { get; set; }

        public string Name { get; set; }
    }
}