export class StaticData {
    static get bootstrapData() {
        let retval = new Object();
        let branches = [
            {
                "id": "1",
                "name": "Warren, NJ"
            },
            {
                "id": "2",
                "name": "Mt. Laurel, NJ"
            },
            {
                "id": "3",
                "name": "Chalfont, PA"
            },
            {
                "id": "4",
                "name": "Manhattan, NY"
            },
            {
                "id": "5",
                "name": "Hauppauge, NY"
            },
            {
                "id": "6",
                "name": "Albany, NY"
            },
            {
                "id": "7",
                "name": "Boston, MA"
            },
            {
                "id": "8",
                "name": "Southborough, MA"
            },
        ];

        let companies = [
            {
                "id": "1",
                "name": "Control Point"
            }
        ];
        companies[0].branches = branches;
        retval.companies = companies;

        let users = [
            {
                "id": "1",
                "userId": "mpweed",
                "password": "Eaw1eaw",
                "name": "Mike Weed",
                "jobTitle": "System Administrator",
                "role": "System Administrator",
                "zoomLevel": "1",
                "companies": retval.companies
            },
            {
                "id": "2",
                "userId": "jcweed",
                "password": "j@m3z666",
                "name": "Jim Weed",
                "jobTitle": "Sr. Vice President / Principal",
                "role": "System Administrator",
                "zoomLevel": "1",
                "companies": retval.companies
            },
            {
                "id": "3",
                "userId": "apweed",
                "password": "dr3wd0g666",
                "name": "Andy Weed",
                "jobTitle": "Project Manager",
                "role": "Project Manager",
                "zoomLevel": "1",
                "companies": retval.companies
            }
        ];
        retval.users = users;
        retval.applicationUser = users[0];

        let projectManagers = [
            {
                "id": "3",
                "userId": "apweed",
                "password": "dr3wd0g666",
                "name": "Andy Weed",
                "color": "#29b6f6", /* Light Blue */
                "jobTitle": "Project Manager",
                "role": "Project Manager",
                "zoomLevel": "1",
                "companies": retval.companies
            },
            {
                "id": "4",
                "userId": "jsens",
                "password": "W3lc0m31",
                "name": "Jim Sens",
                "color": "#ef9a9a", /* Light Red */
                "jobTitle": "Branch Manager",
                "role": "Branch Manager",
                "zoomLevel": "1",
                "companies": retval.companies
            },
            {
                "id": "5",
                "userId": "gsawulski",
                "password": "W3lc0m31",
                "name": "Greg Sawulski",
                "color": "#fff59d", /* Light Yellow */
                "jobTitle": "Sr. Project Manager",
                "role": "Project Manager",
                "zoomLevel": "1",
                "companies": retval.companies
            },
            {
                "id": "6",
                "userId": "gphillippi",
                "password": "W3lc0m31",
                "name": "George Phillippi",
                "color": "#b0bec5", /* Light Blue-Grey */
                "jobTitle": "Project Manager",
                "role": "Project Manager",
                "zoomLevel": "1",
                "companies": retval.companies
            }
        ];
        retval.projectManagers = projectManagers;

        let taskTypes = [
            {
                "id": "1",
                "name": "Boundary Survey"
            },
            {
                "id": "2",
                "name": "Topographical Survey"
            },
            {
                "id": "3",
                "name": "ALTA Survey"
            },
            {
                "id": "4",
                "name": "Building Monitoring"
            },
            {
                "id": "5",
                "name": "3-D Scanning"
            },
            {
                "id": "6",
                "name": "Builder's Pavement Plan"
            },
            {
                "id": "7",
                "name": "Property Corners"
            },
            {
                "id": "8",
                "name": "Construction Stakeout"
            },
            {
                "id": "9",
                "name": "Other"
            },
        ];
        retval.taskTypes = taskTypes;

        let crews = [
            {
                "id": "1",
                "name": "Boyer, Bill",
                "jobs": [
                    {
                        "id": "1",
                        "projectNumber": "01-060189-03",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "2",
                "name": "Adutwum, George",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "3",
                "name": "Melhado, Ed",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "4",
                "name": "O'Connor, Kyle",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "5",
                "name": "Regal, Kevin",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "6",
                "name": "Acerbi, Brian",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "7",
                "name": "Connor, Doug",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "8",
                "name": "Gebreyesus, Dawit",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "9",
                "name": "Aguilar, Carlos",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "10",
                "name": "Cote, Dennis",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            },
            {
                "id": "11",
                "name": "McQuillen, Kyle",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-16",
                        "endDate": "2018-06-17",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-17",
                        "endDate": "2018-06-13",
                        "projectManager": {
                            "id": "1",
                            "color": "#e53935"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-22",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-18",
                        "endDate": "2018-07-12",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    }
                ]
            },
            {
                "id": "12",
                "name": "Tappen, Edward",
                "jobs": [
                    {
                        "id": "1",
                        "name": "Job 1",
                        "startDate": "2018-05-25",
                        "endDate": "2018-06-04",
                        "projectManager": {
                            "id": "2",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "2",
                        "name": "Job 2",
                        "startDate": "2018-05-20",
                        "endDate": "2018-5-24",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    },
                    {
                        "id": "3",
                        "name": "Job 3",
                        "startDate": "2018-06-06",
                        "endDate": "2018-06-28",
                        "projectManager": {
                            "id": "3",
                            "color": "#fb8c00"
                        }
                    },
                    {
                        "id": "4",
                        "name": "Job 4",
                        "startDate": "2018-06-01",
                        "endDate": "2018-06-07",
                        "projectManager": {
                            "id": "1",
                            "color": "#795548"
                        }
                    }
                ]
            }
        ];
        retval.crews = crews;

        return retval;
    }
}