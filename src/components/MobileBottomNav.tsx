import React from "react";
import { NavLink } from "@/components/NavLink";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const MobileBottomNav: React.FC = () => {
  const { itemCount } = useCart();
  const { user } = useAuth();

  const links = [
    {
      name: "Cart",
      path: "/cart",
      icon: <ShoppingCart className="h-6 w-6" />,
      badge: itemCount,
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: <Heart className="h-6 w-6" />,
      badge: 0,
    },
    {
      name: "Account",
      path: user ? "/account" : "/login",
      icon: <User className="h-6 w-6" />,
      badge: 0,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 flex justify-around items-center h-16 shadow-lg">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className="relative flex flex-col items-center justify-center text-gray-500 hover:text-orange-500 transition-colors"
          activeClassName="text-orange-500"
        >
          {link.icon}
          {link.badge && link.badge > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {link.badge}
            </span>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default MobileBottomNav;
