"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";

type NavItem = { href: string; label: string; icon: React.ReactNode };
type NavSection = { section: string; items: NavItem[] };

const Icon = ({ d, d2 }: { d: string; d2?: string }) => (
  <svg viewBox="0 0 24 24">
    <path d={d} />
    {d2 && <path d={d2} />}
  </svg>
);

const navByRole: Record<string, NavSection[]> = {
  CITOYEN: [
    {
      section: "Mon espace",
      items: [
        {
          href: "/dashboard/citoyen",
          label: "Tableau de bord",
          icon: <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
        },
        {
          href: "/dashboard/citoyen/declarations",
          label: "Mes déclarations",
          icon: (
            <Icon
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              d2="M14 2v6h6M16 13H8M16 17H8M10 9H8"
            />
          ),
        },
        {
          href: "/dashboard/citoyen/extraits",
          label: "Mes extraits",
          icon: (
            <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          ),
        },
        {
          href: "/dashboard/citoyen/nouvelle",
          label: "Nouvelle déclaration",
          icon: <Icon d="M12 5v14M5 12h14" />,
        },
      ],
    },
  ],
  OFFICIER: [
    {
      section: "Traitement",
      items: [
        {
          href: "/dashboard/officier",
          label: "Tableau de bord",
          icon: <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
        },
        {
          href: "/dashboard/officier/declarations",
          label: "Déclarations",
          icon: (
            <Icon
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              d2="M14 2v6h6"
            />
          ),
        },
        {
          href: "/dashboard/officier/en-attente",
          label: "En attente",
          icon: (
            <Icon d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" />
          ),
        },
      ],
    },
  ],
  ADMIN: [
    {
      section: "Administration",
      items: [
        {
          href: "/dashboard/admin",
          label: "Vue d'ensemble",
          icon: <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
        },
        {
          href: "/dashboard/admin/declarations",
          label: "Déclarations",
          icon: (
            <Icon
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              d2="M14 2v6h6"
            />
          ),
        },
        {
          href: "/dashboard/admin/utilisateurs",
          label: "Utilisateurs",
          icon: (
            <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          ),
        },
        {
          href: "/dashboard/admin/extraits",
          label: "Extraits PDF",
          icon: (
            <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          ),
        },
        {
          href: "/dashboard/admin/statistiques",
          label: "Statistiques",
          icon: <Icon d="M18 20V10M12 20V4M6 20v-6" />,
        },
      ],
    },
  ],
};

const roleBadge: Record<string, string> = {
  CITOYEN: "Espace Citoyen",
  OFFICIER: "Officier d'État Civil",
  ADMIN: "Administration",
};

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();

  const sections = navByRole[role] ?? navByRole.CITOYEN;
  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() ||
    "?";

  return (
    <aside className="db-sidebar">
      <Link href="/" className="db-sidebar-logo">
        Registre<span>Natal</span>
        <span className="db-sidebar-role">{roleBadge[role]}</span>
      </Link>

      <nav className="db-nav">
        {sections.map((sec) => (
          <div key={sec.section}>
            <p className="db-nav-section">{sec.section}</p>
            {sec.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`db-nav-link ${pathname === item.href ? "active" : ""}`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="db-sidebar-user">
        <div className="db-user-avatar">{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="db-user-name"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user?.firstName} {user?.lastName}
          </div>
          <div className="db-user-role">{roleBadge[role]}</div>
        </div>
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--muted)",
            fontSize: "0.75rem",
            flexShrink: 0,
          }}
          title="Déconnexion"
        >
          <svg
            viewBox="0 0 24 24"
            style={{
              width: 16,
              height: 16,
              stroke: "currentColor",
              fill: "none",
              strokeWidth: 1.5,
            }}
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
