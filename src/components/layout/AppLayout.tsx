"use client";

import { SidebarRail, SidebarDrawer, SidebarOverlay } from "./Sidebar";
import { Header } from "./Header";
import { SidebarProvider } from "@/hooks/useSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

/**
 * App shell: [ SidebarRail | MainColumn( Header + Main ) ]
 * Sidebar participates in flex layout — no margin hacks.
 * Mobile drawer is fixed overlay and does not affect main column width.
 */
function AppShell({ children, title, subtitle }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-mesh">
      <SidebarRail />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={title} subtitle={subtitle} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6 lg:py-8">
          {children}
        </main>
      </div>

      <SidebarDrawer />
      <SidebarOverlay />
    </div>
  );
}

export function AppLayout(props: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppShell {...props} />
    </SidebarProvider>
  );
}
