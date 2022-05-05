import router from "next/router";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

function withAuth<T>(WrappedComponent: ComponentType<T>) {
  return function Noname(props: T) {
    // checks whether we are on client / browser or server.
    const router = useRouter();

    const [result, setResult] = useState();

    useEffect(() => {
      // setResult(<WrappedComponent {...props} />);
    }, []);

    if (typeof window === "undefined") return null;

    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    // If there is no access token we redirect to "/" page.
    if (!accessToken) {
      router.push("/");
    }

    // If this is an accessToken we just render the component that was passed with all its props
    return <WrappedComponent {...props} />;
  };
}
export default withAuth;
