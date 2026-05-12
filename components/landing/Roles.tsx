const roles = [
  {
    name: "Citoyen",
    desc: "Tout résident pouvant déclarer une naissance et faire une demande d'extrait en ligne.",
    perms: [
      "Créer une déclaration de naissance",
      "Faire une demande d'extrait",
      "Suivre l'état de ses demandes",
      "Télécharger ses extraits PDF",
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    name: "Officier",
    desc: "Agent de l'état civil chargé d'examiner et de valider les déclarations de naissance soumises.",
    perms: [
      "Consulter toutes les déclarations",
      "Valider ou rejeter avec motif",
      "Attribuer le numéro d'acte officiel",
      "Accéder au tableau de bord statistiques",
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    name: "Administrateur",
    desc: "Super-utilisateur avec accès complet à la gestion de la plateforme et des utilisateurs.",
    perms: [
      "Gérer tous les utilisateurs",
      "Traiter les demandes d'extraits",
      "Générer et délivrer les extraits PDF",
      "Supervision et rapports complets",
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  },
];

export default function Roles() {
  return (
    <section className="roles" id="roles">
      <p className="section-label">Gestion des accès</p>
      <h2 className="section-title">
        Trois profils,
        <br />
        <em>une</em> plateforme
      </h2>

      <div className="roles-grid">
        {roles.map((role) => (
          <div className="role-card" key={role.name}>
            <div className="role-icon">{role.icon}</div>
            <div className="role-name">{role.name}</div>
            <p className="role-desc">{role.desc}</p>
            <div className="role-perms">
              {role.perms.map((perm, i) => (
                <div className="perm" key={i}>
                  <span className="perm-dot"></span>
                  {perm}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
