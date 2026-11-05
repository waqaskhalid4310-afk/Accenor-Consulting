import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

export function Footer() {
  // Static copyright year avoids prerender time-blocking under Cache Components.
  const year = 2026;
  const { contact, social, footer } = siteConfig;

  return (
    <footer className="border-t border-border bg-surface-muted">
      <Container className="section-pad !pb-8 !pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="inline-flex shrink-0 items-center no-underline"
              aria-label="Accenor Consulting home"
            >
              <Image
                src="/icons/web_logo-removebg.png"
                alt="Accenor Consulting"
                width={280}
                height={70}
                className="h-11 w-auto object-contain sm:h-12 md:h-14"
                priority
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Accounting, taxation and business consultancy for individuals,
              growing businesses and international clients. Based in Rawalpindi,
              Pakistan.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footer.companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground transition hover:text-navy"
                  >
                    {service.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={`tel:${contact.phoneTel}`}
                  className="transition hover:text-navy"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition hover:text-navy"
                >
                  {contact.email}
                </a>
              </li>
              <li className="max-w-[240px] leading-relaxed">
                {contact.addressFull}
              </li>
              {/* <li className="leading-relaxed">{social.linkedinStatus}</li> */}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
