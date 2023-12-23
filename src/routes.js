import React from "react";

import { Icon } from "@chakra-ui/react";

import { BiSolidHappyAlt } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

// Admin Imports
import MainDashboard from "views/admin/default";
import FutureCareers from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import EmployeeManagement from "./views/admin/EmployeeManagement";

const routes = [

  {
    name: "Satisfaction rate",
    layout: "/admin",
    path: "/taux-de-satisfaction",
    icon: <Icon as={BiSolidHappyAlt} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Managerial Performance Insights",
    layout: "/admin",
    path: "/futures-carrieres",
    icon: (
      <Icon
        as={BsPersonWorkspace}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: FutureCareers,
    secondary: true,
  },
  {
    name: "New recrutements",
    layout: "/admin",
    icon: <Icon as={IoPersonAddSharp} width='20px' height='20px' color='inherit' />,
    path: "/nouveaux-recrutements",
    component: DataTables,
  },
  {
    name: "Employee Management",
    layout: "/admin",
    path: "/gestion-des-employes/:employeeId",
    icon: <Icon as={BsPersonWorkspace} width='20px' height='20px' color='inherit' />,
    component: EmployeeManagement,
  },
  {name:"Logout",
    layout:"/auth",
    path:"/sign-in",
    component:SignInCentered,
    icon: <CiLogout />
  },
];

export default routes;
