import { getFeaturedCollections, type FeaturedCollection } from "./collections";
import { getFeaturedProducts, type FeaturedProduct } from "./products";

export type HomepageData = {
  collections: FeaturedCollection[];
  products: FeaturedProduct[];
};

export async function getHomepageData(): Promise<HomepageData> {
  const [collections, products] = await Promise.all([
    getFeaturedCollections(),
    getFeaturedProducts(),
  ]);

  return {
    collections,
    products,
  };
}
