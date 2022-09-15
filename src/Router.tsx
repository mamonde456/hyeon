import { Route, Routes } from "react-router-dom";
import About from "./About";
import Github from "./Github";
import Home from "./Home";
import Profile from "./Profile";
import Project from "./Project";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="resume" element={<Profile />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="project" element={<Project />}></Route>
          <Route path="github" element={<Github />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
