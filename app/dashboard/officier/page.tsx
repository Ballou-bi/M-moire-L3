"use client";

import { useState } from "react";
import OfficierOverview from "../../../components/officier/OfficierOverview";
import OfficierDeclarations from "../../../components/officier/OfficierDeclarations";
import Link from "next/link";

const navItems = [
  {
    id: "overview",
    label: "Vue d'ensemble",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: "declarations",
    label: "Déclarations",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
];

export default function OfficierDashboard() {
  const [active, setActive] = useState("overview");

  return (
    <div className="rn-layout">
      <aside className="rn-sidebar">
        <Link
          href="/"
          className="rn-logo"
          style={{ display: "block", marginBottom: "2rem" }}
        >
          Registre<span>Natal</span>
        </Link>
        <div
          style={{
            padding: "1rem",
            background: "rgba(201,168,76,0.06)",
            border: "1px solid rgba(201,168,76,0.12)",
            borderRadius: "2px",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              fontSize: "0.82rem",
              fontWeight: 500,
              marginBottom: "0.35rem",
            }}
          >
            Espace Officier
          </div>
          <span
            className="rn-role-badge"
            style={{
              background: "rgba(96,165,250,0.12)",
              borderColor: "rgba(96,165,250,0.3)",
              color: "var(--blue)",
            }}
          >
            Officier d&apos;état civil
          </span>
        </div>
        <p className="rn-nav-section">Navigation</p>
        <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`rn-nav-item ${active === item.id ? "active" : ""}`}
              onClick={() => setActive(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div
          style={{
            marginTop: "auto",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          <a href="/sign-out" className="rn-nav-item">
            <svg viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Se déconnecter
          </a>
        </div>
      </aside>
      <main className="rn-main">
        {active === "overview" && <OfficierOverview onNavigate={setActive} />}
        {active === "declarations" && <OfficierDeclarations />}
      </main>
    </div>
  );
}
