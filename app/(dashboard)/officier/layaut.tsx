"use client";

import { DashboardSidebar } from "@/components/layouts/DashboardSidebar";
import { colors } from "@/lib/colors";

export default function OfficierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 80px)" }}>
      <DashboardSidebar role="officier" />
      <main
        style={{
          marginLeft: "220px",
          flex: 1,
          padding: "2rem",
          background: colors.navy,
          color: colors.cream,
        }}
      >
        {children}
      </main>
    </div>
  );
}
