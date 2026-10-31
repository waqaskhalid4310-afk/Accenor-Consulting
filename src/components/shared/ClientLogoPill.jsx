import Image from "next/image";
import { cn } from "@/lib/utils";

export function ClientLogoPill({ client, className }) {
  return (
    <div
      className={cn(
        "group flex h-[72px] w-[168px] shrink-0 items-center justify-center rounded-md border border-solid border-border bg-white px-6 py-3 sm:h-[76px] sm:w-[180px]",
        className,
      )}
    >
      {client.logoSrc && !client.placeholder ? (
        <Image
          src={client.logoSrc}
          alt={client.alt || client.name}
          width={140}
          height={40}
          className="h-9 max-w-[132px] object-contain sm:h-10 sm:max-w-[140px]"
          style={{ width: "auto" }}
        />
      ) : (
        <span className="text-xs font-semibold tracking-wide text-navy/60">
          {client.name}
        </span>
      )}
    </div>
  );
}
