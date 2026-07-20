import { Hero } from "@/components/home/hero";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Benefits } from "@/components/home/benefits";
import { Newsletter } from "@/components/home/newsletter";
import { getHomepageData } from "@/services/shopify/homepage";

export default async function Home() {
  const { collections, products } = await getHomepageData();

  return (
    <>
      <Hero />
      <FeaturedCollections collections={collections} />
      <FeaturedProducts products={products} />
      <Benefits />
      <Newsletter />
    </>
  );
}
