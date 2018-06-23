USE [crewschedule1]
GO
SET IDENTITY_INSERT [dbo].[COMPANY] ON 

INSERT [dbo].[COMPANY] ([Id], [Name]) VALUES (1, N'Control Point')
SET IDENTITY_INSERT [dbo].[COMPANY] OFF
SET IDENTITY_INSERT [dbo].[BRANCH] ON 

INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name]) VALUES (1, 1, N'Warren, NJ (HQ)')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name]) VALUES (2, 1, N'Mt. Laurel, NJ')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name]) VALUES (3, 1, N'Chalfont, PA')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name]) VALUES (4, 1, N'Manhattan, NY')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name]) VALUES (5, 1, N'Hauppauge, NY')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name]) VALUES (6, 1, N'Albany, NY')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name]) VALUES (7, 1, N'Boston, MA')
INSERT [dbo].[BRANCH] ([Id], [CompanyId], [Name]) VALUES (8, 1, N'Southborough, MA')
SET IDENTITY_INSERT [dbo].[BRANCH] OFF
SET IDENTITY_INSERT [dbo].[ROLE] ON 

INSERT [dbo].[ROLE] ([Id], [Name]) VALUES (1, N'System Administrator')
INSERT [dbo].[ROLE] ([Id], [Name]) VALUES (2, N'Company Administrator')
INSERT [dbo].[ROLE] ([Id], [Name]) VALUES (3, N'Branch Manager')
INSERT [dbo].[ROLE] ([Id], [Name]) VALUES (4, N'Project Manager')
INSERT [dbo].[ROLE] ([Id], [Name]) VALUES (5, N'Crew Chief')
INSERT [dbo].[ROLE] ([Id], [Name]) VALUES (6, N'Instrument Operator')
SET IDENTITY_INSERT [dbo].[ROLE] OFF
SET IDENTITY_INSERT [dbo].[EMPLOYEE_STATUS] ON 

INSERT [dbo].[EMPLOYEE_STATUS] ([Id], [Name]) VALUES (1, N'Active Full-Time')
INSERT [dbo].[EMPLOYEE_STATUS] ([Id], [Name]) VALUES (2, N'Inactive')
INSERT [dbo].[EMPLOYEE_STATUS] ([Id], [Name]) VALUES (3, N'Active Part-Time')
SET IDENTITY_INSERT [dbo].[EMPLOYEE_STATUS] OFF
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
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM_STATUS] ON 

INSERT [dbo].[SCHEDULE_ITEM_STATUS] ([Id], [Name]) VALUES (1, N'Approved')
INSERT [dbo].[SCHEDULE_ITEM_STATUS] ([Id], [Name]) VALUES (2, N'Pending')
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM_STATUS] OFF
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM_TYPE] ON 

INSERT [dbo].[SCHEDULE_ITEM_TYPE] ([Id], [Name]) VALUES (1, N'Job')
INSERT [dbo].[SCHEDULE_ITEM_TYPE] ([Id], [Name]) VALUES (2, N'PTO')
INSERT [dbo].[SCHEDULE_ITEM_TYPE] ([Id], [Name]) VALUES (3, N'Leave')
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM_TYPE] OFF
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM] ON 

INSERT [dbo].[SCHEDULE_ITEM] ([Id], [TypeId], [StatusId], [StartDate], [EndDate], [CreationDateTime], [StatusUpdateDateTime], [ProjectManagerId], [AffectedProjectManagerId], [EmployeeId], [EmployeeAllocation], [ProjectNumber], [ProjectName], [AddressLine1], [AddressLine2], [City], [State], [Zip]) VALUES (1, 1, 1, CAST(N'2018-06-25' AS Date), CAST(N'2018-06-25' AS Date), CAST(N'2018-06-12T16:21:15.683' AS DateTime), CAST(N'2018-06-12T16:21:15.683' AS DateTime), 9, NULL, 14, 12, N'01-060189-03', N'Hunts Point', N'161 Ford Center Rd', N'', N'Bronx', N'NY', N'19102')
INSERT [dbo].[SCHEDULE_ITEM] ([Id], [TypeId], [StatusId], [StartDate], [EndDate], [CreationDateTime], [StatusUpdateDateTime], [ProjectManagerId], [AffectedProjectManagerId], [EmployeeId], [EmployeeAllocation], [ProjectNumber], [ProjectName], [AddressLine1], [AddressLine2], [City], [State], [Zip]) VALUES (2, 2, 1, CAST(N'2018-06-26' AS Date), CAST(N'2018-06-29' AS Date), CAST(N'2018-06-20T10:02:22.573' AS DateTime), CAST(N'2018-06-20T10:02:22.573' AS DateTime), 7, NULL, 11, 32, N'PTO', N'PTO', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[SCHEDULE_ITEM] ([Id], [TypeId], [StatusId], [StartDate], [EndDate], [CreationDateTime], [StatusUpdateDateTime], [ProjectManagerId], [AffectedProjectManagerId], [EmployeeId], [EmployeeAllocation], [ProjectNumber], [ProjectName], [AddressLine1], [AddressLine2], [City], [State], [Zip]) VALUES (3, 3, 1, CAST(N'2018-06-25' AS Date), CAST(N'2018-07-06' AS Date), CAST(N'2018-06-20T10:07:12.600' AS DateTime), CAST(N'2018-06-20T10:07:12.600' AS DateTime), 7, NULL, 19, 80, N'LEAVE', N'LEAVE', NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM] OFF
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
SET IDENTITY_INSERT [dbo].[EQUIPMENT_TYPE] ON 

INSERT [dbo].[EQUIPMENT_TYPE] ([Id], [Name]) VALUES (1, N'GPS Collector')
INSERT [dbo].[EQUIPMENT_TYPE] ([Id], [Name]) VALUES (2, N'Laser Scanner')
SET IDENTITY_INSERT [dbo].[EQUIPMENT_TYPE] OFF
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
SET IDENTITY_INSERT [dbo].[TASK_ITEM_TYPE] ON 

INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [Name]) VALUES (1, N'Boundary Survey')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [Name]) VALUES (2, N'Topographical Survey')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [Name]) VALUES (3, N'ALTA Survey')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [Name]) VALUES (4, N'Building Monitoring')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [Name]) VALUES (5, N'3-D Scanning')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [Name]) VALUES (6, N'Builder Pavement Plan')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [Name]) VALUES (7, N'Property Corners')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [Name]) VALUES (8, N'Construction Stakeout')
INSERT [dbo].[TASK_ITEM_TYPE] ([Id], [Name]) VALUES (9, N'Other')
SET IDENTITY_INSERT [dbo].[TASK_ITEM_TYPE] OFF
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM_TASK] ON 

INSERT [dbo].[SCHEDULE_ITEM_TASK] ([Id], [ScheduleItemId], [TaskItemTypeId]) VALUES (1, 1, 7)
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM_TASK] OFF
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM_EQUIPMENT] ON 

INSERT [dbo].[SCHEDULE_ITEM_EQUIPMENT] ([Id], [ScheduleItemId], [EquipmentId], [Allocation]) VALUES (1, 1, 4, 12)
SET IDENTITY_INSERT [dbo].[SCHEDULE_ITEM_EQUIPMENT] OFF
