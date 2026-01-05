import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PetCard from '@/components/PetCard';
import CategoryCard from '@/components/CategoryCard';
import { FlyingBirds } from '@/components/BirdAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pet, Category } from '@/types';
import { STORAGE_KEYS, initializeDemoData } from '@/data/demoData';
import { 
  ArrowRight, 
  Search, 
  Star, 
  Truck, 
  Shield, 
  HeartHandshake,
  Sparkles,
  Package
} from 'lucide-react';

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
    { 
      icon: Star, 
      title: 'Premium Quality', 
      description: 'All our pets are health-checked and come from trusted breeders.',
      gradient: 'from-yellow-400 to-orange-500'
    },
    { 
      icon: Truck, 
      title: 'Safe Delivery', 
      description: 'We ensure safe and comfortable transportation for all pets.',
      gradient: 'from-blue-400 to-cyan-500'
    },
    { 
      icon: Shield, 
      title: 'Health Guarantee', 
      description: '30-day health guarantee on all pet purchases.',
      gradient: 'from-green-400 to-emerald-500'
    },
    { 
      icon: HeartHandshake, 
      title: 'Expert Support', 
      description: '24/7 support from our pet care specialists.',
      gradient: 'from-pink-400 to-rose-500'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-500 via-purple-500 to-blue-500 animate-gradient-xy" />
        {/* Dog Photo */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920')] bg-cover bg-center opacity-40 mix-blend-soft-light" />
        
        <FlyingBirds />
        
        <div className="container mx-auto px-4 text-center relative z-10 py-20">
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <Badge className="mb-6 px-4 py-2 text-sm bg-white/20 backdrop-blur-md border-white/30 text-white">
              <Sparkles className="h-3 w-3 mr-2" />
              Trusted by 10,000+ Pet Lovers
            </Badge>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up opacity-0 text-white drop-shadow-2xl" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Find Your Perfect
            <span className="block bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
              Pet Companion
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-lg animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Discover your new best friend at PetPals. We connect loving families with adorable pets, 
            making dreams come true one paw at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-12 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for pets, breeds, categories..." 
                className="pl-12 h-14 text-lg bg-white/95 backdrop-blur-md border-2 shadow-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link to={`/pets${searchTerm ? `?search=${searchTerm}` : ''}`}>
              <Button className="btn-gradient h-14 px-10 text-lg shadow-2xl hover:shadow-3xl transition-all">
                Explore Pets <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {/* Quick Category Links */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            {categories.slice(0, 6).map(cat => (
              <Link 
                key={cat.id}
                to={`/pets?category=${cat.name}`}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 hover:scale-105 transition-all text-white font-medium shadow-lg"
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20">
              <Package className="h-3 w-3 mr-2" />
              Explore Our Collection
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Browse by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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

          <div className="text-center mt-12">
            <Link to="/categories">
              <Button variant="outline" className="h-12 px-8">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Pets Section */}
      <section className="py-24 bg-gradient-to-br from-muted/50 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <Badge className="mb-4 px-4 py-2 bg-accent/10 text-accent border-accent/20">
                <Star className="h-3 w-3 mr-2" />
                Featured Selection
              </Badge>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3">
                Featured <span className="text-gradient">Pets</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Meet our adorable pets looking for their forever homes
              </p>
            </div>
            <Link to="/pets">
              <Button variant="outline" className="h-12 px-8 mt-4 md:mt-0">
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

          {featuredPets.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No featured pets available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-gradient">PetPals?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to helping you find your perfect companion with exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title}
                  className="text-center border-2 card-hover bg-gradient-to-br from-white to-muted/30 animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <CardContent className="pt-8 pb-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-pink-500 to-purple-600" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-white">
              Ready to Meet Your New Best Friend?
            </h2>
            <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of happy pet owners who found their perfect companions through PetPals. 
              Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pets">
                <Button className="bg-white text-primary hover:bg-white/90 h-14 px-10 text-lg shadow-2xl">
                  Browse All Pets
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 h-14 px-10 text-lg backdrop-blur-md">
                  Explore Categories
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
