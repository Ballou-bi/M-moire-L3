"use client";

import { useState } from "react";
import { useFetch, useAction, User } from "@/hooks/useApi";

const roleColors: Record<string, string> = {
  CITOYEN: "rgba(201,168,76,0.12)",
  OFFICIER: "rgba(96,165,250,0.12)",
  ADMIN: "rgba(248,113,113,0.12)",
};
const roleTextColors: Record<string, string> = {
  CITOYEN: "var(--gold)",
  OFFICIER: "var(--blue)",
  ADMIN: "var(--red)",
};

export default function AdminUsers() {
  const { data, loading, error, refetch } = useFetch<User[]>("/api/users");
  const { execute, loading: actLoading } = useAction();
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");

  const filtered =
    data?.filter((u) =>
      `${u.prenom} ${u.nom} ${u.email} ${u.telephone}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    ) ?? [];

  const changeRole = async (userId: string, role: string) => {
    await execute(`/api/users/${userId}`, "PATCH", { role });
    setSuccess("Rôle mis à jour !");
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
          Gestion des <em>utilisateurs</em>
        </h1>
        <p className="rn-page-subtitle">
          Consultez et gérez les rôles de tous les utilisateurs inscrits.
        </p>
      </div>

      {success && (
        <div className="rn-alert rn-alert-success animate-fade-up">
          {success}
        </div>
      )}
      {error && <div className="rn-alert rn-alert-error">{error}</div>}

      <div style={{ marginBottom: "1.5rem" }} className="animate-fade-up-1">
        <input
          className="rn-input"
          placeholder="Rechercher par nom, email, téléphone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </div>

      <div className="rn-card animate-fade-up-2">
        <div className="rn-card-title">
          Tous les utilisateurs ({filtered.length})
        </div>
        {loading ? (
          <div className="rn-loading">
            <div className="rn-spinner animate-spin" />
          </div>
        ) : !filtered.length ? (
          <div className="rn-empty">
            <div className="rn-empty-icon">👥</div>
            <div className="rn-empty-title">Aucun utilisateur trouvé</div>
          </div>
        ) : (
          <div className="rn-table-wrap">
            <table className="rn-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Contact</th>
                  <th>Rôle actuel</th>
                  <th>Inscrit le</th>
                  <th>Changer le rôle</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 500 }}>
                      {u.prenom} {u.nom}
                    </td>
                    <td style={{ opacity: 0.65, fontSize: "0.82rem" }}>
                      {u.email ?? u.telephone ?? "—"}
                    </td>
                    <td>
                      <span
                        className="rn-badge-status"
                        style={{
                          background: roleColors[u.role],
                          color: roleTextColors[u.role],
                          border: "none",
                        }}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td style={{ opacity: 0.55 }}>
                      {new Date(u.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td>
                      <select
                        className="rn-select"
                        style={{
                          width: "auto",
                          fontSize: "0.8rem",
                          padding: "0.3rem 0.6rem",
                        }}
                        value={u.role}
                        onChange={(e) => changeRole(u.id, e.target.value)}
                        disabled={actLoading}
                      >
                        <option value="CITOYEN">Citoyen</option>
                        <option value="OFFICIER">Officier</option>
                        <option value="ADMIN">Admin</option>
                      </select>
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
