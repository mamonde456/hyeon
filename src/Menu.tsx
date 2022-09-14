import styled from "styled-components";

const Wrapper = styled.div<{ color: string }>`
  width: 100px;
  height: 100%;
  border-right: solid 1px ${(props) => props.color};
  color: ${(props) => props.color};
  position: fixed;
  left: 0;
`;

const Box = styled.div`
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

const Menu = (props: IProps) => {
  return (
    <Wrapper color={props.contents.number === "02" ? "black" : "black"}>
      <Box>
        <Num>{props.contents.number}</Num>
        <Text>{props.contents.title}</Text>
      </Box>
    </Wrapper>
  );
};
export default Menu;
