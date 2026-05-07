const features = [
  {
    num: "01",
    title: "Déclaration en ligne",
    desc: "Soumission du formulaire de naissance par les parents depuis n'importe où, avec validation en temps réel des données.",
  },
  {
    num: "02",
    title: "Validation officielle",
    desc: "Les officiers d'état civil examinent, valident ou rejettent les déclarations avec un système de notification automatique.",
  },
  {
    num: "03",
    title: "Génération de PDF certifié",
    desc: "Extraits générés automatiquement avec QR Code de vérification pour garantir l'authenticité du document.",
  },
  {
    num: "04",
    title: "Suivi en temps réel",
    desc: "Tableau de bord citoyen avec suivi de l'état de chaque demande, de la soumission à la délivrance.",
  },
];

const steps = [
  {
    title: "Inscription du citoyen",
    desc: "Création du compte avec vérification d'identité basique",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Soumission de la déclaration",
    desc: "Formulaire complet avec informations de l'enfant et des parents",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Validation par l'officier",
    desc: "Examen et approbation avec attribution du numéro d'acte",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: "Demande d'extrait",
    desc: "Choix du type (intégrale, avec filiation, sans filiation)",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    ),
  },
  {
    title: "Téléchargement du PDF",
    desc: "Extrait certifié avec QR Code de vérification d'authenticité",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="features" id="fonctionnalites">
      <p className="section-label">Fonctionnalités</p>
      <h2 className="section-title">
        Tout le processus,
        <br />
        <em>repensé</em> numériquement
      </h2>

      <div className="features-grid">
        <div className="feature-list">
          {features.map((f) => (
            <div className="feature-item" key={f.num}>
              <div className="feature-item-num">{f.num}</div>
              <div className="feature-item-title">{f.title}</div>
              <p className="feature-item-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="process-flow" id="processus">
          {steps.map((step, i) => (
            <div className="process-step" key={i}>
              <div className="step-icon">{step.icon}</div>
              <div className="step-info">
                <div className="step-info-title">{step.title}</div>
                <div className="step-info-desc">{step.desc}</div>
              </div>
              <span className="step-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
