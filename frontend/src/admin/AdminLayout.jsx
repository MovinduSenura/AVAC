import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";
import { StatusBadge } from "./ui";

const navItems = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/applications", label: "Applications" },
  { to: "/admin/blog", label: "Blog Posts" },
  { to: "/admin/comments", label: "Comments" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/subscribers", label: "Subscribers" },
  { to: "/admin/staff", label: "Staff", adminOnly: true },
];

function AdminLayout() {
  const { profile, isAdmin, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link to="/admin" className="flex items-center gap-3 px-5 py-5" onClick={() => setIsMenuOpen(false)}>
        <img src="/favicon.svg" alt="" className="h-8 w-8 rounded-full object-cover" />
        <div>
          <p className="text-sm font-bold text-[#1f1f1f]">AVA Consultants</p>
          <p className="text-xs text-[#8a8a8a]">Admin Panel</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 px-3" aria-label="Admin">
        {navItems
          .filter((item) => !item.adminOnly || isAdmin)
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#f6efe2] text-[color:var(--avac-gold)]"
                    : "text-[#4a4a4a] hover:bg-[#faf7f1] hover:text-[#1f1f1f]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
      </nav>

      <div className="border-t border-[#ece6db] px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#1f1f1f]">
              {profile.full_name || profile.email}
            </p>
            <p className="truncate text-xs text-[#8a8a8a]">{profile.email}</p>
          </div>
          <StatusBadge status={profile.role} />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <Link
            to="/admin/account"
            onClick={() => setIsMenuOpen(false)}
            className="text-[#5f5f5f] hover:text-[color:var(--avac-gold)]"
          >
            My account
          </Link>
          <a href="/" target="_blank" rel="noreferrer" className="text-[#5f5f5f] hover:text-[color:var(--avac-gold)]">
            View website
          </a>
          <button
            type="button"
            onClick={signOut}
            className="cursor-pointer text-red-700 hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1f1f1f]">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#ece6db] bg-white px-4 py-3 lg:hidden">
        <p className="text-sm font-bold">AVA Admin</p>
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          className="cursor-pointer rounded-lg border border-[#e5ddd0] px-3 py-1.5 text-sm"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
          <aside className="relative h-full w-72 bg-white">{sidebar}</aside>
        </div>
      )}

      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[#ece6db] bg-white lg:block">
        {sidebar}
      </aside>

      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
