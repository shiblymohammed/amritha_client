import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';

// Lazy load all page components for code splitting
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Events = lazy(() => import('../pages/Events'));
const Booking = lazy(() => import('../pages/Booking'));
const Dining = lazy(() => import('../pages/Dining'));
const DestinationsPage = lazy(() => import('../pages/Destinations'));
const AccommodationPage = lazy(() => import('../pages/AccommodationPage'));
const Gallery = lazy(() => import('../pages/Gallery'));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* Lazy loaded routes with Suspense */}
          <Route 
            path="about" 
            element={
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            } 
          />
          <Route 
            path="contact" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            } 
          />
          <Route 
            path="events" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Events />
              </Suspense>
            } 
          />
          <Route 
            path="booking" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Booking />
              </Suspense>
            } 
          />
          <Route 
            path="dining" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Dining />
              </Suspense>
            } 
          />
          <Route 
            path="destinations" 
            element={
              <Suspense fallback={<PageLoader />}>
                <DestinationsPage />
              </Suspense>
            } 
          />
          <Route 
            path="accommodations" 
            element={
              <Suspense fallback={<PageLoader />}>
                <AccommodationPage />
              </Suspense>
            } 
          />
          <Route 
            path="gallery" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Gallery />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter; 