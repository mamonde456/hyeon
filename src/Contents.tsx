import { useEffect, useRef, useState } from "react";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import styled from "styled-components";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { data, Idata } from "./arrayData";

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  color: white;
  gap: 100px;
  display: flex;
  list-style: none;
  overflow: hidden;
  /* overflow-x: scroll; */
  padding: 20px 0;
  flex: 0 0 600px;
  /* position: absolute;
  top: 0;
  left: 0; */
  /* background-color: black; */
`;

const Circle = styled.circle``;
const SlideBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
`;

const ScrollBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  /* overflow: hidden;
  position: fixed;
  top: 0;
  left: 0; */
  background-color: white;
`;

const TitleBox = styled.div`
  width: 100vw;
  height: 100%;
  margin-right: 600px;
`;

const PageTitle = styled.h3`
  width: 100%;
  padding: 10px;
  font-size: 300px;
  font-weight: 700;
  text-transform: uppercase;
  position: relative;
  text-shadow: 25px 25px 10px rgba(255, 255, 255, 0.5);
  &::after {
    content: "";
    width: 100%;
    height: 2px;
    background-color: white;
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;
const ImageBox = styled(motion.div)`
  padding: 10px;
  display: flex;
  margin-right: 300px;
  .coding {
    width: 1200px;
    height: 400px;
  }
`;
const Image = styled.div<{ bgPhoto: string }>`
  width: 1200px;
  height: 800px;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center;
  background-size: cover;
`;

const IntroTxt = styled(motion.div)`
  padding: 10px;
  width: 230px;
  height: 100px;

  position: relative;
  right: 30px;
  top: 75%;
`;

const Boxs = styled.div`
  width: 1000px;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: 100px;
  margin-right: 200px;

  div {
    gap: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Title = styled(motion.p)`
  padding: 10px;
  font-size: 62px;

  /* margin-bottom: 50px; */
`;
const Box = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background-color: white;
  color: #000;
  flex-direction: column;
  gap: 0;
`;

const Text = styled.p`
  padding: 10px;
  font-size: 18px;
`;

const Icon = styled.svg`
  width: 100px;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  path {
    stroke-width: 5px;
    stroke: black;
  }
`;

const Section = styled.div`
  width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 300px;
  .useTitle {
    font-size: 32px;
    margin-bottom: 50px;
  }
  .projectTitle {
    width: 1200px;
  }
`;

const UseList = styled(motion.ul)`
  width: 1200px;
  padding-left: 100px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
const Use = styled(motion.li)`
  width: 100%;
  padding: 10px;
  height: 120px;
  font-size: 62px;
  text-transform: uppercase;
  position: relative;
  &::after {
    content: "";
    width: 100%;
    height: 2px;
    background-color: white;
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;

const Explanations = styled.ul`
  width: 1000px;
  padding: 10px;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: white;
  color: black;
  display: flex;
  text-transform: uppercase;
  font-weight: 700;
  .selected {
    background-color: #eeee;
    color: #4239f5;
  }
`;
const Explanation = styled.li`
  padding: 10px;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  div {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: #4239f5;
  }
`;

const Outline = styled(motion.div)`
  width: 1000px;
  height: 550px;
  background-color: white;
  color: black;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const TabImg = styled(motion.div)<{ imgUrl: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
  padding: 10px;
`;

const TabTxt = styled(motion.div)`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  counter-reset: list-number;

  p {
    counter-increment: list-number;
    ::before {
      content: counter(list-number) ". ";
    }
  }
`;

const TabIcon = styled.svg`
  width: 50px;
  height: 50px;
  padding: 10px;
`;

const Experience = styled(motion.div)`
  padding: 10px;
  padding-left: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface IProps {
  id: number | null;
  show: boolean;
}

const boxVar = {
  start: { opacity: 0, y: -100 },
  end: { opacity: 1, y: 0 },
};

const svgVar = {
  start: { pathLength: 0, fill: "rgba(0,0,0,0)" },
  end: { pathLength: 1, fill: "rgba(0,0,0,1)" },
};

const titleVar = {
  start: { x: 300, opacity: 0 },
  end: { x: 0, opacity: 1 },
};

const liVar = {
  start: { width: 0 },
  end: { width: "100%" },
};

const exVar = {
  start: { x: 30, opacity: 0 },
  end: { x: 0, opacity: 1 },
};

const Contents = (props: IProps) => {
  const [duration, setDuration] = useState(6000);
  const [slide, setSlide] = useState(true);
  const [selected, setSelected] = useState<Idata>(data[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  useEffect(() => {
    if (containerRef === null) return;
  }, []);
  const down = (e: any) => {
    e.preventDefault();
    const el = containerRef.current;
    const { deltaY } = e;
    if (!el) return;

    if (deltaY > 0 && slide === true) {
      setSlide(false);
      el.scrollTo({
        left: el.scrollLeft + deltaY * 5,
        behavior: "smooth",
      });
      setSlide(true);
    }
  };

  const up = (e: any) => {
    const { deltaY } = e;
    const el = containerRef.current;

    if (!el) return;

    if (deltaY < 0 && slide === true) {
      setSlide(false);
      el.scrollTo({
        left: el.scrollLeft + deltaY * 5,
        behavior: "smooth",
      });
      setSlide(true);
    }
  };

  return (
    <>
      <ReactScrollWheelHandler
        upHandler={(e) => up(e)}
        downHandler={(e) => down(e)}
      >
        <AnimatePresence>
          <motion.svg
            style={{
              position: "fixed",
              left: "10px",
              bottom: "20px",
              transform: "rotate(-90deg)",
              stroke: "whitesmoke",
            }}
            initial={{ opacity: props.show ? 1 : 0 }}
            animate={{
              opacity: props.show ? 1 : 0,
              transition: { duration: 1 },
            }}
            width="100"
            height="100"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              style={{
                strokeDashoffset: 0,
                strokeWidth: "15px",
                fill: "none",
                stroke: "whitesmoke",
                opacity: 0.3,
              }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              style={{
                pathLength: scrollXProgress,
                stroke: "whitesmoke",
                strokeWidth: "15px",
              }}
            />
          </motion.svg>
          <Wrapper ref={containerRef}>
            <TitleBox>
              <PageTitle>Navitrip</PageTitle>
            </TitleBox>
            <ImageBox
              variants={boxVar}
              initial="start"
              whileInView="end"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2, type: "tween" }}
            >
              <IntroTxt
                variants={boxVar}
                initial="start"
                whileInView="end"
                viewport={{ once: true, amount: 0.3 }}
              >
                타국의 현지 상황이나 여행 경비, 위험 지역 등의 자세한 정보를
                실시간으로 알 수 있는 여행 플랫폼
              </IntroTxt>
              <Image bgPhoto="/assets/home_visual_img.jpg" />
            </ImageBox>
            <Boxs>
              <Title
                variants={titleVar}
                initial="start"
                whileInView="end"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2, type: "tween" }}
              >
                역할
              </Title>
              <motion.div>
                <Box
                  variants={boxVar}
                  initial="start"
                  whileInView="end"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 3, delayChildren: 1 }}
                >
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <motion.path
                      variants={svgVar}
                      transition={{
                        default: { duration: 5 },
                        fill: { duration: 1, delay: 3 },
                      }}
                      d="M469.3 19.3l23.4 23.4c25 25 25 65.5 0 90.5l-56.4 56.4L322.3 75.7l56.4-56.4c25-25 65.5-25 90.5 0zM44.9 353.2L299.7 98.3 413.7 212.3 158.8 467.1c-6.7 6.7-15.1 11.6-24.2 14.2l-104 29.7c-8.4 2.4-17.4 .1-23.6-6.1s-8.5-15.2-6.1-23.6l29.7-104c2.6-9.2 7.5-17.5 14.2-24.2zM249.4 103.4L103.4 249.4 16 161.9c-18.7-18.7-18.7-49.1 0-67.9L94.1 16c18.7-18.7 49.1-18.7 67.9 0l19.8 19.8c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1l45.1 45.1zM408.6 262.6l45.1 45.1c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1L496 350.1c18.7 18.7 18.7 49.1 0 67.9L417.9 496c-18.7 18.7-49.1 18.7-67.9 0l-87.4-87.4L408.6 262.6z"
                    />
                  </Icon>
                  <Text>Planning</Text>
                </Box>
                <Box
                  variants={boxVar}
                  initial="start"
                  whileInView="end"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 3, delayChildren: 0.5 }}
                >
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <motion.path
                      variants={svgVar}
                      transition={{
                        default: { duration: 5 },
                        fill: { duration: 1, delay: 3 },
                      }}
                      d="M192 64L160 0H128L96 64 64 0H48C21.5 0 0 21.5 0 48V256H384V48c0-26.5-21.5-48-48-48H224L192 64zM0 288v32c0 35.3 28.7 64 64 64h64v64c0 35.3 28.7 64 64 64s64-28.7 64-64V384h64c35.3 0 64-28.7 64-64V288H0zM192 464c-8.8 0-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16s-7.2 16-16 16z"
                    />
                  </Icon>
                  <Text>design</Text>
                </Box>
                <Box
                  variants={boxVar}
                  initial="start"
                  whileInView="end"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 3, delayChildren: 1 }}
                >
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <motion.path
                      variants={svgVar}
                      transition={{
                        default: { duration: 5 },
                        fill: { duration: 1, delay: 3 },
                      }}
                      d="M64 96c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V352H512V96H128V352H64V96zM0 403.2C0 392.6 8.6 384 19.2 384H620.8c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8H76.8C34.4 480 0 445.6 0 403.2zM281 209l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM393 175l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"
                    />
                  </Icon>
                  <Text>front-end</Text>
                </Box>
              </motion.div>
            </Boxs>
            <Section>
              <Title
                variants={titleVar}
                initial="start"
                whileInView="end"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2, type: "tween" }}
                className="useTitle"
              >
                사용 기술
              </Title>
              <UseList transition={{ delayChildren: 1, staggerChildren: 0.2 }}>
                <Use
                  variants={liVar}
                  initial="start"
                  whileInView="end"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 2,
                    type: "tween",
                  }}
                >
                  <motion.p
                    initial={{ x: 500, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 2,
                      type: "tween",
                    }}
                  >
                    html
                  </motion.p>
                </Use>
                <Use
                  variants={liVar}
                  initial="start"
                  whileInView="end"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 2, type: "tween" }}
                >
                  <motion.p
                    initial={{ x: 500, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 2,
                      type: "tween",
                    }}
                  >
                    css3
                  </motion.p>
                </Use>
                <Use
                  variants={liVar}
                  initial="start"
                  animate="end"
                  transition={{ duration: 2, type: "tween" }}
                >
                  <motion.p
                    initial={{ x: 500, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 2,
                      type: "tween",
                    }}
                  >
                    javascript
                  </motion.p>
                </Use>
                <Use
                  variants={liVar}
                  initial="start"
                  whileInView="end"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 2, type: "tween" }}
                >
                  <motion.p
                    initial={{ x: 500, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 2,
                      type: "tween",
                    }}
                  >
                    gnuboard
                  </motion.p>
                </Use>
              </UseList>
            </Section>
            <Section>
              <Title>Description</Title>
              <Explanations>
                {data.map((item) => (
                  <Explanation
                    key={item.icon}
                    onClick={() => setSelected(item)}
                    className={selected === item ? "selected" : ""}
                  >
                    {item.icon === "html" ? (
                      <TabIcon
                        style={{ fill: "#e34c26" }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z" />
                      </TabIcon>
                    ) : item.icon === "css3" ? (
                      <TabIcon
                        style={{ fill: "#264de4" }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z" />
                      </TabIcon>
                    ) : item.icon === "javascript" ? (
                      <TabIcon
                        style={{ fill: "#F0DB4F" }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM243.8 381.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z" />
                      </TabIcon>
                    ) : null}
                    {`${item.icon}`}
                    {selected === item ? (
                      <motion.div layoutId="selected" />
                    ) : null}
                  </Explanation>
                ))}
              </Explanations>
              <Outline
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2, type: "tween" }}
              >
                <AnimatePresence exitBeforeEnter>
                  <motion.div
                    key={selected.icon}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, type: "tween" }}
                  >
                    {selected.imgUrl ? (
                      <TabImg
                        imgUrl={selected.imgUrl}
                        whileTap={{ scale: 2, transition: { duration: 0.5 } }}
                      ></TabImg>
                    ) : null}
                    <TabTxt>
                      {selected.label.map((item) => (
                        <p>{item.text}</p>
                      ))}
                    </TabTxt>
                  </motion.div>
                </AnimatePresence>
              </Outline>
            </Section>
            <Section>
              <Title className="projectTitle">
                프로젝트를 진행하며 경험한 부분
              </Title>
              <Experience
                variants={exVar}
                initial="start"
                whileInView="end"
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 2,
                  type: "tween",
                  delayChildren: 0.5,
                  staggerChildren: 0.8,
                }}
              >
                <motion.div variants={exVar}>
                  전반적인 기획과 디자인 및 코딩의 과정
                </motion.div>
                <motion.div variants={exVar}>마크업 구조의 중요성</motion.div>
                <motion.div variants={exVar}>
                  flex, grid 등의 css3 활용
                </motion.div>
              </Experience>
            </Section>
          </Wrapper>
        </AnimatePresence>
      </ReactScrollWheelHandler>
    </>
  );
};

export default Contents;
