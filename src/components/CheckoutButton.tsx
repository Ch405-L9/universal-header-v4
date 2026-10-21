import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import type { ServiceId } from "@/lib/payment";
import { cn } from "@/lib/utils";

interface CheckoutButtonProps {
  serviceId: ServiceId;
  label?: string;
  className?: string;
  variant?: "default" | "outline";
}

export function CheckoutButton({
  serviceId,
  label = "Reserve Spot",
  className,
  variant = "default",
}: CheckoutButtonProps) {
  const { checkout, loading, error } = useStripeCheckout();
  const isLoading = loading === serviceId;

  return (
    <div className="flex min-w-0 max-w-full flex-col gap-1">
      <Button
        variant={variant}
        disabled={isLoading}
        onClick={() => checkout(serviceId)}
        className={cn(
          "h-auto min-h-9 max-w-full whitespace-normal rounded-none py-2 text-center font-mono text-xs uppercase tracking-[0.18em]",
          variant === "default" && "bg-primary text-white hover:bg-primary/80",
          variant === "outline" && "border-primary-bright/60 text-primary-bright hover:bg-primary/10 hover:text-white",
          className
        )}
      >
        {isLoading ? (
          <>
            <Loader2 size={14} className="mr-2 animate-spin" />
            Redirecting…
          </>
        ) : (
          label
        )}
      </Button>
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
