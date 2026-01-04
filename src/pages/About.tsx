import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif font-bold mb-4">About PetPals</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            We are passionate about connecting you with your perfect furry friend. PetPals is dedicated to providing healthy, happy, and adorable pets to loving homes.
          </p>
        </div>
      </motion.section>

      {/* Breadcrumbs */}
      <motion.nav
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="bg-gray-50 py-3 px-4 text-sm"
      >
        <div className="container mx-auto flex items-center space-x-2 text-gray-600">
          <Link to="/" className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span>About</span>
        </div>
      </motion.nav>

      {/* About Content */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-serif font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            PetPals started with a simple mission: to bring joy and companionship into every home. Our team carefully selects each pet, ensuring they are healthy, playful, and ready to be your new best friend.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Beyond selling pets, we offer guidance on pet care, nutrition, and wellness. Your furry companion deserves the best, and we are here to support you every step of the way.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80"
            alt="Pets"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="bg-gray-50 py-12"
      >
        <div className="container mx-auto px-4 text-center md:text-left">
          <h2 className="text-3xl font-serif font-bold mb-8">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <MapPin className="h-6 w-6 text-orange-500" />
              <p>123 Pet Street, Animal City, USA</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <Phone className="h-6 w-6 text-orange-500" />
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <Mail className="h-6 w-6 text-orange-500" />
              <p>hello@petpals.com</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default About;
