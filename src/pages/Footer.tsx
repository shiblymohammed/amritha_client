import { useState, useEffect, useRef } from 'react';

// Re-usable Social Icon component for cleaner code
interface SocialIconProps {
  href: string;
  title: string;
  children: React.ReactNode;
}

const SocialIcon = ({ href, title, children }: SocialIconProps) => (
  <a
    href={href}
    title={title}
    className="text-text/subtle hover:text-action-accent transition-all duration-300 transform hover:-translate-y-1"
  >
    {children}
  </a>
);

// Icon components (can be replaced with an icon library if you prefer)
const FacebookIcon = () => ( <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg> );
const InstagramIcon = () => ( <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.398 1.363.444 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.046 1.064-.197 1.791-.444 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.398-2.427.444-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.046-1.791-.197-2.427-.444a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.398-1.363-.444-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.046-1.064.197-1.791.444-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.5 2.525c.636-.247 1.363-.398 2.427-.444C9.97 2.013 10.324 2 12.315 2zm...z" clipRule="evenodd" /></svg> );
const TwitterIcon = () => ( <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg> );

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -100px 0px' } // Trigger when 100px from the bottom
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => { if (footerRef.current) observer.unobserve(footerRef.current); };
  }, []);

  const getAnimClass = (_delay: number) => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

  return (
    <footer ref={footerRef} className="relative bg-background pt-40 -mt-50">
      {/* This SVG creates the wave shape. It's hidden but used by clip-path. */}
      <svg height="0" width="0" className="absolute">
        <defs>
          <clipPath id="footer-wave" clipPathUnits="objectBoundingBox">
            <path d="M0,0.2 C0.1,0.1,0.3,0,0.5,0 S0.9,0.1,1,0.2 V1 H0 Z" />
          </clipPath>
        </defs>
      </svg>
      
      <div 
        className="relative bg-background-secondary pt-32 pb-12 px-8"
        style={{ clipPath: 'url(#footer-wave)' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Brand & Ethos */}
          <div className="lg:col-span-4" style={{transitionDelay: '100ms'}}>
            <div className={getAnimClass(100)}>
              <a href="#" className="inline-block mb-6">
                <span className="text-3xl font-cinzel tracking-widest text-text-heading">AMRITHA HERITAGE</span>
                <p className="text-sm font-poppins tracking-[0.2em] text-text-subtle">THIRUVANANTHAPURAM</p>
              </a>
              <p className="font-cormorant text-body text-text leading-relaxed pr-8">
                A sanctuary of timeless elegance, preserving the rich colonial history of Thiruvithamkoor for the modern discerning traveler.
              </p>
            </div>
          </div>
          
          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2" style={{transitionDelay: '200ms'}}>
            <div className={getAnimClass(200)}>
              <h3 className="font-playfair text-h4 text-text-heading mb-6">Explore</h3>
              <ul className="space-y-3">
                {['Heritage', 'Rooms', 'Dining', 'Gallery'].map(link => (
                  <li key={link}><a href="#" className="font-poppins text-text-subtle relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-action-accent after:bottom-0 after:left-0 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform">
                    {link}
                  </a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Contact & Company Links */}
           <div className="lg:col-span-2" style={{transitionDelay: '300ms'}}>
            <div className={getAnimClass(300)}>
              <h3 className="font-playfair text-h4 text-text-heading mb-6">Company</h3>
              <ul className="space-y-3">
                {['About Us', 'Events', 'Contact', 'Location'].map(link => (
                  <li key={link}><a href="#" className="font-poppins text-text-subtle relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-action-accent after:bottom-0 after:left-0 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform">
                    {link}
                  </a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4" style={{transitionDelay: '400ms'}}>
            <div className={getAnimClass(400)}>
              <h3 className="font-playfair text-h4 text-text-heading mb-6">Stay Connected</h3>
              <p className="font-cormorant text-text-subtle mb-4">Receive heritage insights and exclusive offers directly to your inbox.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-background border border-border-soft rounded-l-md font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent transition"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-action-primary hover:bg-action-primary-hover text-text-on-color font-poppins text-sm font-semibold rounded-r-md transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Sub-Footer */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border-soft flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-poppins text-text-subtle">
            © 2025 Amritha Heritage. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6">
            <SocialIcon href="#" title="Facebook"><FacebookIcon /></SocialIcon>
            <SocialIcon href="#" title="Instagram"><InstagramIcon /></SocialIcon>
            <SocialIcon href="#" title="Twitter"><TwitterIcon /></SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;