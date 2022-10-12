import { motion } from "framer-motion";

import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { isShowAtom } from "../atom";

import { IProject } from "../projectData";

const AccordionMenu = styled(motion.div)`
  width: 100%;
`;
const Menu = styled(motion.div)`
  width: 100%;
  height: 50px;

  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;
const Icon = styled(motion.div)``;

const ContentsImg = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 500px;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center;
  background-size: cover;
  position: relative;
  cursor: pointer;
`;

const Date = styled.p`
  width: 150px;
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
const ContentsBtn = styled.div`
  width: 250px;
  height: 60px;
  position: absolute;
  right: 0;
  background-color: black;
  color: black;
  border: solid 1px white;
  border-top: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 0px 0px 30px 30px;
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

interface IProps {
  data: IProject;
}
const Accordion = (props: IProps) => {
  const setShowAtom = useSetRecoilState(isShowAtom);
  const toggleBtn = () => setShowAtom((prev) => !prev);
  const openFn = (pageUrl: string) => {
    if (pageUrl === "") return;
    window.open(pageUrl);
  };
  return (
    <AccordionMenu>
      <Menu>
        <div>
          <Date>{props.data.date}</Date>
          <Title>{props.data.title}</Title>
          <Produce>{props.data.work}</Produce>
          <Etc>{props.data.etc}</Etc>
        </div>
        <Icon></Icon>
      </Menu>
      <div>
        <ContentsImg
          bgPhoto={
            process.env.PUBLIC_URL + props.data.imgUrl + props.data.id + ".jpg"
          }
          onClick={() => openFn(props.data.pageUrl)}
        >
          {props.data.title === "" ? null : (
            <ContentsBtn onClick={toggleBtn}>
              <p>View details</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z" />
              </svg>
            </ContentsBtn>
          )}
        </ContentsImg>
      </div>
    </AccordionMenu>
  );
};

export default Accordion;
