export default function DocumentCard() {
  return (
    <div style={{ position: "relative" }}>
      <div className="doc-card">
        <div className="doc-seal">OFFICIEL</div>
        <div className="doc-header">
          <div className="doc-crest">RN</div>
          <div className="doc-title">Extrait d&apos;Acte de Naissance</div>
          <div className="doc-subtitle">REPUBLIQUE — ETAT CIVIL</div>
        </div>

        <div className="doc-field">
          <span className="doc-label">Nom et Prénom</span>
          <div className="doc-value"></div>
        </div>
        <div className="doc-field">
          <span className="doc-label">Date de naissance</span>
          <div className="doc-value short"></div>
        </div>
        <div className="doc-field">
          <span className="doc-label">Lieu de naissance</span>
          <div className="doc-value medium"></div>
        </div>
        <div className="doc-field">
          <span className="doc-label">Nom du père</span>
          <div className="doc-value"></div>
        </div>
        <div className="doc-field">
          <span className="doc-label">Nom de la mère</span>
          <div className="doc-value medium"></div>
        </div>

        <div className="doc-qr">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="qr-cell"></div>
          ))}
        </div>

        <div className="status-badge">
          <span className="status-dot"></span>
          Valide et certifié
        </div>
      </div>
    </div>
  );
}
