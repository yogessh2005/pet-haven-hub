import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PetCard from '@/components/PetCard';
import CategoryCard from '@/components/CategoryCard';
import { FlyingBirds } from '@/components/BirdAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pet, Category } from '@/types';
import { STORAGE_KEYS, initializeDemoData } from '@/data/demoData';
import { ArrowRight, Search, Star, Truck, Shield, HeartHandshake } from 'lucide-react';

const Index: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    initializeDemoData();
    const storedPets = localStorage.getItem(STORAGE_KEYS.PETS);
    const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (storedPets) setPets(JSON.parse(storedPets));
    if (storedCategories) setCategories(JSON.parse(storedCategories));
  }, []);

  const featuredPets = pets.filter(p => p.status === 'available').slice(0, 4);

  const features = [
    { icon: Star, title: 'Quality Pets', description: 'All our pets are health-checked and come from trusted breeders.' },
    { icon: Truck, title: 'Safe Delivery', description: 'We ensure safe and comfortable transportation for all pets.' },
    { icon: Shield, title: 'Health Guarantee', description: '30-day health guarantee on all pet purchases.' },
    { icon: HeartHandshake, title: 'Expert Support', description: '24/7 support from our pet care specialists.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, hsl(30 40% 98% / 0.9), hsl(30 40% 98% / 0.95)), url('https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <FlyingBirds />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="inline-block text-6xl mb-6 animate-float">🐾</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Find Your Perfect
            <span className="block text-gradient">Pet Companion</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Discover your new best friend at PetPals. We connect loving families with adorable pets, making dreams come true one paw at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for pets..." 
                className="pl-10 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link to={`/pets${searchTerm ? `?search=${searchTerm}` : ''}`}>
              <Button className="btn-gradient h-12 px-8">
                Explore Pets <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            {categories.slice(0, 4).map(cat => (
              <Link 
                key={cat.id}
                to={`/pets?category=${cat.name}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border hover:border-primary transition-colors"
              >
                <span>{cat.icon}</span>
                <span className="font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
      
      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find the perfect pet that matches your lifestyle from our wide selection of categories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Pets Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="font-serif text-4xl font-bold mb-2">Featured Pets</h2>
              <p className="text-muted-foreground">Meet our adorable pets looking for their forever homes</p>
            </div>
            <Link to="/pets">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPets.map((pet, index) => (
              <div 
                key={pet.id}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <PetCard pet={pet} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Why Choose PetPals?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We're committed to helping you find your perfect companion with exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center p-6 rounded-xl bg-card border card-hover animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl font-bold mb-6">Ready to Meet Your New Best Friend?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of happy pet owners who found their perfect companions through PetPals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pets">
                <Button className="btn-gradient h-12 px-8 text-lg">
                  Browse All Pets
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="h-12 px-8 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
