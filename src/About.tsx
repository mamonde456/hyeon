import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { aboutArray, IAbout } from "./aboutData";
import Menu from "./Menu";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f5f5f5;
  z-index: 99;
`;

const Info = styled.div`
  width: 100%;
  padding: 10px;
  padding-left: 100px;
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
`;

const Intro = styled.div`
  width: 100%;
  height: 100vh;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  .hello {
    font-size: 32px;
    margin-bottom: 10px;
  }
`;

const IntroBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Over = styled(motion.div)`
  width: 200px;
  /* display: flex; */
  /* align-items: center; */
  background-color: #647e68;
  border-radius: 20px;
  color: white;
  overflow: hidden;
  p {
    padding: 10px;
    position: relative;
  }
  span {
    padding: 10px;
    position: absolute;
    right: 20px;
    top: 0;
  }
`;

const Box = styled(motion.div)`
  width: 1300px;
  height: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Contents = styled.ul<{ bgColor: string }>`
  width: 100%;
  height: 80px;
  /* position: relative; */
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  /* background-color: red; */
  .selected {
    height: 80px;
    bottom: 0px;
    font-weight: 700;
    font-size: 18px;
    border: soild 1px black;
    background-color: ${(props) => props.bgColor};
  }
`;
const Content = styled.li`
  width: 100%;
  height: 50px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 0px 30px 0px 0px;
  &:hover {
    color: blue;
  }
`;

const Inner = styled(motion.div)<{ bgColor: string }>`
  width: 1300px;

  padding: 20px;
  padding-top: 50px;
  gap: 50px;
  background-color: ${(props) => props.bgColor};
  /* position: absolute; */
  bottom: 0;
  border-radius: 0px 0px 10px 10px;
  p {
    margin-bottom: 10px;
    font-size: 22px;
    text-align: justify;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;
const Title = styled.div`
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 30px;
`;

const About = () => {
  const [tab, setTab] = useState<IAbout>(aboutArray[0]);
  const [coder, setCoder] = useState(false);
  const [developer, setDeveloper] = useState(false);
  const contents = {
    number: "02",
    title: "ABOUT",
  };
  return (
    <Wrapper>
      <Menu contents={contents}></Menu>
      <Info>
        <Intro>
          <div>
            <p className="hello">안녕하세요.</p>
            <IntroBox>
              <Over
                onClick={() => setCoder((prev) => !prev)}
                initial={{ width: "65px" }}
                animate={{
                  width: coder ? "280px" : "65px",
                  // opacity: show ? 1 : 0,
                }}
              >
                <motion.p>
                  Coder
                  <motion.span>: 코드를 따라서 치는 사람</motion.span>
                </motion.p>
              </Over>
              <p>가 아닌</p>
              <Over
                onClick={() => setDeveloper((prev) => !prev)}
                initial={{ width: "90px" }}
                animate={{
                  width: developer ? "400px" : "90px",
                }}
              >
                <motion.p>
                  Developer
                  <motion.span>
                    : 생각하고 논리적으로 코드를 쓰는 사람
                  </motion.span>
                </motion.p>
              </Over>
              <p>가 되고자 하는 최 현지입니다.</p>
            </IntroBox>
            <p>
              시각적으로 즐거운 인터랙티브한 페이지를 만드는 것에 흥미를 가지고
              있습니다. 사용자에게 편리한 UI와 최적의 경험을 주는 웹을 만들기
              위해 노력합니다.
            </p>
          </div>
        </Intro>
        <Box key={tab.title}>
          <Contents bgColor={tab.color}>
            {aboutArray?.map((item: IAbout) => (
              <Content
                onClick={() => setTab(item)}
                className={item === tab ? "selected" : ""}
              >
                {item.title}
              </Content>
            ))}
          </Contents>
          <AnimatePresence exitBeforeEnter>
            <div style={{ position: "relative" }}>
              {tab ? (
                <div style={{ position: "absolute", width: "1300px" }}>
                  <Inner
                    key={tab.title}
                    bgColor={tab.color}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "500px" }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      type: "tween",
                      staggerChildren: 2,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Title>{tab.title}</Title>
                      <TextBox>
                        {tab.text.map((item) => (
                          <p>{item.innerText}</p>
                        ))}
                      </TextBox>
                    </motion.div>
                  </Inner>
                </div>
              ) : null}
            </div>
          </AnimatePresence>
        </Box>
      </Info>
    </Wrapper>
  );
};

export default About;
