import { useEffect, useRef } from "react";
import { scrollMilestones, type MilestoneId } from "@/lib/funnel";

/**
 * Fires onMilestone when the user scrolls a tracked section into view.
 * Each milestone fires once per page load.
 */
export function useScrollDepth(onMilestone: (id: MilestoneId) => void) {
  const fired = useRef<Set<MilestoneId>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const milestone of scrollMilestones) {
      const el = document.getElementById(milestone.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !fired.current.has(milestone.id)) {
            fired.current.add(milestone.id);
            onMilestone(milestone.id);
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach(o => o.disconnect());
  }, [onMilestone]);
}
