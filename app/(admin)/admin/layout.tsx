import MainLayout from "@/components/MainLayout";
import { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="scroll-mt-6 scroll-smooth">
      <MainLayout>{children}</MainLayout>
    </div>
  );
}
