import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Events from '../pages/Events';
import Booking from '../pages/Booking';
import Dining from '../pages/Dining';
import DestinationsPage from '../pages/Destinations';
import AccommodationPage from '../pages/AccommodationPage';
import Gallery from '../pages/Gallery';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="events" element={<Events />} />
          <Route path="booking" element={<Booking />} />
          <Route path="dining" element={<Dining />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="accommodations" element={<AccommodationPage/> } />
          <Route path="gallery" element={<Gallery />} />


        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter; 