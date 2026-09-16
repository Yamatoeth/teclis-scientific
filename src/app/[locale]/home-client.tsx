"use client";

import { useState, ReactNode } from "react";
import SplashScreen from "@/components/ui/splash-screen";

interface HomeClientProps {
  title: string;
  subtitle: string;
  locale: string;
  children: ReactNode;
}

export default function HomeClient({ title, subtitle, children }: HomeClientProps) {
  // Initialize from localStorage; always render children for SSR
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("hasVisitedSplash");
  });

  const handleEnterApp = () => {
    setShowSplash(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("hasVisitedSplash", "true");
    }
  };

  // Always render children in the DOM for SSR/SEO.
  // The splash screen is mounted as an overlay only on first visit.
  return (
    <>
      {/* Always render children so SSR produces full page content */}
      {children}

      {/* Splash overlay — only visible on first visit (client-side) */}
      {showSplash && (
        <SplashScreen
          onEnter={handleEnterApp}
          title={title}
          subtitle={subtitle}
        />
      )}
    </>
  );
}
