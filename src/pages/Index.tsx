import { useState } from "react";
import Icon from "@/components/ui/icon";
import HandbookTab from "@/components/HandbookTab";
import DiagnosticsTab from "@/components/DiagnosticsTab";
import MedicationsTab from "@/components/MedicationsTab";
import RemindersTab from "@/components/RemindersTab";

type Tab = "handbook" | "diagnostics" | "medications" | "reminders";

const tabs = [
  { id: "handbook" as Tab, label: "Справочник", icon: "BookOpen" },
  { id: "diagnostics" as Tab, label: "Диагностика", icon: "Stethoscope" },
  { id: "medications" as Tab, label: "Лекарства", icon: "Pill" },
  { id: "reminders" as Tab, label: "Напоминания", icon: "Bell" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("handbook");

  return (
    <div className="min-h-screen font-ibm" style={{ background: "linear-gradient(160deg, hsl(210,30%,97%) 0%, hsl(185,40%,95%) 100%)" }}>
      {/* Header */}
      <header className="med-gradient text-white shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Icon name="Cross" size={22} className="text-white" fallback="Plus" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">МедГид</h1>
              <p className="text-xs text-white/75 font-light">Ваш медицинский помощник</p>
            </div>
            <div className="ml-auto flex items-center gap-1 bg-white/15 rounded-full px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-xs text-white/90">Активен</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-2xl mx-auto px-4 pb-0">
          <div className="flex gap-1 bg-white/10 rounded-t-xl p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-primary shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/15"
                }`}
              >
                <Icon name={tab.icon} size={16} fallback="Circle" />
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {activeTab === "handbook" && <HandbookTab />}
        {activeTab === "diagnostics" && <DiagnosticsTab />}
        {activeTab === "medications" && <MedicationsTab />}
        {activeTab === "reminders" && <RemindersTab />}
      </main>

      {/* Bottom disclaimer */}
      <footer className="max-w-2xl mx-auto px-4 py-6 text-center">
        <p className="text-xs text-muted-foreground">МедГид не заменяет консультацию врача. При ухудшении самочувствия обратитесь за медицинской помощью.</p>
      </footer>
    </div>
  );
}
