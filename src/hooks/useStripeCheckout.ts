import { useState } from "react";
import type { ServiceId } from "@/lib/payment";

export function useStripeCheckout() {
  const [loading, setLoading] = useState<ServiceId | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function checkout(serviceId: ServiceId) {
    setLoading(serviceId);
    setError(null);

    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Server error ${res.status}`);
      }

      const { url } = await res.json();
      if (!url) throw new Error("No checkout URL returned");

      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(null);
    }
  }

  return { checkout, loading, error };
}
