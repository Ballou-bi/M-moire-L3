"use client";

import { useState } from "react";
import { useFetch, useAction, DemandeExtrait } from "@/hooks/useApi";
import StatusBadge from "../../components/ui/StatusBadge";

const typeLabel: Record<string, string> = {
  INTEGRALE: "Copie intégrale",
  AVEC_FILIATION: "Avec filiation",
  SANS_FILIATION: "Sans filiation",
};

export default function AdminDemandes() {
  const { data, loading, error, refetch } =
    useFetch<DemandeExtrait[]>("/api/demandes");
  const { execute, loading: actLoading } = useAction();
  const [success, setSuccess] = useState("");

  const livrer = async (id: string) => {
    await execute(`/api/demandes/${id}`, "PATCH", {
      action: "livrer",
      pdfUrl: `/api/demandes/${id}/pdf`,
    });
    setSuccess("Extrait marqué comme prêt !");
    refetch();
    setTimeout(() => setSuccess(""), 2500);
  };

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
          Demandes <em>d&apos;extraits</em>
        </h1>
        <p className="rn-page-subtitle">
          Traitez les demandes d&apos;extraits et marquez-les comme prêtes au
          téléchargement.
        </p>
      </div>

      {success && (
        <div className="rn-alert rn-alert-success animate-fade-up">
          {success}
        </div>
      )}
      {error && <div className="rn-alert rn-alert-error">{error}</div>}

      <div className="rn-card animate-fade-up-1">
        <div className="rn-card-title">
          Toutes les demandes ({data?.length ?? 0})
        </div>
        {loading ? (
          <div className="rn-loading">
            <div className="rn-spinner animate-spin" />
          </div>
        ) : !data?.length ? (
          <div className="rn-empty">
            <div className="rn-empty-icon">📥</div>
            <div className="rn-empty-title">Aucune demande</div>
          </div>
        ) : (
          <div className="rn-table-wrap">
            <table className="rn-table">
              <thead>
                <tr>
                  <th>Enfant</th>
                  <th>N° Acte</th>
                  <th>Type</th>
                  <th>Citoyen</th>
                  <th>Demandé le</th>
                  <th>Statut</th>
                  <th>Action</th>
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
                    <td style={{ opacity: 0.75 }}>{typeLabel[d.type]}</td>
                    <td style={{ opacity: 0.65 }}>
                      {d.citoyen?.prenom} {d.citoyen?.nom}
                    </td>
                    <td style={{ opacity: 0.55 }}>
                      {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td>
                      <StatusBadge status={d.statut} />
                    </td>
                    <td>
                      {d.statut === "EN_COURS" ? (
                        <button
                          className="rn-btn rn-btn-gold rn-btn-sm"
                          onClick={() => livrer(d.id)}
                          disabled={actLoading}
                        >
                          <svg viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          Marquer prêt
                        </button>
                      ) : (
                        <span style={{ fontSize: "0.75rem", opacity: 0.4 }}>
                          {d.statut === "PRETE" ? "Prête" : "Délivrée"}
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
    </div>
  );
}
