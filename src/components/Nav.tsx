import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MenuWrapper = styled.div`
  padding: 10px;
  height: 50px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  align-items: center;
  nav {
    display: flex;
    margin-left: 50px;
  }
  p {
    padding: 10px;
    font-weight: 700;
    text-transform: uppercase;
    &:hover {
      color: #7895b2;
    }
  }
`;

const Icon = styled.svg`
  width: 50px;
  height: 50px;
  padding: 10px;
  margin-left: 20px;
  cursor: pointer;
`;

const Nav = () => {
  const [show, setShow] = useState(false);
  let navigator = useNavigate();
  const onOpen = (number: string) => {
    if (number === "0") {
      navigator("/");
    } else if (number === "1") {
      navigator("/resume");
    } else if (number === "2") {
      navigator("/about");
    } else if (number === "3") {
      navigator("/project");
    }
  };
  return (
    <>
      <MenuWrapper>
        <Icon
          onClick={() => setShow((prev) => !prev)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M346.7 6C337.6 17 320 42.3 320 72c0 40 15.3 55.3 40 80s40 40 80 40c29.7 0 55-17.6 66-26.7c4-3.3 6-8.2 6-13.3s-2-10-6-13.2c-11.4-9.1-38.3-26.8-74-26.8c-32 0-40 8-40 8s8-8 8-40c0-35.7-17.7-62.6-26.8-74C370 2 365.1 0 360 0s-10 2-13.3 6zM244.6 136c-40 0-77.1 18.1-101.7 48.2l60.5 60.5c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-55.3-55.3 0 .1L2.2 477.9C-2 487-.1 497.8 7 505s17.9 9 27.1 4.8l134.7-62.4-52.1-52.1c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L199.7 433l100.2-46.4c46.4-21.5 76.2-68 76.2-119.2C376 194.8 317.2 136 244.6 136z" />
        </Icon>

        <AnimatePresence>
          <motion.nav
            initial={{ x: show ? 0 : 20, opacity: show ? 1 : 0 }}
            animate={{ x: show ? 0 : 20, opacity: show ? 1 : 0 }}
          >
            <p onClick={() => onOpen("0")}>
              <Link to="/">home</Link>
            </p>
            <p onClick={() => onOpen("1")}>
              <Link to="/resume">resume</Link>
            </p>
            <p onClick={() => onOpen("2")}>
              <Link to="/about">about</Link>
            </p>
            <p onClick={() => onOpen("3")}>
              <Link to="/project">project</Link>
            </p>
          </motion.nav>
        </AnimatePresence>
      </MenuWrapper>
    </>
  );
};

export default Nav;
