import { useEffect, useRef, useState } from "react";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const Wrapper = styled.div`
  width: 13000px;
  height: 100vh;
  position: relative;
  color: white;
  gap: 10px;
  /* display: flex; */
  /* overflow: scroll; */
`;

const ScrollBox = styled(motion.div)`
  width: 100vw;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;

  background-color: black;
`;

const TitleBox = styled.div`
  width: 100vw;
  height: 100%;
  margin-right: 500px;
  float: left;
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
const ImageBox = styled.div`
  padding: 10px;
  float: left;
  margin-right: 200px;
  .coding {
    width: 1200px;
    height: 400px;
    float: left;
  }
`;
const Image = styled.div<{ bgPhoto: string }>`
  width: 1200px;
  height: 800px;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center;
  background-size: cover;
`;

const IntroTxt = styled.div`
  padding: 10px;
  width: 230px;
  height: 100px;
  float: left;
  position: relative;
  top: 75%;
`;

const Boxs = styled.div`
  width: 1000px;
  height: 100%;
  float: left;
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
const Title = styled.p`
  padding: 10px;
  font-size: 62px;
  float: left;
  /* margin-bottom: 50px; */
`;
const Box = styled.div`
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
`;

const Section = styled.div`
  width: 1200px;
  height: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  .useTitle {
    font-size: 32px;
    margin-bottom: 50px;
    margin-top: 80px;
  }
`;

const UseList = styled.ul`
  width: 100%;
  padding-left: 100px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
const Use = styled.li`
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

interface IProps {
  id: number | null;
  show: boolean;
}
const Contents = (props: IProps) => {
  const [duration, setDuration] = useState(6000);

  const [slide, setSlide] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const down = (e: any) => {
    const el = scrollRef.current;
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
    const el = scrollRef.current;

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
    <ReactScrollWheelHandler
      upHandler={(e) => up(e)}
      downHandler={(e) => down(e)}
    >
      <AnimatePresence>
        <ScrollBox
          ref={scrollRef}
          initial={{ width: props.show ? "100vw" : "0vw" }}
          animate={{
            width: props.show ? "100vw" : "0vw",
            transition: { duration: 1 },
          }}
        >
          <Wrapper>
            <TitleBox>
              <PageTitle>Navitrip</PageTitle>
            </TitleBox>
            <IntroTxt>
              타국의 현지 상황이나 여행 경비, 위험 지역 등의 자세한 정보를
              실시간으로 알 수 있는 여행 플랫폼
            </IntroTxt>
            <ImageBox>
              <Image bgPhoto="/assets/home_visual_img.jpg" />
            </ImageBox>
            <Boxs>
              <Title>역할</Title>
              <div>
                <Box>
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M469.3 19.3l23.4 23.4c25 25 25 65.5 0 90.5l-56.4 56.4L322.3 75.7l56.4-56.4c25-25 65.5-25 90.5 0zM44.9 353.2L299.7 98.3 413.7 212.3 158.8 467.1c-6.7 6.7-15.1 11.6-24.2 14.2l-104 29.7c-8.4 2.4-17.4 .1-23.6-6.1s-8.5-15.2-6.1-23.6l29.7-104c2.6-9.2 7.5-17.5 14.2-24.2zM249.4 103.4L103.4 249.4 16 161.9c-18.7-18.7-18.7-49.1 0-67.9L94.1 16c18.7-18.7 49.1-18.7 67.9 0l19.8 19.8c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1l45.1 45.1zM408.6 262.6l45.1 45.1c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1L496 350.1c18.7 18.7 18.7 49.1 0 67.9L417.9 496c-18.7 18.7-49.1 18.7-67.9 0l-87.4-87.4L408.6 262.6z" />
                  </Icon>
                  <Text>기획</Text>
                </Box>
                <Box>
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M192 64L160 0H128L96 64 64 0H48C21.5 0 0 21.5 0 48V256H384V48c0-26.5-21.5-48-48-48H224L192 64zM0 288v32c0 35.3 28.7 64 64 64h64v64c0 35.3 28.7 64 64 64s64-28.7 64-64V384h64c35.3 0 64-28.7 64-64V288H0zM192 464c-8.8 0-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16s-7.2 16-16 16z" />
                  </Icon>
                  <Text>디자인</Text>
                </Box>
                <Box>
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M64 96c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V352H512V96H128V352H64V96zM0 403.2C0 392.6 8.6 384 19.2 384H620.8c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8H76.8C34.4 480 0 445.6 0 403.2zM281 209l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM393 175l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
                  </Icon>
                  <Text>프론트엔드</Text>
                </Box>
              </div>
            </Boxs>
            <Section>
              <Title className="useTitle">사용 기술</Title>
              <UseList>
                <Use>
                  <p>html</p>
                </Use>
                <Use>
                  <p>css3</p>
                </Use>
                <Use>
                  <p>javascript</p>
                </Use>
                <Use>
                  <p>gnuboard</p>
                </Use>
              </UseList>
            </Section>
            <ImageBox>
              <Title>HTML</Title>
              <Image
                className="coding"
                bgPhoto="/assets/visual_markup.jpg"
              ></Image>
              <Text>visual slide를 위한 html 구조</Text>
              <Text>slide가 되면 애니메이션이 시작하도록 개별적으로 첨가</Text>
            </ImageBox>
            <ImageBox>
              <Title>HTML</Title>
              <Image
                className="coding"
                bgPhoto="/assets/visual_markup.jpg"
              ></Image>
              <Text>visual slide를 위한 html 구조</Text>
              <Text>slide가 되면 애니메이션이 시작하도록 개별적으로 첨가</Text>
            </ImageBox>
            <ImageBox>
              <Title>CSS3</Title>
              <Image
                className="coding"
                bgPhoto="/assets/visual_css.jpg"
              ></Image>
              <Text>
                javascript를 통해 li를 개별적으로 컨트롤하기 위해서 absolute로
                겹쳐놓았다.
              </Text>
            </ImageBox>
            <ImageBox>
              <Title>JavaScript</Title>
              <Image
                className="coding"
                bgPhoto="/assets/visual_javascript.jpg"
              ></Image>
              <Text>
                도트와 이미지를 함께 돌리기때문에, 도트의 순번을 this로
                구해준다. 클릭한 요소의 전요소가 없을 때까지 selectedIndex를
                +해주고, 값을 return시킨다.
              </Text>
              <Text>
                visualLi의 현재 위치에서 -visualWidth만큼 left로 이동하고,
                opacity를 0으로 설정해 페이드아웃시켜준다. 다음 올 visualLi를
                visualWidth로 이동시켜 나올 준비를 세팅한다. gsap.set이 끝나면
                애니메이션으로 좌표를 원래 위치로 변경해준다.
              </Text>
              <Text>
                도트는 dot[dotNum]으로 대입하여 슬라이드와 함께 돌아갈 수 있게
                해준다. 또한 css에서 기획을 끝내고 classList로 활성화/비활성화
                해준다.
              </Text>
            </ImageBox>
            <Section>
              <Title>프로젝트를 진행하며 경험한 부분</Title>
              <p>전반적인 기획과 디자인 및 코딩의 과정</p>
              <p>마크업 구조의 중요성</p>
              <p>flex, grid 등의 css3 활용</p>
            </Section>
          </Wrapper>
        </ScrollBox>
      </AnimatePresence>
    </ReactScrollWheelHandler>
  );
};

export default Contents;
