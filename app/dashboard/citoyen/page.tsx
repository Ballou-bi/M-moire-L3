/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
// import Sidebar from "../../../components/ui/Sidebar";
import CitoyenOverview from "../../../components/citoyen/CitoyenOverview";
import CitoyenNouvelleDeclaration from "../../../components/citoyen/CitoyenNouvelleDeclaration";
import CitoyenMesDeclarations from "../../../components/citoyen/CitoyenMesDeclarations";
import CitoyenMesDemandes from "../../../components/citoyen/CitoyenMesDemandes";
import Link from "next/link";

const navItems = [
  {
    href: "#overview",
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
    href: "#declaration",
    label: "Nouvelle déclaration",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    href: "#declarations",
    label: "Mes déclarations",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    href: "#demandes",
    label: "Mes extraits",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

export default function CitoyenDashboard() {
  const [active, setActive] = useState("overview");

  const navWithAction = navItems.map((item) => ({
    ...item,
    href: item.href,
  }));

  return (
    <div className="rn-layout">
      <div style={{ position: "relative" }}>
        <aside className="rn-sidebar">
          {/* Logo */}
          <Link
            href="/"
            className="rn-logo"
            style={{ display: "block", marginBottom: "2rem" }}
          >
            Registre<span>Natal</span>
          </Link>
          {/* User box */}
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
              Mon Espace
            </div>
            <span className="rn-role-badge">Citoyen</span>
          </div>
          <p className="rn-nav-section">Navigation</p>
          <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {navItems.map((item) => (
              <button
                key={item.href}
                className={`rn-nav-item ${active === item.href.slice(1) ? "active" : ""}`}
                onClick={() => setActive(item.href.slice(1))}
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
      </div>

      <main className="rn-main">
        {active === "overview" && <CitoyenOverview onNavigate={setActive} />}
        {active === "declaration" && (
          <CitoyenNouvelleDeclaration
            onSuccess={() => setActive("declarations")}
          />
        )}
        {active === "declarations" && (
          <CitoyenMesDeclarations onDemande={() => setActive("demandes")} />
        )}
        {active === "demandes" && <CitoyenMesDemandes />}
      </main>
    </div>
  );
}
