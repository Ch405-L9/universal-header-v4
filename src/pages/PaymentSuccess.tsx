import { CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <CheckCircle size={48} className="text-primary" />
      <div className="space-y-2">
        <h1 className="font-mono text-2xl font-bold uppercase tracking-wider">
          Deposit Received
        </h1>
        <p className="max-w-md text-muted-foreground">
          You'll hear from us within one business day to schedule your kickoff.
          Check your email for a receipt.
        </p>
      </div>
      <Button asChild variant="outline" className="rounded-none border-primary/50 font-mono text-xs uppercase tracking-wider text-primary hover:bg-primary/10">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
