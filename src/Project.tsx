import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Accordion from "./components/Accordion";
import { isShowAtom } from "./atom";
import Contents from "./components/Contents";
import Menu from "./components/Menu";
import { IProject, projectData } from "./projectData";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  padding-left: 100px;
`;

const SectionTitle = styled.h1`
  padding: 10px;
  font-size: 82px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Works = styled.ul`
  width: 100%;
  height: 800px;
  .title {
    border: solid 1px black;
    background-color: white;
    height: 50px;
    color: black;
    div {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .selected {
    height: 500px;
  }
`;
const Work = styled.li`
  width: 100%;
  height: 50px;

  background-color: black;
  color: white;
  border-bottom: solid 1px black;
  transition: ease 0.3s;
  overflow: hidden;
  position: relative;
`;

const Date = styled.p`
  width: 100px;
`;
const Title = styled.p`
  width: 300px;
`;

const Produce = styled.p`
  width: 300px;
`;
const Etc = styled.p`
  width: 150px;
`;

const ProjectText = styled(motion.div)<{ show: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  background-color: black;
  display: ${(props) => (props.show === "true" ? "block" : "none")};
`;

const Project = () => {
  const [click, setClick] = useState<IProject>(projectData[0]);
  const contents = {
    number: "03",
    title: "Project",
  };

  const show = useRecoilValue(isShowAtom);

  return (
    <Wrapper>
      <Menu contents={contents}></Menu>
      <SectionTitle>Project</SectionTitle>
      <Works>
        <Work className="title">
          <div>
            <Date>Year</Date>
            <Title>Project title</Title>
            <Produce>Work</Produce>
            <Etc>ETC</Etc>
          </div>
        </Work>
        {projectData?.map((project) => (
          <Work
            className={project === click ? "selected" : ""}
            key={project.id}
            onClick={() => setClick(project)}
          >
            <Accordion data={project}></Accordion>
          </Work>
        ))}
      </Works>
      <AnimatePresence>
        <ProjectText
          show={String(show)}
          initial={{ width: "0px" }}
          animate={{
            width: show ? "100%" : "0px",
            transition: { duration: 1 },
          }}
          exit={{ width: 0 }}
        >
          {click.title === "" ? null : (
            <Contents
              contents={click}
              key={click.title + click.id}
              show={String(show)}
            />
          )}
        </ProjectText>
      </AnimatePresence>
    </Wrapper>
  );
};

export default Project;
