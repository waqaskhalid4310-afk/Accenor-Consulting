"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items, defaultOpenIndex = 0, className }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  if (!items?.length) return null;

  return (
    <div
      className={cn(
        "divide-y divide-border rounded-2xl border border-border bg-surface-muted/40",
        className,
      )}
    >
      {items.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.question} className="px-5">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span className="text-base font-semibold text-navy">
                {faq.question}
              </span>
              <span className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-brand shadow-sm">
                {open ? (
                  <Minus className="size-4" aria-hidden />
                ) : (
                  <Plus className="size-4" aria-hidden />
                )}
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="pr-10 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
