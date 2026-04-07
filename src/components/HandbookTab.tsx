import { useState } from "react";
import Icon from "@/components/ui/icon";

const TERMS = [
  { term: "Анамнез", definition: "История болезни пациента, собранная врачом при опросе." },
  { term: "Артериальное давление", definition: "Давление крови на стенки артерий. Норма: 120/80 мм рт.ст." },
  { term: "Диастола", definition: "Фаза расслабления сердечной мышцы между сокращениями." },
  { term: "Иммунитет", definition: "Способность организма противостоять инфекциям и чужеродным телам." },
  { term: "Метаболизм", definition: "Совокупность химических реакций в организме, обеспечивающих его жизнедеятельность." },
  { term: "Пульс", definition: "Ритмичные колебания стенок артерий при каждом сердечном сокращении. Норма: 60–100 уд/мин." },
  { term: "Систола", definition: "Фаза сокращения сердечной мышцы, при которой кровь выталкивается в сосуды." },
  { term: "Тахикардия", definition: "Учащённое сердцебиение свыше 100 ударов в минуту." },
  { term: "Брадикардия", definition: "Замедленное сердцебиение — менее 60 ударов в минуту." },
  { term: "Гипертония", definition: "Стойкое повышение артериального давления выше 140/90 мм рт.ст." },
];

export default function HandbookTab() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = TERMS.filter(t =>
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Медицинский справочник</h2>
        <p className="text-sm text-muted-foreground">Словарь терминов и медицинская информация</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" fallback="Search" />
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Поиск термина..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
        />
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: "HeartPulse", label: "Норма давления", value: "120 / 80", unit: "мм рт.ст.", color: "text-red-500" },
          { icon: "Activity", label: "Норма пульса", value: "60–100", unit: "уд/мин", color: "text-blue-500" },
          { icon: "Thermometer", label: "Норма температуры", value: "36.6", unit: "°C", color: "text-amber-500" },
          { icon: "Droplets", label: "Норма сахара", value: "3.9–5.5", unit: "ммоль/л", color: "text-emerald-500" },
        ].map(item => (
          <div key={item.label} className="glass-card rounded-xl p-4 card-hover cursor-default">
            <Icon name={item.icon} size={20} className={item.color} fallback="Circle" />
            <div className="mt-2">
              <div className="font-semibold text-foreground text-base">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.unit}</div>
              <div className="text-xs text-foreground/70 mt-0.5">{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Terms list */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Словарь терминов</h3>
        {filteredTerms.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">Ничего не найдено</div>
        )}
        {filteredTerms.map((item, i) => (
          <div
            key={item.term}
            className="glass-card rounded-xl p-4 card-hover"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="BookMarked" size={14} className="text-primary" fallback="Book" />
              </div>
              <div>
                <div className="font-medium text-foreground text-sm">{item.term}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.definition}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
