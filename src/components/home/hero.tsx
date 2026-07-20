import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.16),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(0,102,204,0.12),_transparent_32%),linear-gradient(180deg,_rgba(255,255,255,0.28),_transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-premium-accent-gold/70 to-transparent" />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="subtle" size="md">
                Premium Shopify storefront
              </Badge>
              <Text as="p" size="sm" tone="muted">
                Luxury design system, modular architecture
              </Text>
            </div>

            <div className="space-y-5">
              <Heading level={1} size="2xl" className="max-w-4xl">
                Elevate commerce with a refined storefront built for modern Shopify brands.
              </Heading>
              <Text as="p" size="lg" tone="subtle" className="max-w-2xl">
                ShopForge AI combines a premium visual language with a scalable foundation, creating a storefront experience that feels minimal, confident, and ready for production.
              </Text>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button type="button" size="lg" className="sm:min-w-48">
                Shop the experience
              </Button>
              <Button type="button" variant="secondary" size="lg" className="sm:min-w-48">
                View the story
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,_rgba(212,175,55,0.22),_transparent_60%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border-subtle bg-surface shadow-[0_20px_80px_-32px_rgba(0,0,0,0.35)]">
              <div className="grid min-h-[22rem] gap-4 p-4 sm:min-h-[32rem] sm:p-6">
                <div className="flex items-center justify-between rounded-[1.5rem] border border-border-subtle bg-surface-elevated/80 px-5 py-4">
                  <div className="space-y-1">
                    <Text as="p" size="xs" tone="muted">
                      Featured placeholder
                    </Text>
                    <Text as="p" size="sm" weight="medium">
                      Editorial campaign preview
                    </Text>
                  </div>
                  <Badge variant="accent" size="sm">
                    Hero image
                  </Badge>
                </div>

                <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[1.75rem] border border-dashed border-border-subtle bg-[linear-gradient(135deg,_rgba(0,0,0,0.02),_rgba(0,0,0,0.08))] p-6 dark:bg-[linear-gradient(135deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.08))]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.25),_transparent_58%)] opacity-60" />
                  <div className="relative flex aspect-[4/5] w-full max-w-sm items-center justify-center rounded-[1.5rem] border border-border-subtle bg-background/85 p-8 text-center backdrop-blur">
                    <div className="space-y-4">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border-subtle bg-surface-elevated text-2xl">
                        ✦
                      </div>
                      <div className="space-y-2">
                        <Text as="p" size="sm" weight="medium">
                          Decorative image placeholder
                        </Text>
                        <Text as="p" size="xs" tone="muted">
                          Reserved for editorial photography, product composition, or brand visuals.
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
