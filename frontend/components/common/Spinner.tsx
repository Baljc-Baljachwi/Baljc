import React from "react";
import { useEffect, useState } from "react";
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
  /* height: 100vh; */
  height: 100%;
  /* background-color: white; */
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

// function Spinner() {
//   // const [pageLoading, setPageLoading] = useState<boolean>(false);
//   // useEffect(() => {
//   //   const handleStart = () => {
//   //     setPageLoading(true);
//   //   };
//   //   const handleComplete = () => {
//   //     setPageLoading(false);
//   //   };

//   //   router.events.on("routeChangeStart", handleStart);
//   //   router.events.on("routeChangeComplete", handleComplete);
//   //   router.events.on("routeChangeError", handleComplete);
//   // }, [router]);

//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 8000);
//   }, []);
//   return (
//     <div>
//       <div className="spinner">
//         {loading ? (
//           <ClimbingBoxLoader color={"#EDB83C"} loading={loading} size={30} />
//         ) : (
//           <div>Spinner</div>
//         )}
//       </div>
//     </div>
//   );
// }
