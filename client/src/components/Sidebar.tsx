import {
  Building2,
  Compass,
  FolderGit2,
  Info,
  Route,
  Sparkles,
  Waypoints,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { DbStatus } from "../hooks/useHealth";

const NAV_ITEMS = [
  { to: "/", label: "Explore", icon: Compass, end: true },
  { to: "/career-path", label: "Career Path", icon: Route },
  { to: "/skill-gap", label: "Skill Gap", icon: Sparkles },
  { to: "/projects", label: "Projects", icon: FolderGit2 },
  { to: "/companies", label: "Companies", icon: Building2 },
  { to: "/about", label: "About", icon: Info },
];

function StatusIndicator({ status }: { status: DbStatus }) {
  const config = {
    checking: { color: "bg-text-muted", label: "Checking..." },
    connected: { color: "bg-node-developer", label: "Graph Connected" },
    offline: { color: "bg-node-jobrole", label: "Database Offline" },
  }[status];

  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-bg px-3 py-2">
      <span className={`h-2 w-2 rounded-full ${config.color} ${status === "connected" ? "animate-pulse" : ""}`} />
      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
        {config.label}
      </span>
    </div>
  );
}

export function SidebarContent({
  status,
  onNavigate,
}: {
  status: DbStatus;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="flex items-center gap-2 px-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/15">
          <Waypoints className="h-4.5 w-4.5 text-accent" />
        </div>
        <div>
          <p className="font-mono text-sm font-semibold leading-none text-text-primary">DevGraph</p>
          <p className="mt-1 text-[11px] leading-none text-text-muted">career graph explorer</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <StatusIndicator status={status} />
      </div>
    </div>
  );
}

export function Sidebar({ status }: { status: DbStatus }) {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-border bg-surface md:block">
      <SidebarContent status={status} />
    </aside>
  );
}

export function MobileDrawer({
  status,
  open,
  onClose,
}: {
  status: DbStatus;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-64 border-r border-border bg-surface shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1.5 text-text-muted hover:bg-surface-hover"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
        <SidebarContent status={status} onNavigate={onClose} />
      </div>
    </div>
  );
}
