import { createHashRouter } from "react-router-dom";
import { AutoLogin } from "./AutoEmty";

import NotFound from "../views/not-found";
import Login from "../views/login";
import routerList from "./router";

const router = createHashRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <AutoLogin><Login /></AutoLogin>,
  },
  ...routerList
]);

export default router