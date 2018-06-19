using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrewSchedule.Models
{
    public class Equipment
    {
        public long Id { get; set; }

        public long ScheduleItemId { get; set; }

        public int EquipmentId { get; set; }

        public string Name { get; set; }

        public int Allocation { get; set; }
    }
}