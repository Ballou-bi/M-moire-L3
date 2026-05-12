"use client";

import { useFetch, Declaration } from "@/hooks/useApi";
import StatusBadge from "../../components/ui/StatusBadge";

export default function AdminDeclarations() {
  const { data, loading, error } = useFetch<Declaration[]>("/api/declarations");

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
          Toutes les <em>déclarations</em>
        </h1>
        <p className="rn-page-subtitle">
          Supervision complète de toutes les déclarations de naissance.
        </p>
      </div>
      {error && <div className="rn-alert rn-alert-error">{error}</div>}
      <div className="rn-card animate-fade-up-1">
        <div className="rn-card-title">Déclarations ({data?.length ?? 0})</div>
        {loading ? (
          <div className="rn-loading">
            <div className="rn-spinner animate-spin" />
          </div>
        ) : !data?.length ? (
          <div className="rn-empty">
            <div className="rn-empty-icon">📋</div>
            <div className="rn-empty-title">Aucune déclaration</div>
          </div>
        ) : (
          <div className="rn-table-wrap">
            <table className="rn-table">
              <thead>
                <tr>
                  <th>N° Acte</th>
                  <th>Enfant</th>
                  <th>Naissance</th>
                  <th>Citoyen</th>
                  <th>Officier</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.id}>
                    <td
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.78rem",
                        opacity: d.numeroActe ? 1 : 0.3,
                      }}
                    >
                      {d.numeroActe ?? "—"}
                    </td>
                    <td style={{ fontWeight: 500 }}>
                      {d.prenomEnfant} {d.nomEnfant}
                    </td>
                    <td style={{ opacity: 0.7 }}>
                      {new Date(d.dateNaissance).toLocaleDateString("fr-FR")} ·{" "}
                      {d.lieuNaissance}
                    </td>
                    <td style={{ opacity: 0.65 }}>
                      {d.citoyen?.prenom} {d.citoyen?.nom}
                    </td>
                    <td style={{ opacity: 0.65 }}>
                      {d.officierValidateur
                        ? `${d.officierValidateur.prenom} ${d.officierValidateur.nom}`
                        : "—"}
                    </td>
                    <td>
                      <StatusBadge status={d.statut} />
                    </td>
                    <td style={{ opacity: 0.5 }}>
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
