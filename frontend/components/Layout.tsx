import Navbar from "./navbar/index";

export default function Layout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}
