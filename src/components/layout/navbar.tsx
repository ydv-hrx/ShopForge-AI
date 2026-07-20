"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import { cn } from "@/components/ui/cn";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-sm font-semibold text-background transition-transform group-hover:scale-[1.02]">
              SF
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-[0.24em] text-foreground uppercase">
                ShopForge AI
              </span>
              <span className="text-xs text-foreground/60">
                Premium storefront foundation
              </span>
            </span>
          </Link>
        </div>

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Badge variant="subtle">Placeholder</Badge>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="lg:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          onClick={() => setIsMenuOpen((currentState) => !currentState)}
        >
          <span className="flex items-center gap-2">
            <span>{isMenuOpen ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="text-base leading-none">
              {isMenuOpen ? "×" : "☰"}
            </span>
          </span>
        </Button>
      </Container>

      <div
        id={menuId}
        className={cn(
          "border-t border-border-subtle bg-background lg:hidden",
          isMenuOpen ? "block" : "hidden",
        )}
      >
        <Container className="py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-subtle hover:bg-surface"
              >
                <span>{item.label}</span>
                <Text as="span" size="xs" tone="muted">
                  Placeholder
                </Text>
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}
