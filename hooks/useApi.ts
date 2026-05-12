// hooks/useApi.ts — Hooks React pour appeler vos API Routes Next.js

import { useState, useEffect, useCallback } from "react";

// ── Types ────────────────────────────────────────────
export type Declaration = {
  id: string;
  numeroActe?: string;
  statut: "EN_ATTENTE" | "VALIDEE" | "REJETEE";
  prenomEnfant: string;
  nomEnfant: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: string;
  prenomPere: string;
  nomPere: string;
  nationalitePere?: string;
  prenomMere: string;
  nomMere: string;
  nationaliteMere?: string;
  motifRejet?: string;
  dateValidation?: string;
  createdAt: string;
  citoyen?: { prenom: string; nom: string; email?: string };
  officierValidateur?: { prenom: string; nom: string };
  demandes?: DemandeExtrait[];
};

export type DemandeExtrait = {
  id: string;
  type: "INTEGRALE" | "AVEC_FILIATION" | "SANS_FILIATION";
  statut: "EN_COURS" | "PRETE" | "DELIVREE";
  pdfUrl?: string;
  createdAt: string;
  declaration?: {
    prenomEnfant: string;
    nomEnfant: string;
    numeroActe?: string;
    dateNaissance: string;
  };
  citoyen?: { prenom: string; nom: string };
};

export type User = {
  id: string;
  clerkId: string;
  email?: string;
  telephone?: string;
  prenom: string;
  nom: string;
  role: "CITOYEN" | "OFFICIER" | "ADMIN";
  createdAt: string;
  _count?: { declarations: number; demandes: number };
};

export type AdminStats = {
  totalUsers: number;
  totalDeclarations: number;
  declarationsEnAttente: number;
  declarationsValidees: number;
  declarationsRejetees: number;
  totalDemandes: number;
  demandesEnCours: number;
};

// ── Hook générique ─────────────────────────────────
export function useFetch<T>(url: string, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(await res.text());
      setData(await res.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo
  }, [url, ...deps]);

  useEffect(() => {
    fetch_();
  }, [fetch_]);
  return { data, loading, error, refetch: fetch_ };
}

// ── Hook POST/PATCH générique ──────────────────────
export function useAction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (url: string, method: string, body?: unknown) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur serveur");
      }
      return await res.json();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, setError };
}
