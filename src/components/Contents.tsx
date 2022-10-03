import { useRef, useState } from "react";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { contentsData, Idata, IProject, ITab } from "../projectData";
import { isShowAtom } from "../atom";

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  color: white;
  gap: 100px;
  display: flex;
  list-style: none;
  overflow: hidden;
  padding: 20px 0;
  flex: 0 0 600px;
`;

const ContentsBtn = styled.div`
  width: 250px;
  height: 60px;
  position: fixed;
  right: 0;
  div {
    border: solid 1px white;
    border-radius: 200px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  p {
    width: 190px;
    height: 50px;
    padding: 10px;
    background-color: white;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }
  svg {
    width: 30px;
    height: 30px;
    fill: none;
  }
  path {
    stroke: white;
    stroke-width: 20px;
  }
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
  height: 600px;
  background-color: white;
  color: black;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  .click {
    height: 100% !important;
    background-position: 0%;
    position: fixed;
    left: 0;
    top: 0;
  }
`;

const TabImg = styled(motion.div)<{ imgUrl: string }>`
  width: 100%;
  height: 300px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  justify-content: end;
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
  contents: IProject;
  show: string;
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
  const [slide, setSlide] = useState(true);
  const id = props.contents.id;
  const [selected, setSelected] = useState<ITab>(contentsData[id].tabImg[0]);
  const [click, setClick] = useState(false);
  const setShowAtom = useSetRecoilState(isShowAtom);
  const toggleBtn = () => setShowAtom((prev) => !prev);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

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
            key={"circleWrap"}
            style={{
              position: "fixed",
              left: "10px",
              bottom: "20px",
              transform: "rotate(-90deg)",
              stroke: "whitesmoke",
            }}
            initial={{ opacity: props.show === "true" ? 1 : 0 }}
            animate={{
              opacity: props.show === "true" ? 1 : 0,
              transition: { duration: 1 },
            }}
            width="100"
            height="100"
            viewBox="0 0 100 100"
          >
            <circle
              key={"bgCircle"}
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
              key={"moveCircle"}
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
            {contentsData.map((item: Idata) => (
              <>
                {item.id === props.contents.id ? (
                  <>
                    <ContentsBtn
                      key={item.id}
                      onClick={toggleBtn}
                      style={
                        props.show === "true"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <div>
                        <p>Hide</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path d="M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z" />
                        </svg>
                      </div>
                    </ContentsBtn>
                    <TitleBox>
                      <PageTitle>{item.title}</PageTitle>
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
                        {item.introText}
                      </IntroTxt>
                      <Image
                        bgPhoto={`${process.env.PUBLIC_URL}/assets/home_visual_img_${props.contents.id}.jpg`}
                      />
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
                        {item.Role.map((item) => (
                          <Box
                            variants={boxVar}
                            initial="start"
                            whileInView="end"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 3, delayChildren: 1 }}
                          >
                            {item.id === 0 ? (
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
                            ) : item.id === 1 ? (
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
                            ) : item.id === 2 ? (
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
                            ) : item.id === 3 ? (
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
                                  d="M432 48H208C190.3 48 176 62.33 176 80V96H128V80C128 35.82 163.8 0 208 0H432C476.2 0 512 35.82 512 80V304C512 348.2 476.2 384 432 384H416V336H432C449.7 336 464 321.7 464 304V80C464 62.33 449.7 48 432 48zM320 128C355.3 128 384 156.7 384 192V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V192C0 156.7 28.65 128 64 128H320zM64 464H320C328.8 464 336 456.8 336 448V256H48V448C48 456.8 55.16 464 64 464z"
                                />
                              </Icon>
                            ) : null}
                            <Text>{item.text}</Text>
                          </Box>
                        ))}
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
                      <UseList
                        transition={{ delayChildren: 1, staggerChildren: 0.2 }}
                      >
                        {item.use.map((item) => (
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
                              {item.text}
                            </motion.p>
                          </Use>
                        ))}
                      </UseList>
                    </Section>
                    <Section>
                      <Title>Description</Title>
                      <Explanations>
                        {contentsData[id]?.tabImg.map((item: ITab) => (
                          <Explanation
                            key={item.icon}
                            onClick={() => setSelected(item)}
                            className={selected === item ? "selected" : ""}
                          >
                            {item.id === 0 ? (
                              <TabIcon
                                style={{ fill: "#e34c26" }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                              >
                                <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z" />
                              </TabIcon>
                            ) : item.id === 1 ? (
                              <TabIcon
                                style={{ fill: "#264de4" }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                              >
                                <path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z" />
                              </TabIcon>
                            ) : item.id === 2 ? (
                              <TabIcon
                                style={{ fill: "#F0DB4F" }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM243.8 381.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z" />
                              </TabIcon>
                            ) : item.id === 3 ? (
                              <TabIcon
                                style={{ fill: "#68a063" }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M224 508c-6.7 0-13.5-1.8-19.4-5.2l-61.7-36.5c-9.2-5.2-4.7-7-1.7-8 12.3-4.3 14.8-5.2 27.9-12.7 1.4-.8 3.2-.5 4.6.4l47.4 28.1c1.7 1 4.1 1 5.7 0l184.7-106.6c1.7-1 2.8-3 2.8-5V149.3c0-2.1-1.1-4-2.9-5.1L226.8 37.7c-1.7-1-4-1-5.7 0L36.6 144.3c-1.8 1-2.9 3-2.9 5.1v213.1c0 2 1.1 4 2.9 4.9l50.6 29.2c27.5 13.7 44.3-2.4 44.3-18.7V167.5c0-3 2.4-5.3 5.4-5.3h23.4c2.9 0 5.4 2.3 5.4 5.3V378c0 36.6-20 57.6-54.7 57.6-10.7 0-19.1 0-42.5-11.6l-48.4-27.9C8.1 389.2.7 376.3.7 362.4V149.3c0-13.8 7.4-26.8 19.4-33.7L204.6 9c11.7-6.6 27.2-6.6 38.8 0l184.7 106.7c12 6.9 19.4 19.8 19.4 33.7v213.1c0 13.8-7.4 26.7-19.4 33.7L243.4 502.8c-5.9 3.4-12.6 5.2-19.4 5.2zm149.1-210.1c0-39.9-27-50.5-83.7-58-57.4-7.6-63.2-11.5-63.2-24.9 0-11.1 4.9-25.9 47.4-25.9 37.9 0 51.9 8.2 57.7 33.8.5 2.4 2.7 4.2 5.2 4.2h24c1.5 0 2.9-.6 3.9-1.7s1.5-2.6 1.4-4.1c-3.7-44.1-33-64.6-92.2-64.6-52.7 0-84.1 22.2-84.1 59.5 0 40.4 31.3 51.6 81.8 56.6 60.5 5.9 65.2 14.8 65.2 26.7 0 20.6-16.6 29.4-55.5 29.4-48.9 0-59.6-12.3-63.2-36.6-.4-2.6-2.6-4.5-5.3-4.5h-23.9c-3 0-5.3 2.4-5.3 5.3 0 31.1 16.9 68.2 97.8 68.2 58.4-.1 92-23.2 92-63.4z" />
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, type: "tween" }}
                          >
                            {selected.imgUrl ? (
                              <TabImg
                                imgUrl={`${
                                  process.env.PUBLIC_URL + selected.imgUrl
                                }`}
                                className={click ? "click" : ""}
                              >
                                <button
                                  style={{
                                    width: "150px",
                                    height: "40px",
                                    padding: "10px",
                                  }}
                                  onClick={() => setClick((prev) => !prev)}
                                >
                                  {click ? "나가기" : "전체보기"}
                                </button>
                              </TabImg>
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
                        {item.experience.map((item) => (
                          <motion.div
                            key={item.text}
                            variants={exVar}
                            transition={{
                              duration: 2,
                              type: "tween",
                            }}
                          >
                            {item.text}
                          </motion.div>
                        ))}
                      </Experience>
                    </Section>
                  </>
                ) : null}
              </>
            ))}
          </Wrapper>
        </AnimatePresence>
      </ReactScrollWheelHandler>
    </>
  );
};

export default Contents;
