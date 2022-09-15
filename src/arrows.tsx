import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";
import styled from "styled-components";

const LeftBtn = styled.button<{ props: string }>`
  width: 100px;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 10px 0px 0px 10px;
  position: absolute;
  left: 10px;
  z-index: 999;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
const RightBtn = styled.button<{ props: string }>`
  width: 100px;
  height: 100%;
  background: none;
  border: none;
  border-radius: 0px 10px 10px 0px;

  cursor: pointer;
  position: absolute;
  right: 10px;
  z-index: 999;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export function LeftArrow() {
  const { scrollPrev } = React.useContext(VisibilityContext);

  return (
    <LeftBtn props="left" onClick={() => scrollPrev()}>
      Left
    </LeftBtn>
  );
}

export function RightArrow() {
  const { scrollNext } = React.useContext(VisibilityContext);

  return (
    <RightBtn props="right" onClick={() => scrollNext()}>
      Right
    </RightBtn>
  );
}
