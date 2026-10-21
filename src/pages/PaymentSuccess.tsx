import { CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CARE_PORTAL_URL } from "@/lib/payment";

export default function PaymentSuccess() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <CheckCircle size={48} className="text-primary" />
      <div className="space-y-2">
        <h1 className="font-mono text-2xl font-bold uppercase tracking-wider">
          Payment Received
        </h1>
        <p className="max-w-md text-muted-foreground">
          You'll hear from us within one business day to confirm next steps.
          Check your email for a receipt.
        </p>
        <p className="max-w-md text-sm text-muted-foreground">
          Care plan clients can update billing or cancel anytime in the{" "}
          <a className="text-primary underline-offset-4 hover:underline" href={CARE_PORTAL_URL} rel="noopener noreferrer" target="_blank">
            billing portal
          </a>
          .
        </p>
      </div>
      <Button asChild variant="outline" className="rounded-none border-primary/50 font-mono text-xs uppercase tracking-wider text-primary hover:bg-primary/10">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
