import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

type CollectionHeaderProps = {
  title: string;
  description: string;
};

export function CollectionHeader({ title, description }: CollectionHeaderProps) {
  return (
    <Section spacing="lg" className="border-t border-border-subtle bg-background">
      <Container>
        <div className="flex flex-col gap-5 sm:max-w-3xl">
          <Heading level={1} size="2xl">
            {title}
          </Heading>
          <Text as="p" size="lg" tone="subtle">
            {description}
          </Text>
        </div>
      </Container>
    </Section>
  );
}
