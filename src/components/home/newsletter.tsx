import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";

export function Newsletter() {
  return (
    <section className="border-t border-border-subtle bg-background py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(0,102,204,0.12),_transparent_36%),linear-gradient(135deg,_rgba(255,255,255,0.6),_rgba(255,255,255,0.28))] p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10 dark:bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.12),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(0,102,204,0.12),_transparent_36%),linear-gradient(135deg,_rgba(20,20,22,0.98),_rgba(32,32,36,0.82))]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <Heading level={2} size="xl">
                Join the newsletter for curated launches and refined store updates.
              </Heading>
              <Text as="p" size="lg" tone="subtle" className="max-w-2xl">
                Get premium product drops, editorial stories, and exclusive updates delivered directly to your inbox.
              </Text>
              <Text as="p" size="sm" tone="muted">
                No spam, just thoughtful updates when something worth sharing arrives.
              </Text>
            </div>

            <div className="space-y-4 rounded-[1.5rem] border border-border-subtle bg-background/80 p-5 backdrop-blur sm:p-6">
              <div className="space-y-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  aria-describedby="newsletter-disclaimer"
                />
                <Button type="button" size="lg" className="w-full">
                  Subscribe
                </Button>
              </div>

              <Text id="newsletter-disclaimer" as="p" size="xs" tone="muted">
                By subscribing, you agree to receive email updates from ShopForge AI. You can unsubscribe at any time.
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
