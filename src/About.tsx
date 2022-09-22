import styled from "styled-components";
import Menu from "./Menu";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f5f5f5;
  z-index: 99;
`;

const Intro = styled.div`
  padding: 10px;
`;

const About = () => {
  const contents = {
    number: "02",
    title: "ABOUT",
  };
  return (
    <Wrapper>
      <Menu contents={contents}></Menu>
      <Intro>
        안녕하세요. <span>Coder</span>가 아닌 <span>Developer</span>가 되고자
        하는 최 현지입니다.
        <div>
          
          </p>
        </div>
      </Intro>
    </Wrapper>
  );
};

export default About;
