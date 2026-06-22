'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import AppLogo from '@/components/ui/AppLogo';

import {
  LayoutDashboard,
  MessageSquare,
  Upload,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Brain,
  FileText,
  LogOut,
  UserCircle2,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  group: string;
}

const navItems: NavItem[] = [
  {
    id: 'nav-dashboard',
    label: 'Control Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={18} />,
    group: 'core',
  },
  {
    id: 'nav-chat',
    label: 'Expert Field Copilot',
    href: '/chat-interface',
    icon: <MessageSquare size={18} />,
    group: 'core',
  },
  {
    id: 'nav-upload',
    label: 'Corpus Ingestion',
    href: '/upload-page',
    icon: <Upload size={18} />,
    group: 'core',
  },
  {
    id: 'nav-quiz',
    label: 'Compliance Audit',
    href: '/quiz',
    icon: <Brain size={18} />,
    group: 'core',
  },
  {
    id: 'nav-summary',
    label: 'RCA Engine',
    href: '/summary',
    icon: <FileText size={18} />,
    group: 'intelligence',
  },
  {
    id: 'nav-insights',
    label: 'Reliability Metrics',
    href: '/insights',
    icon: <Lightbulb size={18} />,
    group: 'intelligence',
  },
];

const groups = [
  { key: 'core', label: 'OPERATIONS ROOM' },
  { key: 'intelligence', label: 'PREDICTIVE INTELLIGENCE' },
];

interface SidebarProps {
  currentPath: string;
}

export default function Sidebar({ currentPath }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <aside
      className="flex flex-col h-full border-r transition-all duration-300"
      style={{
        width: collapsed ? '72px' : '250px',
        backgroundColor: '#050816',
        borderColor: '#23263a',
      }}
    >
      {/* LOGO */}
      <div
        className="flex items-center gap-3 px-4 border-b h-[68px]"
        style={{ borderColor: '#23263a' }}
      >
        <AppLogo size={30} />
        {!collapsed && (
          <span className="font-semibold text-[22px] text-white tracking-tight">
            AssetIntel
          </span>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto py-5 px-3">
        {groups.map((group) => {
          const items = navItems.filter((n) => n.group === group.key);

          return (
            <div key={group.key} className="mb-7">
              {!collapsed && (
                <p className="px-3 mb-3 text-[11px] font-semibold tracking-[1.5px] uppercase text-gray-500">
                  {group.label}
                </p>
              )}

              {items.map((item) => {
                const isActive = currentPath === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl mb-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/10'
                        : 'text-gray-400 hover:bg-[#12182b] hover:text-white'
                    }`}
                  >
                    {item.icon}
                    {!collapsed && (
                      <>
                        <span className="text-sm flex-1 font-medium">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="text-xs px-2 py-0.5 bg-orange-500 rounded-full text-white">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}

        {/* FIELD PROFILE PASSPORT */}
        {!collapsed && (
          <div className="mt-8 px-1">
            <p className="px-3 mb-3 text-[11px] font-semibold tracking-[1.5px] uppercase text-gray-500">
              FIELD CREDENTIALS
            </p>

            <div
              className="rounded-2xl border p-4 bg-[#0f172a]"
              style={{ borderColor: '#2a2f45' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white">
                  <UserCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    Technician Passport
                  </h3>
                  <p className="text-gray-400 text-xs">
                    Active Clearances
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push('/my-space')}
                className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
              >
                Verify Credentials
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* BOTTOM CONTROL BUTTONS */}
      <div
        className="border-t px-3 py-4 space-y-2"
        style={{ borderColor: '#23263a' }}
      >
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition"
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>

        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#12182b] text-gray-300 transition"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="text-sm">Collapse Sidebar</span>}
        </button>
      </div>
    </aside>
  );
}