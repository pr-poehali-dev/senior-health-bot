import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Symptom {
  id: string;
  label: string;
  selected: boolean;
}

const SYMPTOMS_LIST: Symptom[] = [
  { id: "fever", label: "Температура", selected: false },
  { id: "headache", label: "Головная боль", selected: false },
  { id: "cough", label: "Кашель", selected: false },
  { id: "throat", label: "Боль в горле", selected: false },
  { id: "nausea", label: "Тошнота", selected: false },
  { id: "stomach", label: "Боль в животе", selected: false },
  { id: "weakness", label: "Слабость", selected: false },
  { id: "shortness", label: "Одышка", selected: false },
  { id: "chest", label: "Боль в груди", selected: false },
  { id: "dizziness", label: "Головокружение", selected: false },
  { id: "back", label: "Боль в спине", selected: false },
  { id: "joints", label: "Боль в суставах", selected: false },
];

const getRecommendation = (symptoms: string[]) => {
  if (symptoms.includes("chest") || symptoms.includes("shortness"))
    return { doctor: "Кардиолог", urgency: "срочно", icon: "HeartPulse", color: "text-red-600", bg: "bg-red-50 border-red-200" };
  if (symptoms.includes("fever") && symptoms.includes("cough") && symptoms.includes("throat"))
    return { doctor: "Терапевт / ЛОР", urgency: "в течение суток", icon: "Stethoscope", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" };
  if (symptoms.includes("stomach") || symptoms.includes("nausea"))
    return { doctor: "Гастроэнтеролог", urgency: "в течение 2–3 дней", icon: "Activity", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" };
  if (symptoms.includes("headache") || symptoms.includes("dizziness"))
    return { doctor: "Невролог", urgency: "в течение недели", icon: "Brain", color: "text-purple-600", bg: "bg-purple-50 border-purple-200" };
  if (symptoms.includes("back") || symptoms.includes("joints"))
    return { doctor: "Ортопед / Ревматолог", urgency: "в течение недели", icon: "Bone", color: "text-teal-600", bg: "bg-teal-50 border-teal-200" };
  if (symptoms.length > 0)
    return { doctor: "Терапевт", urgency: "в течение нескольких дней", icon: "Stethoscope", color: "text-primary", bg: "bg-blue-50 border-blue-200" };
  return null;
};

export default function DiagnosticsTab() {
  const [symptoms, setSymptoms] = useState<Symptom[]>(SYMPTOMS_LIST);

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const selectedSymptoms = symptoms.filter(s => s.selected).map(s => s.id);
  const recommendation = getRecommendation(selectedSymptoms);

  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Диагностика симптомов</h2>
        <p className="text-sm text-muted-foreground">Выберите симптомы — получите рекомендацию по врачу</p>
      </div>

      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="AlertCircle" size={15} className="text-amber-500" fallback="AlertCircle" />
          <span className="text-xs text-muted-foreground">Не является медицинским диагнозом. Обязательно проконсультируйтесь с врачом.</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {symptoms.map(s => (
            <button
              key={s.id}
              onClick={() => toggleSymptom(s.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                s.selected
                  ? "bg-primary text-white shadow-md scale-105"
                  : "bg-white border border-border text-foreground hover:border-primary/40 hover:bg-primary/5"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {selectedSymptoms.length > 0 && (
          <button
            onClick={() => setSymptoms(SYMPTOMS_LIST)}
            className="mt-3 text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          >
            <Icon name="X" size={12} fallback="X" />
            Сбросить выбор
          </button>
        )}
      </div>

      {recommendation ? (
        <div className={`rounded-xl p-5 border-2 animate-scale-in ${recommendation.bg}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
              <Icon name={recommendation.icon} size={20} className={recommendation.color} fallback="Stethoscope" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Рекомендуемый врач</div>
              <div className={`text-lg font-bold ${recommendation.color}`}>{recommendation.doctor}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
            <Icon name="Clock" size={14} className="text-muted-foreground" fallback="Clock" />
            <span className="text-sm text-foreground">Обратитесь <strong>{recommendation.urgency}</strong></span>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            Выбранных симптомов: {selectedSymptoms.length}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-border p-8 text-center">
          <Icon name="MousePointerClick" size={28} className="text-muted-foreground mx-auto mb-2" fallback="Pointer" />
          <p className="text-sm text-muted-foreground">Выберите симптомы, чтобы получить рекомендацию</p>
        </div>
      )}

      {/* Emergency info */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Phone" size={16} className="text-red-600" fallback="Phone" />
          <span className="font-semibold text-red-700 text-sm">Экстренная помощь</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[{ num: "103", label: "Скорая" }, { num: "112", label: "Единый" }, { num: "101", label: "МЧС" }].map(e => (
            <a key={e.num} href={`tel:${e.num}`} className="bg-white rounded-lg py-2 hover:bg-red-100 transition-colors">
              <div className="font-bold text-red-600 text-lg">{e.num}</div>
              <div className="text-xs text-red-500">{e.label}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
