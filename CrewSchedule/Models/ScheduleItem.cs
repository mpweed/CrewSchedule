using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrewSchedule.Models
{
    public class ScheduleItem
    {
        public long Id { get; set; }

        public int TypeId { get; set; }

        public string Type { get; set; }

        public int StatusId { get; set; }

        public string Status { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime CreationDateTime { get; set; }

        public DateTime StatusUpdateDateTime { get; set; }        

        public string Color { get; set; }

        public string ProjectNumber { get; set; }

        public string ProjectName { get; set; }

        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Zip { get; set; }

        public int EmployeeStatusId { get; set; }

        public int ResourceStatusId { get; set; }

        public Employee ApprovedBy { get; set; }

        public DateTime ApprovalDateTime { get; set; }

        public int ProjectManagerId { get; set; }

        public int EmployeeId { get; set; }

        public Employee ProjectManager { get; set; }

        public Employee AffectedProjectManager { get; set; }

        public Employee CrewChief { get; set; }

        public List<Task> Tasks { get; set; }

        public List<Equipment> Equipment { get; set; }

        public List<Employee> Operators { get; set; }
    }
}