import { XCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PaymentCancel() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <XCircle size={48} className="text-muted-foreground" />
      <div className="space-y-2">
        <h1 className="font-mono text-2xl font-bold uppercase tracking-wider">
          Payment Cancelled
        </h1>
        <p className="max-w-md text-muted-foreground">
          No charge was made. Return to the site when you're ready to move forward.
        </p>
      </div>
      <Button asChild className="rounded-none bg-primary font-mono text-xs uppercase tracking-wider text-white hover:bg-primary/80">
        <Link href="/#pricing">View Packages</Link>
      </Button>
    </div>
  );
}
