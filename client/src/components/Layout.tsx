import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { GlobalSearchBar } from "./GlobalSearchBar";
import { MobileDrawer, Sidebar } from "./Sidebar";
import { useHealth } from "../hooks/useHealth";

export function Layout() {
  const status = useHealth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg">
      <Sidebar status={status} />
      <MobileDrawer status={status} open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center gap-3 border-b border-border bg-surface px-4 py-3">
          <button
            className="rounded-md p-1.5 text-text-muted hover:bg-surface-hover md:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <GlobalSearchBar />
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
