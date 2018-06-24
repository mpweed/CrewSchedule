﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CrewSchedule.Models
{
    internal class ReferenceDataRepository : Repository
    {
        internal static ReferenceData GetReferenceData(ScheduleParameters scheduleParameters)
        {
            ReferenceData retval = new ReferenceData();
            retval.Tasks = new List<Task>();
            retval.Equipment = new List<Equipment>();
            retval.ProjectManagers = new List<Employee>();
            retval.CrewChiefs = new List<Employee>();
            retval.InstrumentOperators = new List<Employee>();
            List<ScheduleItem> scheduleItems = new List<ScheduleItem>();
            List<Company> companies = new List<Company>();
            List<Branch> branches = new List<Branch>();
            try
            {
                using (SqlConnection conn = new SqlConnection(GetConnectionString()))
                {
                    using (SqlCommand com = new SqlCommand())
                    {
                        com.Connection = conn;
                        com.CommandType = CommandType.StoredProcedure;
                        com.CommandText = "GetReferenceData_SP";
                        com.Parameters.Add(new SqlParameter("@loginId", scheduleParameters.LoginId));
                        com.Parameters.Add(new SqlParameter("@password", scheduleParameters.Password));
                        com.Parameters.Add(new SqlParameter("@startDate", scheduleParameters.StartDate));
                        com.Parameters.Add(new SqlParameter("@endDate", scheduleParameters.EndDate));
                        com.Parameters.Add(new SqlParameter("@branchIdIn", scheduleParameters.BranchId));
                        conn.Open();
                        using (SqlDataReader reader = com.ExecuteReader())
                        {
                            // Get the Application User
                            while (reader.Read())
                            {
                                retval.ApplicationUser = new Employee
                                {
                                    Id = (int)reader["Id"],
                                    CompanyId = (int)reader["CompanyId"],
                                    CompanyName = (string)reader["CompanyName"],
                                    BranchId = (int)reader["BranchId"],
                                    BranchName = (string)reader["BranchName"],
                                    RoleId = (int)reader["RoleId"],
                                    RoleName = (string)reader["RoleName"],
                                    Title = (string)reader["Title"],
                                    FirstName = (string)reader["FirstName"],
                                    LastName = (string)reader["LastName"],
                                    Name = (string)reader["FirstName"] + " " + (string)reader["LastName"],
                                    LoginId = (string)reader["LoginId"],
                                    Password = (string)reader["Password"],
                                    ZoomLevel = (int)reader["ZoomLevel"],
                                    RefreshInterval = (int)reader["RefreshInterval"],
                                    StatusId = (int)reader["StatusId"],
                                    StatusName = (string)reader["StatusName"]
                                };
                            }
                            if (retval.ApplicationUser == null)
                            {
                                throw new Exception("Invalid Login Id or Password");
                            }

                            // Get the list of Tasks for the Application User's primary Company
                            reader.NextResult();
                            while (reader.Read())
                            {
                                retval.Tasks.Add(new Task
                                {
                                    Id = (int)reader["Id"],
                                    CompanyId = (int)reader["CompanyId"],
                                    Name = (string)reader["Name"]
                                });
                            }

                            // Get the list of Equipment for the Branch
                            reader.NextResult();
                            while (reader.Read())
                            {
                                retval.Equipment.Add(new Equipment
                                {
                                    Id = (int)reader["Id"],
                                    EquipmentTypeId = (int)reader["EquipmentTypeId"],
                                    CompanyId = (int)reader["CompanyId"],
                                    BranchId = (int)reader["BranchId"],
                                    Name = (string)reader["Name"]
                                });
                            }


                            // Get the Project Managers for the Branch
                            reader.NextResult();
                            while (reader.Read())
                            {
                                retval.ProjectManagers.Add(new Employee
                                {
                                    Id = (int)reader["Id"],
                                    CompanyId = (int)reader["CompanyId"],
                                    CompanyName = (string)reader["CompanyName"],
                                    BranchId = (int)reader["BranchId"],
                                    BranchName = (string)reader["BranchName"],
                                    RoleId = (int)reader["RoleId"],
                                    RoleName = (string)reader["RoleName"],
                                    Title = (string)reader["Title"],
                                    FirstName = (string)reader["FirstName"],
                                    LastName = (string)reader["LastName"],
                                    Name = (string)reader["FirstName"] + " " + (string)reader["LastName"],
                                    LoginId = (string)reader["LoginId"],
                                    Password = (string)reader["Password"],
                                    ZoomLevel = (int)reader["ZoomLevel"],
                                    Color = (string)reader["Color"],
                                    RefreshInterval = (int)reader["RefreshInterval"],
                                    StatusId = (int)reader["StatusId"],
                                    StatusName = (string)reader["StatusName"]
                                });
                            }

                            // Get the Crew Chiefs for the Branch
                            reader.NextResult();
                            while (reader.Read())
                            {
                                retval.CrewChiefs.Add(new Employee
                                {
                                    Id = (int)reader["Id"],
                                    CompanyId = (int)reader["CompanyId"],
                                    CompanyName = (string)reader["CompanyName"],
                                    BranchId = (int)reader["BranchId"],
                                    BranchName = (string)reader["BranchName"],
                                    RoleId = (int)reader["RoleId"],
                                    RoleName = (string)reader["RoleName"],
                                    Title = (string)reader["Title"],
                                    FirstName = (string)reader["FirstName"],
                                    LastName = (string)reader["LastName"],
                                    Name = (string)reader["FirstName"] + " " + (string)reader["LastName"],
                                    LoginId = (string)reader["LoginId"],
                                    Password = (string)reader["Password"],
                                    ZoomLevel = (int)reader["ZoomLevel"],
                                    RefreshInterval = (int)reader["RefreshInterval"],
                                    StatusId = (int)reader["StatusId"],
                                    StatusName = (string)reader["StatusName"]
                                });
                            }

                            // Get the Instrument Operators for the Branch
                            reader.NextResult();
                            while (reader.Read())
                            {
                                retval.InstrumentOperators.Add(new Employee
                                {
                                    Id = (int)reader["Id"],
                                    CompanyId = (int)reader["CompanyId"],
                                    CompanyName = (string)reader["CompanyName"],
                                    BranchId = (int)reader["BranchId"],
                                    BranchName = (string)reader["BranchName"],
                                    RoleId = (int)reader["RoleId"],
                                    RoleName = (string)reader["RoleName"],
                                    Title = (string)reader["Title"],
                                    FirstName = (string)reader["FirstName"],
                                    LastName = (string)reader["LastName"],
                                    Name = (string)reader["FirstName"] + " " + (string)reader["LastName"],
                                    LoginId = (string)reader["LoginId"],
                                    Password = (string)reader["Password"],
                                    ZoomLevel = (int)reader["ZoomLevel"],
                                    RefreshInterval = (int)reader["RefreshInterval"],
                                    StatusId = (int)reader["StatusId"],
                                    StatusName = (string)reader["StatusName"]
                                });
                            }

                            // Get the Schedule Items for each Crew Chief
                            reader.NextResult();
                            while (reader.Read())
                            {
                                ScheduleItem newItem = new ScheduleItem
                                {
                                    Id = (long)reader["Id"],
                                    TypeId = (int)reader["TypeId"],
                                    Type = (string)reader["Type"],
                                    StatusId = (int)reader["StatusId"],
                                    Status = (string)reader["Status"],
                                    StartDate = (DateTime)reader["StartDate"],
                                    EndDate = (DateTime)reader["EndDate"],
                                    CreationDateTime = (DateTime)reader["CreationDateTime"],
                                    StatusUpdateDateTime = (DateTime)reader["StatusUpdateDateTime"],
                                    EmployeeId = (int)reader["EmployeeId"],
                                    EmployeeName = (string)reader["EmployeeFirstName"] + " " + (string)reader["EmployeeLastName"],
                                    EmployeeAllocation = (int)reader["EmployeeAllocation"]
                                };
                                if (!reader["ProjectManagerId"].Equals(DBNull.Value))
                                {
                                    newItem.ProjectManagerId = (int)reader["ProjectManagerId"];
                                    newItem.ProjectManagerName = (string)reader["ProjectManagerFirstName"] + " " + (string)reader["ProjectManagerLastName"];
                                    newItem.ProjectManagerColor = (string)reader["ProjectManagerColor"];
                                    newItem.ProjectNumber = (string)reader["ProjectNumber"];
                                    newItem.ProjectName = (string)reader["ProjectName"];
                                }
                                if (!reader["AddressLine1"].Equals(DBNull.Value))
                                {
                                    newItem.AddressLine1 = (string)reader["AddressLine1"];
                                }
                                if (!reader["AddressLine2"].Equals(DBNull.Value))
                                {
                                    newItem.AddressLine2 = (string)reader["AddressLine2"];
                                }
                                if (!reader["City"].Equals(DBNull.Value))
                                {
                                    newItem.City = (string)reader["City"];
                                }
                                if (!reader["State"].Equals(DBNull.Value))
                                {
                                    newItem.State = (string)reader["State"];
                                }
                                if (!reader["Zip"].Equals(DBNull.Value))
                                {
                                    newItem.Zip = (string)reader["Zip"];
                                }
                                if (!reader["AffectedProjectManagerId"].Equals(DBNull.Value))
                                {
                                    newItem.AffectedProjectManagerId = (int)reader["AffectedProjectManagerId"];
                                    newItem.AffectedProjectManagerName = (string)reader["AffectedProjectManagerFirstName"] + " " + (string)reader["ProjectManagerLastName"];
                                }

                                scheduleItems.Add(newItem);
                            }

                            // Get the Companies for the Application User
                            reader.NextResult();
                            while (reader.Read())
                            {
                                companies.Add(new Company
                                {
                                    Id = (int)reader["Id"],
                                    Name = (string)reader["Name"]
                                });
                            }
                            
                            // Get the Branches for the Application User
                            reader.NextResult();
                            while (reader.Read())
                            {
                                branches.Add(new Branch
                                {
                                    Id = (int)reader["Id"],
                                    CompanyId = (int)reader["CompanyId"],
                                    Name = (string)reader["Name"]
                                });
                            }
                        }
                    }                    
                    
                    // Link the assocated Tasks, Equipment, and Instrument Operators
                    // to each Schedule Item
                    foreach (ScheduleItem item in scheduleItems)
                    {
                        // Get the associated Tasks for the current Schedule Item 
                        item.Tasks = new List<Task>();
                        using (SqlCommand com = new SqlCommand())
                        {
                            com.Connection = conn;
                            com.CommandType = CommandType.StoredProcedure;
                            com.CommandText = "GetTasks_SP";
                            com.Parameters.Add(new SqlParameter("@id", item.Id));
                            using (SqlDataReader reader = com.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    item.Tasks.Add(new Task
                                    {
                                        Id = (long)reader["Id"],
                                        CompanyId = (int)reader["CompanyId"],
                                        Name = (string)reader["Name"]
                                    });
                                }
                            }
                        }
                        // Get the associated Equipment for the current Schedule Item
                        item.Equipment = new List<Equipment>();
                        using (SqlCommand com = new SqlCommand())
                        {
                            com.Connection = conn;
                            com.CommandType = CommandType.StoredProcedure;
                            com.CommandText = "GetEquipment_SP";
                            com.Parameters.Add(new SqlParameter("@Id", item.Id));
                            using (SqlDataReader reader = com.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    item.Equipment.Add(new Equipment
                                    {
                                        Id = (long)reader["Id"],
                                        Name = (string)reader["Name"],
                                        Allocation = (int)reader["Allocation"]
                                    });
                                }
                            }
                        }
                        // Get the Crew (Instrument Operators) associated with the current Schedule Item
                        item.Crew = new List<Employee>();
                        using (SqlCommand com = new SqlCommand())
                        {
                            com.Connection = conn;
                            com.CommandType = CommandType.StoredProcedure;
                            com.CommandText = "GetEmployees_SP";
                            com.Parameters.Add(new SqlParameter("@Id", item.Id));
                            using (SqlDataReader reader = com.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    item.Crew.Add(new Employee
                                    {
                                        Id = (int)reader["Id"],
                                        RoleName = (string)reader["RoleName"],
                                        Name = (string)reader["FirstName"] + " " + (string)reader["LastName"],
                                        Allocation = (int)reader["Allocation"]
                                    });
                                }
                            }
                        }
                    }

                    // Link the Companies and Branches for the Application User
                    foreach(Company company in companies)
                    {
                        company.Branches = branches.Where(b => b.CompanyId == company.Id).ToList();
                    }
                    retval.ApplicationUser.Companies = companies;

                    // Link the Crew Chiefs for the Branch to their associated Schedule Items
                    foreach(Employee crewChief in retval.CrewChiefs)
                    {
                        crewChief.ScheduleItems = scheduleItems.Where(s => s.EmployeeId == crewChief.Id).ToList();
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