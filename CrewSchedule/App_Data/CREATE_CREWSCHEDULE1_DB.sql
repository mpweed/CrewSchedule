USE [master]
GO
/****** Object:  Database [crewschedule1]    Script Date: 8/19/2018 3:07:32 PM ******/
CREATE DATABASE [crewschedule1]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'crewschedule1', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\crewschedule1.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'crewschedule1_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\crewschedule1_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [crewschedule1] SET COMPATIBILITY_LEVEL = 130
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
/****** Object:  User [crewschedule1]    Script Date: 8/19/2018 3:07:32 PM ******/
CREATE USER [crewschedule1] FOR LOGIN [crewschedule1] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [crewschedule]    Script Date: 8/19/2018 3:07:32 PM ******/
CREATE USER [crewschedule] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
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
/****** Object:  UserDefinedTableType [dbo].[ScheduleItemParmTableType]    Script Date: 8/19/2018 3:07:32 PM ******/
CREATE TYPE [dbo].[ScheduleItemParmTableType] AS TABLE(
	[Id] [int] NOT NULL,
	[Allocation] [int] NULL,
	PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
/****** Object:  UserDefinedTableType [dbo].[ScheduleItemTableType]    Script Date: 8/19/2018 3:07:33 PM ******/
CREATE TYPE [dbo].[ScheduleItemTableType] AS TABLE(
	[Id] [int] NOT NULL,
	[TypeId] [int] NULL,
	[StatusId] [int] NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[ProjectManagerId] [int] NULL,
	[EmployeeId] [int] NULL,
	[EmployeeAllocation] [int] NULL,
	[ProjectNumber] [nvarchar](50) NULL,
	[ProjectName] [nvarchar](60) NULL,
	[AddressLine1] [nvarchar](60) NULL,
	[AddressLine2] [nvarchar](60) NULL,
	[City] [nvarchar](60) NULL,
	[State] [nvarchar](2) NULL,
	[Zip] [nvarchar](10) NULL,
	PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
/****** Object:  UserDefinedFunction [dbo].[AuthorizeUser_F]    Script Date: 8/19/2018 3:07:33 PM ******/
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
/****** Object:  Table [dbo].[EMPLOYEE]    Script Date: 8/19/2018 3:07:33 PM ******/
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
/****** Object:  Table [dbo].[BRANCH]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BRANCH](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[State] [nvarchar](2) NOT NULL,
 CONSTRAINT [PK_BRANCH_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY]    Script Date: 8/19/2018 3:07:33 PM ******/
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
/****** Object:  Table [dbo].[ROLE]    Script Date: 8/19/2018 3:07:33 PM ******/
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
/****** Object:  Table [dbo].[EMPLOYEE_STATUS]    Script Date: 8/19/2018 3:07:33 PM ******/
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
/****** Object:  View [dbo].[EMPLOYEE_VW]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[EMPLOYEE_VW]
AS
SELECT        e.Id, c.Id AS CompanyId, c.Name AS CompanyName, b.Id AS BranchId, b.Name AS BranchName, b.State, r.Id AS RoleId, r.Name AS RoleName, e.Title, e.FirstName, e.LastName, e.LoginId, e.Password, e.ZoomLevel, e.Color, 
                         e.RefreshInterval, e.StatusId, es.Name AS StatusName
FROM            dbo.EMPLOYEE AS e INNER JOIN
                         dbo.BRANCH AS b ON e.BranchId = b.Id INNER JOIN
                         dbo.COMPANY AS c ON b.CompanyId = c.Id INNER JOIN
                         dbo.ROLE AS r ON e.RoleId = r.Id INNER JOIN
                         dbo.EMPLOYEE_STATUS AS es ON e.StatusId = es.Id
GO
/****** Object:  Table [dbo].[SCHEDULE_ITEM_EMPLOYEE]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCHEDULE_ITEM_EMPLOYEE](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ScheduleItemId] [bigint] NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[Allocation] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
 CONSTRAINT [PK_SCHEDULE_ITEM_EMPLOYEE] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[SCHEDULE_ITEM_EMPLOYEE_VW]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[SCHEDULE_ITEM_EMPLOYEE_VW]
AS
SELECT        a.Id, a.ScheduleItemId, a.EmployeeId, a.Allocation, a.StatusId, b.RoleName, b.FirstName, b.LastName
FROM            dbo.SCHEDULE_ITEM_EMPLOYEE AS a INNER JOIN
                         dbo.EMPLOYEE_VW AS b ON a.EmployeeId = b.Id
GO
/****** Object:  View [dbo].[CREW_CHIEF_VW]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[CREW_CHIEF_VW]
AS
SELECT        Id, CompanyId, CompanyName, BranchId, BranchName, State, RoleId, RoleName, Title, FirstName, LastName, LoginId, Password, ZoomLevel, Color, RefreshInterval, StatusId, StatusName
FROM            dbo.EMPLOYEE_VW
WHERE        (RoleId = 5)
GO
/****** Object:  View [dbo].[PROJECT_MANAGER_VW]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[PROJECT_MANAGER_VW]
AS
SELECT        Id, CompanyId, CompanyName, BranchId, BranchName, State, RoleId, RoleName, Title, FirstName, LastName, LoginId, Password, ZoomLevel, Color, RefreshInterval, StatusId, StatusName
FROM            dbo.EMPLOYEE_VW
WHERE        (RoleId = 3) OR
                         (RoleId = 4)
GO
/****** Object:  View [dbo].[EXECUTIVE_VW]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[EXECUTIVE_VW]
AS
SELECT        Id, CompanyId, CompanyName, BranchId, BranchName, State, RoleId, RoleName, Title, FirstName, LastName, LoginId, Password, ZoomLevel, Color, RefreshInterval, StatusId, StatusName
FROM            dbo.EMPLOYEE_VW
WHERE        (RoleId = 2)
GO
/****** Object:  View [dbo].[INSTRUMENT_OPERATOR_VW]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[INSTRUMENT_OPERATOR_VW]
AS
SELECT        Id, CompanyId, CompanyName, BranchId, BranchName, State, RoleId, RoleName, Title, FirstName, LastName, LoginId, Password, ZoomLevel, Color, RefreshInterval, StatusId, StatusName
FROM            dbo.EMPLOYEE_VW
WHERE        (RoleId = 6)
GO
/****** Object:  Table [dbo].[SCHEDULE_ITEM_STATUS]    Script Date: 8/19/2018 3:07:33 PM ******/
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
/****** Object:  Table [dbo].[SCHEDULE_ITEM_TYPE]    Script Date: 8/19/2018 3:07:33 PM ******/
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
/****** Object:  Table [dbo].[SCHEDULE_ITEM]    Script Date: 8/19/2018 3:07:33 PM ******/
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
	[EmployeeStatusId] [int] NOT NULL,
	[ResourceStatusId] [int] NOT NULL,
	[ApprovedById] [int] NULL,
	[ApprovalDateTime] [datetime] NULL,
 CONSTRAINT [PK_SCHEDULE_ITEM] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[SCHEDULE_ITEM_VW]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[SCHEDULE_ITEM_VW] AS
SELECT        a.Id, a.TypeId, b.Name AS Type, a.StatusId, c.Name AS Status, f.BranchId, a.StartDate, a.EndDate, a.CreationDateTime, a.StatusUpdateDateTime, a.ProjectManagerId, d.FirstName AS ProjectManagerFirstName, 
                         d.LastName AS ProjectManagerLastName, d.Color AS ProjectManagerColor, a.AffectedProjectManagerId, e.FirstName AS AffectedProjectManagerFirstName, e.LastName AS AffectedProjectManagerLastName, 
                         e.Color AS AffectedProjectManagerColor, a.EmployeeId, f.FirstName AS EmployeeFirstName, f.LastName AS EmployeeLastName, a.EmployeeAllocation, a.ProjectNumber, a.ProjectName, a.AddressLine1, a.AddressLine2, a.City, 
                         a.State, a.Zip, a.EmployeeStatusId, a.ResourceStatusId, a.ApprovedById, g.FirstName AS ApprovedByFirstName, g.LastName AS ApprovedByLastName, a.ApprovalDateTime
FROM            dbo.SCHEDULE_ITEM AS a INNER JOIN
                         dbo.SCHEDULE_ITEM_TYPE AS b ON a.TypeId = b.Id INNER JOIN
                         dbo.SCHEDULE_ITEM_STATUS AS c ON a.StatusId = c.Id INNER JOIN
                         dbo.PROJECT_MANAGER_VW AS d ON a.ProjectManagerId = d.Id LEFT OUTER JOIN
                         dbo.PROJECT_MANAGER_VW AS e ON a.AffectedProjectManagerId = e.Id LEFT OUTER JOIN
						 dbo.EMPLOYEE_VW AS g ON a.ApprovedById = g.Id LEFT OUTER JOIN
                         dbo.EMPLOYEE_VW AS f ON a.EmployeeId = f.Id
						 
GO
/****** Object:  Table [dbo].[TASK_ITEM_TYPE]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TASK_ITEM_TYPE](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_TASK_ITEM_TYPE] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCHEDULE_ITEM_TASK]    Script Date: 8/19/2018 3:07:33 PM ******/
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
/****** Object:  View [dbo].[SCHEDULE_ITEM_TASK_VW]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[SCHEDULE_ITEM_TASK_VW]
AS
SELECT        a.Id, a.ScheduleItemId, a.TaskItemTypeId, b.CompanyId, b.Name
FROM            dbo.schedule_item_task AS a INNER JOIN
                         dbo.TASK_ITEM_TYPE AS b ON a.TaskItemTypeId = b.Id
GO
/****** Object:  Table [dbo].[SCHEDULE_ITEM_EQUIPMENT]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCHEDULE_ITEM_EQUIPMENT](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ScheduleItemId] [bigint] NOT NULL,
	[EquipmentId] [int] NOT NULL,
	[Allocation] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
 CONSTRAINT [PK_SCHEDULE_ITEM_EQUIPMENT] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EQUIPMENT]    Script Date: 8/19/2018 3:07:33 PM ******/
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
/****** Object:  View [dbo].[SCHEDULE_ITEM_EQUIPMENT_VW]    Script Date: 8/19/2018 3:07:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[SCHEDULE_ITEM_EQUIPMENT_VW]
AS
SELECT        a.Id, a.ScheduleItemId, a.EquipmentId, a.Allocation, a.StatusId, b.Name
FROM            dbo.schedule_item_equipment AS a INNER JOIN
                         dbo.equipment AS b ON a.EquipmentId = b.Id
GO
/****** Object:  Table [dbo].[BRANCH_MANAGER]    Script Date: 8/19/2018 3:07:33 PM ******/
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
/****** Object:  Table [dbo].[EQUIPMENT_TYPE]    Script Date: 8/19/2018 3:07:34 PM ******/
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
SET IDENTITY_INSERT [dbo].[BRANCH] ON 

INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name], [State]) VALUES (1, 1, N'Warren, NJ (HQ)', N'NJ')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name], [State]) VALUES (2, 1, N'Mt. Laurel, NJ', N'NJ')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name], [State]) VALUES (3, 1, N'Chalfont, PA', N'PA')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name], [State]) VALUES (4, 1, N'Manhattan, NY', N'NY')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name], [State]) VALUES (5, 1, N'Hauppauge, NY', N'NY')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name], [State]) VALUES (6, 1, N'Albany, NY', N'NY')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name], [State]) VALUES (7, 1, N'Boston, MA', N'MA')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name], [State]) VALUES (8, 1, N'Southborough, MA', N'MA')
SET IDENTITY_INSERT [dbo].[BRANCH] OFF
SET IDENTITY_INSERT [dbo].[BRANCH_MANAGER] ON 

INSERT [dbo].[BRANCH_MANAGER] ([Id], [EmployeeId], [BranchId]) VALUES (1, 7, 1)
INSERT [dbo].[BRANCH_MANAGER] ([Id], [EmployeeId], [BranchId]) VALUES (2, 32, 2)
INSERT [dbo].[BRANCH_MANAGER] ([Id], [EmployeeId], [BranchId]) VALUES (3, 39, 3)
INSERT [dbo].[BRANCH_MANAGER] ([Id], [EmployeeId], [BranchId]) VALUES (4, 48, 4)
INSERT [dbo].[BRANCH_MANAGER] ([Id], [EmployeeId], [BranchId]) VALUES (5, 48, 5)
INSERT [dbo].[BRANCH_MANAGER] ([Id], [EmployeeId], [BranchId]) VALUES (6, 59, 6)
INSERT [dbo].[BRANCH_MANAGER] ([Id], [EmployeeId], [BranchId]) VALUES (7, 61, 7)
INSERT [dbo].[BRANCH_MANAGER] ([Id], [EmployeeId], [BranchId]) VALUES (8, 61, 8)
SET IDENTITY_INSERT [dbo].[BRANCH_MANAGER] OFF
SET IDENTITY_INSERT [dbo].[COMPANY] ON 

INSERT [dbo].[COMPANY] ([Id], [Name]) VALUES (1, N'Control Point')
SET IDENTITY_INSERT [dbo].[COMPANY] OFF
SET IDENTITY_INSERT [dbo].[EMPLOYEE] ON 

INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (1, 1, 1, N'System Administrator', N'Michael', N'Weed', N'mweed', N'Eaw1eaw', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (2, 1, 2, N'President/Managing Partner', N'Richard', N'Butkus', N'rbutkus', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (3, 1, 2, N'Sr. Vice President/Principal', N'James', N'Weed', N'jweed', N'j@m3z666', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (4, 1, 2, N'Sr. Vice President/Principal', N'Paul', N'Jurkowski', N'pjurkowski', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (5, 1, 2, N'Director of Survey', N'John', N'Lynch', N'jlynch', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (6, 1, 2, N'Chief Financial Officer', N'Gerard', N'DiTrolio', N'gditrolio', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (7, 1, 3, N'Branch Manager', N'James', N'Sens', N'jsens', N'W3lc0me1', 1, N'#ef9a9a', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (8, 1, 4, N'Sr. Project Manager', N'Gregory', N'Sawulski', N'gsawulski', N'W3lc0me1', 1, N'#fff59d', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (9, 1, 4, N'Project Manager', N'Andrew', N'Weed', N'aweed', N'dr3wd0g666', 1, N'#29b6f6', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (10, 1, 4, N'Project Manager', N'George', N'Phillippi', N'gphillippi', N'W3lc0me1', 1, N'#b0bec5', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (11, 1, 5, N'Party Chief', N'Kyle', N'McQuillen', N'kmcquillen', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (13, 1, 5, N'Party Chief', N'Doug', N'Connor', N'dconnor', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (14, 1, 5, N'Party Chief', N'Bill', N'Boyer', N'bboyer', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (15, 1, 5, N'Party Chief', N'George', N'Adutwum', N'gadutwum', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (16, 1, 5, N'Party Chief', N'Kevin', N'Regal', N'kregal', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (17, 1, 5, N'Party Chief', N'Dennis', N'Cote', N'dcote', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (18, 1, 5, N'Party Chief', N'Carlos', N'Aguilar', N'caguilar', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (19, 1, 5, N'Party Chief', N'Brian', N'Acerbi', N'bacerbi', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (20, 1, 5, N'Party Chief', N'Dawit', N'Gebreyesus', N'dgebreyesus', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (21, 1, 5, N'Party Chief', N'Ed', N'Melhado', N'emelhado', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (22, 1, 5, N'Party Chief', N'Kyle', N'O''Connor', N'koconnor', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (23, 1, 6, N'Instrument Operator', N'Jacob', N'Whitehead', N'jwhitehead', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (24, 1, 6, N'Instrument Operator', N'Steven', N'Brower', N'sbrower', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (26, 1, 6, N'Instrument Operator', N'Richard', N'Waldron', N'rwaldron', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (27, 1, 6, N'Instrument Operator', N'Austin', N'Simpson', N'asimpson', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (28, 1, 6, N'Instrument Operator', N'Jason', N'Brown', N'jbrown', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (30, 1, 6, N'Instrument Operator', N'Orin', N'Williams', N'owilliams', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (31, 1, 6, N'Instrument Operator', N'Tyler', N'Connor', N'tconnor', N'W3lc0me1', 1, NULL, 1, 3)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (32, 2, 3, N'Branch Manager', N'James', N'Conway', N'jconway', N'W3lc0me1', 1, N'#ef9a9a', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (34, 2, 4, N'Project Manager', N'Michael', N'Tubertini', N'mtubertini', N'W3lc0me1', 1, N'#fff59d', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (35, 2, 5, N'Party Chief', N'Todd', N'Zerfing', N'tzerfing', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (36, 2, 5, N'Party Chief', N'John', N'Basile', N'jbasile', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (37, 2, 5, N'Party Chief', N'John', N'Ott', N'jott', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (38, 2, 6, N'Instrument Operator', N'Matthew', N'Davis', N'mdavis', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (39, 3, 3, N'Branch Manager', N'David', N'Hines', N'dhines', N'W3lc0me1', 1, N'#ef9a9a', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (40, 3, 4, N'Sr. Project Manager', N'John', N'Alcorn', N'jalcorn', N'W3lc0me1', 1, N'#fff59d', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (41, 3, 5, N'Party Chief', N'Erik', N'Bickel', N'ebickel', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (42, 3, 5, N'Party Chief', N'Pete', N'Holmes', N'pholmes', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (43, 3, 5, N'Party Chief', N'Craig', N'Soliday', N'csoliday', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (44, 3, 5, N'Party Chief', N'Raymond', N'Tripp', N'rtripp', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (45, 3, 6, N'Jr. Party Chief', N'Justice', N'Sadzauchi', N'jsadzauchi', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (46, 3, 6, N'Jr. Party Chief', N'Guy', N'Nicholson', N'gnicholson', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (47, 3, 6, N'Instrument Operator', N'Alex', N'Adler', N'aadler', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (48, 4, 3, N'Regional Manager', N'Rich', N'Guisado', N'rguisado', N'W3lc0me1', 1, N'#ef9a9a', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (49, 4, 5, N'Party Chief', N'Chris', N'Zeh', N'czeh', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (50, 4, 5, N'Party Chief', N'Edward', N'Tappen', N'etappen', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (51, 4, 5, N'Party Chief', N'Will', N'Richter', N'wrichter', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (52, 4, 5, N'Party Chief', N'Marcin', N'Suwala', N'msuwala', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (53, 4, 6, N'Instrument Operator', N'Geoffrey', N'Fleming', N'gfleming', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (54, 4, 6, N'Instrument Operator', N'Ben', N'Kozo', N'bkozo', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (55, 4, 6, N'Instrument Operator', N'Christian', N'Prior', N'cprior', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (56, 5, 4, N'Sr. Project Manager', N'Tim', N'Cooke', N'tcooke', N'W3lc0me1', 1, N'#fff59d', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (57, 5, 5, N'Party Chief', N'Bill', N'Wroblewski', N'bwroblewski', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (58, 5, 6, N'Instrument Operator', N'Kyle', N'Zlinicki', N'kzlinicki', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (59, 6, 3, N'Branch Manager', N'Jody', N'Lounsbury', N'jlounsbury', N'W3lc0me1', 1, N'#ef9a9a', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (60, 6, 5, N'Party Chief', N'Richard', N'Large', N'rlarge', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (61, 7, 3, N'Regional Manager', N'Gerry', N'Holdright', N'gholdright', N'W3lc0me1', 1, N'#ef9a9a', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (62, 7, 4, N'Project Manager', N'Jason', N'Root', N'jroot', N'W3lc0me1', 1, N'#fff59d', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (63, 8, 4, N'Project Manager', N'Joseph', N'Zambuto', N'jzambuto', N'W3lc0me1', 1, N'#29b6f6', 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (64, 8, 5, N'Party Chief', N'Brad', N'Brisson', N'bbrisson', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (65, 8, 5, N'Party Chief', N'Todd', N'Marsh', N'tmarsh', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (66, 8, 5, N'Party Chief', N'Scott', N'Hazzard', N'shazzard', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (67, 8, 5, N'Party Chief', N'James', N'Anastasopoulos', N'janastasopoulos', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (68, 8, 5, N'Party Chief', N'Jay', N'O''Malley', N'jomalley', N'W3lc0me1', 1, NULL, 1, 1)
INSERT [dbo].[EMPLOYEE] ([Id], [BranchId], [RoleId], [Title], [FirstName], [LastName], [LoginId], [Password], [ZoomLevel], [Color], [RefreshInterval], [StatusId]) VALUES (70, 8, 6, N'Instrument Operator', N'Tim', N'O''Farrell', N'tofarrell', N'W3lc0me1', 1, NULL, 1, 1)
SET IDENTITY_INSERT [dbo].[EMPLOYEE] OFF
SET IDENTITY_INSERT [dbo].[EMPLOYEE_STATUS] ON 

INSERT [dbo].[EMPLOYEE_STATUS] ([Id], [Name]) VALUES (1, N'Active Full-Time')
INSERT [dbo].[EMPLOYEE_STATUS] ([Id], [Name]) VALUES (2, N'Inactive')
INSERT [dbo].[EMPLOYEE_STATUS] ([Id], [Name]) VALUES (3, N'Active Part-Time')
SET IDENTITY_INSERT [dbo].[EMPLOYEE_STATUS] OFF
SET IDENTITY_INSERT [dbo].[EQUIPMENT] ON 

INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (1, 2, 1, 1, N'Laser Scanner 1 - Warren')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (2, 2, 1, 1, N'Laser Scanner 2 - Warren')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (3, 2, 1, 1, N'Laser Scanner 3 - Warren')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (4, 1, 1, 1, N'GPS Collector 1 - Warren')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (5, 1, 1, 1, N'GPS Collector 2 - Warren')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (6, 1, 1, 1, N'GPS Collector 3 - Warren')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (7, 1, 1, 1, N'GPS Collector 4 - Warren')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (8, 1, 1, 1, N'GPS Collector 5 - Warren')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (9, 1, 1, 2, N'GPS Collector 1 - Mt. Laurel')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (10, 2, 1, 2, N'Laser Scanner 1 - Mt. Laurel')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (11, 2, 1, 2, N'Laser Scanner 2 - Mt. Laurel')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (12, 1, 1, 3, N'GPS Collector 1 - Chalfont')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (13, 1, 1, 3, N'GPS Collector 2 - Chalfont')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (14, 1, 1, 3, N'GPS Collector 3 - Chalfont')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (15, 1, 1, 3, N'GPS Collector 4 - Chalfont')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (16, 2, 1, 3, N'Laser Scanner 1 - Chalfont')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (17, 1, 1, 4, N'GPS Collector 1 - Manhattan')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (18, 1, 1, 5, N'GPS Collector 1 - Hauppauge')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (19, 1, 1, 6, N'GPS Collector 1 - Albany')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (20, 1, 1, 7, N'GPS Collector 1 - Boston')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (21, 1, 1, 8, N'GPS Collector 1 - Southborough')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (22, 1, 1, 8, N'GPS Collector 2 - Southborough')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (23, 1, 1, 8, N'GPS Collector 3 - Southborough')
INSERT [dbo].[EQUIPMENT] ([Id], [EquipmentTypeId], [CompanyId], [BranchId], [Name]) VALUES (24, 2, 1, 8, N'Laser Scanner 1 - Southborough')
SET IDENTITY_INSERT [dbo].[EQUIPMENT] OFF
SET IDENTITY_INSERT [dbo].[EQUIPMENT_TYPE] ON 

INSERT [dbo].[EQUIPMENT_TYPE] ([Id], [Name]) VALUES (1, N'GPS Collector')
INSERT [dbo].[EQUIPMENT_TYPE] ([Id], [Name]) VALUES (2, N'Laser Scanner')
SET IDENTITY_INSERT [dbo].[EQUIPMENT_TYPE] OFF
SET IDENTITY_INSERT [dbo].[ROLE] ON 

INSERT [dbo].[ROLE] ([Id], [Name]) VALUES (1, N'System Administrator')
INSERT [dbo].[ROLE] ([Id], [Name]) VALUES (2, N'Company Administrator')
INSERT [dbo].[ROLE] ([Id], [Name]) VALUES (3, N'Branch Manager')
INSERT [dbo].[ROLE] ([Id], [Name]) VALUES (4, N'Project Manager')
INSERT [dbo].[ROLE] ([Id], [Name]) VALUES (5, N'Crew Chief')
INSERT [dbo].[ROLE] ([Id], [Name]) VALUES (6, N'Instrument Operator')
SET IDENTITY_INSERT [dbo].[ROLE] OFF
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM_STATUS] ON 

INSERT [dbo].[SCHEDULE_ITEM_STATUS] ([Id], [Name]) VALUES (1, N'Approved')
INSERT [dbo].[SCHEDULE_ITEM_STATUS] ([Id], [Name]) VALUES (2, N'Pending')
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM_STATUS] OFF
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM_TYPE] ON 

INSERT [dbo].[SCHEDULE_ITEM_TYPE] ([Id], [Name]) VALUES (1, N'Job')
INSERT [dbo].[SCHEDULE_ITEM_TYPE] ([Id], [Name]) VALUES (2, N'PTO')
INSERT [dbo].[SCHEDULE_ITEM_TYPE] ([Id], [Name]) VALUES (3, N'Leave')
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM_TYPE] OFF
SET IDENTITY_INSERT [dbo].[TASK_ITEM_TYPE] ON 

INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [CompanyId], [Name]) VALUES (1, 1, N'Boundary Survey')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [CompanyId], [Name]) VALUES (2, 1, N'Topographical Survey')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [CompanyId], [Name]) VALUES (3, 1, N'ALTA Survey')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [CompanyId], [Name]) VALUES (4, 1, N'Building Monitoring')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [CompanyId], [Name]) VALUES (5, 1, N'3-D Scanning')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [CompanyId], [Name]) VALUES (6, 1, N'Builder Pavement Plan')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [CompanyId], [Name]) VALUES (7, 1, N'Property Corners')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [CompanyId], [Name]) VALUES (8, 1, N'Construction Stakeout')
SET IDENTITY_INSERT [dbo].[TASK_ITEM_TYPE] OFF
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
ALTER TABLE [dbo].[SCHEDULE_ITEM] ADD  CONSTRAINT [DF_SCHEDULE_ITEM_EmployeeStatusId]  DEFAULT ((1)) FOR [EmployeeStatusId]
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM] ADD  CONSTRAINT [DF_SCHEDULE_ITEM_ResourceStatusId]  DEFAULT ((1)) FOR [ResourceStatusId]
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
ALTER TABLE [dbo].[SCHEDULE_ITEM_EMPLOYEE]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_EMPLOYEE_SCHEDULE_ITEM_STATUS] FOREIGN KEY([StatusId])
REFERENCES [dbo].[SCHEDULE_ITEM_STATUS] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_EMPLOYEE] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_EMPLOYEE_SCHEDULE_ITEM_STATUS]
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
ALTER TABLE [dbo].[SCHEDULE_ITEM_EQUIPMENT]  WITH CHECK ADD  CONSTRAINT [FK_SCHEDULE_ITEM_EQUIPMENT_SCHEDULE_ITEM_STATUS] FOREIGN KEY([StatusId])
REFERENCES [dbo].[SCHEDULE_ITEM_STATUS] ([Id])
GO
ALTER TABLE [dbo].[SCHEDULE_ITEM_EQUIPMENT] CHECK CONSTRAINT [FK_SCHEDULE_ITEM_EQUIPMENT_SCHEDULE_ITEM_STATUS]
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
ALTER TABLE [dbo].[TASK_ITEM_TYPE]  WITH CHECK ADD  CONSTRAINT [FK_TASK_ITEM_TYPE_COMPANY] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[COMPANY] ([Id])
GO
ALTER TABLE [dbo].[TASK_ITEM_TYPE] CHECK CONSTRAINT [FK_TASK_ITEM_TYPE_COMPANY]
GO
/****** Object:  StoredProcedure [dbo].[ApproveScheduleItem_SP]    Script Date: 8/19/2018 3:07:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ApproveScheduleItem_SP] 
	@loginId nvarchar(50),
	@password nvarchar(50),
	@id bigint
AS
BEGIN
	SET NOCOUNT ON;
	declare @roleId int;
	
    set @roleId = [dbo].AuthorizeUser_F(@loginId, @password);
	if @roleId > 0 and @roleId < 5 -- User is authorized and has role of Project Manager or above
		BEGIN TRY
			BEGIN TRANSACTION;
			update schedule_item
			set
			StatusId = 1,
			StatusUpdateDateTime = GETDATE(),
			ApprovedById = (select id from employee where LoginId = @loginId),
			ApprovalDateTime = GETDATE()
			where Id = @id;
			COMMIT TRANSACTION;			
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION;
			THROW;
		END CATCH		
END
GO
/****** Object:  StoredProcedure [dbo].[CreateScheduleItem_SP]    Script Date: 8/19/2018 3:07:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO










CREATE PROCEDURE [dbo].[CreateScheduleItem_SP] 
	@loginId nvarchar(50),
	@password nvarchar(50),
	@tvpScheduleItem [dbo].ScheduleItemTableType readonly,
	@tvpTasks [dbo].ScheduleItemParmTableType readonly,
	@tvpEquipment [dbo].ScheduleItemParmTableType readonly,
	@tvpOperators [dbo].ScheduleItemParmTableType readonly
AS
BEGIN
	SET NOCOUNT ON;
	declare @foundCount int = 0;
	declare @roleId int;
	
    set @roleId = [dbo].AuthorizeUser_F(@loginId, @password);
	if @roleId > 0 and @roleId < 5 -- User is authorized and has role of Project Manager or above
		BEGIN TRY
			-- Check for a conflicting PTO or Leave item before proceeding further
			select @foundCount = count(*)
			from schedule_item s, @tvpScheduleItem as si
			where
			s.EmployeeId = si.EmployeeId
			and
			(s.TypeId = 2 or s.TypeId = 3)
			and
			((si.StartDate <= s.StartDate and s.StartDate <= si.EndDate)
			or
			(si.StartDate <= s.EndDate and s.EndDate <= si.EndDate));
			if @foundCount > 0
				RAISERROR('CONFLICTING PTO OR LEAVE ITEM FOUND',16,1);
			else
				begin
					if @roleId < 4 -- User is a Branch Manager or above
						EXECUTE [dbo].CreateScheduleItemEX_SP @loginId,@password,@tvpScheduleItem,@tvpTasks,@tvpEquipment,@tvpOperators;
					else -- User is a Project Manager
						EXECUTE [dbo].CreateScheduleItemPM_SP @loginId,@password,@tvpScheduleItem,@tvpTasks,@tvpEquipment,@tvpOperators;
				end
		END TRY
		BEGIN CATCH
			THROW;
		END CATCH		
END
GO
/****** Object:  StoredProcedure [dbo].[CreateScheduleItemEX_SP]    Script Date: 8/19/2018 3:07:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateScheduleItemEX_SP]
(
	@loginId nvarchar(50),
	@password nvarchar(50),
	@tvpScheduleItem [dbo].ScheduleItemTableType readonly,
	@tvpTasks [dbo].ScheduleItemParmTableType readonly,
	@tvpEquipment [dbo].ScheduleItemParmTableType readonly,
	@tvpOperators [dbo].ScheduleItemParmTableType readonly
)
AS
BEGIN
	SET NOCOUNT ON;
	declare @roleId int;
	declare @typeId int;
	declare @timeOffProjectNumber nvarchar(5) = 'Leave';
	declare @newScheduleItem table (Id bigint);
	declare @statusId int = 1;
	declare @equipmentId int;
	declare @allocation int;
	declare @equipmentStatusId int = 1;
	declare @employeeId int;
	declare @operatorStatusId int = 1;
	declare equipmentCur CURSOR LOCAL FAST_FORWARD FOR
		select Id, Allocation from @tvpEquipment;
	declare operatorCur CURSOR LOCAL FAST_FORWARD FOR
		select Id, Allocation from @tvpOperators;

	set @roleId = [dbo].AuthorizeUser_F(@loginId, @password);
	if @roleId > 0 and @roleId < 4 -- User is authorized and has role of Branch Manager or above
		BEGIN TRY
			BEGIN TRANSACTION
			select @typeId = si.TypeId from @tvpScheduleItem as si;
			if @typeId > 1 -- Schedule Item is PTO or Leave
				begin
					if @typeId = 2 set @timeOffProjectNumber = 'PTO';
					-- Create new schedule item
					insert into schedule_item(TypeId, StatusId, StartDate, EndDate, ProjectManagerId, EmployeeId, EmployeeAllocation, ProjectNumber, ProjectName, AddressLine1, AddressLine2, City, State, Zip)
					output inserted.Id into @newScheduleItem
					select si.TypeId, @statusId, si.StartDate, si.EndDate, si.ProjectManagerId, si.EmployeeId, si.EmployeeAllocation, @timeOffProjectNumber, si.ProjectName, si.AddressLine1, si.AddressLine2, si.City, si.State, si.Zip from @tvpScheduleItem as si;					
				end
			else -- Schedule Item is a Job
				begin
					-- Create new schedule item with appropriate approved status
					insert into schedule_item(TypeId, StatusId, StartDate, EndDate, ProjectManagerId, EmployeeId, EmployeeAllocation, ProjectNumber, ProjectName, AddressLine1, AddressLine2, City, State, Zip)
					output inserted.Id into @newScheduleItem
					select si.TypeId, @statusId, si.StartDate, si.EndDate, si.ProjectManagerId, si.EmployeeId, si.EmployeeAllocation, si.ProjectNumber, si.ProjectName, si.AddressLine1, si.AddressLine2, si.City, si.State, si.Zip from @tvpScheduleItem as si;

					-- Create related tasks
					insert into schedule_item_task(ScheduleItemId, TaskItemTypeId)
					select nsi.Id, t.Id from @newScheduleItem as nsi, @tvpTasks as t;

					open equipmentCur
					while 1 = 1
					begin
						fetch next from equipmentCur into @equipmentId, @allocation;
						if @@FETCH_STATUS = -1 break;
						set @equipmentStatusId = 1;
						-- Create related equipment with appropriate status
						insert into schedule_item_equipment(ScheduleItemId, EquipmentId, Allocation, StatusId)
						select nsi.Id, @equipmentId, @allocation, @equipmentStatusId from @newScheduleItem as nsi;						
					end;
					close equipmentCur;
					deallocate equipmentCur;

					open operatorCur
					while 1 = 1
					begin
						fetch next from operatorCur into @employeeId, @allocation;
						if @@FETCH_STATUS = -1 break;
						set @operatorStatusId = 1;
						-- Create related employee with appropriate status
						insert into schedule_item_employee(ScheduleItemId, EmployeeId, Allocation, StatusId)
						select nsi.Id, @employeeId, @allocation, @operatorStatusId from @newScheduleItem as nsi;
					end;
					close operatorCur;
					deallocate operatorCur;
				end
			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION;
			THROW;
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[CreateScheduleItemPM_SP]    Script Date: 8/19/2018 3:07:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateScheduleItemPM_SP]
	@loginId nvarchar(50),
	@password nvarchar(50),
	@tvpScheduleItem [dbo].ScheduleItemTableType readonly,
	@tvpTasks [dbo].ScheduleItemParmTableType readonly,
	@tvpEquipment [dbo].ScheduleItemParmTableType readonly,
	@tvpOperators [dbo].ScheduleItemParmTableType readonly
AS
	SET NOCOUNT ON;
	declare @foundCount int = 0;
	declare @roleId int;
	declare @typeId int;
	declare @statusId int = 1;
	declare @affectedProjectManagerId int = 0;
	declare @scheduleItemTypeId int;
	declare @newScheduleItem table (Id bigint);
	declare @equipmentId int;
	declare @allocation int;
	declare @equipmentStatusId int = 1;
	declare @resourceConflictFound nvarchar(5) = 'FALSE';
	declare @employeeId int;
	declare @operatorStatusId int = 1;
	declare @branchManagerId int;
	declare equipmentCur CURSOR LOCAL FAST_FORWARD FOR
		select Id, Allocation from @tvpEquipment;
	declare operatorCur CURSOR LOCAL FAST_FORWARD FOR
		select Id, Allocation from @tvpOperators;

	set @roleId = [dbo].AuthorizeUser_F(@loginId, @password);
	if @roleId = 4
		BEGIN TRY
			BEGIN TRANSACTION
			select @typeId = si.TypeId from @tvpScheduleItem as si;
			if @typeId = 1 -- Schedule Item is JOB
				begin
					-- Check for conflict with crew chief
					select @foundCount = count(*)
					from schedule_item s, @tvpScheduleItem as si
					where
					s.EmployeeId = si.EmployeeId
					and
					s.ProjectManagerId != si.ProjectManagerId
					and
					((s.StartDate BETWEEN si.StartDate AND si.EndDate) or (s.EndDate BETWEEN si.StartDate AND si.EndDate))
					and
					(s.EmployeeAllocation + si.EmployeeAllocation) > 12;
					
					if @foundCount > 0 
						begin
							set @statusId = 2;
							-- Must get AffectedProjectManagerId for the most recent Schedule Item in conflict with this one
							select @affectedProjectManagerId = s.ProjectManagerId, @scheduleItemTypeId = s.TypeId
							from schedule_item s, @tvpScheduleItem as si
							where
							s.EmployeeId = si.EmployeeId
							and
							s.ProjectManagerId != si.ProjectManagerId
							and
							((s.StartDate BETWEEN si.StartDate AND si.EndDate) or (s.EndDate BETWEEN si.StartDate AND si.EndDate))
							and
							(s.EmployeeAllocation + si.EmployeeAllocation) > 12
							and
							StatusUpdateDateTime = (select max(StatusUpdateDateTime)
													from schedule_item s, @tvpScheduleItem as si
													where
													s.EmployeeId = si.EmployeeId
													and
													s.ProjectManagerId != si.ProjectManagerId
													and
													((s.StartDate BETWEEN si.StartDate AND si.EndDate) or (s.EndDate BETWEEN si.StartDate AND si.EndDate))
													and
													(s.EmployeeAllocation + si.EmployeeAllocation) > 12);
							-- Create new schedule item with pending status and AffectedProjectManagerId
							insert into schedule_item(TypeId, StatusId, StartDate, EndDate, ProjectManagerId, AffectedProjectManagerId, EmployeeId, EmployeeAllocation, ProjectNumber, ProjectName, AddressLine1, AddressLine2, City, State, Zip, EmployeeStatusId)
							output inserted.Id into @newScheduleItem
							select si.TypeId, @statusId, si.StartDate, si.EndDate, si.ProjectManagerId, @affectedProjectManagerId, si.EmployeeId, si.EmployeeAllocation, si.ProjectNumber, si.ProjectName, si.AddressLine1, si.AddressLine2, si.City, si.State, si.Zip, @statusId from @tvpScheduleItem as si;
						end
					else
						begin
							-- Create new schedule item with appropriate approved status
							insert into schedule_item(TypeId, StatusId, StartDate, EndDate, ProjectManagerId, EmployeeId, EmployeeAllocation, ProjectNumber, ProjectName, AddressLine1, AddressLine2, City, State, Zip, EmployeeStatusId)
							output inserted.Id into @newScheduleItem
							select si.TypeId, @statusId, si.StartDate, si.EndDate, si.ProjectManagerId, si.EmployeeId, si.EmployeeAllocation, si.ProjectNumber, si.ProjectName, si.AddressLine1, si.AddressLine2, si.City, si.State, si.Zip, @statusId from @tvpScheduleItem as si;											
						end

					-- Create related tasks
					insert into schedule_item_task(ScheduleItemId, TaskItemTypeId)
					select nsi.Id, t.Id from @newScheduleItem as nsi, @tvpTasks as t;					

					-- Check for conflict with each piece of equipment
					open equipmentCur
					while 1 = 1
					begin
						fetch next from equipmentCur into @equipmentId, @allocation;
						if @@FETCH_STATUS = -1 break;
						select @foundCount = count(*)
						from schedule_item s, @tvpScheduleItem as si, schedule_item_equipment as sie
						where
						((s.StartDate BETWEEN si.StartDate AND si.EndDate) or (s.EndDate BETWEEN si.StartDate AND si.EndDate))
						and
						s.id = sie.ScheduleItemId
						and
						sie.EquipmentId = @equipmentId
						and
						(sie.Allocation + @allocation) > 12
						and
						s.ProjectManagerId != si.ProjectManagerId;
						if @foundCount > 0 
							begin
								set @equipmentStatusId = 2;
								set @resourceConflictFound = 'TRUE';
							end
						else
							set @equipmentStatusId = 1;
						-- Create related equipment with appropriate status
						insert into schedule_item_equipment(ScheduleItemId, EquipmentId, Allocation, StatusId)
						select nsi.Id, @equipmentId, @allocation, @equipmentStatusId from @newScheduleItem as nsi;						
					end;
					close equipmentCur;
					deallocate equipmentCur;

					-- Check for conflict with each operator
					open operatorCur
					while 1 = 1
					begin
						fetch next from operatorCur into @employeeId, @allocation;
						if @@FETCH_STATUS = -1 break;
						select @foundCount = count(*)
						from schedule_item s, @tvpScheduleItem as si, schedule_item_employee as sie
						where
						((s.StartDate BETWEEN si.StartDate AND si.EndDate) or (s.EndDate BETWEEN si.StartDate AND si.EndDate))
						and
						s.id = sie.ScheduleItemId
						and
						sie.EmployeeId = @employeeId
						and
						(sie.Allocation + @allocation) > 12
						and
						s.ProjectManagerId != si.ProjectManagerId;
						if @foundCount > 0 
							begin
								set @operatorStatusId = 2;
								set @resourceConflictFound = 'TRUE';
							end
						else
							set @operatorStatusId = 1;
						-- Create related employee with appropriate status
						insert into schedule_item_employee(ScheduleItemId, EmployeeId, Allocation, StatusId)
						select nsi.Id, @employeeId, @allocation, @operatorStatusId from @newScheduleItem as nsi;
					end;
					close operatorCur;
					deallocate operatorCur;
					
					-- Update the status of the parent schedule item if one of its resources has a conflict					
					if @resourceConflictFound = 'TRUE'
						begin
							-- Get BranchManagerId
							select @branchManagerId = Id
							from employee
							where 
							RoleId = 3
							and
							BranchId = (select BranchId from employee where Id = (select si.ProjectManagerId from @tvpScheduleItem as si));

							update schedule_item
							set 
							StatusId = 2,
							ResourceStatusId = 2,
							AffectedProjectManagerId = @branchManagerId
							where id = (select nsi.Id from @newScheduleItem as nsi);
						end
				end
			COMMIT TRANSACTION
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION
			THROW;
		END CATCH
GO
/****** Object:  StoredProcedure [dbo].[DeleteScheduleItem_SP]    Script Date: 8/19/2018 3:07:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteScheduleItem_SP] 
	@loginId nvarchar(50),
	@password nvarchar(50),
	@id bigint
AS
BEGIN
	SET NOCOUNT ON;
	declare @roleId int;
	
    set @roleId = [dbo].AuthorizeUser_F(@loginId, @password);
	if @roleId > 0 and @roleId < 5 -- User is authorized and has role of Project Manager or above
		BEGIN TRY
			BEGIN TRANSACTION;
			delete from schedule_item_employee where ScheduleItemId = @id;
			delete from schedule_item_equipment where ScheduleItemId = @id;
			delete from schedule_item_task where ScheduleItemId = @id;
			delete from schedule_item where Id = @id;
			COMMIT TRANSACTION;			
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION;
			THROW;
		END CATCH		
END
GO
/****** Object:  StoredProcedure [dbo].[GetEmployees_SP]    Script Date: 8/19/2018 3:07:34 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetEquipment_SP]    Script Date: 8/19/2018 3:07:34 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetReferenceData_SP]    Script Date: 8/19/2018 3:07:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetReferenceData_SP]
	@loginId nvarchar(50),
	@password nvarchar(50),
	@startDate nvarchar(10),
	@endDate nvarchar(10),
	@branchIdIn int
AS
BEGIN
	SET NOCOUNT ON;
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

			-- Get list of Task Item Types for Application User's primary Company
			select * from task_item_type where CompanyId = @companyId;

			-- Get list of Equipment for the Branch
			select * from equipment where BranchId = @branchId;

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
/****** Object:  StoredProcedure [dbo].[GetTasks_SP]    Script Date: 8/19/2018 3:07:34 PM ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateScheduleItem_SP]    Script Date: 8/19/2018 3:07:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateScheduleItem_SP] 
	@loginId nvarchar(50),
	@password nvarchar(50),
	@tvpScheduleItem [dbo].ScheduleItemTableType readonly,
	@tvpTasks [dbo].ScheduleItemParmTableType readonly,
	@tvpEquipment [dbo].ScheduleItemParmTableType readonly,
	@tvpOperators [dbo].ScheduleItemParmTableType readonly
AS
BEGIN
	SET NOCOUNT ON;
	declare @foundCount int = 0;
	declare @roleId int;
	
    set @roleId = [dbo].AuthorizeUser_F(@loginId, @password);
	if @roleId > 0 and @roleId < 5 -- User is authorized and has role of Project Manager or above
		BEGIN TRY
			-- Check for a conflicting PTO or Leave item before proceeding further
			select @foundCount = count(*)
			from schedule_item s, @tvpScheduleItem as si
			where
			s.EmployeeId = si.EmployeeId
			and
			(s.TypeId = 2 or s.TypeId = 3)
			and
			((si.StartDate <= s.StartDate and s.StartDate <= si.EndDate)
			or
			(si.StartDate <= s.EndDate and s.EndDate <= si.EndDate));
			if @foundCount > 0
				RAISERROR('CONFLICTING PTO OR LEAVE ITEM FOUND',16,1);
			else
				begin
					if @roleId < 4 -- User is a Branch Manager or above
						EXECUTE [dbo].UpdateScheduleItemEX_SP @loginId,@password,@tvpScheduleItem,@tvpTasks,@tvpEquipment,@tvpOperators;
					else -- User is a Project Manager
						EXECUTE [dbo].UpdateScheduleItemPM_SP @loginId,@password,@tvpScheduleItem,@tvpTasks,@tvpEquipment,@tvpOperators;
				end
		END TRY
		BEGIN CATCH
			THROW;
		END CATCH		
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateScheduleItemEX_SP]    Script Date: 8/19/2018 3:07:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateScheduleItemEX_SP]
(
	@loginId nvarchar(50),
	@password nvarchar(50),
	@tvpScheduleItem [dbo].ScheduleItemTableType readonly,
	@tvpTasks [dbo].ScheduleItemParmTableType readonly,
	@tvpEquipment [dbo].ScheduleItemParmTableType readonly,
	@tvpOperators [dbo].ScheduleItemParmTableType readonly
)
AS
BEGIN
	SET NOCOUNT ON;
	declare @roleId int;
	declare @typeId int;
	declare @timeOffProjectNumber nvarchar(5) = 'Leave';
	declare @newScheduleItem table (Id bigint);
	declare @statusId int = 1;
	declare @equipmentId int;
	declare @allocation int;
	declare @equipmentStatusId int = 1;
	declare @employeeId int;
	declare @operatorStatusId int = 1;
	declare equipmentCur CURSOR LOCAL FAST_FORWARD FOR
		select Id, Allocation from @tvpEquipment;
	declare operatorCur CURSOR LOCAL FAST_FORWARD FOR
		select Id, Allocation from @tvpOperators;

	set @roleId = [dbo].AuthorizeUser_F(@loginId, @password);
	if @roleId > 0 and @roleId < 4 -- User is authorized and has role of Branch Manager or above
		BEGIN TRY
			BEGIN TRANSACTION
			select @typeId = si.TypeId from @tvpScheduleItem as si;
			if @typeId > 1 -- Schedule Item is PTO or Leave
				begin
					if @typeId = 2 set @timeOffProjectNumber = 'PTO';
					-- Update schedule item
					update schedule_item
					set
					TypeId = (select TypeId from @tvpScheduleItem),
					StatusId = 1,
					StatusUpdateDateTime = GETDATE(),
					StartDate = (select StartDate from @tvpScheduleItem),
					EndDate = (select EndDate from @tvpScheduleItem),
					ProjectManagerId = (select ProjectManagerId from @tvpScheduleItem),
					EmployeeId = (select EmployeeId from @tvpScheduleItem),
					EmployeeAllocation = (select EmployeeAllocation from @tvpScheduleItem),
					ProjectNumber = @timeOffProjectNumber,
					ProjectName = (select ProjectName from @tvpScheduleItem),
					AddressLine1 = (select AddressLine1 from @tvpScheduleItem),
					AddressLine2 = (select AddressLine2 from @tvpScheduleItem),
					City = (select City from @tvpScheduleItem),
					State = (select State from @tvpScheduleItem),
					Zip = (select Zip from @tvpScheduleItem),
					EmployeeStatusId = 1,
					ResourceStatusId = 1,
					ApprovedById = null,
					ApprovalDateTime = null
					where
					Id = (select Id from @tvpScheduleItem);
				end
			else -- Schedule Item is a Job
				begin
					-- Update schedule item
					update schedule_item
					set
					TypeId = (select TypeId from @tvpScheduleItem),
					StatusId = 1,
					StatusUpdateDateTime = GETDATE(),
					StartDate = (select StartDate from @tvpScheduleItem),
					EndDate = (select EndDate from @tvpScheduleItem),
					ProjectManagerId = (select ProjectManagerId from @tvpScheduleItem),
					AffectedProjectManagerId = null,
					EmployeeId = (select EmployeeId from @tvpScheduleItem),
					EmployeeAllocation = (select EmployeeAllocation from @tvpScheduleItem),
					ProjectNumber = (select ProjectNumber from @tvpScheduleItem),
					ProjectName = (select ProjectName from @tvpScheduleItem),
					AddressLine1 = (select AddressLine1 from @tvpScheduleItem),
					AddressLine2 = (select AddressLine2 from @tvpScheduleItem),
					City = (select City from @tvpScheduleItem),
					State = (select State from @tvpScheduleItem),
					Zip = (select Zip from @tvpScheduleItem),
					EmployeeStatusId = 1,
					ResourceStatusId = 1,
					ApprovedById = null,
					ApprovalDateTime = null
					where 
					Id = (select Id from @tvpScheduleItem);

					-- Delete existing related tasks
					delete from schedule_item_task where ScheduleItemId = (select Id from @tvpScheduleItem);

					-- Create related tasks
					insert into schedule_item_task(ScheduleItemId, TaskItemTypeId)
					select nsi.Id, t.Id from @tvpScheduleItem as nsi, @tvpTasks as t;

					-- Delete existing related equipment
					delete from schedule_item_equipment where ScheduleItemId = (select Id from @tvpScheduleItem);
					open equipmentCur
					while 1 = 1
					begin
						fetch next from equipmentCur into @equipmentId, @allocation;
						if @@FETCH_STATUS = -1 break;
						set @equipmentStatusId = 1;
						-- Create related equipment with appropriate status
						insert into schedule_item_equipment(ScheduleItemId, EquipmentId, Allocation, StatusId)
						select nsi.Id, @equipmentId, @allocation, @equipmentStatusId from @tvpScheduleItem as nsi;						
					end;
					close equipmentCur;
					deallocate equipmentCur;

					-- Delete existing related employees
					delete from schedule_item_employee where ScheduleItemId = (select Id from @tvpScheduleItem);
					open operatorCur
					while 1 = 1
					begin
						fetch next from operatorCur into @employeeId, @allocation;
						if @@FETCH_STATUS = -1 break;
						set @operatorStatusId = 1;
						-- Create related employee with appropriate status
						insert into schedule_item_employee(ScheduleItemId, EmployeeId, Allocation, StatusId)
						select nsi.Id, @employeeId, @allocation, @operatorStatusId from @tvpScheduleItem as nsi;
					end;
					close operatorCur;
					deallocate operatorCur;
				end
			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION;
			THROW;
		END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateScheduleItemPM_SP]    Script Date: 8/19/2018 3:07:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateScheduleItemPM_SP]
	@loginId nvarchar(50),
	@password nvarchar(50),
	@tvpScheduleItem [dbo].ScheduleItemTableType readonly,
	@tvpTasks [dbo].ScheduleItemParmTableType readonly,
	@tvpEquipment [dbo].ScheduleItemParmTableType readonly,
	@tvpOperators [dbo].ScheduleItemParmTableType readonly
AS
	SET NOCOUNT ON;
	declare @foundCount int = 0;
	declare @roleId int;
	declare @typeId int;
	declare @statusId int = 1;
	declare @affectedProjectManagerId int = 0;
	declare @scheduleItemTypeId int;
	declare @equipmentId int;
	declare @allocation int;
	declare @equipmentStatusId int = 1;
	declare @resourceConflictFound nvarchar(5) = 'FALSE';
	declare @employeeId int;
	declare @operatorStatusId int = 1;
	declare @branchManagerId int;
	declare equipmentCur CURSOR LOCAL FAST_FORWARD FOR
		select Id, Allocation from @tvpEquipment;
	declare operatorCur CURSOR LOCAL FAST_FORWARD FOR
		select Id, Allocation from @tvpOperators;

	set @roleId = [dbo].AuthorizeUser_F(@loginId, @password);
	if @roleId = 4
		BEGIN TRY
			BEGIN TRANSACTION
			select @typeId = si.TypeId from @tvpScheduleItem as si;
			if @typeId = 1 -- Schedule Item is JOB
				begin
					-- Check for conflict with crew chief
					select @foundCount = count(*)
					from schedule_item s, @tvpScheduleItem as si
					where
					s.EmployeeId = si.EmployeeId
					and
					s.ProjectManagerId != si.ProjectManagerId
					and
					((s.StartDate BETWEEN si.StartDate AND si.EndDate) or (s.EndDate BETWEEN si.StartDate AND si.EndDate))
					and
					(s.EmployeeAllocation + si.EmployeeAllocation) > 12;
					
					if @foundCount > 0 
						begin
							set @statusId = 2;
							-- Must get AffectedProjectManagerId for the most recent Schedule Item in conflict with this one
							select @affectedProjectManagerId = s.ProjectManagerId, @scheduleItemTypeId = s.TypeId
							from schedule_item s, @tvpScheduleItem as si
							where
							s.EmployeeId = si.EmployeeId
							and
							s.ProjectManagerId != si.ProjectManagerId
							and
							((s.StartDate BETWEEN si.StartDate AND si.EndDate) or (s.EndDate BETWEEN si.StartDate AND si.EndDate))
							and
							(s.EmployeeAllocation + si.EmployeeAllocation) > 12
							and
							StatusUpdateDateTime = (select max(StatusUpdateDateTime)
													from schedule_item s, @tvpScheduleItem as si
													where
													s.EmployeeId = si.EmployeeId
													and
													s.ProjectManagerId != si.ProjectManagerId
													and
													((s.StartDate BETWEEN si.StartDate AND si.EndDate) or (s.EndDate BETWEEN si.StartDate AND si.EndDate))
													and
													(s.EmployeeAllocation + si.EmployeeAllocation) > 12);
							-- Update schedule item with pending status and AffectedProjectManagerId
							update schedule_item
							set
							TypeId = (select TypeId from @tvpScheduleItem),
							StatusId = @statusId,
							StatusUpdateDateTime = GETDATE(),
							StartDate = (select StartDate from @tvpScheduleItem),
							EndDate = (select EndDate from @tvpScheduleItem),
							ProjectManagerId = (select ProjectManagerId from @tvpScheduleItem),
							AffectedProjectManagerId = @affectedProjectManagerId,
							EmployeeId = (select EmployeeId from @tvpScheduleItem),
							EmployeeAllocation = (select EmployeeAllocation from @tvpScheduleItem),
							ProjectNumber = (select ProjectNumber from @tvpScheduleItem),
							ProjectName = (select ProjectName from @tvpScheduleItem),
							AddressLine1 = (select AddressLine1 from @tvpScheduleItem),
							AddressLine2 = (select AddressLine2 from @tvpScheduleItem),
							City = (select City from @tvpScheduleItem),
							State = (select State from @tvpScheduleItem),
							Zip = (select Zip from @tvpScheduleItem),
							EmployeeStatusId = @statusId,
							ResourceStatusId = 1,
							ApprovedById = null,
							ApprovalDateTime = null
							where 
							Id = (select Id from @tvpScheduleItem);
						end
					else
						begin
							-- Update schedule item with appropriate approved status
							update schedule_item
							set
							TypeId = (select TypeId from @tvpScheduleItem),
							StatusId = @statusId,
							StatusUpdateDateTime = GETDATE(),
							StartDate = (select StartDate from @tvpScheduleItem),
							EndDate = (select EndDate from @tvpScheduleItem),
							ProjectManagerId = (select ProjectManagerId from @tvpScheduleItem),
							AffectedProjectManagerId = null,
							EmployeeId = (select EmployeeId from @tvpScheduleItem),
							EmployeeAllocation = (select EmployeeAllocation from @tvpScheduleItem),
							ProjectNumber = (select ProjectNumber from @tvpScheduleItem),
							ProjectName = (select ProjectName from @tvpScheduleItem),
							AddressLine1 = (select AddressLine1 from @tvpScheduleItem),
							AddressLine2 = (select AddressLine2 from @tvpScheduleItem),
							City = (select City from @tvpScheduleItem),
							State = (select State from @tvpScheduleItem),
							Zip = (select Zip from @tvpScheduleItem),
							EmployeeStatusId = @statusId,
							ResourceStatusId = 1,
							ApprovedById = null,
							ApprovalDateTime = null
							where 
							Id = (select Id from @tvpScheduleItem);											
						end

					-- Delete existing related tasks
					delete from schedule_item_task where ScheduleItemId = (select Id from @tvpScheduleItem);

					-- Create related tasks
					insert into schedule_item_task(ScheduleItemId, TaskItemTypeId)
					select nsi.Id, t.Id from @tvpScheduleItem as nsi, @tvpTasks as t;					

					-- Delete existing related equipment
					delete from schedule_item_equipment where ScheduleItemId = (select Id from @tvpScheduleItem);

					-- Check for conflict with each piece of equipment
					open equipmentCur
					while 1 = 1
					begin
						fetch next from equipmentCur into @equipmentId, @allocation;
						if @@FETCH_STATUS = -1 break;
						select @foundCount = count(*)
						from schedule_item s, @tvpScheduleItem as si, schedule_item_equipment as sie
						where
						((s.StartDate BETWEEN si.StartDate AND si.EndDate) or (s.EndDate BETWEEN si.StartDate AND si.EndDate))
						and
						s.id = sie.ScheduleItemId
						and
						sie.EquipmentId = @equipmentId
						and
						(sie.Allocation + @allocation) > 12
						and
						s.ProjectManagerId != si.ProjectManagerId;
						if @foundCount > 0 
							begin
								set @equipmentStatusId = 2;
								set @resourceConflictFound = 'TRUE';
							end
						else
							set @equipmentStatusId = 1;
						-- Create related equipment with appropriate status
						insert into schedule_item_equipment(ScheduleItemId, EquipmentId, Allocation, StatusId)
						select nsi.Id, @equipmentId, @allocation, @equipmentStatusId from @tvpScheduleItem as nsi;						
					end;
					close equipmentCur;
					deallocate equipmentCur;

					-- Delete existing related employees
					delete from schedule_item_employee where ScheduleItemId = (select Id from @tvpScheduleItem);

					-- Check for conflict with each operator
					open operatorCur
					while 1 = 1
					begin
						fetch next from operatorCur into @employeeId, @allocation;
						if @@FETCH_STATUS = -1 break;
						select @foundCount = count(*)
						from schedule_item s, @tvpScheduleItem as si, schedule_item_employee as sie
						where
						((s.StartDate BETWEEN si.StartDate AND si.EndDate) or (s.EndDate BETWEEN si.StartDate AND si.EndDate))
						and
						s.id = sie.ScheduleItemId
						and
						sie.EmployeeId = @employeeId
						and
						(sie.Allocation + @allocation) > 12
						and
						s.ProjectManagerId != si.ProjectManagerId;
						if @foundCount > 0 
							begin
								set @operatorStatusId = 2;
								set @resourceConflictFound = 'TRUE';
							end
						else
							set @operatorStatusId = 1;
						-- Create related employee with appropriate status
						insert into schedule_item_employee(ScheduleItemId, EmployeeId, Allocation, StatusId)
						select nsi.Id, @employeeId, @allocation, @operatorStatusId from @tvpScheduleItem as nsi;
					end;
					close operatorCur;
					deallocate operatorCur;
					
					-- Update the status of the parent schedule item if one of its resources has a conflict					
					if @resourceConflictFound = 'TRUE'
						begin
							-- Get BranchManagerId
							select @branchManagerId = Id
							from employee
							where 
							RoleId = 3
							and
							BranchId = (select BranchId from employee where Id = (select si.ProjectManagerId from @tvpScheduleItem as si));

							update schedule_item
							set 
							StatusId = 2,
							StatusUpdateDateTime = GETDATE(),
							ResourceStatusId = 2,
							AffectedProjectManagerId = @branchManagerId
							where id = (select nsi.Id from @tvpScheduleItem as nsi);
						end
				end
			COMMIT TRANSACTION
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION
			THROW;
		END CATCH
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
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
         Begin Table = "EMPLOYEE_VW"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'CREW_CHIEF_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'CREW_CHIEF_VW'
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
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
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
         Begin Table = "EMPLOYEE_VW"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'EXECUTIVE_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'EXECUTIVE_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
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
         Begin Table = "EMPLOYEE_VW"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'INSTRUMENT_OPERATOR_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'INSTRUMENT_OPERATOR_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
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
         Begin Table = "EMPLOYEE_VW"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'PROJECT_MANAGER_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'PROJECT_MANAGER_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
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
               Right = 209
            End
            DisplayFlags = 280
            TopColumn = 1
         End
         Begin Table = "b"
            Begin Extent = 
               Top = 6
               Left = 247
               Bottom = 136
               Right = 420
            End
            DisplayFlags = 280
            TopColumn = 8
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'SCHEDULE_ITEM_EMPLOYEE_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'SCHEDULE_ITEM_EMPLOYEE_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
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
               Bottom = 202
               Right = 209
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "b"
            Begin Extent = 
               Top = 6
               Left = 247
               Bottom = 205
               Right = 430
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'SCHEDULE_ITEM_EQUIPMENT_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'SCHEDULE_ITEM_EQUIPMENT_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
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
               Bottom = 119
               Right = 211
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "b"
            Begin Extent = 
               Top = 6
               Left = 249
               Bottom = 119
               Right = 419
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'SCHEDULE_ITEM_TASK_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'SCHEDULE_ITEM_TASK_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[41] 4[13] 2[29] 3) )"
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
            TopColumn = 18
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
            TopColumn = 11
         End
         Begin Table = "e"
            Begin Extent = 
               Top = 234
               Left = 249
               Bottom = 364
               Right = 422
            End
            DisplayFlags = 280
            TopColumn = 11
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
         Width ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'SCHEDULE_ITEM_VW'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'= 1500
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
