import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { Category, Pet } from "@/types";
import { STORAGE_KEYS, initializeDemoData } from "@/data/demoData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Grid3x3, List, ArrowRight, Sparkles } from "lucide-react";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    initializeDemoData();

    const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    const storedPets = localStorage.getItem(STORAGE_KEYS.PETS);
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
    if (storedPets) {
      setPets(JSON.parse(storedPets));
    }
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase()) ||
    category.description.toLowerCase().includes(search.toLowerCase())
  );

  // Get pet count for each category
  const getCategoryPetCount = (categoryName: string) => {
    return pets.filter(pet => 
      pet.category.toLowerCase() === categoryName.toLowerCase() && 
      pet.status === 'available'
    ).length;
  };

  const totalPets = pets.filter(p => p.status === 'available').length;

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1920')] bg-cover bg-center opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Explore Pet <span className="text-gradient">Categories</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover your perfect companion from our wide selection of pet categories. 
              Each category offers unique breeds and personalities to match your lifestyle.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
                <span className="font-semibold text-primary">{categories.length}</span>
                <span className="text-muted-foreground">Categories</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
                <span className="font-semibold text-primary">{totalPets}</span>
                <span className="text-muted-foreground">Available Pets</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
                <span className="font-semibold text-primary">100%</span>
                <span className="text-muted-foreground">Health Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Search and Filter Bar */}
          <Card className="mb-8 border-2">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search categories by name or description..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <div className="flex items-center gap-2 border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-9"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-9"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {search && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Found {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} matching "{search}"
                </div>
              )}
            </CardContent>
          </Card>

          {/* Categories Grid/List */}
          {filteredCategories.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
            }>
              {filteredCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <CategoryCard 
                    category={category}
                    petCount={getCategoryPetCount(category.name)}
                    viewMode={viewMode}
                  />
                </div>
              ))}
            </div>
          ) : (
            <Card className="py-20">
              <CardContent className="text-center">
                <div className="mb-6">
                  <Search className="h-16 w-16 mx-auto text-muted-foreground/50" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-2">
                  No categories found
                </h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any categories matching "{search}". Try a different search term.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}

          {/* CTA Section */}
          {filteredCategories.length > 0 && (
            <Card className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border-2">
              <CardContent className="p-8 text-center">
                <h2 className="font-serif text-3xl font-bold mb-4">
                  Can't Find What You're Looking For?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Browse all our available pets or contact us for special requests. 
                  We're here to help you find your perfect companion.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/pets">
                    <Button className="btn-gradient h-12 px-8">
                      Browse All Pets
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="h-12 px-8">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
