using System.Collections.Generic;

namespace CrewSchedule.Models
{
    public class Employee
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public string CompanyName { get; set; }

        public int BranchId { get; set; }

        public string BranchName { get; set; }

        public string State { get; set; }

        public int RoleId { get; set; }

        public string RoleName { get; set; }

        public string Title { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Name { get; set; }

        public string LoginId { get; set; }

        public string Password { get; set; }

        public int ZoomLevel { get; set; }

        public string Color { get; set; }

        public int RefreshInterval { get; set; }

        public int StatusId { get; set; }

        public string StatusName { get; set; }

        public int Allocation { get; set; }

        public List<Company> Companies { get; set; }

        public List<ScheduleItem> ScheduleItems { get; set; }
    }
}