import styled from "styled-components";
import HorizontalScroll from "react-scroll-horizontal";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";

const Wrapper = styled.div`
  width: 5000px;
  height: 100%;
  background-color: #f5f5f5;
  color: white;
  position: absolute;
  left: 0;
  /* overflow: hidden; */
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 100px;
  padding: 10px;
  display: flex;
  gap: 10px;
`;

const Box = styled.div`
  width: 300px;
  height: 400px;
  padding: 10px;
  color: black;
  background-color: white;
  border-radius: 10px;
`;

const Title = styled.h3`
  padding: 10px;
  font-size: 32px;
  font-weight: 700;
`;

const User = styled.div`
  width: 500px;
  height: 100%;
  padding: 10px;
  background-color: white;
  color: black;
`;

const Profile = () => {
  const contents = {
    number: "02",
    title: "RESUME",
  };
  return (
    <HorizontalScroll pageLock={true} reverseScroll={true}>
      <Wrapper>
        <Menu contents={contents} />
        <Contents>
          <User>
            <Title>Contact</Title>
            <div>사진!</div>
            <p>최 현지</p>
            <p>010 - ---- - ----</p>
            <p>location: 인천광역시</p>
            <p>mamonde456@gmail.com</p>
            <p>github.com/mamonde456</p>
          </User>
          <Box>
            <Title>EDUCATION</Title>
            <p>
              숭의여자대학교 패션디자인과<span>2014.03~ 2017.02</span>
            </p>
            <p>
              프론트엔드 웹퍼블리셔 양성과정 - A<span>2020.08~ 2021.01</span>
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
        </Contents>
      </Wrapper>
    </HorizontalScroll>
  );
};

export default Profile;
