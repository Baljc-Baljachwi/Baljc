import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader";

const Spinner = () => {
  return (
    <LayoutSpinner>
      <HashLoader color={"#EDB83C"} size={30} />
    </LayoutSpinner>
  );
};
export default Spinner;
const LayoutSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  height: 100%;
  /* background-color: white; */
  opacity: 100;
`;
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
