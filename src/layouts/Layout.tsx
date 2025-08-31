import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "../pages/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
