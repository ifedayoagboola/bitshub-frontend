import { OwlOptions } from 'ngx-owl-carousel-o';

export const homeBannerSlider: OwlOptions = {
  loop: true,
  nav: true,
  dots: false,
  autoHeight:true,
  navText: [
    "<i class='ri-arrow-left-s-line'></i>",
    "<i class='ri-arrow-right-s-line'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },
  },
};

export const productOption: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 24,
  items: 6,
  responsive: {
    0: {
      items: 1,
      margin: 16,
      autoHeight:true,
    },
    430: {
      items: 2,
      margin: 16,
    },
    576: {
      items: 3,
    },
    768: {
      items: 4,
    },
    991: {
      items: 5,
    },
    1296: {
      items: 6,
    },
  },
};


export const productSlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 24,
  items: 6,
  responsive: {
    0: {
      items: 1,
      margin: 16,
      autoHeight:true,
    },
    247: {
      items: 2,
      margin: 16,
    },
    650: {
      items: 3,
    },
    1000: {
      items: 4,
    },
    1199: {
      items: 5,
    },
    1400: {
      items: 6,
    },
  },
};


export const horizontalProductSlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 24,
  items: 4,
  responsive: {
    0: {
      items: 1,
      autoHeight:true,
    },
    890: {
      items: 2,
    },
    999: {
      items: 3,
    },
  },
};

export const BlogSlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 5000,
  margin: 24,
  responsive: {
    0: {
      items: 1,
      autoHeight:true,
    },
    668: {
      items: 2,
    },
    999: {
      items: 3,
    },
  },
};

export const SocialMediaSlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  responsive: {
    0: {
      items: 3,
    },
    480: {
      items: 4,
    },
    600: {
      items: 5,
    },
    1024: {
      items: 6,
    },
    1367: {
      items: 7,
    },
  },
};

export const BrandSlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 20,
  responsive: {
    0: {
      items: 2,
      margin: 12,
      // autoHeight:true,
    },
    480: {
      items: 3,
      margin: 12,
    },
    767: {
      items: 4,
      margin: 20,
    },
    1024: {
      items: 5,
      margin: 20,
    },
    1500: {
      items: 6,
      margin: 20,
    },
  },
};

export const categorySlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 24,
  responsive: {
    0: {
      items: 2,
      margin: 12,
      autoHeight: true,
    },
    480: {
      items: 3,
      margin: 12,
      autoHeight: true,
    },
    576: {
      margin: 12,
    },
    668: {
      items: 4,
    },
    900: {
      items: 5,
    },
  },
};

export const FurnitureCategorySlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 24,
  responsive: {
    0: {
      items: 2,
      mouseDrag: true,
    },
    480: {
      items: 3,
      mouseDrag: true,
    },
    768: {
      items: 4,
      mouseDrag: true,
    },
    1024: {
      items: 5,
      mouseDrag: true,
    },
    1368: {
      items: 6,
      mouseDrag: false,
    },
  },
};

// Product Main Thumb Slider
export const productMainThumbSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  dotsData: true,
  autoplayHoverPause: true,
  nav: true,
  navText: [
    "<i class='ri-arrow-left-s-line'></i>",
    "<i class='ri-arrow-right-s-line'></i>",
  ],
  autoplay: false,
  navSpeed: 300,
  autoHeight: true,
  responsive: {
    0: {
      items: 1,
    },
  },
};

// Product Thumbnail Slider
export const productThumbSlider: OwlOptions = {
  loop: false,
  dots: false,
  margin: 16,
  navSpeed: 300,
  autoHeight: true,
  items: 4,
  responsive: {
    0: {
      items: 2,
      autoHeight:true,
    },
    400: {
      items: 3,
    },
    485: {
      items: 4,
    },
  },
};

export const productSliderLayout: OwlOptions = {
  items: 4,
  loop: true,
  dots: false,
  margin: 15,
  navSpeed: 300,
  responsive: {
    0: {
      items: 2,
      autoplay: true,
      autoplayTimeout: 4500,
    },
    527: {
      items: 3,
      autoplay: true,
      autoplayTimeout: 4500,
    },
    750: {
      items: 4,
    },
  },
};

// Jewellery Category Slider
export const JewelleryCategorySlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 24,
  responsive: {
    0: {
      items: 1,
      mouseDrag: true,
      autoHeight:true,
    },
    562: {
      items: 2,
      mouseDrag: true,
    },
    992: {
      items: 3,
      mouseDrag: true,
    },
    1200: {
      items: 4,
      mouseDrag: false,
    },
  },
};

export const bagsProduct: OwlOptions = {
  loop: true,
  dots: false,
  nav: true,
  navText: [
    "<i class='ri-arrow-left-s-line'></i>",
    "<i class='ri-arrow-right-s-line'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },
  },
};

// Category Slider
export const collectionCategorySlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  items: 7,
  margin: 20,
  responsive: {
    0: {
      margin: 16,
      items: 2,
      autoHeight:true,
    },
    400: {
      margin: 16,
      items: 3,
    },
    490: {
      margin: 16,
      items: 4,
    },
    680: {
      items: 5,
    },
    880: {
      items: 6,
    },
    1024: {
      items: 7,
    },
  },
};

// Tools Category Slider
export const toolsCategorySlider: OwlOptions = {
  loop: false,
  nav: false,
  dots: false,
  margin: 20,
  responsive: {
    0: {
      items: 1,
      autoHeight:true,
    },
    586: {
      items: 2,
    },
    991: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

export const compareSlider: OwlOptions = {
  loop: false,
  nav: false,
  dots: false,
  responsive: {
    0: {
      items: 1,
      autoHeight:true,
    },
    668: {
      items: 2,
    },
    992: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

export const testimonialSlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 3000,
  responsive: {
    0: {
      items: 1,
      autoHeight:true,
    },
    992: {
      items: 2,
    },
  },
};

export const teamSlider: OwlOptions = {
  loop: true,
  nav: true,
  dots: false,
  autoplay: true,
  autoplayTimeout: 3000,
  margin: 24,
  navText: [
    "<i class='ri-arrow-left-s-line'></i>",
    "<i class='ri-arrow-right-s-line'></i>",
  ],
  responsive: {
    0: {
      items: 2,
      autoHeight:true,
    },
    992: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};


// Product Slider == 6 products per row
// ======================================
export const productSlider6: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 24,
  items: 6,
  responsive: {
    0: {
      items: 1,
      margin: 16,
      autoHeight:true,
    },
    430: {
      items: 2,
      margin: 16,
    },
    576: {
      items: 3,
    },
    768: {
      items: 4,
    },
    991: {
      items: 5,
    },
    1296: {
      items: 6,
    },
  },
};

// Product Slider == 5 product per row
// ======================================
export const productSlider5: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 24,
  items: 6,
  responsive: {
    0: {
      items: 2,
      margin: 16,
      autoHeight:true,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
    1199: {
      items: 5,
    },
    1400: {
      items: 6,
    },
  },
};

// Product Slider == 4 product per row
// ======================================
export const productSlider4: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 24,
  items: 4,
  responsive: {
    0: {
      items: 2,
      margin: 16,
      autoHeight:true,
    },
    576: {
      items: 3,
    },
    915: {
      items: 4,
    },
  },
};


// Product Slider == 3 product per row
// ======================================
export const productSlider3: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 24,
  items: 4,
  responsive: {
    0: {
      items: 1,
      margin: 16,
      autoHeight:true,
    },
    576: {
      items: 2,
    },
    915: {
      items: 3,
    },
  },
};


// Product Slider == 2 product per row
// ======================================
export const productSlider2: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 24,
  items: 2,
  responsive: {
    0: {
      items: 1,
      margin: 16,
      autoHeight:true,
    },
    576: {
      items: 2,
    },
  },
};

// Blog slider == 4 blog
// =======================================
export const blogSlider4: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 5000,
  margin: 24,
  responsive: {
    0: {
      items: 1,
      autoHeight:true,
    },
    516: {
      items: 2,
    },
    700: {
      items: 3,
    },
    1115: {
      items: 4,
    },
  },
};



// Blog slider == 3 blog
// ==========================================
export const blogSlider3: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 5000,
  margin: 24,
  responsive: {
    0: {
      items: 1,
      autoHeight:true,
    },
    668: {
      items: 2,
    },
    999: {
      items: 3,
    },
  },
};

export const attributeSlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 24,
  responsive: {
    0: {
      items: 1
    },
    430: {
      items: 2,
    },
    576: {
      items: 3,
    },
    768: {
      items: 4,
    },
    991: {
      items: 5,
    },
  }
}
