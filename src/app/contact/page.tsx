import { Contact } from '@/components/sections/Contact';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Get in touch — email, socials, or the contact form.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="pt-4">
      <Contact />
    </div>
  );
}
