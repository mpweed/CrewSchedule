using System.Collections.Generic;

namespace CrewSchedule.Models
{
    public class Company
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<Branch> Branches { get; set; }
    }
}