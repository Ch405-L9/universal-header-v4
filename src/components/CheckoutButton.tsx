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
    <div className="flex flex-col gap-1">
      <Button
        variant={variant}
        disabled={isLoading}
        onClick={() => checkout(serviceId)}
        className={cn(
          "rounded-none font-mono text-xs uppercase tracking-[0.18em]",
          variant === "default" && "bg-primary text-white hover:bg-primary/80",
          variant === "outline" && "border-primary/50 text-primary hover:bg-primary/10",
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
