"use client";

import { useState } from "react";
import { useAction } from "@/hooks/useApi";

export default function CitoyenNouvelleDeclaration({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { execute, loading, error, setError } = useAction();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    prenomEnfant: "",
    nomEnfant: "",
    dateNaissance: "",
    lieuNaissance: "",
    sexe: "",
    prenomPere: "",
    nomPere: "",
    nationalitePere: "",
    prenomMere: "",
    nomMere: "",
    nationaliteMere: "",
  });

  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    setError(null);
    const required = [
      "prenomEnfant",
      "nomEnfant",
      "dateNaissance",
      "lieuNaissance",
      "sexe",
      "prenomPere",
      "nomPere",
      "prenomMere",
      "nomMere",
    ];
    if (required.some((k) => !form[k as keyof typeof form])) {
      setError("Veuillez remplir tous les champs obligatoires (*)");
      return;
    }
    try {
      await execute("/api/declarations", "POST", form);
      setSuccess(true);
      setTimeout(onSuccess, 1500);
    } catch {}
  };

  if (success)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(74,222,128,0.1)",
            border: "1px solid rgba(74,222,128,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.8rem",
          }}
        >
          ✓
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.8rem",
            fontWeight: 600,
          }}
        >
          Déclaration soumise !
        </h2>
        <p style={{ opacity: 0.6 }}>
          Votre déclaration est en attente de validation par un officier.
        </p>
      </div>
    );

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
          Formulaire
        </p>
        <h1 className="rn-page-title">
          Nouvelle <em>déclaration</em>
        </h1>
        <p className="rn-page-subtitle">
          Remplissez le formulaire ci-dessous pour déclarer une naissance. Les
          champs marqués * sont obligatoires.
        </p>
      </div>

      {error && <div className="rn-alert rn-alert-error">{error}</div>}

      <div className="rn-card animate-fade-up-1">
        {/* Infos enfant */}
        <p className="rn-form-section">Informations de l&apos;enfant</p>
        <div className="rn-form-grid">
          <div className="rn-field">
            <label className="rn-label">Prénom *</label>
            <input
              className="rn-input"
              placeholder="Prénom de l'enfant"
              value={form.prenomEnfant}
              onChange={set("prenomEnfant")}
            />
          </div>
          <div className="rn-field">
            <label className="rn-label">Nom de famille *</label>
            <input
              className="rn-input"
              placeholder="Nom de famille"
              value={form.nomEnfant}
              onChange={set("nomEnfant")}
            />
          </div>
          <div className="rn-field">
            <label className="rn-label">Date de naissance *</label>
            <input
              className="rn-input"
              type="date"
              value={form.dateNaissance}
              onChange={set("dateNaissance")}
            />
          </div>
          <div className="rn-field">
            <label className="rn-label">Lieu de naissance *</label>
            <input
              className="rn-input"
              placeholder="Ville / Commune"
              value={form.lieuNaissance}
              onChange={set("lieuNaissance")}
            />
          </div>
          <div className="rn-field">
            <label className="rn-label">Sexe *</label>
            <select
              className="rn-select"
              value={form.sexe}
              onChange={set("sexe")}
            >
              <option value="">Sélectionner</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>
        </div>

        {/* Infos père */}
        <p className="rn-form-section">Informations du père</p>
        <div className="rn-form-grid">
          <div className="rn-field">
            <label className="rn-label">Prénom du père *</label>
            <input
              className="rn-input"
              placeholder="Prénom"
              value={form.prenomPere}
              onChange={set("prenomPere")}
            />
          </div>
          <div className="rn-field">
            <label className="rn-label">Nom du père *</label>
            <input
              className="rn-input"
              placeholder="Nom"
              value={form.nomPere}
              onChange={set("nomPere")}
            />
          </div>
          <div className="rn-field">
            <label className="rn-label">Nationalité</label>
            <input
              className="rn-input"
              placeholder="Ex: Ivoirienne"
              value={form.nationalitePere}
              onChange={set("nationalitePere")}
            />
          </div>
        </div>

        {/* Infos mère */}
        <p className="rn-form-section">Informations de la mère</p>
        <div className="rn-form-grid">
          <div className="rn-field">
            <label className="rn-label">Prénom de la mère *</label>
            <input
              className="rn-input"
              placeholder="Prénom"
              value={form.prenomMere}
              onChange={set("prenomMere")}
            />
          </div>
          <div className="rn-field">
            <label className="rn-label">Nom de la mère *</label>
            <input
              className="rn-input"
              placeholder="Nom de jeune fille"
              value={form.nomMere}
              onChange={set("nomMere")}
            />
          </div>
          <div className="rn-field">
            <label className="rn-label">Nationalité</label>
            <input
              className="rn-input"
              placeholder="Ex: Ivoirienne"
              value={form.nationaliteMere}
              onChange={set("nationaliteMere")}
            />
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          <button
            className="rn-btn rn-btn-outline"
            onClick={() =>
              setForm({
                prenomEnfant: "",
                nomEnfant: "",
                dateNaissance: "",
                lieuNaissance: "",
                sexe: "",
                prenomPere: "",
                nomPere: "",
                nationalitePere: "",
                prenomMere: "",
                nomMere: "",
                nationaliteMere: "",
              })
            }
          >
            Réinitialiser
          </button>
          <button
            className="rn-btn rn-btn-gold"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="rn-spinner animate-spin" />
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            )}
            {loading ? "Envoi..." : "Soumettre la déclaration"}
          </button>
        </div>
      </div>
    </div>
  );
}
