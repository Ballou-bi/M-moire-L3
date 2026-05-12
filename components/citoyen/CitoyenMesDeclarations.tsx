"use client";

import { useState } from "react";
import { useFetch, useAction, Declaration } from "@/hooks/useApi";
import StatusBadge from "../../components/ui/StatusBadge";

export default function CitoyenMesDeclarations({
  onDemande,
}: {
  onDemande: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, error, refetch } = useFetch<Declaration[]>(
    "app/api/declarations",
  );
  const {
    execute,
    loading: actLoading,
    error: actError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setError,
  } = useAction();
  const [selected, setSelected] = useState<Declaration | null>(null);
  const [typeExtrait, setTypeExtrait] = useState("INTEGRALE");
  const [success, setSuccess] = useState("");

  const handleDemande = async () => {
    if (!selected) return;
    try {
      await execute("app/api/demandes", "POST", {
        declarationId: selected.id,
        type: typeExtrait,
      });
      setSuccess("Demande d'extrait soumise avec succès !");
      setSelected(null);
      setTimeout(() => {
        setSuccess("");
        onDemande();
      }, 1500);
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
          Suivi
        </p>
        <h1 className="rn-page-title">
          Mes <em>déclarations</em>
        </h1>
        <p className="rn-page-subtitle">
          Consultez l&apos;état de toutes vos déclarations de naissance.
        </p>
      </div>

      {success && (
        <div className="rn-alert rn-alert-success animate-fade-up">
          {success}
        </div>
      )}
      {error && <div className="rn-alert rn-alert-error">{error}</div>}

      <div className="rn-card animate-fade-up-1">
        <div className="rn-card-title">Toutes mes déclarations</div>
        {loading ? (
          <div className="rn-loading">
            <div className="rn-spinner animate-spin" />
          </div>
        ) : !data?.length ? (
          <div className="rn-empty">
            <div className="rn-empty-icon">📋</div>
            <div className="rn-empty-title">Aucune déclaration</div>
            <p className="rn-empty-desc">
              Vous n&apos;avez pas encore soumis de déclaration.
            </p>
          </div>
        ) : (
          <div className="rn-table-wrap">
            <table className="rn-table">
              <thead>
                <tr>
                  <th>N° Acte</th>
                  <th>Enfant</th>
                  <th>Date naissance</th>
                  <th>Lieu</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.id}>
                    <td
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.78rem",
                        opacity: d.numeroActe ? 1 : 0.35,
                      }}
                    >
                      {d.numeroActe ?? "—"}
                    </td>
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
                    <td>
                      {d.statut === "VALIDEE" ? (
                        <button
                          className="rn-btn rn-btn-gold rn-btn-sm"
                          onClick={() => setSelected(d)}
                        >
                          <svg viewBox="0 0 24 24">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          Demander extrait
                        </button>
                      ) : d.statut === "REJETEE" ? (
                        <span
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--red)",
                            opacity: 0.8,
                          }}
                          title={d.motifRejet ?? ""}
                        >
                          {d.motifRejet
                            ? `Motif : ${d.motifRejet.slice(0, 30)}…`
                            : "Rejetée"}
                        </span>
                      ) : (
                        <span style={{ fontSize: "0.78rem", opacity: 0.4 }}>
                          En attente
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

      {/* Modal demande extrait */}
      {selected && (
        <div className="rn-modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="rn-modal animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rn-modal-title">Demander un extrait</div>
            <p
              style={{
                opacity: 0.6,
                fontSize: "0.85rem",
                marginBottom: "1.5rem",
              }}
            >
              Pour :{" "}
              <strong>
                {selected.prenomEnfant} {selected.nomEnfant}
              </strong>{" "}
              — N° {selected.numeroActe}
            </p>
            {actError && (
              <div className="rn-alert rn-alert-error">{actError}</div>
            )}
            <div className="rn-field" style={{ marginBottom: "1.5rem" }}>
              <label className="rn-label">Type d&apos;extrait</label>
              <select
                className="rn-select"
                value={typeExtrait}
                onChange={(e) => setTypeExtrait(e.target.value)}
              >
                <option value="INTEGRALE">Copie intégrale</option>
                <option value="AVEC_FILIATION">Avec filiation</option>
                <option value="SANS_FILIATION">Sans filiation</option>
              </select>
            </div>
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
                className="rn-btn rn-btn-gold"
                onClick={handleDemande}
                disabled={actLoading}
              >
                {actLoading ? (
                  <span className="rn-spinner animate-spin" />
                ) : null}
                {actLoading ? "Envoi..." : "Confirmer la demande"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
