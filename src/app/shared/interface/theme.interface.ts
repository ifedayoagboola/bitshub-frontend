import { PaginateModel } from "./core.interface";

export interface ThemesModel extends PaginateModel {
  data: Themes[];
}

export interface Themes {
  id: number
  name: string
  slug: string
  image: string
  status: number | boolean
  created_at?: string
  updated_at?: string
}

export interface HomeBanner {
  background_image?: string;
  status: boolean;
  banners: Banners[];
}

export interface Banners {
  title?: string;
  description?: string;
  tag?: string;
  offer?: string;
  button_text: string;
  redirect_link: RedirectLink;
  image_url: string;
  status: boolean;
}
export interface RedirectLink {
  link_type: string;
  link: string | number;
  product_ids: number;
}

export interface FeaturedBannersFashionOne {
  banner_1?: FeaturedBanner;
  banner_2: FeaturedBanner;
}
export interface FeaturedBanner {
  redirect_link?: RedirectLink;
  image_url: string;
  tag?: string;
  title?: string;
  sub_title?: string;
  status: boolean;
}

export interface ProductList {
  tag?: string;
  title: string;
  sub_title?: string;
  description?: string;
  image_url?: string;
  product_ids: number[];
  status?: boolean;
}

export interface Link {
  redirect_link: RedirectLink;
  image_url: string;
}

export interface ParallaxBanner {
  main_title: string;
  title: string;
  sub_title: string;
  image_url: string;
  status: boolean;
}

export interface ProductTabSection {
  tag?: string;
  title?: string;
  sub_title?: string;
  description?: string;
  image_url?:string;
  category_ids: number[];
  status: boolean;
}

export interface Service {
  status: boolean;
  banners: Banners[]
}

export interface SocialMedia {
  title?: string;
  status: boolean;
  banners: Banners[];
}

export interface Brands {
  brand_ids: number[];
  status: boolean;
}

export interface FeaturedBanners {
  title?: string
  status: boolean;
  banners: Banners[];
}

export interface MainContent {
  status: boolean;
  sidebar: Sidebar;
  section1_products: ProductSection;
  section2_categories_list: CategoriesSection;
  section3_two_column_banners: TwoBanners;
  section4_products: ProductSection;
  section5_coupons: FullWidthBanner;
  section6_two_column_banners: TwoBanners;
  section7_products: ProductSection;
  section8_full_width_banner: FullWidthBanner;
  section9_featured_blogs: BlogSection;
}

export interface Sidebar {
  status: boolean;
  categories_icon_list: CategoriesIconList;
  left_side_banners: TwoBanners;
  sidebar_products: SidebarProducts;
}

export interface CategoriesIconList {
  title: string;
  description?: string;
  category_ids: number[];
  status: boolean;
}

export interface TwoBanners {
  status: boolean;
  banner_1: Link;
  banner_2: Link;
}

export interface SidebarProducts {
  tag?:string;
  title: string;
  product_ids: number[];
  status: boolean;
}

export interface ProductSection {
  title: string;
  description?: string;
  product_ids: number[];
  status: boolean;
}

export interface CategoriesSection {
  title: string;
  description: string;
  category_ids?: number[];
  image_url: string;
  status: boolean;
}

export interface FullWidthBanner {
  redirect_link: RedirectLink;
  image_url: string;
  status: boolean;
}

export interface BlogSection {
  tag?: string;
  title: string;
  sub_title?: string;
  description?: string;
  status: boolean;
  blog_ids: number[];
}

export interface NewsLetter {
  title: string;
  sub_title: string;
  image_url: string;
  status: boolean;
}

// Gradient Interface
export interface Gradient {
  id: number;
  content: GradientContent;
  slug: string;
}

export interface GradientContent {
  home_banner: HomeBanner;
  categories_1: ProductCategoryFashionFour;
  offer_banner: HomeBanner;
  category_product: ProductTabSection;
  categories_2: ProductCategoryFashionFour;
  products_list: ProductList;
  parallax_banner: ParallaxBannerGradient;
  featured_blogs: BlogSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

export interface ParallaxBannerGradient {
  banner_1?: ParallaxBanner;
  banner_2: ParallaxBanner;
}

// FashionOne Interface
export interface FashionOne {
  id: number;
  content: FashionOneContent;
  slug: string;
}

export interface FashionOneContent {
  home_banner: HomeBanner;
  offer_banner: FeaturedBannersFashionOne;
  products_list: ProductList;
  banner: FeaturedBanner;
  category_product: ProductTabSection;
  services: Service;
  featured_blogs: BlogSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

// Fashion Two Interface
export interface FashionTwo {
  id: number;
  content: FashionTwoContent;
  slug: string;
}

export interface FashionTwoContent {
  home_banner: HomeBanner;
  offer_banner: FeaturedBannersFashionTwo;
  category_product: ProductTabSection;
  full_banner: FeaturedBanner;
  slider_products: SliderProduct;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

export interface FeaturedBannersFashionTwo {
  status?: boolean;
  banner_1: FeaturedBanner;
  banner_2: FeaturedBanner;
  banner_3: FeaturedBanner;
  banner_4: FeaturedBanner;
}

export interface SliderProduct {
  status: boolean;
  tag?: string;
  title?: string;
  image_url?: string;
  product_slider_1: ProductSection;
  product_slider_2: ProductSection;
  product_slider_3: ProductSection;
  product_slider_4?: ProductSection;
}

// Fashion Three Interface
export interface FashionThree {
  id: number;
  content: ContentFashionThree;
  slug: string;
}

export interface ContentFashionThree {
  home_banner: HomeBanner;
  products_list: ProductList;
  full_banner: FeaturedBanner;
  category_product: ProductTabSection;
  brand: Brands;
  products_ids: number[];
}

// Fashion Four Interface
export interface FashionFour {
  id: number;
  content: FashionFourContent;
  slug: string
}

export interface FashionFourContent {
  home_banner: HomeBanner;
  offer_banner_1: FeaturedBannersFashionFour;
  products_list: ProductListFashionFour;
  offer_banner_2: ParallaxBannerFashionFour;
  brand: Brands;
  products_ids: number[];
}

export interface FeaturedBannersFashionFour {
  status?: boolean;
  banner_1: FeaturedBanner;
  banner_2: FeaturedBanner;
  banner_3: FeaturedBanner;
}

export interface ProductListFashionFour {
  status: boolean;
  categories: ProductCategoryFashionFour;
  products: ProductList;
}

export interface ProductCategoryFashionFour {
  title?: string;
  category_ids: number[];
  status: boolean;
}

export interface ParallaxBannerFashionFour {
  image_url: string;
  status: boolean;
}

// Fashion Five Interface
export interface FashionFive {
  id: number;
  content: FashionFiveContent;
  slug: string;
}

export interface FashionFiveContent {
  home_banner: HomeBannerFashionFive;
  categories: ProductCategoryFashionFour;
  deals_banner: FeaturedBanner;
  category_product: ProductTabSection;
  products_list: ProductList;
  offer_banner: FeaturedBanner;
  social_media: SocialMedia,
  brand: Brands;
  products_ids: number[]
}
export interface HomeBannerFashionFive {
  status: boolean;
  image_url: string;
  redirect_link: RedirectLink
}

export interface KnockOutDealFashionFive {
  title?: string;
  main_banner: FeaturedBanner;
  grid_banner_1: FeaturedBanner;
  grid_banner_2: FeaturedBanner;
  grid_banner_3: FeaturedBanner;
}

export interface BankWalletOffers {
  title: string;
  status: boolean;
  offers: Offer[];
}

export interface Offer {
  coupon_code: string;
  image_url: string;
  redirect_link: RedirectLink;
  status: boolean;
}

export interface ProductWithDeals {
  title: string;
  status: boolean;
  products_list: ProductSection;
  deal_of_days: DealOfDays;
}

export interface DealOfDays {
  title: string;
  status: boolean;
  image_url: string;
  label: string;
  deals: Deal[];
}

export interface Deal {
  offer_title: string
  product_id: number
  status: boolean;
  end_date: string;
}

export interface ServicesBanner {
  status: boolean;
  services: Services[];
}

export interface Services {
  title: string;
  sub_title: string;
  status: boolean;
  image_url: string;
}

// Fashion Six Interface
export interface FashionSix {
  id: number;
  content: FashionSixContent;
  slug: string;
}

export interface FashionSixContent {
  home_banner: HomeBanner;
  offer_banner: BannerFashionSix;
  products_list_1: ProductList;
  product_banner: SliderProductFashionSix;
  products_list_2: ProductListFashionSix;
  featured_blogs: BlogSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

export interface BannerFashionSix {
  status: boolean;
  banner_1: FeaturedBanner;
  banner_2: FeaturedBanner;
  banner_3: FeaturedBanner;
  banner_4: FeaturedBanner;
  banner_5: FeaturedBanner;
  banner_6: FeaturedBanner;
}

export interface SliderProductFashionSix {
  status: boolean;
  image_url: string;
  product_slider_1: ProductSection;
}

export interface ProductListFashionSix {
  status: boolean;
  products: ProductList;
  right_panel: RightPanelFashionSix;
}

export interface RightPanelFashionSix {
  image_url: string;
  status: boolean;
}

// Fashion 7 Interface
export interface FashionSeven {
  id: number;
  content: FashionSevenContent;
  slug: string;
}

export interface FashionSevenContent {
  home_banner: HomeBannerFashionFive;
  featured_banners: BannerFashionSeven;
  products_list_1: ProductListFashionSeven;
  product_banner: ParallaxBannerFashionSeven;
  products_list_2: ProductList2FashionSeven;
  offer_banner: BannerFashionSeven;
  brand: Brands;
  products_ids: number[];
}

export interface BannerFashionSeven {
  banner_1: FeaturedBanner;
  banner_2: FeaturedBanner;
  banner_3?: FeaturedBanner;
}

export interface ProductListFashionSeven {
  title: string;
  tag?: string;
  description: string;
  category_id: number[];
  more_button: boolean;
  button_text: string;
  redirect_link: RedirectLink;
  main_title?: string;
  image_url?: string;
  status?: boolean;
}

export interface ParallaxBannerFashionSeven {
  image_url: string;
  product_ids: number[];
  status: string;
}

export interface ProductList2FashionSeven {
  status: boolean;
  image_url?: string;
  left_panel: ProductListFashionSeven;
  products: FashionSevenProducts;
}

export interface FashionSevenProducts {
  product_ids: number[];
}

// Furniture One Interface
export interface FurnitureOne {
  id: number;
  content: FurnitureOneContent;
  slug: string;
}

export interface FurnitureOneContent {
  home_banner: HomeBanner;
  offer_banner: BannerFashionSeven;
  category_product: ProductTabSection;
  full_banner: FeaturedBanner;
  featured_blogs: BlogSection;
  brand: Brands;
  products_ids: number[];
}

// Furniture Two Interface
export interface FurnitureTwo {
  id: number;
  content: FurnitureTwoContent;
  slug: string;
}

export interface FurnitureTwoContent {
  home_banner: HomeBanner;
  offer_banner: FeaturedBannersFashionFour;
  categories_icon_list: ProductCategoryFashionFour;
  products_list_1: ProductList;
  grid_banner: HomeBanner;
  product_list_2: ProductListFurnitureTwo;
  brand: Brands;
  social_media: SocialMedia;
  products_ids: number[];
}

export interface BannerFurnitureTwo {
  status: boolean;
  banner_1: FeaturedBanner;
  banner_2: FeaturedBanner;
  banner_3: FeaturedBanner;
  banner_4: FeaturedBanner;
  banner_5: FeaturedBanner;
  banner_6: FeaturedBanner;
}

export interface ProductListFurnitureTwo {
  status: boolean;
  products: FurnitureTwoProducts;
  right_panel: ProductSection;
}

export interface FurnitureTwoProducts {
  product_item: FashionSevenProducts;
  product_banner: FurnitureTwoProductBanner;
}

export interface FurnitureTwoProductBanner {
  status?: string;
  banner_1: FeaturedBanner;
  banner_2: FeaturedBanner;
}

// Furniture Dark Interface
export interface FurnitureDark {
  id: number;
  content: FurnitureDarkContent;
  slug: string;
}

export interface FurnitureDarkContent {
  home_banner: HomeBanner;
  offer_banner: FeaturedBannersFashionFour;
  products_list_1: ProductList;
  categories_icon_list: ProductCategoryFashionFour;
  banner: FeaturedBannersFashionFour;
  product_list_2: ProductListFurnitureDark;
  services: Service;
  featured_blogs: BlogSection;
  brand: Brands;
  products_ids: number[];
}

export interface ProductListFurnitureDark {
  status: boolean;
  left_panel: FurnitureDarkLeftPanel;
  products: FashionSevenProducts;
}

export interface FurnitureDarkLeftPanel {
  image_url: string;
  status: boolean;
  redirect_link: RedirectLink;
}

// Electronic One Interface
export interface ElectronicOne {
  id: number;
  content: ElectronicOneContent;
  slug: string;
}

export interface ElectronicOneContent {
  home_banner: HomeBanner;
  offer_banner: FeaturedBannersFashionFour;
  category_product: ProductTabSection;
  brand: Brands;
  products_ids: number[];
}

// Electronic Two Interface
export interface ElectronicTwo {
  id: number;
  content: ElectronicTwoContent;
  slug: string;
}

export interface ElectronicTwoContent {
  home_banner: FeaturedBannersFashionFour;
  offer_banner: FeaturedBannersFashionFour;
  category_product: ProductTabSection;
  brand: Brands;
  products_ids: number[];
}

// Electronic Three Interface
export interface ElectronicThree {
  id: number;
  content: ElectronicThreeContent;
  slug: string;
}

export interface ElectronicThreeContent {
  home_banner: HomeBanner;
  services: Service;
  products_list_1: ProductList;
  category_product_1: ProductListFashionFour;
  banner: KnockOutDealFashionFive;
  category_product_2: ProductTabSection;
  brand: Brands;
  offer_banner_1: HomeBannerFashionFive;
  offer_banner_2: FeaturedBannersFashionOne;
  products_ids: number[];
}

// MarketplaceOne Interface
export interface MarketplaceOne {
  id: number;
  content: MarketplaceOneContent;
  slug: string;
}

export interface MarketplaceOneContent {
  home_banner: HomeBanner;
  offer_banner_1: FeaturedBannersFashionTwo;
  product_list_1: ProductList;
  offer_banner_2: HomeBannerFashionFive;
  services: Service;
  social_media: SocialMedia;
  category_product: MarketPlaceOneSliderProduct;
  brand: Brands;
  products_ids: number[];
}

export interface MarketPlaceOneSliderProduct {
  status: boolean;
  left_panel: MarketPlaceOneProductSlider;
  right_panel: MarketPlaceOneRightPanel;
}

export interface MarketPlaceOneRightPanel {
  product_category: ProductTabSection;
  product_banner: FullWidthBanner;
}

export interface MarketPlaceOneProductSlider {
  title: string;
  product_ids: number[];
  status: boolean;
}

// MarketplaceTwo Interface
export interface MarketplaceTwo {
  id: number;
  content: MarketplaceTwoContent;
  slug: string;
}

export interface MarketplaceTwoContent {
  home_banner: HomeBanner;
  offer_banner_1: FeaturedBannersFashionTwo;
  products_list_1: ProductList;
  products_list_2: ProductList;
  products_list_3: MarketPlaceOneProductSlider;
  products_list_4: MarketPlaceOneProductSlider;
  offer_banner_2: ShoesBanner;
  slider_products: SliderProduct;
  services: Service;
  products_list_5: ProductList;
  products_list_6: ProductList;
  offer_banner_3: FullWidthBanner;
  brand: Brands;
  products_ids: number[];
}


// MarketplaceThree Interface
export interface MarketplaceThree {
  id: number;
  content: MarketplaceThreeContent;
  slug: string;
}

export interface MarketplaceThreeContent {
  home_banner: HomeBanner;
  offer_banner: FeaturedBannersFashionFour;
  categories_products: MarketPlaceThreeCategoriesProducts;
  featured_blogs: BlogSection;
  brand: Brands;
  products_ids: number[];
}

export interface MarketPlaceThreeCategoriesProducts {
  status: boolean;
  left_panel: MarketPlaceThreeLeftContent;
  right_panel: MarketPlaceThreeRightContent;
}

export interface MarketPlaceThreeLeftContent {
  categories: ProductCategoryFashionFour;
  products_list: SidebarProducts;
  banner: FeaturedBanner;
}

export interface MarketPlaceThreeRightContent {
  products_list: SidebarProducts;
  offer_banner: ShoesBanner;
  category_product: ProductTabSection;
}

// MarketplaceFour Interface
export interface MarketplaceFour {
  id: number;
  content: MarketplaceFourContent;
  slug: string;
}

export interface MarketplaceFourContent {
  home_banner: HomeBanner;
  services: Service;
  products_list_1: SidebarProducts;
  product_banner_1: MarketplaceFourProductBanner;
  slider_products: SliderProductFashionSix;
  products_list_2: SidebarProducts;
  product_banner_2: MarketplaceFourBannerProduct;
  product_banner_3: MarketplaceFourProductBanner;
  products_list_3: SidebarProducts;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

export interface MarketplaceFourBannerProduct {
  status: boolean;
  left_panel: JewelryTwoProductBannerPanel;
  center_panel: FeaturedBannersFashionOne;
  right_panel: JewelryTwoProductBannerPanel;
}

export interface MarketplaceFourProductBanner {
  status?: boolean;
  left_panel: FullWidthBanner,
  right_panel: ProductsListRightContent;
}

export interface ProductsListRightContent {
  product_ids: number[];
  status: boolean;
}

// VegetablesDemoOne Interface
export interface VegetablesOne {
  id: number;
  content: VegetablesOneContent;
  slug: string;
}

export interface VegetablesOneContent {
  home_banner: HomeBanner;
  services: Service;
  products_list_1: SidebarProducts;
  full_banner: FeaturedBanner;
  products_list_2: SidebarProducts;
  featured_blogs: BlogSection;
  brand: Brands;
  products_ids: number[];
}

// VegetablesDemoTwo Interface
export interface VegetablesTwo {
  id: number;
  content: VegetablesTwoContent;
  slug: string;
}

export interface VegetablesTwoContent {
  home_banner: HomeBanner;
  services: Service;
  products_list_1: SidebarProducts;
  banner: HomeBanner;
  offer_banner: FullWidthBanner;
  products_list_2: SidebarProducts;
  category_product: ProductTabSection;
  featured_blogs: BlogSection;
  brand: Brands;
  products_ids: number[];
}

// VegetablesDemoThree Interface
export interface VegetablesThree {
  id: number;
  content: VegetablesThreeContent;
  slug: string;
}

export interface VegetablesThreeContent {
  sidebar_category: VegetableThreeCategory;
  home_banner: HomeBanner;
  services: Service;
  category_product: ProductTabSection;
  banner: HomeBanner;
  products_list: SidebarProducts;
  featured_blogs: BlogSection;
  brand: Brands;
  products_ids: number[];
}

export interface VegetableThreeCategory {
  category_ids: number[];
  status: boolean;
}

// VegetablesDemoFour Interface
export interface VegetablesFour {
  id: number;
  content: VegetablesFourContent;
  slug: string;
}

export interface VegetablesFourContent {
  home_banner: HomeBannerFashionFive;
  categories: ProductCategoryFashionFour;
  offer_banner_1: HomeBanner;
  products_list_1: ProductList;
  products_list_2: ProductList;
  offer_banner_2: HomeBanner;
  products_list_3: ProductList;
  services: Service;
  products_list_4: ProductList;
  featured_blogs: BlogSection;
  brand: Brands;
  products_ids: number[];
}

// jewelryOne Interface
export interface JewelryOne {
  id: number;
  content: JewelryOneContent;
  slug: string;
}

export interface JewelryOneContent {
  home_banner: HomeBanner;
  categories: ProductCategoryFashionFour;
  products_list: ProductList;
  services: Service;
  full_banner: FeaturedBanner;
  category_product: ProductTabSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

// JewelryTwo Interface
export interface JewelryTwo {
  id: number;
  content: JewelryTwoContent;
  slug: string;
}

export interface JewelryTwoContent {
  home_banner: HomeBanner;
  offer_banner_1: HomeBanner;
  categories: ProductCategoryFashionFour;
  products_list_1: ProductList;
  products_list_2: ProductList;
  banner: FeaturedBanner;
  services: Service;
  product_banner: MarketplaceFourBannerProduct;
  social_media: SocialMedia;
  offer_banner_2: HomeBannerFashionFive;
  brand: Brands;
  products_ids: number[];
}

export interface JewelryCategoriesTwo {
  title: string;
  description: string;
  category_ids: number[];
  status: boolean;
}

export interface JewelryTwoProductBanner {
  status: boolean;
  left_panel: JewelryTwoProductBannerPanel;
  center_panel: FeaturedBanner;
  right_panel: JewelryTwoProductBannerPanel;
}

export interface JewelryTwoProductBannerPanel {
  product_ids: number[];
  tag?: string;
  title: string;
  status: boolean;
}

// JewelryThree Interface
export interface JewelryThree {
  id: number;
  content: JewelryThreeContent;
  slug: string;
}

export interface JewelryThreeContent {
  home_banner: HomeBanner;
  services: Service;
  offer_banner: FeaturedBannersFashionFour;
  products_list: ProductList;
  full_banner: FeaturedBanner;
  category_product: ProductCategoryFashionFour;
  product_banner: JewelryTwoProductBanner;
  featured_blogs: BlogSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

// Bag Interface
export interface Bag {
  id: number;
  content: BagContent;
  slug: string;
}

export interface BagContent {
  home_banner: HomeBanner;
  category_product: ProductTabSection;
  category: ProductTabSection;
  full_banner: FeaturedBanner;
  product_banner: BagProductList;
  services: Service;
  grid_banner: HomeBanner;
  products_list: ProductList;
  featured_blogs: BlogSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

export interface BagProductList {
  status: boolean;
  left_content: JewelryTwoProductBannerPanel;
  center_content: JewelryTwoProductBannerPanel;
  right_content: JewelryTwoProductBannerPanel;
}

export interface ParallaxBannerBags {
  main_title: string;
  title: string;
  sub_title: string;
  description?: string;
  image_url: string;
  redirect_link: RedirectLink;
  button_text: string;
  status: boolean;
}

// watch Interface
export interface Watch {
  id: number;
  content: WatchContent;
  slug: string;
}

export interface WatchContent {
  home_banner: HomeBanner;
  brand: Brands;
  offer_banner_1: FeaturedBanner;
  categories: ProductCategoryFashionFour;
  category_product: ProductTabSection;
  products_list_1: ProductList;
  offer_banner_2: FeaturedBannersFashionFour;
  products_list_2: ProductList;
  featured_blogs: BlogSection;
  services: Service;
  social_media: SocialMedia;
  products_ids: number[];
}

// Medical Interface
export interface Medical {
  id: number;
  content: MedicalContent;
  slug: string;
}

export interface MedicalContent {
  home_banner: HomeBanner;
  categories: ProductCategoryFashionFour;
  brand: Brands;
  category_product: ProductTabSection;
  featured_blogs: BlogSection;
  products_ids: number[];
  services: Service;
  column_banner_product: MedicalProductBanner;
  offer_banner: HomeBanner;
}

export interface MedicalProductBanner {
  status: boolean;
  product_list_1: JewelryTwoProductBannerPanel;
  offer_banner_1: FullWidthBanner;
  product_list_2: JewelryTwoProductBannerPanel;
  offer_banner_2: FullWidthBanner;
}

// Perfume Interface
export interface Perfume { //
  id: number;
  content: PerfumeContent;
  slug: string;
}

export interface PerfumeContent {
  home_banner: HomeBannerFashionFive;
  offer_banner_1: FeaturedBannersFashionTwo;
  category_product: ProductTabSection;
  parallax_banner: ParallaxBannerFashionSeven;
  product_list: ProductList2FashionSeven;
  offer_banner_2: HomeBannerFashionFive;
  collection_banner: HomeBannerFashionFive;
  brand: Brands;
  products_ids: number[];
}

// Yoga Interface
export interface Yoga {
  id: number;
  content: YogaContent;
  slug: string;
}

export interface YogaContent {
  home_banner: HomeBannerFashionFive;
  products_list_1: ProductList;
  products_list_2: ProductList;
  offer_banner_1: FeaturedBannersFashionFour;
  offer_banner_2: FeaturedBannersFashionFour;
  products_list_3: ProductList;
  product_banner: YogaProductBanner;
  featured_blogs: BlogSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

export interface YogaProductBanner {
  tag: string;
  title: string;
  post_banner: FurnitureTwoProductBanner;
  product_ids: number[];
  status: boolean;
}

// Christmas Interface
export interface Christmas {
  id: number;
  content: ChristmasContent;
  slug: string;
}

export interface ChristmasContent {
  home_banner: HomeBanner;
  offer_banner_1: FeaturedBannersFashionOne;
  products_list: ProductList;
  offer_banner_2: FeaturedBanner;
  category_product_1: ProductTabSection;
  offer_banner_3: FeaturedBanner;
  category_product_2: ProductTabSection;
  featured_blogs: BlogSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

// Bicycle Interface
export interface Bicycle {
  id: number;
  content: BicycleContent;
  slug: string;
}

export interface BicycleContent {
  home_banner: HomeBanner;
  products_list: ProductList;
  category_product: ProductTabSection;
  offer_banner: FeaturedBannersFashionOne;
  banner: FullWidthBanner;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

// Marijuana Interface
export interface Marijuana {
  id: number;
  content: MarijuanaContent;
  slug: string;
}

export interface MarijuanaContent {
  home_banner: HomeBanner;
  services: Service;
  offer_banner: ShoesAboutBanner;
  details_section: HomeBanner;
  products_list: ProductList;
  category_product: ProductTabSection;
  featured_blogs: BlogSection;
  brand: Brands;
  products_ids: number[];
}

// Gym Interface
export interface GymSection {
  id: number;
  content: GymSectionContent;
  slug: string;
}

export interface GymSectionContent {
  home_banner: HomeBanner;
  offer_banner: FeaturedBannersFashionOne;
  products_list: ProductList;
  parallax_product: GymParallaxProduct;
  featured_blogs: BlogSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}
export interface GymParallaxProduct {
  tag: string;
  title: string;
  description: string;
  product_ids: number[];
  image_url: string;
  status?: boolean;
}

// Tools Interface
export interface Tools {
  id: number;
  content: ToolsContent;
  slug: string;
}

export interface ToolsContent {
  home_banner: HomeBanner;
  services: Service;
  categories: JewelryCategoriesTwo;
  products_list_1: ProductList;
  products_list_2: ProductList;
  category_product: MarketPlaceOneSliderProduct;
  brand: Brands;
  products_ids: number[];
}

// Shoes Interface
export interface Shoes {
  id: number;
  content: ShoesContent;
  slug: string;
}

export interface ShoesContent {
  home_banner: HomeBanner;
  categories_1: ProductCategoryFashionFour;
  about_banner: ShoesAboutBanner;
  products_list: ShoesProductList;
  categories_2: ProductTabSection;
  slider_products: SliderProduct;
  attribute: ShoesAttribute;
  category_product: ProductTabSection;
  featured_blogs: BlogSection;
  services: Service;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

export interface ShoesAboutBanner {
  title: string;
  tag: string;
  collection_banner?: ShoesBanner;
  banner?: ShoesBanner;
  description?: string;
  status?: boolean;
}

export interface ShoesBanner {
  status: boolean;
  banner_1: FeaturedBanner;
  banner_2: FeaturedBanner;
}

export interface ShoesProductList {
  title: string;
  tag: string;
  product_ids: number[];
  status: boolean;
}

export interface ShoesAttribute{
  attribute_id: number;
  status: boolean;
}

// Books Interface
export interface Books {
  id: number;
  content: BooksContent;
  slug: string;
}

export interface BooksContent {
  home_banner: HomeBanner;
  categories_1: ProductCategoryFashionFour;
  category_product: ProductTabSection;
  categories_2: ProductCategoryFashionFour;
  slider_products: SliderProduct;
  offer_banner: FeaturedBannersFashionOne;
  products_list: ProductList;
  featured_blogs: BlogSection;
  brand: Brands;
  products_ids: number[];
}

export interface BooksSliderProduct {
  tag: string;
  title: string;
  status: boolean;
  image_url: string;
  product_slider_1: ProductSection;
  product_slider_2: ProductSection;
  product_slider_3: ProductSection;
}

// Kids Interface
export interface Kids {
  id: number;
  content: KidsContent;
  slug: string;
}

export interface KidsContent {
  home_banner: HomeBanner;
  offer_banner: FeaturedBannersFashionOne;
  products_list: ProductList;
  full_banner: FeaturedBanner;
  slider_products: SliderProduct;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

// Game Interface
export interface Game {
  id: number;
  content: GameContent;
  slug: string;
}

export interface GameContent {
  home_banner: HomeBanner;
  offer_banner_1: FeaturedBannersFashionOne;
  category_product: ProductTabSection;
  offer_banner_2: FeaturedBanner;
  products_list: ProductList;
  slider_products: SliderProduct;
  parallax_banner: ParallaxBanner;
  brand: Brands;
  products_ids: number[];
}

// Beauty Interface
export interface Beauty {
  id: number;
  content: BeautyContent;
  slug: string;
}

export interface BeautyContent {
  home_banner: HomeBanner;
  offer_banner: FeaturedBannersFashionOne;
  products_list_1: ProductList;
  product_video: BeautyProductVideo;
  products_list_2: ProductList;
  featured_blogs: BlogSection;
  social_media: SocialMedia;
  about_us: BeautyAboutUs;
  brand: Brands;
  products_ids: number[];
}

export interface BeautyProductVideo {
  title: string;
  tag: string;
  status: boolean;
  image_url: string;
  video_url: string;
}

export interface BeautyAboutUs {
  title: string;
  description: string;
  image_url: string;
  services: Service;
  status: boolean;
}

// Left Sidebar Interface
export interface Surfboard{
  id: number;
  content: SurfboardContent;
  slug: string;
 }

 export interface SurfboardContent{
  home_banner: HomeBanner;
  categories: ProductCategoryFashionFour;
  products_list: ProductList;
  offer_banner: HomeBanner;
  category_product: ProductTabSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

// VideoSlider Interface
export interface VideoSlider {
  id: number;
  content: VideoSliderContent;
  slug: string;
}

export interface VideoSliderContent {
  home_banner: HomeBanner;
  collection_banner:FeaturedBannersFashionFour;
  category_product: ProductTabSection;
  parallax_banner: ParallaxBanner;
  products_list: ProductList;
  services: Service;
  featured_blogs: BlogSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

// Metro Interface
export interface Metro {
  id: number;
  content: MetroContent;
  slug: string;
}

export interface MetroContent {
  home_banner: HomeBanner;
  services: Service;
  featured_blogs: BlogSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

// Goggles Interface
export interface Goggles {
  id: number;
  content: GogglesContent;
  slug: string;
}

export interface GogglesContent {
  home_banner: HomeBanner;
  services: Service;
  offer_banner: FeaturedBannersFashionFour;
  products_list: ProductList;
  full_banner: FeaturedBanner;
  category_product: ProductTabSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

// Flower Interface
export interface Flower {
  id: number;
  content: FlowerContent;
  slug: string;
}

export interface FlowerContent {
  home_banner: HomeBanner;
  offer_banner: FeaturedBannersFashionOne;
  products_list_1: ProductList;
  category_product: ProductTabSection;
  products_list_2: ProductList;
  featured_blogs: BlogSection;
  services: Service;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

// Nursery Interface
export interface Nursery {
  id: number;
  content: NurseryContent;
  slug: string;
}

export interface NurseryContent {
  home_banner: HomeBanner;
  products_list: ProductList;
  category_product: ProductTabSection;
  featured_blogs: BlogSection;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

// Pets Interface
export interface Pets {
  id: number;
  content: PetsContent;
  slug: string;
}

export interface PetsContent {
  home_banner: HomeBanner;
  brand: Brands;
  offer_banner: HomeBanner;
  products_list_1: ProductList;
  parallax_banner: ParallaxBannerBags;
  products_list_2: ProductList;
  featured_blogs: BlogSection;
  products_ids: number[];
}

// Video Interface
export interface Video {
  id: number;
  content: VideoContent;
  slug: string;
}

export interface VideoContent {
  video: VideoSection;
}

export interface VideoSection {
  status: boolean;
  video_url: string;
}

// FullPage Interface
export interface FullPage {
  id: number;
  content: FullPageContent;
  slug: string;
}

export interface FullPageContent {
  home_banner: HomeBanner;
  products_ids: number[];
}


// Parallax Interface
export interface Parallax {
  id: number;
  content: ParallaxContent;
  slug: string;
}

export interface ParallaxContent {
  parallax_banner: ParallaxBannerParallax;
}

export interface ParallaxBannerParallax {
  status: boolean,
  banners: ParallaxBanner[];
}

// Digital Download
export interface DigitalDownload {
  id: number;
  content: DigitalDownloadContent;
  slug: string;
}

export interface DigitalDownloadContent {
  home_banner: DigitalHomeBanner;
  categories_icon_list: CategoriesIconList;
  products_list: ProductList;
  products_list_2: ProductList2FashionSeven;
  category_product: ProductTabSection;
  featured_blogs: BlogSection
  products_ids: number[];
}


export interface DigitalHomeBanner {
  status: boolean;
  title: string;
  description: string;
  background_image: string;
  sub_image_1: string;
  sub_image_2: string;
}

// Single Product Interface
export interface SingleProduct {
  id: number;
  content: SingleProductContent;
  slug: string;
}

export interface SingleProductContent {
  home_banner: SingleProductHomeBanner;
  services: SingleProductServices;
  grid_banner: FeaturedBannersFashionFour;
  product_video: SingleProductVideo;
  single_product: ProductList;
  products_list: ProductList;
  testimonial: Testimonial;
  social_media: SocialMedia;
  brand: Brands;
  products_ids: number[];
}

export interface SingleProductHomeBanner {
  status: boolean;
  title: string;
  description: string;
  show_button: boolean;
  button_text: string;
  banner_image: string;
}

export interface SingleProductServices {
  status: boolean;
  left_panel: SingleProductLeftPanel;
  right_panel: Service;
}

export interface SingleProductLeftPanel {
  title: string;
  description: string;
  status: boolean;
}

export interface SingleProductVideo {
  status: boolean;
  image: string;
  video: string;
}

export interface Testimonial {
  title: string;
  status: boolean;
  banners: TestimonialBanner[];
}

export interface TestimonialBanner {
  name: string;
  image_url: string;
  review: string;
  status: boolean;
}