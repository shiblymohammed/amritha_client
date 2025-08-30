import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "../pages/Footer";
import HeritageLoader from "./HeritageLoader";
import { usePageLoader } from "../hooks/usePageLoader";

const Layout = () => {
  const { isLoading } = usePageLoader({
    initialDelay: 300,
    minLoadingTime: 2000
  });

  return (
    <>
      {isLoading ? (
        <HeritageLoader
          isLoading={isLoading}
          logoSrc="/logoBlack.png"
          text="Welcome to Amritha Heritage"
          minDisplayTime={3000}
        />
      ) : (
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
