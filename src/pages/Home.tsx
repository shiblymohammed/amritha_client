import Hero from '../components/Home/Hero';
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
      <StartSection />
      <AccommodationSection />
      <DiningSection />
      <EventsIntroSection />
      <Destinations />
      <ContactSection />  
        
    </div>
  );
};

export default Home;
