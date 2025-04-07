import Footer from "@/components/shared/Footer/Footer";
import { Outlet } from "react-router";


const MainPage = () => {
  return (
    <>
      <Outlet />
      <Footer/>
    </>
  );
};

export default MainPage;
