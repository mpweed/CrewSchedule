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
        private static DataTable GetScheduleItem(ScheduleItem scheduleItem)
        {
            DataTable retval = new DataTable();
            retval.Columns.Add("Id", typeof(int));
            retval.Columns.Add("TypeId", typeof(int));
            retval.Columns.Add("StatusId", typeof(int));
            retval.Columns.Add("StartDate", typeof(DateTime));
            retval.Columns.Add("EndDate", typeof(DateTime));
            retval.Columns.Add("ProjectManagerId", typeof(int));
            retval.Columns.Add("EmployeeId", typeof(int));
            retval.Columns.Add("EmployeeAllocation", typeof(int));
            retval.Columns.Add("ProjectNumber", typeof(string));
            retval.Columns.Add("ProjectName", typeof(string));
            retval.Columns.Add("AddressLine1", typeof(string));
            retval.Columns.Add("AddressLine2", typeof(string));
            retval.Columns.Add("City", typeof(string));
            retval.Columns.Add("State", typeof(string));
            retval.Columns.Add("Zip", typeof(string));
            if(scheduleItem != null) {
                DataRow row = retval.NewRow();
                row.SetField(0, scheduleItem.Id);
                row.SetField(1, scheduleItem.TypeId);
                row.SetField(2, scheduleItem.StatusId);
                row.SetField(3, scheduleItem.StartDate);
                row.SetField(4, scheduleItem.EndDate);
                row.SetField(5, scheduleItem.ProjectManager.Id);
                row.SetField(6, scheduleItem.CrewChief.Id);
                row.SetField(7, scheduleItem.CrewChief.Allocation);
                row.SetField(8, scheduleItem.ProjectNumber);
                row.SetField(9, scheduleItem.ProjectName);
                row.SetField(10, scheduleItem.AddressLine1);
                row.SetField(11, scheduleItem.AddressLine2);
                row.SetField(12, scheduleItem.City);
                row.SetField(13, scheduleItem.State);
                row.SetField(14, scheduleItem.Zip);
                retval.Rows.Add(row);
            }           
            return retval;
        }

        private static DataTable GetTasks(List<Task> list) {
            DataTable retval = new DataTable();
            retval.Columns.Add("Id", typeof(int));
            retval.Columns.Add("Allocation", typeof(int));
            if(list != null) {
                foreach (var r in list) {
                    DataRow row = retval.NewRow();
                    row.SetField(0, r.Id);
                    row.SetField(1, 0);
                    retval.Rows.Add(row);
                }
            }            
            return retval;
        }

        private static DataTable GetEquipment(List<Equipment> list)
        {
            DataTable retval = new DataTable();
            retval.Columns.Add("Id", typeof(int));
            retval.Columns.Add("Allocation", typeof(int));
            if(list != null) {
                foreach (var r in list) {
                    DataRow row = retval.NewRow();
                    row.SetField(0, r.Id);
                    row.SetField(1, r.Allocation);
                    retval.Rows.Add(row);
                }
            }            
            return retval;
        }

        private static DataTable GetOperators(List<Employee> list)
        {
            DataTable retval = new DataTable();
            retval.Columns.Add("Id", typeof(int));
            retval.Columns.Add("Allocation", typeof(int));
            if(list != null) {
                foreach (var r in list) {
                    DataRow row = retval.NewRow();
                    row.SetField(0, r.Id);
                    row.SetField(1, r.Allocation);
                    retval.Rows.Add(row);
                }
            }            
            return retval;
        }

        internal static ReferenceData CreateScheduleItem(UpdateParameter updateParameter)
        {
            ReferenceData retval = new ReferenceData();
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
                        com.CommandTimeout = 0; // Means unlimited
                        com.Parameters.Add(new SqlParameter("@loginId", updateParameter.ScheduleParameters.LoginId));
                        com.Parameters.Add(new SqlParameter("@password", updateParameter.ScheduleParameters.Password));
                        SqlParameter tvpParam1 = com.Parameters.AddWithValue("@tvpScheduleItem", GetScheduleItem(updateParameter.ScheduleItem));
                        tvpParam1.SqlDbType = SqlDbType.Structured;
                        tvpParam1.TypeName = "dbo.ScheduleItemTableType";
                        SqlParameter tvpParam2 = com.Parameters.AddWithValue("@tvpTasks", GetTasks(updateParameter.ScheduleItem.Tasks));
                        tvpParam2.SqlDbType = SqlDbType.Structured;
                        tvpParam2.TypeName = "dbo.ScheduleItemParmTableType";
                        SqlParameter tvpParam3 = com.Parameters.AddWithValue("@tvpEquipment", GetEquipment(updateParameter.ScheduleItem.Equipment));
                        tvpParam3.SqlDbType = SqlDbType.Structured;
                        tvpParam3.TypeName = "dbo.ScheduleItemParmTableType";
                        SqlParameter tvpParam4 = com.Parameters.AddWithValue("@tvpOperators", GetOperators(updateParameter.ScheduleItem.Operators));
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