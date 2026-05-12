"use client";

import { useFetch, Declaration, DemandeExtrait, User } from "@/hooks/useApi";

export default function AdminOverview({
  onNavigate,
}: {
  onNavigate: (p: string) => void;
}) {
  const { data: declarations } = useFetch<Declaration[]>("/api/declarations");
  const { data: demandes } = useFetch<DemandeExtrait[]>("/api/demandes");
  const { data: users } = useFetch<User[]>("/api/users");

  const stats = [
    {
      label: "Utilisateurs",
      value: users?.length ?? "—",
      sub: "inscrits",
      color: "var(--gold)",
    },
    {
      label: "Déclarations totales",
      value: declarations?.length ?? "—",
      sub: "reçues",
      color: "var(--gold)",
    },
    {
      label: "En attente",
      value:
        declarations?.filter((d) => d.statut === "EN_ATTENTE").length ?? "—",
      sub: "à traiter",
      color: "#fbbf24",
    },
    {
      label: "Validées",
      value: declarations?.filter((d) => d.statut === "VALIDEE").length ?? "—",
      sub: "actes enregistrés",
      color: "var(--green)",
    },
    {
      label: "Rejetées",
      value: declarations?.filter((d) => d.statut === "REJETEE").length ?? "—",
      sub: "avec motif",
      color: "var(--red)",
    },
    {
      label: "Demandes extraits",
      value: demandes?.length ?? "—",
      sub: "total",
      color: "var(--blue)",
    },
    {
      label: "Extraits prêts",
      value: demandes?.filter((d) => d.statut === "PRETE").length ?? "—",
      sub: "à livrer",
      color: "var(--green)",
    },
    {
      label: "Citoyens actifs",
      value: users?.filter((u) => u.role === "CITOYEN").length ?? "—",
      sub: "citoyens",
      color: "var(--gold)",
    },
  ];

  return (
    <div>
      <div className="rn-page-header animate-fade-up">
        <p
          style={{
            fontSize: "0.68rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--gold)",
            marginBottom: "0.5rem",
          }}
        >
          Administration
        </p>
        <h1 className="rn-page-title">
          Supervision <em>générale</em>
        </h1>
        <p className="rn-page-subtitle">
          Vue d&apos;ensemble complète de la plateforme RegistreNatal.
        </p>
      </div>

      <div className="rn-stats-grid animate-fade-up-1">
        {stats.map(({ label, value, sub, color }) => (
          <div className="rn-stat-card" key={label}>
            <div className="rn-stat-card-label">{label}</div>
            <div className="rn-stat-card-value" style={{ color }}>
              {value}
            </div>
            <div className="rn-stat-card-sub">{sub}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
        className="animate-fade-up-2"
      >
        {[
          { label: "Gérer les utilisateurs", page: "users", icon: "👥" },
          {
            label: "Toutes les déclarations",
            page: "declarations",
            icon: "📋",
          },
          { label: "Demandes d'extraits", page: "demandes", icon: "📥" },
        ].map(({ label, page, icon }) => (
          <button
            key={page}
            className="rn-card"
            style={{ cursor: "pointer", textAlign: "left" }}
            onClick={() => onNavigate(page)}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
              {icon}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          </button>
        ))}
      </div>

      {/* Recent activity */}
      <div className="rn-card animate-fade-up-3">
        <div className="rn-card-title">Activité récente</div>
        <div className="rn-timeline">
          {declarations?.slice(0, 6).map((d) => (
            <div className="rn-timeline-item" key={d.id}>
              <div
                className="rn-timeline-dot"
                style={{
                  background:
                    d.statut === "VALIDEE"
                      ? "var(--green)"
                      : d.statut === "REJETEE"
                        ? "var(--red)"
                        : "#fbbf24",
                }}
              />
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  {d.prenomEnfant} {d.nomEnfant}
                </div>
                <div style={{ fontSize: "0.75rem", opacity: 0.5 }}>
                  {d.statut === "EN_ATTENTE"
                    ? "Déclaration soumise"
                    : d.statut === "VALIDEE"
                      ? `Validée — N° ${d.numeroActe}`
                      : `Rejetée : ${d.motifRejet}`}
                  {" · "}
                  {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
