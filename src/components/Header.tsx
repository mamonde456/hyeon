import styled from "styled-components";

const Menu = styled.header`
  width: 100%;
  height: 50px;
  border-bottom: solid 1px #5f6363;
  position: fixed;
  top: 0;
`;

const Header = () => {
  return <Menu></Menu>;
};

export default Header;
