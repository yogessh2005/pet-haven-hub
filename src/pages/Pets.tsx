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
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    initializeDemoData();
    const storedPets = localStorage.getItem(STORAGE_KEYS.PETS);
    const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (storedPets) setPets(JSON.parse(storedPets));
    if (storedCategories) setCategories(JSON.parse(storedCategories));
  }, []);

  const filteredPets = pets
    .filter(pet => {
      const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pet.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || pet.category === selectedCategory;
      const matchesPrice = pet.price >= priceRange[0] && pet.price <= priceRange[1];
      const matchesStatus = statusFilter === 'all' || pet.status === statusFilter;
      return matchesSearch && matchesCategory && matchesPrice && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 2000]);
    setStatusFilter('all');
    setSortBy('name');
    setSearchParams({});
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategory !== 'all',
    priceRange[0] > 0 || priceRange[1] < 2000,
    statusFilter !== 'all'
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <label className="font-medium mb-2 block">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.icon} {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="font-medium mb-2 block">Price Range</label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={2000}
            step={50}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <label className="font-medium mb-2 block">Availability</label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            <SelectItem value="unavailable">Unavailable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort By */}
      <div>
        <label className="font-medium mb-2 block">Sort By</label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        <X className="mr-2 h-4 w-4" /> Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold mb-2">Our Pets</h1>
            <p className="text-muted-foreground">Find your perfect companion from our selection of adorable pets</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search pets by name, breed..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Mobile Filter Button */}
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
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Category Chips */}
            <div className="hidden md:flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.icon} {cat.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden md:block w-64 shrink-0">
              <div className="sticky top-24 p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-4">Filters</h3>
                <FilterContent />
              </div>
            </aside>

            {/* Pet Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <p className="text-muted-foreground">
                  Showing {filteredPets.length} pet{filteredPets.length !== 1 ? 's' : ''}
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredPets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPets.map((pet, index) => (
                    <div 
                      key={pet.id}
                      className="animate-fade-in-up opacity-0"
                      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                    >
                      <PetCard pet={pet} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <span className="text-6xl mb-4 block">🐾</span>
                  <h3 className="font-serif text-2xl font-semibold mb-2">No pets found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search term</p>
                  <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pets;
