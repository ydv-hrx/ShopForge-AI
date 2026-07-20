import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";

type ProductImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

type ProductGalleryProps = {
  title: string;
  images: ProductImage[];
  featuredImage: ProductImage | null;
};

export function ProductGallery({ title, images, featuredImage }: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : featuredImage ? [featuredImage] : [];
  const primaryImage = galleryImages[0] ?? null;
  const secondaryImages = galleryImages.slice(1, 5);

  return (
    <div className="space-y-4">
      <Card variant="elevated" padding="none" className="overflow-hidden">
        <div className="relative min-h-[28rem] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_46%),linear-gradient(135deg,_rgba(16,16,18,0.96),_rgba(63,63,69,0.72))]">
          {primaryImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${primaryImage.url})` }}
              aria-hidden="true"
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.08),_transparent_56%)]" />
          {!primaryImage ? (
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
              <div className="max-w-sm space-y-3">
                <Text as="p" size="sm" tone="muted" className="uppercase tracking-[0.28em] text-white/70">
                  Product image placeholder
                </Text>
                <Text as="p" size="lg" tone="subtle" className="text-white/85">
                  Imagery for {title} will appear here once product media is available.
                </Text>
              </div>
            </div>
          ) : null}
        </div>
      </Card>

      {secondaryImages.length > 0 ? (
        <div className="grid grid-cols-4 gap-3">
          {secondaryImages.map((image, index) => (
            <Card key={`${image.url}-${index}`} variant="outline" padding="none" className="overflow-hidden border-border-subtle">
              <div className="relative aspect-square overflow-hidden bg-surface-elevated">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${image.url})` }}
                  aria-hidden="true"
                />
              </div>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
