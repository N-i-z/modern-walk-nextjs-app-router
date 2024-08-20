"use client";

import React from "react";
import { Button } from "../../atoms/Button/button";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  ShoppingCart,
  Trash,
} from "lucide-react";
import useCart from "../../../../../hooks/useCart";
import useWatchlist from "../../../../../hooks/usewatchlist";

interface ProductActionsProps {
  id: string;
  title: string;
  price: number;
  image: string;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  id,
  title,
  price,
  image,
}) => {
  const {
    isInCart,
    handleCartToggle,
    isSignedIn,
    cartQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useCart(id, title, price, image);

  const { isInWatchlist, handleWatchlistToggle } = useWatchlist(
    id,
    title,
    price,
    image
  );

  return (
    <div className="button-container flex items-center gap-4 mt-4">
      <Button
        variant="card"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          handleWatchlistToggle();
        }}
        disabled={!isSignedIn}
        className={`mb-2 ${
          isInWatchlist ? "bg-gray-400 text-black" : "bg-white text-black"
        }`}
      >
        {isInWatchlist ? <EyeOff size={24} /> : <Eye size={24} />}
      </Button>
      <div className="flex justify-center items-center gap-4 mt-2 mb-4">
        {isInCart ? (
          <div className="flex items-center">
            <Button
              variant="card"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                decreaseCartQuantity(id);
              }}
            >
              <ChevronDown />
            </Button>
            <span className="pb-1 ml-4 mr-4">{cartQuantity}</span>
            <Button
              variant="card"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                increaseCartQuantity(id);
              }}
            >
              <ChevronUp />
            </Button>
            <Button
              variant="card"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(id);
              }}
              className="bg-transparent hover:bg-transparent hover:animate-vibrate"
            >
              <Trash className="text-likeblack" />
            </Button>
          </div>
        ) : (
          <Button
            variant="card"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleCartToggle();
            }}
          >
            <ShoppingCart />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductActions;
