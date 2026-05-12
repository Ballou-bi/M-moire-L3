type Status =
  | "EN_ATTENTE"
  | "VALIDEE"
  | "REJETEE"
  | "EN_COURS"
  | "PRETE"
  | "DELIVREE";

const config: Record<Status, { label: string; cls: string }> = {
  EN_ATTENTE: { label: "En attente", cls: "rn-badge-pending" },
  VALIDEE: { label: "Validée", cls: "rn-badge-valid" },
  REJETEE: { label: "Rejetée", cls: "rn-badge-rejected" },
  EN_COURS: { label: "En cours", cls: "rn-badge-progress" },
  PRETE: { label: "Prête", cls: "rn-badge-valid" },
  DELIVREE: { label: "Délivrée", cls: "rn-badge-valid" },
};

export default function StatusBadge({ status }: { status: Status }) {
  const { label, cls } = config[status] ?? {
    label: status,
    cls: "rn-badge-pending",
  };
  return (
    <span className={`rn-badge-status ${cls}`}>
      <span className="rn-badge-dot" />
      {label}
    </span>
  );
}
