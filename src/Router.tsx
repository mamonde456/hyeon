import { createBrowserRouter, Route, Routes } from "react-router-dom";
import About from "./screen/About";
import Home from "./screen/Home";
import Profile from "./screen/Profile";
import Project from "./screen/Project";
import Root from "./App";

const router = createBrowserRouter([
  {
    path: "/hyeon",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "resume",
            element: <Profile />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "project",
            element: <Project />,
          },
        ],
      },
    ],
  },
]);

export default router;
