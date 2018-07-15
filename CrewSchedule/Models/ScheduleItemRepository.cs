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
            SqlDataRecord scheduleItemRecord = new SqlDataRecord(new SqlMetaData[] 
                                              { new SqlMetaData("Id", SqlDbType.Int),
                                                new SqlMetaData("TypeId", SqlDbType.Int),
                                                new SqlMetaData("StatusId", SqlDbType.Int),
                                                new SqlMetaData("StartDate", SqlDbType.Date),
                                                new SqlMetaData("EndDate", SqlDbType.Date),
                                                new SqlMetaData("ProjectManagerId", SqlDbType.Int),
                                                new SqlMetaData("EmployeeId", SqlDbType.Int),
                                                new SqlMetaData("EmployeeAllocation", SqlDbType.Int),
                                                new SqlMetaData("ProjectNumber", SqlDbType.NVarChar, 50),
                                                new SqlMetaData("ProjectName", SqlDbType.NVarChar, 60),
                                                new SqlMetaData("AddressLine1", SqlDbType.NVarChar, 60),
                                                new SqlMetaData("AddressLine2", SqlDbType.NVarChar, 60),
                                                new SqlMetaData("City", SqlDbType.NVarChar, 60),
                                                new SqlMetaData("State", SqlDbType.NVarChar, 2),
                                                new SqlMetaData("Zip", SqlDbType.NVarChar, 10)});


            scheduleItemRecord.SetInt32(1, updateParameter.ScheduleItem.TypeId);
            scheduleItemRecord.SetDateTime(3, updateParameter.ScheduleItem.StartDate);
            scheduleItemRecord.SetDateTime(4, updateParameter.ScheduleItem.EndDate);
            scheduleItemRecord.SetInt32(5, updateParameter.ScheduleItem.ProjectManager.Id);
            scheduleItemRecord.SetInt32(6, updateParameter.ScheduleItem.CrewChief.Id);
            scheduleItemRecord.SetInt32(7, updateParameter.ScheduleItem.CrewChief.Allocation);
            scheduleItemRecord.SetString(8, updateParameter.ScheduleItem.ProjectNumber);
            scheduleItemRecord.SetString(9, updateParameter.ScheduleItem.ProjectName);
            scheduleItemRecord.SetString(10, updateParameter.ScheduleItem.AddressLine1);
            if(updateParameter.ScheduleItem.AddressLine2 != null)
            {
                scheduleItemRecord.SetString(11, updateParameter.ScheduleItem.AddressLine2);
            }            
            scheduleItemRecord.SetString(12, updateParameter.ScheduleItem.City);
            scheduleItemRecord.SetString(13, updateParameter.ScheduleItem.State);
            scheduleItemRecord.SetString(14, updateParameter.ScheduleItem.Zip);

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