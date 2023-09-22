import { Navigate } from "react-router-dom";
import { AutoPage } from "./AutoEmty";

import LayOut from "../views/layout";
import Feeding from '../views/waste/feeding';

const routerList = [
  {
    path: "/waste",
    permission: "waste",
    element: <AutoPage><LayOut /></AutoPage>,
    children: [
      {
        path: '/waste/feeding',
        permission: 'waste:deliveryDetail',
        element: <AutoPage><Feeding /></AutoPage>
      }
    ]
  },
  {
    path: '/',
    element: <AutoPage><Navigate to="/waste/feeding"/></AutoPage>
  }
]
export default routerList