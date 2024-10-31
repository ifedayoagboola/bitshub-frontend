"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { categories } from "@/lib/data/categoryData";

interface CategoryItem {
  name: string;
  icon: string;
}

interface Category {
  title: string;
  items: CategoryItem[];
}

export default function Accesories() {
  const freeTime: Category | undefined = categories.find(
    (category) => category.title === "Free Time"
  );

  if (!freeTime) {
    return <p>No top categories found!</p>;
  }

  const { items } = freeTime;

  return (
    <Swiper
      navigation
      pagination
      modules={[Navigation, Pagination]}
      className="mySwiper"
      slidesPerView={3}
      spaceBetween={30}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {items.map((item: CategoryItem, index: number) => (
        <SwiperSlide key={index}>
          <div className="category-card p-4 border rounded-lg shadow-lg">
            <img
              src={item.icon}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold mt-4">{item.name}</h3>{" "}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
