import styled from "styled-components";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Menu from "./Menu";
import React, { useState } from "react";
import { LeftArrow, RightArrow } from "./arrows";
import Header from "./Header";
import { Link } from "react-router-dom";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const Wrapper = styled.div`
  width: 5000px;
  height: 100%;
  background-color: #f5f5f5;
  position: absolute;
  left: 0;
  z-index: 5;
  /* overflow: hidden; */
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 100px;
  padding: 10px;
  /* display: flex; */
  /* gap: 10px; */
`;

const SectionTitle = styled.p`
  padding: 10px;
  font-size: 52px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const ScrollBox = styled.div`
  width: 950px;
  height: 510px;
  float: left;
  position: relative;
  /* padding: 10px; */
  border-radius: 10px;
  overflow: hidden;
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }
  .react-horizontal-scrolling-menu--scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const Box = styled.div`
  width: 950px;
  height: 500px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h3`
  padding: 10px;
  font-size: 32px;
  margin-bottom: 50px;
`;

const User = styled.div`
  width: 500px;
  height: 100%;
  padding: 10px;
  background-color: white;
  float: left;
  margin-right: 100px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Avatar = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 300px;
  background-color: black;
`;

const Slide = styled.div<{ slide: number }>`
  width: ${(props) => `${props.slide}%`};
  height: 2px;
  background-color: red;
`;

const MenuWrapper = styled.div`
  width: 500px;
`;

const Profile = () => {
  const [slide, setSlide] = useState(1);
  const [bar, setBar] = useState(Math.floor(100 / 6));
  const [isSlide, setIsSlide] = useState(false);
  const [duration, setDuration] = React.useState(500);
  const contents = {
    number: "02",
    title: "RESUME",
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
      if (!isSlide) {
        setIsSlide(true);
        if (bar <= Math.floor(100 / 6)) {
          setSlide(Math.floor(bar * (slide - 1)));
        }
        setIsSlide(false);
      }
      console.log("up");
      apiObj.scrollNext(undefined, undefined, undefined, { duration });
    } else if (ev.deltaY > 0) {
      if (!isSlide) {
        setIsSlide(true);
        setSlide(bar * (slide + 1));
        setIsSlide(false);
      }
      console.log("down");
      apiObj.scrollPrev(undefined, undefined, undefined, { duration });
    }
  }
  console.log(slide);
  return (
    <>
      <Wrapper>
        <Menu contents={contents} />
        <Contents>
          <User>
            <Title>Contact</Title>
            <Avatar>사진!</Avatar>
            <p>최 현지</p>
            <p>010 - ---- - ----</p>
            <p>location: 인천광역시</p>
            <p>mamonde456@gmail.com</p>
            <p>github.com/mamonde456</p>
          </User>
          <SectionTitle>RESUME</SectionTitle>
          <ScrollBox>
            <ScrollMenu
              onWheel={onWheel}
              LeftArrow={LeftArrow}
              RightArrow={RightArrow}
            >
              <Box>
                <Title>EDUCATION</Title>
                <p>
                  숭의여자대학교 패션디자인과<span>2014.03~ 2017.02</span>
                </p>
                <p>
                  프론트엔드 웹퍼블리셔 양성과정 - A
                  <span>2020.08~ 2021.01</span>
                </p>
              </Box>
              <Box>
                <Title>Course</Title>
                <p>NOMAD CODERS</p>
                <p>바닐라 JS로 크롬 앱 만들기</p>
                <p>[풀스택] 유튜브 클론코딩</p>
                <p>줌 클론코딩</p>
                <p>React JS 마스터클래스</p>
              </Box>
              <Box>
                <Title>Online Bootcamp</Title>
                <p>NOMAD CODERS</p>
                <p>바닐라JS 2주 완성반</p>
                <p>유튜브 클론 6주 완성반</p>
                <p>줌 클론 1주 완성반</p>
              </Box>
              <Box>
                <Title>Skills</Title>
                <p>HTML5</p>
                <p>CSS3</p>
                <p>Sass</p>
                <p>javascript</p>
                <p>typescript</p>
                <p>react</p>
              </Box>
              <Box>
                <Title>Skills</Title>
                <p>Node JS</p>
                <p>MongoDB</p>
                <p>Express</p>
              </Box>
              <Box>
                <Title>using</Title>
                <p>Figma</p>
                <p>Visual Studio Code</p>
                <p>github</p>
              </Box>
            </ScrollMenu>
            <Slide slide={bar}></Slide>
          </ScrollBox>
          <MenuWrapper>
            <Link to="/about">about</Link>
            <Link to="/project">project</Link>
            <Link to="/about">project</Link>
          </MenuWrapper>
        </Contents>
      </Wrapper>
    </>
  );
};

export default Profile;
