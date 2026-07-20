import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/products/product-gallery";
import { ProductInfo } from "@/components/products/product-info";
import { ProductPrice } from "@/components/products/product-price";
import { AddToCart } from "@/components/products/add-to-cart";
import { QuantitySelector } from "@/components/products/quantity-selector";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getProductByHandle } from "@/services/shopify/product";

type ProductDetailPageProps = {
  params: {
    handle: string;
  };
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <Section spacing="lg" className="border-t border-border-subtle bg-background">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <ProductGallery
              title={product.title}
              images={product.images}
              featuredImage={product.featuredImage}
            />

            <div className="space-y-8">
              <ProductInfo
                title={product.title}
                vendor={product.vendor}
                productType={product.productType}
                description={product.description}
                availableForSale={product.availableForSale}
              />

              <div className="space-y-5 rounded-[2rem] border border-border-subtle bg-surface p-6 shadow-sm sm:p-8">
                <ProductPrice
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                />

                <div className="space-y-4">
                  <QuantitySelector />
                  <AddToCart disabled={!product.availableForSale} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
