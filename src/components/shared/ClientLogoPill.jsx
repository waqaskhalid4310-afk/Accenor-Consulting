import Image from "next/image";
import { cn } from "@/lib/utils";

export function ClientLogoPill({ client, className }) {
  return (
    <div
      className={cn(
        "group flex h-[88px] w-[180px] shrink-0 items-center justify-center rounded-md border border-solid border-border bg-white p-2.5 sm:h-[96px] sm:w-[200px] sm:p-3",
        className,
      )}
    >
      {client.logoSrc && !client.placeholder ? (
        <Image
          src={client.logoSrc}
          alt={client.alt || client.name}
          width={200}
          height={96}
          className="h-full w-full object-contain"
          sizes="200px"
        />
      ) : (
        <span className="text-xs font-semibold tracking-wide text-navy/60">
          {client.name}
        </span>
      )}
    </div>
  );
}
