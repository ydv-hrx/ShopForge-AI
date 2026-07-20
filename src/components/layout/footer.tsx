import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

const footerColumns = [
  {
    title: "Shop",
    items: [
      { label: "All products", href: "/shop" },
      { label: "Collections", href: "/collections" },
      { label: "Gift cards", href: "/gift-cards" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Heading level={2} size="lg">
              ShopForge AI
            </Heading>
            <Text as="p" tone="subtle" className="max-w-md">
              Production-ready storefront foundations for a premium Shopify experience, built to scale with clean interfaces and reusable primitives.
            </Text>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <Heading level={3} size="xs" tone="subtle">
                {column.title}
              </Heading>
              <ul className="space-y-3">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Text as="p" size="sm" tone="muted">
            © 2026 ShopForge AI. All rights reserved.
          </Text>
          <Text as="p" size="sm" tone="muted">
            Placeholder layout foundation only.
          </Text>
        </div>
      </Container>
    </footer>
  );
}
