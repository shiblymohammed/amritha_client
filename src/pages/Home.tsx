import Hero from '../components/Home/Hero';
// import Intro from '../components/Home/Intro';
// import VideoZoomSection from '../components/Home/VideoZoomSection';
import DiningSection from '../components/Home/DiningSection'; 
import ContactSection from '../components/Home/ContactSection';
import Destinations from '../components/Home/Destinations';
import AccommodationSection from '../components/Home/AccommodationSection';
import EventsIntroSection from '../components/Home/Events';
import StartSection from '../components/Home/Start';
const Home = () => {
  return (
    <div>
      <Hero />
      {/* <Intro /> */}
      <StartSection />
      {/* <VideoZoomSection /> */}
        <AccommodationSection />
        <DiningSection />
        <EventsIntroSection />
        <Destinations />
        <ContactSection />  
        
    </div>
  );
};

export default Home;
