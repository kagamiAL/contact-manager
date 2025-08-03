import Header from "@/components/layout/Header";
import DashboardContent from "./components/DashboardContent";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <DashboardContent />
    </div>
  );
}
