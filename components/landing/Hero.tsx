// components/Hero.tsx
// async Server Component — lit la session Clerk côté serveur

import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import DocumentCard from "./DocumentCard";

const stats = [
  { num: "72h", label: "Délai de délivrance" },
  { num: "100%", label: "Traitement en ligne" },
  { num: "3", label: "Types d'extraits" },
];

export default async function Hero() {
  const { userId } = await auth();
  const isConnected = Boolean(userId);

  const demandeHref = isConnected
    ? "/dashboard/citoyen"
    : "/sign-in?redirect_url=/dashboard/citoyen";

  return (
    <section className="rn-hero">
      <div className="rn-hero-grid-line" />

      {/* ── Colonne gauche : contenu ── */}
      <div className="rn-hero-content">
        <div className="rn-badge animate-fade-up">
          <span className="dot animate-pulse-dot" />
          Mémoire L3 — Digitalisation Administrative
        </div>

        <h1 className="rn-h1 animate-fade-up-1">
          L&apos;extrait de
          <br />
          naissance à l&apos;ère
          <br />
          <em>numérique</em>
        </h1>

        <p className="rn-hero-desc animate-fade-up-2">
          Une plateforme moderne qui digitalise entièrement le processus de
          déclaration, de validation et de délivrance des extraits de naissance
          — de la maternité au citoyen.
        </p>

        <div className="rn-hero-actions animate-fade-up-3">
          <Link href={demandeHref} className="rn-btn-primary">
            Faire une demande
          </Link>
          <a href="#processus" className="rn-btn-outline">
            Voir le processus
          </a>
        </div>

        {!isConnected && (
          <p
            className="animate-fade-up-4"
            style={{
              fontSize: "0.78rem",
              opacity: 0.45,
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              style={{
                width: 14,
                height: 14,
                stroke: "currentColor",
                fill: "none",
                strokeWidth: 1.5,
                flexShrink: 0,
              }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Vous serez invité à vous connecter pour accéder à votre espace.
          </p>
        )}

        <div className="rn-stats animate-fade-up-5">
          {stats.map(({ num, label }) => (
            <div className="rn-stat" key={label}>
              <span className="rn-stat-num">{num}</span>
              <span className="rn-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Colonne droite : document card ── */}
      <div className="rn-hero-visual">
        <DocumentCard />
      </div>
    </section>
  );
}
