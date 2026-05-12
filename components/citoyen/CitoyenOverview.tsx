"use client";

import { useFetch, Declaration, DemandeExtrait } from "../../hooks/useApi";
import StatusBadge from "../../components/ui/StatusBadge";

export default function CitoyenOverview({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  const { data: declarations, loading: l1 } =
    useFetch<Declaration[]>("/api/declarations");
  const { data: demandes, loading: l2 } =
    useFetch<DemandeExtrait[]>("/api/demandes");

  const enAttente =
    declarations?.filter((d) => d.statut === "EN_ATTENTE").length ?? 0;
  const validees =
    declarations?.filter((d) => d.statut === "VALIDEE").length ?? 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rejetees =
    declarations?.filter((d) => d.statut === "REJETEE").length ?? 0;
  const extraits = demandes?.filter((d) => d.statut === "PRETE").length ?? 0;

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
          Tableau de bord
        </p>
        <h1 className="rn-page-title">
          Bienvenue sur <em>RegistreNatal</em>
        </h1>
        <p className="rn-page-subtitle">
          Suivez vos déclarations et téléchargez vos extraits d&apos;acte de
          naissance.
        </p>
      </div>

      {/* Stats */}
      <div className="rn-stats-grid animate-fade-up-1">
        {[
          {
            label: "Total déclarations",
            value: declarations?.length ?? "—",
            sub: "soumises",
          },
          {
            label: "En attente",
            value: enAttente,
            sub: "en cours de traitement",
          },
          { label: "Validées", value: validees, sub: "actes enregistrés" },
          { label: "Extraits prêts", value: extraits, sub: "à télécharger" },
        ].map(({ label, value, sub }) => (
          <div className="rn-stat-card" key={label}>
            <div className="rn-stat-card-label">{label}</div>
            <div className="rn-stat-card-value">{l1 || l2 ? "—" : value}</div>
            <div className="rn-stat-card-sub">{sub}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "2rem",
        }}
        className="animate-fade-up-2"
      >
        <button
          className="rn-card"
          style={{
            textAlign: "left",
            cursor: "pointer",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
          onClick={() => onNavigate("declaration")}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                style={{
                  width: 18,
                  height: 18,
                  stroke: "var(--gold)",
                  fill: "none",
                  strokeWidth: 1.5,
                }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Nouvelle déclaration
            </span>
          </div>
          <p style={{ fontSize: "0.82rem", opacity: 0.55 }}>
            Déclarez une naissance en remplissant le formulaire en ligne.
          </p>
        </button>

        <button
          className="rn-card"
          style={{
            textAlign: "left",
            cursor: "pointer",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
          onClick={() => onNavigate("demandes")}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                style={{
                  width: 18,
                  height: 18,
                  stroke: "var(--gold)",
                  fill: "none",
                  strokeWidth: 1.5,
                }}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Mes extraits
            </span>
          </div>
          <p style={{ fontSize: "0.82rem", opacity: 0.55 }}>
            Téléchargez vos extraits d&apos;acte de naissance certifiés.
          </p>
        </button>
      </div>

      {/* Recent declarations */}
      <div className="rn-card animate-fade-up-3">
        <div className="rn-card-title">Déclarations récentes</div>
        {l1 ? (
          <div className="rn-loading">
            <div className="rn-spinner animate-spin" />
          </div>
        ) : !declarations?.length ? (
          <div className="rn-empty">
            <div className="rn-empty-icon">📄</div>
            <div className="rn-empty-title">Aucune déclaration</div>
            <p className="rn-empty-desc">
              Commencez par déclarer une naissance.
            </p>
          </div>
        ) : (
          <div className="rn-table-wrap">
            <table className="rn-table">
              <thead>
                <tr>
                  <th>Enfant</th>
                  <th>Date naissance</th>
                  <th>Lieu</th>
                  <th>Statut</th>
                  <th>Date soumission</th>
                </tr>
              </thead>
              <tbody>
                {declarations.slice(0, 5).map((d) => (
                  <tr key={d.id}>
                    <td style={{ fontWeight: 500 }}>
                      {d.prenomEnfant} {d.nomEnfant}
                    </td>
                    <td>
                      {new Date(d.dateNaissance).toLocaleDateString("fr-FR")}
                    </td>
                    <td style={{ opacity: 0.7 }}>{d.lieuNaissance}</td>
                    <td>
                      <StatusBadge status={d.statut} />
                    </td>
                    <td style={{ opacity: 0.55 }}>
                      {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
