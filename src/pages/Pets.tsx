import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PetCard from '@/components/PetCard';
import { Pet, Category } from '@/types';
import { STORAGE_KEYS, initializeDemoData } from '@/data/demoData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const Pets: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [pets, setPets] = useState<Pet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  /* ---------------- INITIALIZE DATA ---------------- */
  useEffect(() => {
    initializeDemoData();

    const storedPets = localStorage.getItem(STORAGE_KEYS.PETS);
    const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);

    if (storedPets) setPets(JSON.parse(storedPets));
    if (storedCategories) setCategories(JSON.parse(storedCategories));
  }, []);

  /* ---------------- READ CATEGORY FROM URL ---------------- */
  useEffect(() => {
    const categoryFromURL = searchParams.get('category');

    if (categoryFromURL) {
      setSelectedCategory(decodeURIComponent(categoryFromURL));
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredPets = pets
    .filter(pet => {
      const matchesSearch =
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || pet.category === selectedCategory;

      const matchesPrice =
        pet.price >= priceRange[0] && pet.price <= priceRange[1];

      const matchesStatus =
        statusFilter === 'all' || pet.status === statusFilter;

      return matchesSearch && matchesCategory && matchesPrice && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  /* ---------------- HELPERS ---------------- */
  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 2000]);
    setStatusFilter('all');
    setSortBy('name');
    setSearchParams({});
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategory !== 'all',
    priceRange[0] > 0 || priceRange[1] < 2000,
    statusFilter !== 'all',
  ].filter(Boolean).length;

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl font-bold mb-6">Our Pets</h1>

          {/* SEARCH */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search pets..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* MOBILE FILTER */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2">{activeFiltersCount}</Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          {/* CATEGORY BUTTONS */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <Button
              size="sm"
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSearchParams({})}
            >
              All
            </Button>

            {categories.map(cat => (
              <Button
                key={cat.id}
                size="sm"
                variant={selectedCategory === cat.name ? 'default' : 'outline'}
                onClick={() =>
                  setSearchParams({ category: cat.name })
                }
              >
                {cat.icon} {cat.name}
              </Button>
            ))}
          </div>

          {/* PET GRID */}
          {filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl">🐾</span>
              <h3 className="text-2xl font-semibold mt-4">No pets found</h3>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pets;
