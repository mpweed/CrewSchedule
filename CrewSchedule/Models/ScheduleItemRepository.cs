using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CrewSchedule.Models
{
    internal class ScheduleItemRepository : Repository
    {
        internal static ReferenceData CreateScheduleItem(UpdateParameter updateParameter)
        {
            ReferenceData retval = new ReferenceData();
            List<ScheduleItem> scheduleItemRecord = new List<ScheduleItem>();
            scheduleItemRecord.Add(updateParameter.ScheduleItem);
            updateParameter.ScheduleItem.ProjectManagerId = updateParameter.ScheduleItem.ProjectManager.Id;
            updateParameter.ScheduleItem.EmployeeId = updateParameter.ScheduleItem.CrewChief.Id;
            try
            {
                using (SqlConnection conn = new SqlConnection(GetConnectionString()))
                {
                    using (SqlCommand com = new SqlCommand())
                    {
                        com.Connection = conn;
                        com.CommandType = CommandType.StoredProcedure;
                        com.CommandText = "CreateScheduleItem_SP";
                        com.Parameters.Add(new SqlParameter("@loginId", updateParameter.ScheduleParameters.LoginId));
                        com.Parameters.Add(new SqlParameter("@password", updateParameter.ScheduleParameters.Password));

                        SqlParameter tvpParam1 = com.Parameters.AddWithValue("@tvpScheduleItem", scheduleItemRecord);
                        tvpParam1.SqlDbType = SqlDbType.Structured;
                        tvpParam1.TypeName = "dbo.ScheduleItemTableType";

                        SqlParameter tvpParam2 = com.Parameters.AddWithValue("@tvpTasks", updateParameter.ScheduleItem.Tasks);
                        tvpParam2.SqlDbType = SqlDbType.Structured;
                        tvpParam2.TypeName = "dbo.ScheduleItemParmTableType";
                        SqlParameter tvpParam3 = com.Parameters.AddWithValue("@tvpEquipment", updateParameter.ScheduleItem.Equipment);
                        tvpParam3.SqlDbType = SqlDbType.Structured;
                        tvpParam3.TypeName = "dbo.ScheduleItemParmTableType";
                        SqlParameter tvpParam4 = com.Parameters.AddWithValue("@tvpOperators", updateParameter.ScheduleItem.Operators);
                        tvpParam4.SqlDbType = SqlDbType.Structured;
                        tvpParam4.TypeName = "dbo.ScheduleItemParmTableType";

                        conn.Open();
                        com.ExecuteNonQuery();
                        retval = ReferenceDataRepository.GetReferenceData(updateParameter.ScheduleParameters);
                    }
                }
            } catch (Exception ex)
            {
                retval.Exception = ex;
            }            
            return retval;
        }
    }
}