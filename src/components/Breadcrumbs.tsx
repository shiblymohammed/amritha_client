import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) {
    return null; // Don't render on homepage
  }

  return (
    <nav className="container mx-auto px-6 lg:px-8 py-4">
      <ol className="flex items-center space-x-2 text-sm text-text-subtle">
        <li>
          <Link to="/" className="hover:text-action-accent">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const name = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

          return (
            <li key={to} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-text-heading font-medium">{name}</span>
              ) : (
                <Link to={to} className="hover:text-action-accent">{name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
