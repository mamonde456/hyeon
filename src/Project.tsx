import React, { useRef, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import styled from "styled-components";
import Menu from "./Menu";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

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
`;

const Works = styled.div`
  width: 1200px;
  height: 800px;
  .title {
    border: solid 1px black;
    background-color: white;
    height: 50px;
  }

  background-color: red;
`;
const Work = styled.div`
  width: 100%;
  height: 50px;

  background-color: #c1d5a4;
  border-bottom: solid 1px black;
  transition: ease 0.3s;
  overflow: hidden;
  position: relative;
`;

const Over = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
`;

const ContentsTitle = styled.div`
  height: 50px;
  background-color: red;
  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;
const ContentsImg = styled.div`
  width: 100%;
  height: 500px;
  background-color: blue;
  /* position: absolute; */
  /* bottom: 0; */
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

const data = [
  {
    id: 0,
    title: "navitrip",
    work: "coding",
    etc: "반응형",
    date: "2022-02-02",
  },
  {
    id: 1,
    title: "nasdfasdfsa",
    work: "coding",
    etc: "반응형",
    date: "2022-02-02",
  },
  {
    id: 2,
    title: "nasdfasdfadsfrip",
    work: "coding",
    etc: "반응형",
    date: "2022-02-02",
  },
  {
    id: 3,
    title: "naviadfasdftrip",
    work: "coding",
    etc: "반응형",
    date: "2022-02-02",
  },
];

const Project = () => {
  const [click, setClick] = useState(false);
  const [index, setIndex] = useState<null | string>(null);
  const [duration, setDuration] = React.useState(500);

  const contents = {
    number: "03",
    title: "Project",
  };

  function onWheel(
    apiObj: scrollVisibilityApiType,
    ev: React.WheelEvent
  ): void {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }
    if (ev.deltaY < 0) {
      // NOTE: for transitions
      console.log("up");
      apiObj.scrollNext(undefined, undefined, undefined, { duration });
    } else if (ev.deltaY > 0) {
      console.log("down");
      apiObj.scrollPrev(undefined, undefined, undefined, { duration });
    }
  }
  const onShow = (e: any) => {
    console.log(e.target.parentElement.offsetHeight, click);
    if (click) {
      if (e.target.parentElement.offsetHeight === 50) {
        setClick(true);
        e.target.parentElement.style.height = "500px";
      }
      setClick(false);
      e.target.parentElement.style.height = "50px";
    } else if (!click) {
      if (e.target.parentElement.offsetHeight === 500) {
        setClick(false);
        e.target.parentElement.style.height = "50px";
      }
      setClick(true);
      e.target.parentElement.style.height = "500px";
    }
  };

  return (
    <Wrapper>
      <Menu contents={contents}></Menu>
      <SectionTitle>Project</SectionTitle>
      <Works>
        <Work className="title">
          <Date>Year</Date>
          <Title>Project title</Title>
          <Produce>Work</Produce>
          <Etc>ETC</Etc>
        </Work>
        <ScrollMenu onWheel={onWheel}>
          {data?.map((project) => (
            <Work onClick={(e) => onShow(e)} key={project.id}>
              <ContentsTitle key={project.title}>
                <div>
                  <Date>{project.date}</Date>
                  <Title>{project.title}</Title>
                  <Produce>{project.work}</Produce>
                  <Etc>{project.etc}</Etc>
                </div>
              </ContentsTitle>
              <ContentsImg key={`${project.title}-image`}></ContentsImg>
              <Over />
            </Work>
          ))}
        </ScrollMenu>
      </Works>
    </Wrapper>
  );
};

export default Project;
