USE [master]
GO
/****** Object:  Database [crewschedule1]    Script Date: 6/23/2018 9:39:46 AM ******/
CREATE DATABASE [crewschedule1]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'crewschedule', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\crewschedule1.mdf' , SIZE = 8192KB , MAXSIZE = 20971520KB , FILEGROWTH = 10%)
 LOG ON 
( NAME = N'crewschedule_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\crewschedule1_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [crewschedule1] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [crewschedule1].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [crewschedule1] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [crewschedule1] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [crewschedule1] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [crewschedule1] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [crewschedule1] SET ARITHABORT OFF 
GO
ALTER DATABASE [crewschedule1] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [crewschedule1] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [crewschedule1] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [crewschedule1] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [crewschedule1] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [crewschedule1] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [crewschedule1] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [crewschedule1] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [crewschedule1] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [crewschedule1] SET  DISABLE_BROKER 
GO
ALTER DATABASE [crewschedule1] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [crewschedule1] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [crewschedule1] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [crewschedule1] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [crewschedule1] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [crewschedule1] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [crewschedule1] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [crewschedule1] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [crewschedule1] SET  MULTI_USER 
GO
ALTER DATABASE [crewschedule1] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [crewschedule1] SET DB_CHAINING OFF 
GO
ALTER DATABASE [crewschedule1] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [crewschedule1] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [crewschedule1] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [crewschedule1] SET QUERY_STORE = OFF
GO
USE [crewschedule1]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [crewschedule1]
GO
/****** Object:  User [crewschedule1]    Script Date: 6/23/2018 9:39:46 AM ******/
CREATE USER [crewschedule1] FOR LOGIN [crewschedule1] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [crewschedule]    Script Date: 6/23/2018 9:39:46 AM ******/
CREATE USER [crewschedule] FOR LOGIN [crewschedule] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [crewschedule1]
GO
ALTER ROLE [db_owner] ADD MEMBER [crewschedule]
GO
ALTER ROLE [db_securityadmin] ADD MEMBER [crewschedule]
GO
ALTER ROLE [db_datareader] ADD MEMBER [crewschedule]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [crewschedule]
GO
/****** Object:  UserDefinedFunction [dbo].[AuthorizeUser_F]    Script Date: 6/23/2018 9:39:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[AuthorizeUser_F] 
(
	@loginId	nvarchar(50),
	@password	nvarchar(50)
)
RETURNS int
AS
BEGIN	
	DECLARE @retval int;		
	SELECT @retval = RoleId
	FROM EMPLOYEE_VW
	WHERE
	LoginId = @loginId
	AND
	Password = @password;	
	IF @retval is NULL SET @retval = 0;
	RETURN @retval;
END
GO
/****** Object:  Table [dbo].[EMPLOYEE]    Script Date: 6/23/2018 9:39:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EMPLOYEE](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BranchId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[FirstName] [nvarchar](max) NOT NULL,
	[LastName] [nvarchar](max) NOT NULL,
	[LoginId] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[ZoomLevel] [int] NOT NULL,
	[Color] [nvarchar](50) NULL,
	[RefreshInterval] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
 CONSTRAINT [PK_EMPLOYEE] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY]    Script Date: 6/23/2018 9:39:46 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMPANY](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BRANCH]    Script Date: 6/23/2018 9:39:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BRANCH](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_BRANCH_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ROLE]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ROLE](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_ROLE] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EMPLOYEE_STATUS]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EMPLOYEE_STATUS](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
 CONSTRAINT [PK_EMPLOYEE_STATUS] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[EMPLOYEE_VW]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[EMPLOYEE_VW]
AS
SELECT        e.Id as Id, c.Id AS CompanyId, c.Name AS CompanyName, b.Id AS BranchId, b.Name AS BranchName, r.Id AS RoleId, r.Name AS RoleName, e.Title, e.FirstName, e.LastName, e.LoginId, e.Password, e.ZoomLevel, e.Color, 
                         e.RefreshInterval, e.StatusId, es.Name AS StatusName
FROM            dbo.EMPLOYEE AS e INNER JOIN
                         dbo.BRANCH AS b ON e.BranchId = b.Id INNER JOIN
                         dbo.COMPANY AS c ON b.CompanyId = c.Id INNER JOIN
                         dbo.ROLE AS r ON e.RoleId = r.Id INNER JOIN
                         dbo.EMPLOYEE_STATUS AS es ON e.StatusId = es.Id
GO
/****** Object:  Table [dbo].[SCHEDULE_ITEM_EMPLOYEE]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCHEDULE_ITEM_EMPLOYEE](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ScheduleItemId] [bigint] NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[Allocation] [int] NOT NULL,
 CONSTRAINT [PK_SCHEDULE_ITEM_EMPLOYEE] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[SCHEDULE_ITEM_EMPLOYEE_VW]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[SCHEDULE_ITEM_EMPLOYEE_VW] as
select
a.*,
b.RoleName
from 
schedule_item_employee a
inner join employee_vw b on a.EmployeeId = a.Id;
GO
/****** Object:  View [dbo].[CREW_CHIEF_VW]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[CREW_CHIEF_VW]
	AS SELECT * FROM EMPLOYEE_VW
	WHERE RoleId = 5;
GO
/****** Object:  View [dbo].[PROJECT_MANAGER_VW]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[PROJECT_MANAGER_VW]
	AS SELECT * FROM EMPLOYEE_VW
	WHERE (RoleId = 3 OR RoleId = 4);
GO
/****** Object:  View [dbo].[EXECUTIVE_VW]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[EXECUTIVE_VW]
	AS SELECT * FROM EMPLOYEE_VW
	WHERE RoleId = 2;
GO
/****** Object:  View [dbo].[INSTRUMENT_OPERATOR_VW]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[INSTRUMENT_OPERATOR_VW]
	AS SELECT * FROM EMPLOYEE_VW
	WHERE RoleId = 6;
GO
/****** Object:  Table [dbo].[SCHEDULE_ITEM_STATUS]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCHEDULE_ITEM_STATUS](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_SCHEDULE_ITEM_STATUS] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCHEDULE_ITEM_TYPE]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCHEDULE_ITEM_TYPE](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_SCHEDULE_ITEM_TYPE] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCHEDULE_ITEM]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCHEDULE_ITEM](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[TypeId] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
	[CreationDateTime] [datetime] NOT NULL,
	[StatusUpdateDateTime] [datetime] NOT NULL,
	[ProjectManagerId] [int] NULL,
	[AffectedProjectManagerId] [int] NULL,
	[EmployeeId] [int] NOT NULL,
	[EmployeeAllocation] [int] NOT NULL,
	[ProjectNumber] [nvarchar](50) NULL,
	[ProjectName] [nvarchar](max) NULL,
	[AddressLine1] [nvarchar](max) NULL,
	[AddressLine2] [nvarchar](max) NULL,
	[City] [nvarchar](max) NULL,
	[State] [nvarchar](2) NULL,
	[Zip] [nvarchar](10) NULL,
 CONSTRAINT [PK_SCHEDULE_ITEM] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[SCHEDULE_ITEM_VW]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[SCHEDULE_ITEM_VW]
AS
SELECT        a.Id, a.TypeId, b.Name AS Type, a.StatusId, c.Name AS Status, f.BranchId, a.StartDate, a.EndDate, a.CreationDateTime, a.StatusUpdateDateTime, a.ProjectManagerId, d.FirstName AS ProjectManagerFirstName, 
                         d.LastName AS ProjectManagerLastName, d.Color AS ProjectManagerColor, a.AffectedProjectManagerId, e.FirstName AS AffectedProjectManagerFirstName, e.LastName AS AffectedProjectManagerLastName, a.EmployeeId, 
                         f.FirstName AS EmployeeFirstName, f.LastName AS EmployeeLastName, a.EmployeeAllocation, a.ProjectNumber, a.ProjectName, a.AddressLine1, a.AddressLine2, a.City, a.State, a.Zip
FROM            dbo.SCHEDULE_ITEM AS a INNER JOIN
                         dbo.SCHEDULE_ITEM_TYPE AS b ON a.TypeId = b.Id INNER JOIN
                         dbo.SCHEDULE_ITEM_STATUS AS c ON a.StatusId = c.Id INNER JOIN
                         dbo.PROJECT_MANAGER_VW AS d ON a.ProjectManagerId = d.Id LEFT OUTER JOIN
                         dbo.PROJECT_MANAGER_VW AS e ON a.AffectedProjectManagerId = e.Id LEFT OUTER JOIN
                         dbo.EMPLOYEE_VW AS f ON a.EmployeeId = f.Id
GO
/****** Object:  Table [dbo].[TASK_ITEM_TYPE]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TASK_ITEM_TYPE](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_TASK_ITEM_TYPE] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCHEDULE_ITEM_TASK]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCHEDULE_ITEM_TASK](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ScheduleItemId] [bigint] NOT NULL,
	[TaskItemTypeId] [int] NOT NULL,
 CONSTRAINT [PK_SCHEDULE_ITEM_TASK] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[SCHEDULE_ITEM_TASK_VW]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[SCHEDULE_ITEM_TASK_VW] as
select
a.*,
b.Name
from 
schedule_item_task a
inner join task_item_type b on a.TaskItemTypeId = b.Id;
GO
/****** Object:  Table [dbo].[EQUIPMENT]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EQUIPMENT](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EquipmentTypeId] [int] NOT NULL,
	[CompanyId] [int] NOT NULL,
	[BranchId] [int] NULL,
	[Name] [nvarchar](max) NULL,
 CONSTRAINT [PK_EQUIPMENT] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCHEDULE_ITEM_EQUIPMENT]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCHEDULE_ITEM_EQUIPMENT](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ScheduleItemId] [bigint] NOT NULL,
	[EquipmentId] [int] NOT NULL,
	[Allocation] [int] NOT NULL,
 CONSTRAINT [PK_SCHEDULE_ITEM_EQUIPMENT] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[SCHEDULE_ITEM_EQUIPMENT_VW]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[SCHEDULE_ITEM_EQUIPMENT_VW] as
select
a.*,
b.Name
from 
schedule_item_equipment a
inner join equipment b on a.EquipmentId = b.Id;
GO
/****** Object:  Table [dbo].[BRANCH_MANAGER]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BRANCH_MANAGER](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[BranchId] [int] NOT NULL,
 CONSTRAINT [PK_BRANCH_MANAGER] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EQUIPMENT_TYPE]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EQUIPMENT_TYPE](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NULL,
 CONSTRAINT [PK_EQUIPMENT_TYPE] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[EMPLOYEE] ADD  CONSTRAINT [DF_EMPLOYEE_Password]  DEFAULT (N'W3lc0me1') FOR [Password]
GO
ALTER TABLE [dbo].[EMPLOYEE] ADD  CONSTRAINT [DF_EMPLOYEE_Zoom_Level]  DEFAULT ((1)) FOR [ZoomLevel]
GO
ALTER TABLE [dbo].[EMPLOYEE] ADD  CONSTRAINT [DF_EMPLOYEE_Refresh_Interval]  DEFAULT ((1)) FOR [RefreshInterval]
GO
ALTER TABLE [dbo].[EMPLOYEE] ADD  CONSTRAINT [DF_EMPLOYEE_Status]  DEFAULT ((1)) FOR [StatusId]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM] ADD  CONSTRAINT [DF_SCHEDULE_ITEM_Creation_Date_Time]  DEFAULT (getdate()) FOR [CreationDateTime]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM] ADD  CONSTRAINT [DF_SCHEDULE_ITEM_Status_Update_Date_Time]  DEFAULT (getdate()) FOR [StatusUpdateDateTime]
GO
ALTER TABLE [dbo].[BRANCH]  WITH CHECK ADD  CONSTRAINT [FK_BRANCH_COMPANY] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[COMPANY] ([Id])
GO
ALTER TABLE [dbo].[BRANCH] CHECK CONSTRAINT [FK_BRANCH_COMPANY]
GO
ALTER TABLE [dbo].[BRANCH_MANAGER]  WITH CHECK ADD  CONSTRAINT [FK_BRANCH_MANAGER_BRANCH] FOREIGN KEY([BranchId])
REFERENCES [dbo].[BRANCH] ([Id])
GO
ALTER TABLE [dbo].[BRANCH_MANAGER] CHECK CONSTRAINT [FK_BRANCH_MANAGER_BRANCH]
GO
ALTER TABLE [dbo].[BRANCH_MANAGER]  WITH CHECK ADD  CONSTRAINT [FK_BRANCH_MANAGER_EMPLOYEE] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[EMPLOYEE] ([Id])
GO
ALTER TABLE [dbo].[BRANCH_MANAGER] CHECK CONSTRAINT [FK_BRANCH_MANAGER_EMPLOYEE]
GO
ALTER TABLE [dbo].[EMPLOYEE]  WITH CHECK ADD  CONSTRAINT [FK_EMPLOYEE_BRANCH] FOREIGN KEY([BranchId])
REFERENCES [dbo].[BRANCH] ([Id])
GO
ALTER TABLE [dbo].[EMPLOYEE] CHECK CONSTRAINT [FK_EMPLOYEE_BRANCH]
GO
ALTER TABLE [dbo].[EMPLOYEE]  WITH CHECK ADD  CONSTRAINT [FK_EMPLOYEE_EMPLOYEE_STATUS] FOREIGN KEY([StatusId])
REFERENCES [dbo].[EMPLOYEE_STATUS] ([Id])
GO
ALTER TABLE [dbo].[EMPLOYEE] CHECK CONSTRAINT [FK_EMPLOYEE_EMPLOYEE_STATUS]
GO
ALTER TABLE [dbo].[EMPLOYEE]  WITH CHECK ADD  CONSTRAINT [FK_EMPLOYEE_ROLE] FOREIGN KEY([RoleId])
REFERENCES [dbo].[ROLE] ([Id])
GO
ALTER TABLE [dbo].[EMPLOYEE] CHECK CONSTRAINT [FK_EMPLOYEE_ROLE]
GO
ALTER TABLE [dbo].[EQUIPMENT]  WITH CHECK ADD  CONSTRAINT [FK_EQUIPMENT_BRANCH] FOREIGN KEY([BranchId])
REFERENCES [dbo].[BRANCH] ([Id])
GO
ALTER TABLE [dbo].[EQUIPMENT] CHECK CONSTRAINT [FK_EQUIPMENT_BRANCH]
GO
ALTER TABLE [dbo].[EQUIPMENT]  WITH CHECK ADD  CONSTRAINT [FK_EQUIPMENT_COMPANY] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[COMPANY] ([Id])
GO
ALTER TABLE [dbo].[EQUIPMENT] CHECK CONSTRAINT [FK_EQUIPMENT_COMPANY]
GO
ALTER TABLE [dbo].[EQUIPMENT]  WITH CHECK ADD  CONSTRAINT [FK_EQUIPMENT_EQUIPMENT_TYPE] FOREIGN KEY([EquipmentTypeId])
REFERENCES [dbo].[EQUIPMENT_TYPE] ([Id])
GO
ALTER TABLE [dbo].[EQUIPMENT] CHECK CONSTRAINT [FK_EQUIPMENT_EQUIPMENT_TYPE]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_EMPLOYEE] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[EMPLOYEE] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_EMPLOYEE]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_EMPLOYEE1] FOREIGN KEY([ProjectManagerId])
REFERENCES [dbo].[EMPLOYEE] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_EMPLOYEE1]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_EMPLOYEE2] FOREIGN KEY([AffectedProjectManagerId])
REFERENCES [dbo].[EMPLOYEE] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_EMPLOYEE2]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_SCHEDULE_ITEM_STATUS] FOREIGN KEY([StatusId])
REFERENCES [dbo].[SCHEDULE_ITEM_STATUS] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_SCHEDULE_ITEM_STATUS]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_SCHEDULE_ITEM_TYPE] FOREIGN KEY([TypeId])
REFERENCES [dbo].[SCHEDULE_ITEM_TYPE] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_SCHEDULE_ITEM_TYPE]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_EMPLOYEE]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_EMPLOYEE_EMPLOYEE] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[EMPLOYEE] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_EMPLOYEE] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_EMPLOYEE_EMPLOYEE]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_EMPLOYEE]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_EMPLOYEE_SCHEDULE_ITEM] FOREIGN KEY([ScheduleItemId])
REFERENCES [dbo].[SCHEDULE_ITEM] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_EMPLOYEE] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_EMPLOYEE_SCHEDULE_ITEM]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_EQUIPMENT]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_EQUIPMENT_EQUIPMENT] FOREIGN KEY([EquipmentId])
REFERENCES [dbo].[EQUIPMENT] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_EQUIPMENT] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_EQUIPMENT_EQUIPMENT]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_EQUIPMENT]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_EQUIPMENT_SCHEDULE_ITEM] FOREIGN KEY([ScheduleItemId])
REFERENCES [dbo].[SCHEDULE_ITEM] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_EQUIPMENT] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_EQUIPMENT_SCHEDULE_ITEM]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_TASK]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_TASK_SCHEDULE_ITEM] FOREIGN KEY([ScheduleItemId])
REFERENCES [dbo].[SCHEDULE_ITEM] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_TASK] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_TASK_SCHEDULE_ITEM]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_TASK]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_TASK_TASK_ITEM_TYPE] FOREIGN KEY([TaskItemTypeId])
REFERENCES [dbo].[TASK_ITEM_TYPE] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_TASK] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_TASK_TASK_ITEM_TYPE]
GO
/****** Object:  StoredProcedure [dbo].[GetBootstrapData_SP]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetBootstrapData_SP]
	@loginId nvarchar(50),
	@password nvarchar(50),
	@startDate nvarchar(10),
	@endDate nvarchar(10),
	@branchIdIn int
AS
BEGIN
	declare @roleId int;
	declare @companyId int;
	declare @branchId int;

	set @roleId = [dbo].AuthorizeUser_F(@loginId, @password);
	if @roleId > 0 and @roleId < 5 -- User is authorized and has role of Project Manager or above
		begin
			-- Get User BranchId
			select 
			@companyId = CompanyId,
			@branchId = BranchId
			from employee_vw
			WHERE
			LoginId = @loginId
			and
			Password = @password;

			if (@branchIdIn > 0 and @branchIdIn <> @branchId)
				set @branchId = @branchIdIn;

			-- Get Application User Data
			select * from employee_vw
			where
			LoginId = @loginId
			and
			Password = @password;

			-- Get list of Project Managers for branch
			select * from project_manager_vw	
			where BranchId = @branchId
			order by LastName;

			-- Get list of Crew Chiefs for Branch
			select * from crew_chief_vw
			where BranchId = @branchId
			order by LastName;
		
			-- Get list of Instrument Operators for branch
			select * from instrument_operator_vw
			where BranchId = @branchId
			order by LastName;

			-- Get list of Schedule Items for branch and time frame
			select * from schedule_item_vw
			where
			BranchId = @branchId
			and
			EndDate >= @startDate
			and
			StartDate <= @endDate;

			-- Get list of Companies and Branches for the Application User
			if @roleId = 1 -- Application User can see all Companies and Branches
				begin
					select * from company;
					select * from branch;	
				end
			else -- Application User can only see their Company
				begin
					if @roleId = 2 -- Application User can see all Branches for their Company
						begin
							select * from company where Id = @companyId;
							select * from branch where CompanyId = @companyId;
						end
					else -- Application User can see only their Branch
						begin
							select * from company where Id = @companyId;
							select * from branch where Id = @branchId;
						end
				end
		END
	else
		return 1;
END
GO
/****** Object:  StoredProcedure [dbo].[GetEmployees_SP]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetEmployees_SP]
	@id int
AS
begin
	select * from schedule_item_employee_vw where ScheduleItemId = @id
	order by Id;
end
GO
/****** Object:  StoredProcedure [dbo].[GetEquipment_SP]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetEquipment_SP]
	@id int
AS
begin
	select * from schedule_item_equipment_vw where ScheduleItemId = @id
	order by Id;
end
GO
/****** Object:  StoredProcedure [dbo].[GetTasks_SP]    Script Date: 6/23/2018 9:39:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetTasks_SP]
	@id int
AS
begin
	select * from schedule_item_task_vw where ScheduleItemId = @id
	order by Id;
end
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[11] 4[10] 2[47] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "b"
            Begin Extent = 
               Top = 6
               Left = 248
               Bottom = 119
               Right = 418
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "c"
            Begin Extent = 
               Top = 6
               Left = 456
               Bottom = 102
               Right = 626
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "r"
            Begin Extent = 
               Top = 6
               Left = 664
               Bottom = 102
               Right = 834
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "es"
            Begin Extent = 
               Top = 6
               Left = 872
               Bottom = 102
               Right = 1042
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "e"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 210
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 10
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 2430
         Table =' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'EMPLOYEE_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N' 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'EMPLOYEE_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'EMPLOYEE_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[12] 4[12] 2[58] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "a"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 266
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "b"
            Begin Extent = 
               Top = 138
               Left = 38
               Bottom = 234
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "c"
            Begin Extent = 
               Top = 138
               Left = 246
               Bottom = 234
               Right = 416
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "d"
            Begin Extent = 
               Top = 234
               Left = 38
               Bottom = 364
               Right = 211
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "e"
            Begin Extent = 
               Top = 234
               Left = 249
               Bottom = 364
               Right = 422
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "f"
            Begin Extent = 
               Top = 366
               Left = 38
               Bottom = 496
               Right = 211
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'SCHEDULE_ITEM_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'SCHEDULE_ITEM_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'SCHEDULE_ITEM_VW'
GO
USE [master]
GO
ALTER DATABASE [crewschedule1] SET  READ_WRITE 
GO
