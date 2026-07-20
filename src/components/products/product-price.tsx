import { Text } from "@/components/ui/Text";

type Money = {
  amount: string;
  currencyCode: string;
};

type ProductPriceProps = {
  price: Money;
  compareAtPrice: Money | null;
};

function formatMoney(amount: string, currencyCode: string) {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return `${amount} ${currencyCode}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(numericAmount);
}

export function ProductPrice({ price, compareAtPrice }: ProductPriceProps) {
  const currentPrice = formatMoney(price.amount, price.currencyCode);
  const shouldShowCompareAt =
    compareAtPrice !== null && Number(compareAtPrice.amount) > Number(price.amount);

  return (
    <div className="space-y-2">
      <Text as="p" size="xs" tone="muted" className="uppercase tracking-[0.28em]">
        Price
      </Text>
      <div className="flex items-end gap-3">
        <Text as="p" size="lg" weight="semibold" className="text-4xl leading-none sm:text-5xl">
          {currentPrice}
        </Text>
        {shouldShowCompareAt ? (
          <Text as="p" size="sm" tone="muted" className="pb-1 line-through">
            {formatMoney(compareAtPrice.amount, compareAtPrice.currencyCode)}
          </Text>
        ) : null}
      </div>
    </div>
  );
}
