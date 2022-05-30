import React from "react";
import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader";

const LayoutSpinner = styled.div<{
  display?: string;
  justifyContent?: string;
  alignItems?: string;
}>`
  display: ${(props) => (props.display ? props.display : "")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : ""};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "")};
  height: 100%;
  opacity: 100;
`;

interface SipnnerProps {
  color?: string;
  size?: string;
  display?: string;
  justifyContent?: string;
  alignItems?: string;
}

export default function Spinner({
  color,
  size,
  display,
  justifyContent,
  alignItems,
}: SipnnerProps) {
  return (
    <LayoutSpinner
      display={display}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      <HashLoader color={color} size={size} />
    </LayoutSpinner>
  );
}
