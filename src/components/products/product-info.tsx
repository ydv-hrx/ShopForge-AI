import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type ProductInfoProps = {
  title: string;
  vendor: string;
  productType: string;
  description: string;
  availableForSale: boolean;
};

export function ProductInfo({
  title,
  vendor,
  productType,
  description,
  availableForSale,
}: ProductInfoProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={availableForSale ? "accent" : "subtle"} size="md">
          {availableForSale ? "Available" : "Sold out"}
        </Badge>
        <Text as="p" size="xs" tone="muted" className="uppercase tracking-[0.28em]">
          Product details
        </Text>
      </div>

      <div className="space-y-4">
        <Heading level={1} size="2xl">
          {title}
        </Heading>
        <div className="flex flex-wrap gap-3 text-sm text-foreground/70">
          <span>{vendor}</span>
          <span aria-hidden="true">•</span>
          <span>{productType}</span>
        </div>
      </div>

      <Text as="p" size="lg" tone="subtle">
        {description}
      </Text>
    </div>
  );
}
