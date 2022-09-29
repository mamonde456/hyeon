import {
  AnimatePresence,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import styled from "styled-components";
import { aboutArray, IAbout } from "./aboutData";
import Menu from "./components/Menu";

const Wrapper = styled.div`
  height: 100%;
  position: absolute;
  background-color: #f5f5f5;
  z-index: 99;
  padding-left: 100px;
  display: flex;
  overflow: hidden;
  position: relative;
  .box {
    width: 100vw;
  }
`;

const Intro = styled.div<{ end: string }>`
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  .hello {
    font-size: 52px;
    margin-bottom: 30px;

    span {
      position: relative;
      &::after {
        content: "";
        width: 1px;
        height: 90%;
        background-color: black;
        position: absolute;
        right: 0;
        top: 0;
        display: ${(props) => (props.end === "none" ? "none" : "block")};
      }
    }
  }
`;

const ScrollBox = styled(motion.div)`
  width: 120px;
  height: 120px;
  position: absolute;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.5s, ease;
  cursor: pointer;
  svg {
    width: 50px;
    height: 50px;
    padding: 10px;
  }
  div {
    width: 60px;
    height: 60px;
    border-radius: 40px;
    border: solid 1px black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
`;
const Scroll = styled.p``;

const IntroBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const Over = styled(motion.div)`
  width: 200px;
  background-color: #647e68;
  border-radius: 20px;
  color: white;
  overflow: hidden;
  p {
    position: relative;
    padding: 10px;
  }
  span {
    padding: 10px;
    position: absolute;
    right: 20px;
    top: 0;
    opacity: 0;
  }
`;

const Box = styled(motion.div)`
  width: 100vw;
  height: 200%;
  display: flex;
  flex-direction: column;
  position: relative;
  .leftScroll {
    left: 20px !important;
  }
`;

const Contents = styled.ul<{ bgColor: string }>`
  width: 300px;
  position: absolute;
  top: 300px;
  right: 150px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .selected {
    height: 60px;
    bottom: 0px;
    font-weight: 700;
    /* font-size: 18px; */
    border: soild 1px black;
    color: white;
    background-color: ${(props) => props.bgColor};
  }
`;
const Content = styled.li`
  width: 100%;
  height: 60px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: white; */
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  &::after {
    content: "";
    width: 1px;
    height: 5px;
    background-color: black;
    position: absolute;
    bottom: -10px;
  }
`;

const Inner = styled(motion.div)<{ bgColor: string }>`
  width: 100%;
  height: 100vh;
  position: relative;
  top: 200px;
  left: -120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    margin-bottom: 10px;
    font-size: 18px;
    text-align: justify;
  }
`;

const InnerBox = styled(motion.div)`
  width: 60%;
  height: 80%;
  /* background-color: white; */
  border-radius: 10px;
  padding: 50px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  /* align-items: center; */
`;
const Title = styled.div`
  font-size: 42px;
  font-weight: 700;
`;

const About = () => {
  const contents = {
    number: "02",
    title: "ABOUT",
  };
  const [tabCount, setTabCount] = useState(0);
  const [tab, setTab] = useState<IAbout>(aboutArray[tabCount]);
  const [coder, setCoder] = useState(false);
  const [developer, setDeveloper] = useState(false);
  const [typing, setTyping] = useState("");
  const [count, setCount] = useState(0);
  const text = "안녕하세요.";
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(true);
  const [left, setLeft] = useState(false);
  const [width, setWidth] = useState("60px");

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTyping(typing + text[count]);
      setCount(count + 1);
    }, 300);
    if (count >= text.length) {
      clearInterval(typingInterval);
    }

    return () => {
      clearInterval(typingInterval);
    };
  });

  const up = (e: any) => {
    const { deltaY } = e;
    const el = containerRef.current;

    if (!el) return;
    if (tabCount === 0) setLeft(false);

    if (deltaY < 0 && slide === true && left === false) {
      setSlide(false);
      el.scrollTo({
        left: -el.offsetWidth,
        behavior: "smooth",
      });
      setSlide(true);
    }
    if (
      deltaY < 0 &&
      slide === true &&
      el.scrollLeft === el.offsetWidth &&
      left === true
    ) {
      setSlide(false);
      if (tabCount >= 1) {
        setTabCount(tabCount - 1);
      }
      setTab(aboutArray[0 + tabCount]);
      setSlide(true);
    }
  };

  const down = (e: any) => {
    const el = containerRef.current;
    const { deltaY } = e;
    if (!el) return;

    if (deltaY > 0 && slide === true && left === false) {
      setSlide(false);
      el.scrollTo({
        left: el.offsetWidth,
        behavior: "smooth",
      });
      setSlide(true);
    }
    if (deltaY > 0 && slide === true && el.scrollLeft === el.offsetWidth) {
      setLeft(true);
      setSlide(false);
      if (tabCount <= 2) {
        setTabCount(tabCount + 1);
      }
      setTab(aboutArray[0 + tabCount]);
      setSlide(true);
    }
  };

  const onClick = (item: IAbout) => {
    setTab(item);
    setTabCount(item.id);
  };

  const moveScroll = (text: string) => {
    const el = containerRef.current;
    if (!el) return;
    if (text === "right") {
      el.scrollTo({
        left: el.offsetWidth,
        behavior: "smooth",
      });
    } else if (text === "left") {
      el.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <ReactScrollWheelHandler
      upHandler={(e) => up(e)}
      downHandler={(e) => down(e)}
    >
      <Wrapper ref={containerRef}>
        <Menu contents={contents}></Menu>
        <div className="box">
          <Intro end={typing.length === 6 ? "none" : "block"}>
            <div>
              <div className="hello">
                <span>{typing}</span>
              </div>
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
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: coder ? 1 : 0,
                        display: coder ? "block" : "none",
                      }}
                    >
                      : 코드를 따라서 치는 사람
                    </motion.span>
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
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: developer ? 1 : 0,
                        display: developer ? "block" : "none",
                      }}
                    >
                      : 생각하고 논리적으로 코드를 쓰는 사람
                    </motion.span>
                  </motion.p>
                </Over>
                <p>가 되고자 하는 최 현지입니다.</p>
              </IntroBox>
              <p>
                시각적으로 즐거운 인터랙티브한 페이지를 만드는 것에 흥미를
                가지고 있습니다. 사용자에게 편리한 UI와 최적의 경험을 주는 웹을
                만들기 위해 노력합니다.
              </p>
            </div>
            <ScrollBox
              onHoverStart={() => setWidth("80px")}
              onHoverEnd={() => setWidth("60px")}
              onClick={() => moveScroll("right")}
            >
              <div style={{ width, height: width }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
                </svg>
              </div>
              <Scroll>scroll</Scroll>
            </ScrollBox>
          </Intro>
        </div>
        <div className="box">
          <Box key={tab.title} ref={scrollRef}>
            <Contents bgColor={tab.color}>
              {aboutArray?.map((item: IAbout) => (
                <Content
                  onClick={() => onClick(item)}
                  className={item === tab ? "selected" : ""}
                >
                  {item.title}
                </Content>
              ))}
            </Contents>

            <AnimatePresence exitBeforeEnter>
              {tab ? (
                <Inner key={tab.title} bgColor={tab.color}>
                  <Title>{tab.title}</Title>
                  <InnerBox
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      type: "tween",
                    }}
                  >
                    <TextBox>
                      {tab.text.map((item) => (
                        <p>{item.innerText}</p>
                      ))}
                    </TextBox>
                  </InnerBox>
                </Inner>
              ) : null}
            </AnimatePresence>
            <ScrollBox
              className="leftScroll"
              onHoverStart={() => setWidth("80px")}
              onHoverEnd={() => setWidth("60px")}
              onClick={() => moveScroll("left")}
            >
              <div style={{ width, height: width }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M109.3 288L480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288z" />
                </svg>
              </div>
              <Scroll>scroll</Scroll>
            </ScrollBox>
          </Box>
        </div>
      </Wrapper>
    </ReactScrollWheelHandler>
  );
};

export default About;
