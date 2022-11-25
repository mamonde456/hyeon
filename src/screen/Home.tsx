import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/Menu";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100vh;
  float: left;
  color: black;
  overflow: hidden;
  position: relative;
`;
const Grid = styled(motion.div)`
  width: 50vw;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  align-items: center;
  justify-items: center;
`;
const Box = styled(motion.div)<{ show: string }>`
  width: 300px;
  height: 300px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  &:nth-child(1) {
    width: 200px;
    background-color: #b1d7b4;
    &:hover {
      background-color: black;
      &::after {
        content: "RESUME";
        color: white;
        position: absolute;
        right: 40px;
        top: 100px;
        display: ${(props) => (props.show === "true" ? "block" : "none")};
      }
    }
  }
  &:nth-child(2) {
    width: 150px;
    background-color: #b7c4cf;
    &:hover {
      background-color: black;
      &::after {
        content: "ABOUT";
        color: white;
        position: absolute;
        right: 60px;
        top: 100px;
        display: ${(props) => (props.show === "true" ? "block" : "none")};
      }
    }
  }
  &:nth-child(3) {
    background-color: #100f0f;
    color: white;
    &:hover {
      background-color: #c1d5a4;
      border: solid 1px black;
      &::after {
        content: "PROJECT";
        position: absolute;
        right: 120px;
        top: 100px;
        display: ${(props) => (props.show === "true" ? "block" : "none")};
      }
    }
  }
  &:nth-child(4) {
    width: 100px;
    background-color: #fff38c;
    &:hover {
      background-color: black;

      &::after {
        content: "GITHUB";
        color: white;
        position: absolute;
        right: 40px;
        top: 20px;
        display: ${(props) => (props.show === "true" ? "block" : "none")};
      }
    }
  }
`;

const Icon = styled.svg`
  width: 300px;
  height: 300px;
  padding: 10px;
  fill: rgba(255, 255, 255, 0);
  path {
    stroke: white;
    stroke-width: 4;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const BackBtn = styled.div`
  width: 100px;
  height: 100%;
  padding: 10px;
  /* background-color: rgba(255, 255, 255, 1); */
  color: white;
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  text-align: center;
  &:hover {
    svg {
      display: block;
      fill: black;
    }
  }
`;

const BtnIcon = styled.svg`
  width: 50px;
  height: 50px;
  padding: 10px;
  fill: white;
  display: none;
  cursor: pointer;
`;

const MsgBox = styled(motion.div)<{ close: string }>`
  width: 300px;
  height: 260px;
  background-color: white;
  border: solid 1px black;
  position: absolute;
  left: 100px;
  top: 50px;
  overflow: hidden;
  z-index: 99;
  display: ${(props) => (props.close === "false" ? "block" : "none")};
  .window {
    font-size: 18px;
  }
  .windowText {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
  }
  .opacity {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
  }
`;
const BoxHeader = styled.div<{ show: string }>`
  width: 100%;
  height: 50px;
  border-bottom: solid 1px black;
  background-color: black;
  display: flex;
  justify-content: ${(props) => (props.show === "true" ? "center" : "end")};
  align-items: center;
  p {
    padding: ${(props) => (props.show === "true" ? "0px" : "10px")};
    span {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
        fill: white;
        &:hover {
          fill: red;
        }
      }
    }
  }
`;

const Text = styled.p`
  padding: 10px;
`;

const boxVar = {
  start: {
    x: -window.innerWidth,
  },
  center: (index: number) => ({
    x: 0,
    transition: {
      delay: index / 2,
      duration: 1,
    },
  }),
  exit: {
    x: window.innerWidth,
  },
};

const svgVar = {
  start: {
    fill: "rgba(255,255,255,0)",
    pathLength: 0,
  },
  end: {
    fill: "rgba(255,255,255,1)",
    pathLength: 1,
  },
};

interface IResize {
  width: number;
  height: number;
}

const Home = () => {
  const [id, setId] = useState<null | string>(null);
  const [size, setSize] = useState<IResize>();
  const [show, setShow] = useState(false);
  const [close, setClose] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const contents = {
    number: "01",
    title: "HOME",
  };
  const homeMatch = useMatch("/");
  const resumeMatch = useMatch("/resume");
  const aboutMatch = useMatch("/about");
  const projectMatch = useMatch("/project");

  const windowResizeFn = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setSize({
      width,
      height,
    });
  };

  useEffect(() => {
    if (homeMatch) {
      setId(null);
    }
  }, [resumeMatch, aboutMatch, projectMatch]);

  useEffect(() => {
    window.addEventListener("resize", windowResizeFn);

    return () => {
      window.removeEventListener("resize", windowResizeFn);
    };
  }, []);

  let navigator = useNavigate();
  const onOpen = (el: number) => {
    setId(String(el));
    if (el === 0) {
      navigator("resume");
    } else if (el === 1) {
      navigator("about");
    } else if (el === 2) {
      navigator("project");
    }
  };

  const closeBtn = () => {
    setId(null);
    navigator("/hyeon");
  };
  return (
    <Wrapper ref={constraintsRef}>
      <MsgBox
        close={`${close}`}
        drag
        dragConstraints={constraintsRef}
        style={show ? {} : { width: "300px", height: "250px" }}
        initial={{
          width: "30px",
          height: "50px",
        }}
        animate={{
          width: show ? "30px" : "300px",
          height: show ? "50px" : "250px",
        }}
        transition={{ duration: 0.5 }}
      >
        <BoxHeader show={`${show}`}>
          <p>
            <span onClick={() => setShow((prev) => !prev)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
              </svg>
            </span>
            <span onClick={() => setClose((prev) => !prev)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
              </svg>
            </span>
          </p>
        </BoxHeader>
        <Text>해당 웹사이트는 1920 해상도에 맞춰 제작되었습니다.</Text>
        <Text className="window">당신의 현재 해상도:</Text>
        <Text className="windowText">
          {size?.width ? size?.width : window.innerWidth} x
          {size?.height ? size?.height : window.innerHeight}
        </Text>
        <p className="opacity">재확인은 새로고침을 눌러주세요.</p>
      </MsgBox>
      <Menu contents={contents}></Menu>
      <Grid>
        <AnimatePresence>
          {[0, 1, 2, 3].map((el) => (
            <Box
              custom={el}
              variants={boxVar}
              initial="start"
              animate="center"
              exit="exit"
              onClick={() => onOpen(el)}
              layoutId={String(el)}
              key={el}
              show={"true"}
              style={{ cursor: "pointer" }}
            >
              {el === 0 && (
                <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <motion.path
                    variants={svgVar}
                    initial="start"
                    animate="end"
                    transition={{
                      default: { duration: 5 },
                      fill: { delay: 3, duration: 5 },
                    }}
                    d="M32 32C14.3 32 0 46.3 0 64V288 448c0 17.7 14.3 32 32 32s32-14.3 32-32V320h95.3L261.8 466.4c10.1 14.5 30.1 18 44.6 7.9s18-30.1 7.9-44.6L230.1 309.5C282.8 288.1 320 236.4 320 176c0-79.5-64.5-144-144-144H32zM176 256H64V96H176c44.2 0 80 35.8 80 80s-35.8 80-80 80z"
                  />
                </Icon>
              )}
              {el === 1 && (
                <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <motion.path
                    variants={svgVar}
                    initial="start"
                    animate="end"
                    transition={{
                      default: { duration: 5 },
                      fill: { delay: 3, duration: 5 },
                    }}
                    d="M253.5 51.7C248.6 39.8 236.9 32 224 32s-24.6 7.8-29.5 19.7l-120 288-40 96c-6.8 16.3 .9 35 17.2 41.8s35-.9 41.8-17.2L125.3 384H322.7l31.8 76.3c6.8 16.3 25.5 24 41.8 17.2s24-25.5 17.2-41.8l-40-96-120-288zM296 320H152l72-172.8L296 320z"
                  />
                </Icon>
              )}
              {el === 2 && (
                <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <motion.path
                    variants={svgVar}
                    initial="start"
                    animate="end"
                    transition={{
                      default: { duration: 5 },
                      fill: { delay: 3, duration: 5 },
                    }}
                    d="M32 32H64h96c88.4 0 160 71.6 160 160s-71.6 160-160 160H64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V352 320 288 64C0 46.3 14.3 32 32 32zM64 288h96c53 0 96-43 96-96s-43-96-96-96H64V288z"
                  />
                </Icon>
              )}
              {el === 3 && (
                <Icon
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                  onClick={() => window.open("https://github.com/mamonde456")}
                >
                  <motion.path
                    variants={svgVar}
                    initial="start"
                    animate="end"
                    transition={{
                      default: { duration: 5 },
                      fill: { delay: 3, duration: 5 },
                    }}
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  />
                </Icon>
              )}
            </Box>
          ))}
        </AnimatePresence>
      </Grid>
      <AnimatePresence>
        {id && Number(id) < 3 ? (
          <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <BackBtn>
              <BtnIcon
                onClick={closeBtn}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M109.3 288L480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288z" />
              </BtnIcon>
            </BackBtn>
            <Box
              layoutId={id}
              show={"false"}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
            >
              <Outlet />
            </Box>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
};

export default Home;
