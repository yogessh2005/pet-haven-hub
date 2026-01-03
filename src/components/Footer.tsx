import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🐾</span>
              <span className="font-serif text-2xl font-bold text-gradient">PetPals</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted partner in finding the perfect pet companion. Quality pets, happy families.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/pets" className="text-muted-foreground hover:text-primary transition-colors">Browse Pets</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Pet Categories */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Pet Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/pets?category=Dogs" className="text-muted-foreground hover:text-primary transition-colors">🐕 Dogs</Link></li>
              <li><Link to="/pets?category=Cats" className="text-muted-foreground hover:text-primary transition-colors">🐱 Cats</Link></li>
              <li><Link to="/pets?category=Birds" className="text-muted-foreground hover:text-primary transition-colors">🦜 Birds</Link></li>
              <li><Link to="/pets?category=Fish" className="text-muted-foreground hover:text-primary transition-colors">🐠 Fish</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>📍 123 Pet Street, Animal City</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>✉️ hello@petpals.com</li>
              <li>🕒 Mon-Sat: 9AM - 8PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>© 2024 PetPals. All rights reserved. Made with ❤️ for pet lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
