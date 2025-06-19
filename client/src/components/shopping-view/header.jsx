import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

function Header() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleTryOnClick = () => {
    window.open("http://localhost:5001", "_blank");
  };

  console.log("Rendering Header component");

  return (
    <nav className="flex items-center space-x-4">
      <Button
        variant="ghost"
        onClick={() => handleNavigate('/shop/home')}
        className="text-gray-700 hover:text-primary"
      >
        Home
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleNavigate('/shop/listing')}
        className="text-gray-700 hover:text-primary"
      >
        Products
      </Button>
      <Button
        variant="ghost"
        onClick={handleTryOnClick}
        className="text-gray-700 hover:text-primary"
      >
        Try-On
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleNavigate('/shop/outfit')}
        className="text-gray-700 hover:text-primary border border-red-500"
      >
        Outfit
      </Button>
    </nav>
  );
}

export default Header;