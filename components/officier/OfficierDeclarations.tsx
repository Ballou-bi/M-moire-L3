/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useFetch, useAction, Declaration } from "@/hooks/useApi";
import StatusBadge from "../../components/ui/StatusBadge";

export default function OfficierDeclarations() {
  const { data, loading, error, refetch } =
    useFetch<Declaration[]>("/api/declarations");
  const {
    execute,
    loading: actLoading,
    error: actError,
    setError,
  } = useAction();
  const [selected, setSelected] = useState<Declaration | null>(null);
  const [action, setAction] = useState<"valider" | "rejeter" | null>(null);
  const [motif, setMotif] = useState("");
  const [numeroActe, setNumeroActe] = useState("");
  const [filter, setFilter] = useState<
    "all" | "EN_ATTENTE" | "VALIDEE" | "REJETEE"
  >("EN_ATTENTE");
  const [success, setSuccess] = useState("");

  const filtered =
    data?.filter((d) => filter === "all" || d.statut === filter) ?? [];

  const openModal = (d: Declaration, a: "valider" | "rejeter") => {
    setSelected(d);
    setAction(a);
    setMotif("");
    setNumeroActe(`ACT-${Date.now()}`);
  };

  const handleAction = async () => {
    if (!selected || !action) return;
    try {
      await execute(`/api/declarations/${selected.id}`, "PATCH", {
        action,
        motifRejet: action === "rejeter" ? motif : undefined,
        numeroActe: action === "valider" ? numeroActe : undefined,
      });
      setSuccess(
        action === "valider" ? "Déclaration validée !" : "Déclaration rejetée.",
      );
      setSelected(null);
      refetch();
      setTimeout(() => setSuccess(""), 3000);
    } catch {}
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
          Traitement
        </p>
        <h1 className="rn-page-title">
          Déclarations à <em>valider</em>
        </h1>
        <p className="rn-page-subtitle">
          Examinez chaque déclaration et validez ou rejetez avec un motif.
        </p>
      </div>

      {success && (
        <div className="rn-alert rn-alert-success animate-fade-up">
          {success}
        </div>
      )}
      {error && <div className="rn-alert rn-alert-error">{error}</div>}

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
        className="animate-fade-up-1"
      >
        {[
          { key: "EN_ATTENTE", label: "En attente" },
          { key: "VALIDEE", label: "Validées" },
          { key: "REJETEE", label: "Rejetées" },
          { key: "all", label: "Toutes" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`rn-btn rn-btn-sm ${filter === key ? "rn-btn-gold" : "rn-btn-outline"}`}
            onClick={() => setFilter(key as typeof filter)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="rn-card animate-fade-up-2">
        {loading ? (
          <div className="rn-loading">
            <div className="rn-spinner animate-spin" />
          </div>
        ) : !filtered.length ? (
          <div className="rn-empty">
            <div className="rn-empty-icon">✅</div>
            <div className="rn-empty-title">Aucune déclaration ici</div>
          </div>
        ) : (
          <div className="rn-table-wrap">
            <table className="rn-table">
              <thead>
                <tr>
                  <th>Enfant</th>
                  <th>Né(e) le</th>
                  <th>Lieu</th>
                  <th>Père</th>
                  <th>Mère</th>
                  <th>Citoyen</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id}>
                    <td style={{ fontWeight: 500 }}>
                      {d.prenomEnfant} {d.nomEnfant} ({d.sexe})
                    </td>
                    <td>
                      {new Date(d.dateNaissance).toLocaleDateString("fr-FR")}
                    </td>
                    <td style={{ opacity: 0.7 }}>{d.lieuNaissance}</td>
                    <td style={{ opacity: 0.7 }}>
                      {d.prenomPere} {d.nomPere}
                    </td>
                    <td style={{ opacity: 0.7 }}>
                      {d.prenomMere} {d.nomMere}
                    </td>
                    <td style={{ opacity: 0.65 }}>
                      {d.citoyen?.prenom} {d.citoyen?.nom}
                    </td>
                    <td>
                      <StatusBadge status={d.statut} />
                    </td>
                    <td>
                      {d.statut === "EN_ATTENTE" ? (
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <button
                            className="rn-btn rn-btn-success rn-btn-sm"
                            onClick={() => openModal(d, "valider")}
                          >
                            <svg viewBox="0 0 24 24">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Valider
                          </button>
                          <button
                            className="rn-btn rn-btn-danger rn-btn-sm"
                            onClick={() => openModal(d, "rejeter")}
                          >
                            <svg viewBox="0 0 24 24">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            Rejeter
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: "0.75rem", opacity: 0.4 }}>
                          Traité
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

      {/* Modal validation / rejet */}
      {selected && action && (
        <div className="rn-modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="rn-modal animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rn-modal-title">
              {action === "valider"
                ? "✅ Valider la déclaration"
                : "❌ Rejeter la déclaration"}
            </div>

            <div
              className="rn-alert rn-alert-info"
              style={{ marginBottom: "1.5rem" }}
            >
              <strong>
                {selected.prenomEnfant} {selected.nomEnfant}
              </strong>{" "}
              — né(e) le{" "}
              {new Date(selected.dateNaissance).toLocaleDateString("fr-FR")} à{" "}
              {selected.lieuNaissance}
            </div>

            {actError && (
              <div className="rn-alert rn-alert-error">{actError}</div>
            )}

            {action === "valider" && (
              <div className="rn-field" style={{ marginBottom: "1.5rem" }}>
                <label className="rn-label">Numéro d&apos;acte officiel</label>
                <input
                  className="rn-input"
                  value={numeroActe}
                  onChange={(e) => setNumeroActe(e.target.value)}
                  placeholder="ACT-000000"
                />
              </div>
            )}
            {action === "rejeter" && (
              <div className="rn-field" style={{ marginBottom: "1.5rem" }}>
                <label className="rn-label">Motif du rejet *</label>
                <textarea
                  className="rn-textarea"
                  value={motif}
                  onChange={(e) => setMotif(e.target.value)}
                  placeholder="Expliquez la raison du rejet (informations manquantes, incohérences…)"
                />
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "flex-end",
              }}
            >
              <button
                className="rn-btn rn-btn-outline"
                onClick={() => setSelected(null)}
              >
                Annuler
              </button>
              <button
                className={`rn-btn ${action === "valider" ? "rn-btn-success" : "rn-btn-danger"}`}
                onClick={handleAction}
                disabled={actLoading || (action === "rejeter" && !motif)}
              >
                {actLoading ? (
                  <span className="rn-spinner animate-spin" />
                ) : null}
                {actLoading
                  ? "Traitement..."
                  : action === "valider"
                    ? "Confirmer la validation"
                    : "Confirmer le rejet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
