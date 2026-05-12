"use client";

import { useFetch, Declaration } from "@/hooks/useApi";
import StatusBadge from "../../components/ui/StatusBadge";

export default function OfficierOverview({
  onNavigate,
}: {
  onNavigate: (p: string) => void;
}) {
  const { data } = useFetch<Declaration[]>("/api/declarations");

  const enAttente = data?.filter((d) => d.statut === "EN_ATTENTE").length ?? 0;
  const validees = data?.filter((d) => d.statut === "VALIDEE").length ?? 0;
  const rejetees = data?.filter((d) => d.statut === "REJETEE").length ?? 0;

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
          Officier d&apos;état civil
        </p>
        <h1 className="rn-page-title">
          Tableau de <em>bord</em>
        </h1>
        <p className="rn-page-subtitle">
          Examinez et validez les déclarations de naissance soumises par les
          citoyens.
        </p>
      </div>

      <div className="rn-stats-grid animate-fade-up-1">
        {[
          {
            label: "En attente de validation",
            value: enAttente,
            sub: "à traiter",
            color: "#fbbf24",
          },
          {
            label: "Validées",
            value: validees,
            sub: "actes enregistrés",
            color: "var(--green)",
          },
          {
            label: "Rejetées",
            value: rejetees,
            sub: "avec motif",
            color: "var(--red)",
          },
          {
            label: "Total reçues",
            value: data?.length ?? "—",
            sub: "toutes déclarations",
          },
        ].map(({ label, value, sub, color }) => (
          <div className="rn-stat-card" key={label}>
            <div className="rn-stat-card-label">{label}</div>
            <div
              className="rn-stat-card-value"
              style={{ color: color ?? "var(--gold)" }}
            >
              {value}
            </div>
            <div className="rn-stat-card-sub">{sub}</div>
          </div>
        ))}
      </div>

      {enAttente > 0 && (
        <div className="rn-alert rn-alert-info animate-fade-up-2">
          ⚠️ Vous avez{" "}
          <strong>
            {enAttente} déclaration{enAttente > 1 ? "s" : ""}
          </strong>{" "}
          en attente de traitement.
          <button
            className="rn-btn rn-btn-gold rn-btn-sm"
            style={{ marginLeft: "1rem" }}
            onClick={() => onNavigate("declarations")}
          >
            Traiter maintenant
          </button>
        </div>
      )}

      <div className="rn-card animate-fade-up-3">
        <div className="rn-card-title">Déclarations récentes</div>
        {!data?.length ? (
          <div className="rn-empty">
            <div className="rn-empty-icon">📋</div>
            <div className="rn-empty-title">Aucune déclaration reçue</div>
          </div>
        ) : (
          <div className="rn-table-wrap">
            <table className="rn-table">
              <thead>
                <tr>
                  <th>Enfant</th>
                  <th>Citoyen</th>
                  <th>Date naissance</th>
                  <th>Soumis le</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 8).map((d) => (
                  <tr key={d.id}>
                    <td style={{ fontWeight: 500 }}>
                      {d.prenomEnfant} {d.nomEnfant}
                    </td>
                    <td style={{ opacity: 0.7 }}>
                      {d.citoyen?.prenom} {d.citoyen?.nom}
                    </td>
                    <td>
                      {new Date(d.dateNaissance).toLocaleDateString("fr-FR")}
                    </td>
                    <td style={{ opacity: 0.55 }}>
                      {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td>
                      <StatusBadge status={d.statut} />
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
