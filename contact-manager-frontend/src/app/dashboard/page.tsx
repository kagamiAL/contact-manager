import Header from "@/components/layout/Header";
import DashboardContent from "./components/DashboardContent";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <DashboardContent />
    </div>
  );
}
