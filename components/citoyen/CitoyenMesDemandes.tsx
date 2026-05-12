"use client";

import { useFetch, DemandeExtrait } from "@/hooks/useApi";
import StatusBadge from "../../components/ui/StatusBadge";

const typeLabel: Record<string, string> = {
  INTEGRALE: "Copie intégrale",
  AVEC_FILIATION: "Avec filiation",
  SANS_FILIATION: "Sans filiation",
};

export default function CitoyenMesDemandes() {
  const { data, loading, error } = useFetch<DemandeExtrait[]>("/api/demandes");

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
          Extraits
        </p>
        <h1 className="rn-page-title">
          Mes <em>extraits</em> d&apos;acte
        </h1>
        <p className="rn-page-subtitle">
          Téléchargez vos extraits certifiés une fois prêts.
        </p>
      </div>

      {error && <div className="rn-alert rn-alert-error">{error}</div>}

      <div className="rn-card animate-fade-up-1">
        <div className="rn-card-title">Mes demandes d&apos;extraits</div>
        {loading ? (
          <div className="rn-loading">
            <div className="rn-spinner animate-spin" />
          </div>
        ) : !data?.length ? (
          <div className="rn-empty">
            <div className="rn-empty-icon">📥</div>
            <div className="rn-empty-title">Aucune demande</div>
            <p className="rn-empty-desc">
              Vous n&apos;avez pas encore fait de demande d&apos;extrait. Vos
              déclarations doivent d&apos;abord être validées.
            </p>
          </div>
        ) : (
          <div className="rn-table-wrap">
            <table className="rn-table">
              <thead>
                <tr>
                  <th>Enfant</th>
                  <th>N° Acte</th>
                  <th>Type d&lsquo;extrait</th>
                  <th>Date demande</th>
                  <th>Statut</th>
                  <th>Télécharger</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.id}>
                    <td style={{ fontWeight: 500 }}>
                      {d.declaration?.prenomEnfant} {d.declaration?.nomEnfant}
                    </td>
                    <td
                      style={{ fontFamily: "monospace", fontSize: "0.78rem" }}
                    >
                      {d.declaration?.numeroActe ?? "—"}
                    </td>
                    <td style={{ opacity: 0.8 }}>{typeLabel[d.type]}</td>
                    <td style={{ opacity: 0.55 }}>
                      {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td>
                      <StatusBadge status={d.statut} />
                    </td>
                    <td>
                      {d.statut === "PRETE" && d.pdfUrl ? (
                        <a
                          href={d.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rn-btn rn-btn-gold rn-btn-sm"
                        >
                          <svg viewBox="0 0 24 24">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          Télécharger PDF
                        </a>
                      ) : d.statut === "DELIVREE" ? (
                        <span
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--green)",
                            opacity: 0.8,
                          }}
                        >
                          Déjà téléchargé
                        </span>
                      ) : (
                        <span style={{ fontSize: "0.78rem", opacity: 0.35 }}>
                          En préparation…
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info box */}
      <div
        className="rn-alert rn-alert-info animate-fade-up-2"
        style={{ marginTop: "1.5rem" }}
      >
        💡 Les extraits certifiés sont générés par l&apos;administration dans un
        délai de 72h après validation de votre déclaration.
      </div>
    </div>
  );
}
