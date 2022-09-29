import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)<{ color: string }>`
  width: 100px;
  height: 100%;
  border-right: solid 1px ${(props) => props.color};
  color: ${(props) => props.color};
  position: fixed;
  left: 0;
`;

const Box = styled(motion.div)`
  position: absolute;
  bottom: 120px;
  left: -60px;
  transform: rotate(270deg);
  font-size: 42px;
  font-weight: 700;
`;
const Num = styled.span`
  padding: 10px;
`;

const Text = styled.span`
  padding: 10px;
`;

interface IProps {
  contents: { number: string; title: string };
}

const showVar = {
  start: {
    x: -100,
  },
  center: {
    x: 0,
  },
};

const textVar = {
  start: {
    x: -100,
    rotate: 270,
  },
  center: {
    x: 0,
  },
};

const Menu = (props: IProps) => {
  return (
    <AnimatePresence>
      <Wrapper
        variants={showVar}
        initial="start"
        animate="center"
        transition={{ duration: 0.5 }}
        color={props.contents.number === "02" ? "black" : "black"}
      >
        <Box variants={textVar} transition={{ duration: 3 }}>
          <Num>{props.contents.number}</Num>
          <Text>{props.contents.title}</Text>
        </Box>
      </Wrapper>
    </AnimatePresence>
  );
};
export default Menu;
