import { Route, Routes } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Profile from "./Profile";
import Project from "./Project";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />}>
          <Route
            path={`${process.env.PUBLIC_URL}/resume`}
            element={<Profile />}
          ></Route>
          <Route
            path={`${process.env.PUBLIC_URL}/about`}
            element={<About />}
          ></Route>
          <Route
            path={`${process.env.PUBLIC_URL}/project`}
            element={<Project />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
