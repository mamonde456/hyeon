import { AnimatePresence, motion } from "framer-motion";
import { url } from "inspector";
import React, { useEffect, useRef, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import styled from "styled-components";
import Contents from "./Contents";
import Menu from "./Menu";

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

const Works = styled.div`
  width: 100%;
  height: 800px;
  overflow: scroll;
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
`;
const Work = styled.div`
  width: 100%;
  height: 50px;

  background-color: black;
  color: white;
  border-bottom: solid 1px black;
  transition: ease 0.3s;
  overflow: hidden;
  position: relative;
`;

const Over = styled.div`
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
`;

const ContentsTitle = styled.div`
  height: 50px;
  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;
const ContentsImg = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 500px;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center;
  background-size: cover;
  position: relative;
`;
const ShowBtn = styled(motion.div)`
  width: 150px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
  color: black;
  text-align: center;
  line-height: 50px;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 0px 0px 10px 10px;
  z-index: 3;
`;
const MoveBtn = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
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

const ProjectText = styled(motion.div)<{ show: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  border-radius: 10px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const data = [
  {
    id: 0,
    title: "navitrip",
    work: "coding",
    etc: "반응형",
    date: "2022-02-02",
    imgUrl: "/assets/homepage_img_",
    pageUrl: "http://mamonde456.dothome.co.kr/navitrip/",
  },
  {
    id: 1,
    title: "youtube clone coding",
    work: "front-end/back-end",
    etc: "",
    date: "2022-02-02",
    imgUrl: "/assets/homepage_img_",
    pageUrl: "https://wetube-clone-coding-js.herokuapp.com/",
  },
  {
    id: 2,
    title: "nasdfasdfadsfrip",
    work: "coding",
    etc: "반응형",
    date: "2022-02-02",
    imgUrl: "/assets/homepage_img_",
    pageUrl: "http://mamonde456.dothome.co.kr/navitrip/",
  },
  {
    id: 3,
    title: "naviadfasdftrip",
    work: "coding",
    etc: "반응형",
    date: "2022-02-02",
    imgUrl: "/assets/homepage_img_",
    pageUrl: "http://mamonde456.dothome.co.kr/navitrip/",
  },
];

const Project = () => {
  const [click, setClick] = useState(false);
  const [duration, setDuration] = useState(500);
  const [show, setShow] = useState(false);
  const [id, setId] = useState<null | number>(null);

  const elRef = useRef<HTMLDivElement>(null);

  const contents = {
    number: "03",
    title: "Project",
  };

  useEffect(() => {
    if (elRef.current != null) {
      elRef.current.style.height = "500px";
    }
  }, []);
  const onShow = (event: any) => {
    if (click) {
      // if (event.target.parentElement.offsetHeight === 50) {
      //   setClick(true);
      //   event.target.parentElement.style.height = "500px";
      // }
      setClick(false);
      event.target.parentElement.style.height = "50px";
    } else if (!click) {
      // if (event.target.parentElement.offsetHeight === 500) {
      //   setClick(false);
      //   event.target.parentElement.style.height = "50px";
      // }
      setClick(true);
      event.target.parentElement.style.height = "500px";
    }
  };

  const onOpen = (url: string) => {
    window.open(url);
  };

  const onClick = (id: number) => {
    setShow((prev) => !prev);
    setId(id);
  };

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
        {data?.map((project) => (
          <Work
            ref={project.title === data[0].title ? elRef : null}
            key={project.id}
          >
            <ContentsTitle key={project.title}>
              <div>
                <Date>{project.date}</Date>
                <Title>{project.title}</Title>
                <Produce>{project.work}</Produce>
                <Etc>{project.etc}</Etc>
              </div>
            </ContentsTitle>
            <ContentsImg
              key={`${project.title}-image`}
              bgPhoto={
                process.env.PUBLIC_URL + project.imgUrl + project.id + ".jpg"
              }
            >
              <MoveBtn onClick={() => onOpen(project.pageUrl)}></MoveBtn>
              <AnimatePresence>
                <ShowBtn
                  onClick={() => onClick(project.id)}
                  initial={{ position: "absolute", x: 0 }}
                  animate={{
                    display: show ? "none" : "block",
                    x: show ? 200 : 0,
                    transition: {
                      default: { duration: 1 },
                    },
                  }}
                >
                  Show
                </ShowBtn>
              </AnimatePresence>
            </ContentsImg>
            <Over onClick={(e) => onShow(e)} />
          </Work>
        ))}
      </Works>
      <AnimatePresence>
        <ProjectText
          show={show}
          initial={{ width: "0px" }}
          animate={{
            width: show ? "100%" : "0px",
            transition: { duration: 1 },
          }}
        >
          <ShowBtn
            onClick={() => setShow((prev) => !prev)}
            initial={{ x: 200 }}
            animate={{
              display: show ? "block" : "none",
              x: show ? 0 : 200,
              transition: {
                default: { duration: 1 },
              },
            }}
          >
            Hide
          </ShowBtn>
          <Contents id={id} show={show} />
        </ProjectText>
      </AnimatePresence>
    </Wrapper>
  );
};

export default Project;
