"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, Globe2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { HeroDashboard } from "@/components/home/HeroDashboard";
import { homeHero } from "@/data/home";

const trustIcons = {
  shield: ShieldCheck,
  globe: Globe2,
  check: CheckCircle2,
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-glow relative overflow-hidden">
      <Container className="grid items-center gap-10 pt-12 pb-10 sm:gap-12 sm:pt-14 sm:pb-12 lg:grid-cols-2 lg:gap-8 lg:pt-12 lg:pb-10 xl:gap-12 xl:pt-14 xl:pb-12 2xl:gap-16 2xl:pt-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto w-full max-w-xl lg:mx-0"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-3.5 py-1.5 text-xs font-medium text-navy/80 shadow-sm">
            <span className="size-2 rounded-full bg-accent-green" />
            {homeHero.badge}
          </p>

          <h1 className="mt-5 text-balance text-[2rem] font-extrabold leading-[1.12] text-navy sm:text-5xl lg:text-[3.25rem] xl:text-[3.4rem]">
            {homeHero.titleLead}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{homeHero.titleHighlight}</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-sm bg-accent-green/30 sm:h-3.5"
              />
            </span>{" "}
            {homeHero.titleRest}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-navy/80 sm:text-lg md:text-xl">
            {homeHero.sublineBefore}{" "}
            <span className="mx-1 inline-block rounded-lg bg-brand px-2.5 py-0.5 text-sm font-semibold text-white sm:text-base md:text-lg">
              {homeHero.sublineHighlight}
            </span>{" "}
            {homeHero.sublineAfter}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            {homeHero.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={homeHero.primaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-muted"
            >
              {homeHero.primaryCta.label}
            </Link>
            <Link
              href={homeHero.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-white px-5 text-sm font-semibold text-navy transition hover:bg-muted"
            >
              {homeHero.secondaryCta.label}
            </Link>
          </div>

          <ul className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
            {homeHero.trustPoints.map((point) => {
              const Icon = trustIcons[point.icon] || CheckCircle2;
              return (
                <li
                  key={point.label}
                  className="inline-flex items-center gap-2 text-sm text-navy/75"
                >
                  <Icon className="size-4 text-accent-green" aria-hidden />
                  {point.label}
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="relative w-full min-w-0"
        >
          <HeroDashboard />
        </motion.div>
      </Container>
    </section>
  );
}
