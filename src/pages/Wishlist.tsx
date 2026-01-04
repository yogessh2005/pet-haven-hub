import Navbar from "@/components/Navbar";
import { Heart } from "lucide-react";

const Wishlist = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="mx-auto h-14 w-14 text-orange-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-gray-600">
          Your favorite pets will appear here.
        </p>

        {/* Later: map wishlist items here */}
      </div>
    </div>
  );
};

export default Wishlist;
