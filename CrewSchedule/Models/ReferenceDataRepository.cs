using System;
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
            ReferenceData retval = new ReferenceData
            {
                Tasks = new List<Task>(),
                Equipment = new List<Equipment>(),
                ProjectManagers = new List<Employee>(),
                CrewChiefs = new List<Employee>(),
                InstrumentOperators = new List<Employee>()
            };
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
                                    StatusName = (string)reader["StatusName"],
                                    State = (string)reader["State"]
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
                                    StatusName = (string)reader["StatusName"],
                                    State = (string)reader["State"]
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
                                    StatusName = (string)reader["StatusName"],
                                    State = (string)reader["State"]
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
                                    StatusName = (string)reader["StatusName"],
                                    State = (string)reader["State"]
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
                                    EmployeeStatusId = (int)reader["EmployeeStatusId"],
                                    ResourceStatusId = (int)reader["ResourceStatusId"]
                                };
                                newItem.CrewChief = new Employee
                                {
                                    Id = (int)reader["EmployeeId"],
                                    Name = (string)reader["EmployeeFirstName"] + " " + (string)reader["EmployeeLastName"],
                                    Allocation = (int)reader["EmployeeAllocation"]
                                };
                                newItem.ProjectManager = new Employee
                                {
                                    Id = (int)reader["ProjectManagerId"],
                                    Name = (string)reader["ProjectManagerFirstName"] + " " + (string)reader["ProjectManagerLastName"],
                                    Color = (string)reader["ProjectManagerColor"]
                                };                            
                                switch (newItem.Type)
                                {
                                    case "Job":                                       
                                        newItem.Color = newItem.ProjectManager.Color;
                                        newItem.ProjectNumber = (string)reader["ProjectNumber"];
                                        newItem.ProjectName = (string)reader["ProjectName"];
                                        newItem.AddressLine1 = (string)reader["AddressLine1"];
                                        newItem.City = (string)reader["City"];
                                        newItem.State = (string)reader["State"];
                                        newItem.Zip = (string)reader["Zip"];
                                        if (!reader["AddressLine2"].Equals(DBNull.Value))
                                        {
                                            newItem.AddressLine2 = (string)reader["AddressLine2"];
                                        }
                                        if (!reader["AffectedProjectManagerId"].Equals(DBNull.Value))
                                        {
                                            newItem.AffectedProjectManager = new Employee
                                            {
                                                Id = (int)reader["AffectedProjectManagerId"],
                                                Name = (string)reader["AffectedProjectManagerFirstName"] + " " + (string)reader["AffectedProjectManagerLastName"],
                                                Color = (string)reader["AffectedProjectManagerColor"]
                                            };

                                        }
                                        if (!reader["ApprovedById"].Equals(DBNull.Value))
                                        {
                                            newItem.ApprovedBy = new Employee
                                            {
                                                Id = (int)reader["ApprovedById"],
                                                Name = (string)reader["ApprovedByFirstName"] + " " + (string)reader["ApprovedByLastName"]                                                
                                            };
                                            newItem.ApprovalDateTime = (DateTime)reader["ApprovalDateTime"];
                                        }
                                        break;
                                    case "PTO":
                                        newItem.Color = "#e65100";
                                        newItem.ProjectNumber = "PTO";
                                        break;
                                    case "Leave":
                                        newItem.Color = "#b71c1c";
                                        newItem.ProjectNumber = "Leave";
                                        break;
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
                                        Id = (int)reader["TaskItemTypeId"],
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
                                        Id = (int)reader["EquipmentId"],
                                        StatusId = (int)reader["StatusId"],
                                        Name = (string)reader["Name"],
                                        Allocation = (int)reader["Allocation"]
                                    });
                                }
                            }
                        }
                        // Get the Crew (Instrument Operators) associated with the current Schedule Item
                        item.Operators = new List<Employee>();
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
                                    item.Operators.Add(new Employee
                                    {
                                        Id = (int)reader["EmployeeId"],
                                        StatusId = (int)reader["StatusId"],
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
                        crewChief.ScheduleItems = scheduleItems.Where(s => s.CrewChief.Id == crewChief.Id).ToList();
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