import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";

export function AnnouncementBar() {
  return (
    <div className="border-b border-border-subtle bg-surface/90 text-foreground backdrop-blur">
      <Container className="flex min-h-11 items-center justify-center gap-3 py-3 text-center sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <Badge variant="accent" size="sm">
            New
          </Badge>
          <Text as="p" size="sm" tone="subtle" className="max-w-2xl">
            Placeholder announcement area for shipping updates, promotions, or brand notices.
          </Text>
        </div>
        <Text as="p" size="xs" tone="muted" className="hidden sm:block">
          Designed for accessible, responsive commerce messaging.
        </Text>
      </Container>
    </div>
  );
}
