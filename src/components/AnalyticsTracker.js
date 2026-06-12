"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // track whenever a user visits a page
    const trackPageVisit = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventType: "page_visit",
            page: pathname || "/",
          }),
        });
      } catch (err) {
        // fail silently — analytics shouldn't crash the site if mongodb is down
      }
    };

    trackPageVisit();
  }, [pathname]);

  return null;
}
