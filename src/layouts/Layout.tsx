import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
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
          <motion.a
            href="/booking"
            className="sm:hidden fixed bottom-4 right-4 bg-action-accent text-white px-6 py-3 rounded-full font-semibold shadow-lg z-50"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            whileHover={{ scale: 1.1 }}
          >
            Book Now
          </motion.a>
        </div>
      )}
    </>
  );
};

export default Layout;
