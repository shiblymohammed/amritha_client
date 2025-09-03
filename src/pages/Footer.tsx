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
    className="text-foreground-subtle hover:text-accent-gold transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 shadow-soft-sunlight hover:shadow-golden-glow-sm rounded-full p-3 bg-background-tertiary hover:bg-accent/10 animate-float"
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
    <footer ref={footerRef} className="relative bg-background pt-40 -mt-50 overflow-hidden">
      {/* Enhanced Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-gold rounded-full mix-blend-multiply filter blur-2xl animate-float"></div>
      </div>

      {/* Heritage Pattern Overlay */}
      <div className="absolute inset-0 heritage-pattern opacity-5"></div>

      {/* This SVG creates the wave shape. It's hidden but used by clip-path. */}
      <svg height="0" width="0" className="absolute">
        <defs>
          <clipPath id="footer-wave" clipPathUnits="objectBoundingBox">
            <path d="M0,0.2 C0.1,0.1,0.3,0,0.5,0 S0.9,0.1,1,0.2 V1 H0 Z" />
          </clipPath>
        </defs>
      </svg>
      
      <div 
        className="relative bg-background-secondary pt-32 pb-12 px-8 shadow-soft-sunlight-lg"
        style={{ clipPath: 'url(#footer-wave)' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Brand & Ethos */}
          <div className="lg:col-span-4" style={{transitionDelay: '100ms'}}>
            <div className={getAnimClass(100)}>
              <a href="#" className="inline-block mb-6 animate-float">
                <span className="text-3xl font-cinzel tracking-widest text-foreground animate-text-shimmer bg-gradient-to-r from-foreground via-accent-gold to-foreground bg-400% bg-clip-text">AMRITHA HERITAGE</span>
                <p className="text-sm font-poppins tracking-wider text-accent uppercase">THIRUVANANTHAPURAM</p>
              </a>
              <p className="font-cormorant text-body text-foreground-subtle leading-relaxed pr-8 animate-fade-in">
                A sanctuary of timeless elegance, preserving the rich colonial history of Thiruvithamkoor for the modern discerning traveler.
              </p>
            </div>
          </div>
          
          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2" style={{transitionDelay: '200ms'}}>
            <div className={getAnimClass(200)}>
              <h3 className="font-playfair text-h4 text-foreground mb-6 animate-text-shimmer bg-gradient-to-r from-foreground via-accent to-foreground bg-400% bg-clip-text">Explore</h3>
              <ul className="space-y-3">
                {['Heritage', 'Rooms', 'Dining', 'Gallery'].map((link, index) => (
                  <li key={link} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <a href="#" className="font-poppins text-foreground-subtle relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-accent-gold after:bottom-0 after:left-0 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform hover:text-accent shadow-golden-glow-sm hover:shadow-golden-glow transition-all duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Contact & Company Links */}
           <div className="lg:col-span-2" style={{transitionDelay: '300ms'}}>
            <div className={getAnimClass(300)}>
              <h3 className="font-playfair text-h4 text-foreground mb-6 animate-text-shimmer bg-gradient-to-r from-foreground via-accent to-foreground bg-400% bg-clip-text">Company</h3>
              <ul className="space-y-3">
                {['About Us', 'Events', 'Contact', 'Location'].map((link, index) => (
                  <li key={link} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <a href="#" className="font-poppins text-foreground-subtle relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-accent-gold after:bottom-0 after:left-0 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform hover:text-accent shadow-golden-glow-sm hover:shadow-golden-glow transition-all duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4" style={{transitionDelay: '400ms'}}>
            <div className={getAnimClass(400)}>
              <h3 className="font-playfair text-h4 text-foreground mb-6 animate-text-shimmer bg-gradient-to-r from-foreground via-accent to-foreground bg-400% bg-clip-text">Stay Connected</h3>
              <p className="font-cormorant text-foreground-subtle mb-4 animate-fade-in">Receive heritage insights and exclusive offers directly to your inbox.</p>
              <form className="flex animate-fade-in-up">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-background border border-border rounded-l-md font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 hover:bg-background-tertiary shadow-soft-sunlight"
                />
                <button
                  type="submit"
                  className="btn btn-primary px-6 py-3 text-sm font-semibold rounded-r-md rounded-l-none shadow-soft-sunlight hover:shadow-golden-glow-sm animate-float transition-all duration-300"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Enhanced Sub-Footer */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in-up">
          <p className="text-xs font-poppins text-foreground-subtle animate-text-shimmer bg-gradient-to-r from-foreground-subtle via-accent to-foreground-subtle bg-400% bg-clip-text">
            © 2025 Amritha Heritage. All Rights Reserved.
          </p>
          <div className="flex items-center flex-wrap gap-4 text-xs font-poppins text-foreground-subtle">
            <span>Phone: +91 471 2220024 / 2220025 · +91 471</span>
            <span>Email: <a href="mailto:info@amrithaheritage.com" className="hover:text-accent transition-colors">info@amrithaheritage.com</a></span>
            <a href="tel:+914712220024" className="btn btn-primary px-3 py-1 animate-float">Call Now</a>
          </div>
          <div className="flex items-center space-x-4">
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