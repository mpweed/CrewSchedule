namespace CrewSchedule.Models
{
    public class ScheduleParameters
    {
        public string LoginId { get; set; }

        public string Password { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public int BranchId { get; set; }

        public string Operation { get; set; }
    }
}