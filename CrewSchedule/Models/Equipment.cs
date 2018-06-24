using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrewSchedule.Models
{
    public class Equipment
    {
        public long Id { get; set; }

        public int EquipmentTypeId { get; set; }

        public int CompanyId { get; set; }

        public int BranchId { get; set; }

        public string Name { get; set; }

        public int Allocation { get; set; }
    }
}