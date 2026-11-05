
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

function Logo({ onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="inline-flex shrink-0 items-center"
      aria-label="Accenor Consulting home"
    >
      <Image
        src="/icons/web_logo-removebg.png"
        alt="Accenor Consulting"
        width={280}
        height={70}
        className="h-11 w-auto object-contain sm:h-12 md:h-[3.25rem]"
        priority
      />
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const menuId = useId();

  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] =
    useState(false);

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const previousPath = useRef(pathname);

  const closeMenu = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  // Close navigation when route changes.
  useEffect(() => {
    if (previousPath.current !== pathname) {
      closeMenu();
      setDesktopServicesOpen(false);
      previousPath.current = pathname;
    }
  }, [pathname]);

  // Prevent background scrolling while mobile navigation is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Escape key and focus management.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navLinkClass = (href) =>
    cn(
      "relative inline-flex items-center rounded-lg px-3 py-2.5",
      "text-sm font-medium transition-colors duration-200",
      "text-navy/80 hover:bg-muted hover:text-navy",
      isActive(href) && "bg-muted text-navy"
    );

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-border/80 bg-white/95 backdrop-blur-xl">

      {/* Desktop / Main Navigation */}
      <Container className="flex h-[4.5rem] items-center justify-between gap-3 sm:h-20">

        <Logo onClick={closeMenu} />

        {/* Desktop Links */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {siteConfig.nav.map((item) => {
            if (item.children) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setDesktopServicesOpen(true)}
                  onMouseLeave={() => setDesktopServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      navLinkClass(item.href),
                      "gap-1"
                    )}
                    aria-haspopup="true"
                    aria-expanded={desktopServicesOpen}
                    onFocus={() => setDesktopServicesOpen(true)}
                    onBlur={(event) => {
                      if (
                        !event.currentTarget.parentElement?.contains(
                          event.relatedTarget
                        )
                      ) {
                        setDesktopServicesOpen(false);
                      }
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform",
                        desktopServicesOpen && "rotate-180"
                      )}
                    />
                  </Link>

                  <div
                    className={cn(
                      "absolute left-0 top-full z-50 w-72 pt-3",
                      "transition-all duration-200",
                      desktopServicesOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    )}
                  >
                    <div className="rounded-xl border border-border bg-white p-2 shadow-xl">

                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="block rounded-lg px-3 py-3 text-sm text-navy/80 transition hover:bg-muted hover:text-navy"
                        >
                          {service.navLabel}
                        </Link>
                      ))}

                      <Link
                        href="/services"
                        className="mt-1 flex items-center justify-between border-t border-border px-3 py-3 text-sm font-semibold text-brand"
                      >
                        View all services
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(item.href)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA + Mobile Toggle */}
        <div className="flex items-center gap-2">

          <Link
            href={siteConfig.cta.href}
            className="hidden h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-muted sm:inline-flex"
          >
            {siteConfig.cta.label}
            <ArrowUpRight className="size-4" />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className={cn(
              "inline-flex size-11 items-center justify-center cursor-pointer",
              "rounded-xl border border-border text-navy",
              "transition-colors hover:bg-muted",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-brand lg:hidden"
            )}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-[4.5rem] z-[105] bg-black/35",
          "transition-opacity duration-300 lg:hidden sm:top-20",
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        )}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <div
        id={menuId}
        ref={menuRef}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={cn(
          "absolute left-0 right-0 top-full z-[110]",
          "max-h-[calc(100dvh-4.5rem)] overflow-y-auto",
          "border-b border-border bg-white shadow-2xl",
          "transition-all duration-300 ease-out lg:hidden sm:max-h-[calc(100dvh-5rem)]",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        )}
      >
        <Container className="flex flex-col gap-3 py-5">

          {/* Navigation Label */}
          <div className="px-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </p>
          </div>

          {/* Navigation Links */}
          <nav
            className="flex flex-col gap-1"
            aria-label="Mobile menu"
          >
            {siteConfig.nav.map((item) => {

              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="overflow-hidden rounded-xl border border-border"
                  >
                    <div className="flex items-center">

                      <Link
                        href={item.href}
                        tabIndex={open ? 0 : -1}
                        className={cn(
                          "flex min-h-12 flex-1 items-center px-4",
                          "text-sm font-semibold text-navy",
                          isActive(item.href) && "text-brand"
                        )}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>

                      <button
                        type="button"
                        tabIndex={open ? 0 : -1}
                        className="flex size-12 shrink-0 items-center justify-center text-navy transition hover:bg-muted"
                        aria-label="Toggle services submenu"
                        aria-expanded={servicesOpen}
                        onClick={() =>
                          setServicesOpen((value) => !value)
                        }
                      >
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-200",
                            servicesOpen && "rotate-180"
                          )}
                        />
                      </button>
                    </div>

                    <div
                      className={cn(
                        "grid transition-all duration-300",
                        servicesOpen
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-border bg-muted/30 px-3 py-2">

                          <Link
                            href="/services"
                            tabIndex={open && servicesOpen ? 0 : -1}
                            className="flex min-h-11 items-center justify-between rounded-lg px-3 text-sm font-semibold text-brand"
                            onClick={closeMenu}
                          >
                            All Services
                            <ArrowUpRight className="size-4" />
                          </Link>

                          {services.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              tabIndex={open && servicesOpen ? 0 : -1}
                              className="flex min-h-11 items-center rounded-lg px-3 text-sm text-navy/75 transition hover:bg-white hover:text-navy"
                              onClick={closeMenu}
                            >
                              {service.navLabel}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  className={cn(
                    "flex min-h-12 items-center rounded-xl px-4",
                    "text-sm font-semibold text-navy/80",
                    "transition-colors hover:bg-muted",
                    isActive(item.href) &&
                      "bg-muted text-brand"
                  )}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </Container>
      </div>
    </header>
  );
}
