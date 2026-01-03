import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { Category } from "@/types";
import { STORAGE_KEYS, initializeDemoData } from "@/data/demoData";
import { Input } from "@/components/ui/input";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    initializeDemoData();

    const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-serif text-4xl font-bold">
              Pet Categories
            </h1>
            <p className="text-muted-foreground mt-2">
              Explore pets by category
            </p>
          </div>

          {/* Search */}
          <div className="mb-8 flex justify-center sm:justify-start">
            <Input
              placeholder="Search categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="sm:max-w-xs"
            />
          </div>

          {/* Categories Grid */}
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg font-medium">
                No categories found 🐾
              </p>
              <p className="text-muted-foreground mt-2">
                Try a different search term
              </p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
