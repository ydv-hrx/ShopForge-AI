import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type Benefit = {
  title: string;
  description: string;
  icon: string;
};

const benefits: Benefit[] = [
  {
    title: "Free Shipping",
    description: "Enjoy complimentary shipping on qualifying orders with a seamless checkout experience.",
    icon: "✦",
  },
  {
    title: "Secure Payments",
    description: "Shop with confidence thanks to protected transactions and trusted payment flows.",
    icon: "◌",
  },
  {
    title: "Easy Returns",
    description: "Flexible return support keeps every order feeling effortless and customer-friendly.",
    icon: "↺",
  },
  {
    title: "24/7 Customer Support",
    description: "Dedicated support is always available to help with questions, updates, and guidance.",
    icon: "✢",
  },
] as const;

export function Benefits() {
  return (
    <section className="border-t border-border-subtle bg-background py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5 sm:max-w-2xl">
          <Badge variant="subtle" size="md">
            Store benefits
          </Badge>
          <Heading level={2} size="xl">
            Thoughtful service details that make the storefront feel premium.
          </Heading>
          <Text as="p" size="lg" tone="subtle">
            A concise benefits grid that reinforces trust, convenience, and support without introducing product data or commerce logic.
          </Text>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title} variant="elevated" padding="md" className="h-full">
              <div className="flex h-full flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-subtle bg-surface text-xl text-foreground shadow-sm">
                    <span aria-hidden="true">{benefit.icon}</span>
                  </div>
                  <Badge variant="accent" size="sm">
                    Benefit
                  </Badge>
                </div>

                <div className="space-y-3">
                  <Heading level={3} size="sm">
                    {benefit.title}
                  </Heading>
                  <Text as="p" size="sm" tone="subtle">
                    {benefit.description}
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
