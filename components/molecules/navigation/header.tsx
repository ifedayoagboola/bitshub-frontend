"use client";

import Link from "next/link";
import Navbar from "./navbar";
import TopBar from "./topBar";
import Image from "next/image";
import { Input } from "@/components/atoms/ui/input";
import { HeartIcon, UserIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/redux/features/root-reducer";
import { generateInitials } from "@/lib/utils";
import { useGetProductsForBuyersQuery } from "@/redux/services/product/productAPIs/productApi";

export default function Header() {
  type Product = {
    id: string;
    name: string;
  };
  const userInfo = useSelector((state: RootState) => state.auth);

  const [query, setQuery] = useState<string>("");

  // Fetch products from the API using Redux Toolkit Query
  const {
    data: productsData,
    error,
    isLoading,
  } = useGetProductsForBuyersQuery(null);

  // Handle the filtered products based on the search query from input field
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    setQuery(input);

    if (productsData?.data) {
      // Filter the products based on the search query from the input field.
      const filtered = productsData.data.filter((product: Product) =>
        product.name.toLowerCase().includes(input.toLowerCase())
      );
      console.log("filtered:", filtered);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      <TopBar />
      <div className="py-4 shadow-sm bg-white lg:mx-10">
        <div className="container flex items-center justify-between ">
          <Link href="/home">
            <Image
              width={128}
              height={40}
              src="/images/bitshub.png"
              alt="bitshub banner"
              className="w-32"
            />
          </Link>
          <div className="hidden w-full flex-col md:max-w-xl relative md:flex ml-3">
            <div className="flex flex-row">
              <span className="absolute left-4 top-3 text-lg text-gray-400">
                <i className="fas fa-search"></i>
              </span>
              <Input
                type="text"
                placeholder="search"
                value={query}
                onChange={handleSearch}
              />
              <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">
                Search
              </button>
            </div>

            {query && (
              <div className="absolute left-0 top-full z-50 border border-gray-300 bg-white text-slate-500 rounded-md p-2 w-48">
                <h3 className="font-bold">All Products</h3>
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error loading products</p>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product: Product) => (
                    <a
                      key={product.id}
                      href={`#product-${product.id}`}
                      className="block py-1 text-neutral-500 hover:underline"
                    >
                      {product.name}
                    </a>
                  ))
                ) : (
                  <p>No products found</p>
                )}
              </div>
            )}
          </div>

          {/* Wishlist, Cart, and Account sections remain unchanged */}
          <div className="flex items-center space-x-5">
            <Link
              href="/wishlist"
              className="text-center text-gray-700 hover:text-primary group transition relative"
            >
              <div className="text-xl md:text-2xl">
                <HeartIcon className="size-7 text-secondary group-hover:text-primary" />
              </div>
              <div className="hidden md:block text-xs leading-3">Wish list</div>
            </Link>
            <Link
              href="/cart"
              className="text-center text-gray-700 hover:text-primary group transition relative"
            >
              <div className="text-xl md:text-2xl">
                <ShoppingCartIcon className="size-7 text-secondary group-hover:text-primary" />
              </div>
              <div className="hidden md:block text-xs leading-3">Cart</div>
            </Link>
            <div className="cursor-pointer relative group">
              <div className="text-center text-gray-700 hover:text-primary group transition relative">
                <p className="text-xl md:text-2xl">
                  <UserIcon className="size-7 text-secondary group-hover:text-primary" />
                </p>
                <p className="hidden md:block text-xs leading-3">
                  {userInfo?.first_name
                    ? generateInitials(
                        `${userInfo.first_name} ${userInfo.last_name}`
                      )
                    : "Account"}
                </p>
              </div>
              <div className="absolute w-[15rem] right-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible z-50">
                {userInfo ? (
                  <p className="px-6 py-3">{`Welcome, ${userInfo.first_name}`}</p>
                ) : (
                  ""
                )}
                <Link
                  href="/manage-account"
                  className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                >
                  <UserIcon className="size-5 text-secondary" />
                  <span className="ml-6 text-gray-600 text-sm">My Account</span>
                </Link>
                <Link
                  href="/order-history"
                  className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                >
                  <Image
                    width={20}
                    height={20}
                    src="/images/package.png"
                    alt="delivery package"
                    className="w-5 h-5 object-contain text-color-red"
                  />
                  <span className="ml-6 text-gray-600 text-sm">My Order</span>
                </Link>
                <div className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                  <Image
                    src="/images/power-off.png"
                    width={20}
                    height={20}
                    alt="logout icon"
                    className="w-5 h-5 object-contain text-color-red"
                  />
                  <span className="ml-6 text-gray-600 text-sm">
                    {userInfo ? (
                      <span
                        onClick={() => {
                          // todo: handle logout
                        }}
                      >
                        Sign Out
                      </span>
                    ) : (
                      <Link href="/login">Sign In</Link>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
