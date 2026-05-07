import Link from "next/link";
import DocumentCard from "./DocumentCard";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid-line"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot"></span>
          Mémoire L3 — Digitalisation Administrative
        </div>

        <h1>
          L&apos;extrait de
          <br />
          naissance à l&apos;ère
          <br />
          <em>numérique</em>
        </h1>

        <p className="hero-desc">
          Une plateforme moderne qui digitalise entièrement le processus de
          déclaration, de validation et de délivrance des extraits de naissance
          — de la maternité au citoyen.
        </p>

        <div className="hero-actions">
          <Link
            href="/my-app/custom/components/landing/DocumentRequestForm.tsx"
            className="btn-primary"
          >
            Faire une demande
          </Link>
          <a href="#processus" className="btn-outline">
            Voir le processus
          </a>
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-num">72h</span>
            <span className="stat-label">Délai de délivrance</span>
          </div>
          <div className="stat">
            <span className="stat-num">100%</span>
            <span className="stat-label">Traitement en ligne</span>
          </div>
          <div className="stat">
            <span className="stat-num">3</span>
            <span className="stat-label">Types d&apos;extraits</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <DocumentCard />
      </div>
    </section>
  );
}
