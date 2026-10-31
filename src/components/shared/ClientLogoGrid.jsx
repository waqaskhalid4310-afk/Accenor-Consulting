import { ClientLogoPill } from "@/components/shared/ClientLogoPill";
import { cn } from "@/lib/utils";

export function ClientLogoGrid({ clients, className, gridClassName }) {
  return (
    <div className={className}>
      <ul
        className={cn(
          "grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5",
          gridClassName,
        )}
      >
        {clients.map((client) => (
          <li key={client.id} className="flex justify-center">
            <ClientLogoPill
              client={client}
              className="h-auto min-h-[72px] w-full max-w-[200px] rounded-md hover:border-brand/30 sm:min-h-[76px]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
