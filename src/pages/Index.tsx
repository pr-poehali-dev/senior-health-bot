import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "handbook" | "diagnostics" | "medications" | "reminders";

interface Symptom {
  id: string;
  label: string;
  selected: boolean;
}

interface Reminder {
  id: string;
  type: "medication" | "visit";
  title: string;
  time: string;
  days: string;
  active: boolean;
}

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

const MEDICATIONS = [
  { expensive: "Нурофен", cheap: "Ибупрофен", category: "Обезболивающее/НПВС", economy: "до 85%" },
  { expensive: "Терафлю", cheap: "Парацетамол + аскорбиновая кислота", category: "ОРВИ/грипп", economy: "до 90%" },
  { expensive: "Эссенциале", cheap: "Фосфоглив", category: "Гепатопротектор", economy: "до 60%" },
  { expensive: "Де-нол", cheap: "Висмута трикалия дицитрат", category: "ЖКТ", economy: "до 75%" },
  { expensive: "Актовегин", cheap: "Церебролизин", category: "Ноотроп", economy: "до 50%" },
  { expensive: "Лоратадин Кларитин", cheap: "Лоратадин", category: "Антигистаминное", economy: "до 92%" },
];

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

const INITIAL_REMINDERS: Reminder[] = [
  { id: "1", type: "medication", title: "Витамин D", time: "08:00", days: "Ежедневно", active: true },
  { id: "2", type: "medication", title: "Омега-3", time: "13:00", days: "Ежедневно", active: true },
  { id: "3", type: "visit", title: "Приём кардиолога", time: "10:30", days: "15 апреля", active: true },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("handbook");
  const [searchTerm, setSearchTerm] = useState("");
  const [symptoms, setSymptoms] = useState<Symptom[]>(SYMPTOMS_LIST);
  const [medSearch, setMedSearch] = useState("");
  const [reminders, setReminders] = useState<Reminder[]>(INITIAL_REMINDERS);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({ type: "medication" as "medication" | "visit", title: "", time: "09:00", days: "Ежедневно" });

  const filteredTerms = TERMS.filter(t =>
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMeds = MEDICATIONS.filter(m =>
    m.expensive.toLowerCase().includes(medSearch.toLowerCase()) ||
    m.cheap.toLowerCase().includes(medSearch.toLowerCase()) ||
    m.category.toLowerCase().includes(medSearch.toLowerCase())
  );

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const selectedSymptoms = symptoms.filter(s => s.selected).map(s => s.id);
  const recommendation = getRecommendation(selectedSymptoms);

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const addReminder = () => {
    if (!newReminder.title.trim()) return;
    setReminders(prev => [...prev, { ...newReminder, id: Date.now().toString() }]);
    setNewReminder({ type: "medication", title: "", time: "09:00", days: "Ежедневно" });
    setShowAddReminder(false);
  };

  const tabs = [
    { id: "handbook" as Tab, label: "Справочник", icon: "BookOpen" },
    { id: "diagnostics" as Tab, label: "Диагностика", icon: "Stethoscope" },
    { id: "medications" as Tab, label: "Лекарства", icon: "Pill" },
    { id: "reminders" as Tab, label: "Напоминания", icon: "Bell" },
  ];

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

        {/* === СПРАВОЧНИК === */}
        {activeTab === "handbook" && (
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
        )}

        {/* === ДИАГНОСТИКА === */}
        {activeTab === "diagnostics" && (
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
        )}

        {/* === ЛЕКАРСТВА === */}
        {activeTab === "medications" && (
          <div className="animate-fade-in space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Аналоги лекарств</h2>
              <p className="text-sm text-muted-foreground">Найдите доступные замены дорогих препаратов</p>
            </div>

            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" fallback="Search" />
              <input
                value={medSearch}
                onChange={e => setMedSearch(e.target.value)}
                placeholder="Название препарата или категория..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>

            <div className="glass-card rounded-xl p-3 flex items-center gap-2">
              <Icon name="Info" size={15} className="text-primary flex-shrink-0" fallback="Info" />
              <p className="text-xs text-muted-foreground">Замену препарата согласуйте с врачом или фармацевтом. Данные носят информационный характер.</p>
            </div>

            <div className="space-y-3">
              {filteredMeds.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">Ничего не найдено</div>
              )}
              {filteredMeds.map((med, i) => (
                <div key={med.expensive} className="glass-card rounded-xl overflow-hidden card-hover" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-stretch">
                    <div className="w-1 bg-gradient-to-b from-primary to-accent flex-shrink-0" />
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide bg-muted px-2 py-0.5 rounded-full">{med.category}</span>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Экономия {med.economy}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-0.5">Оригинал</div>
                          <div className="font-semibold text-foreground">{med.expensive}</div>
                        </div>
                        <div className="flex-shrink-0">
                          <Icon name="ArrowRight" size={16} className="text-accent" fallback="ArrowRight" />
                        </div>
                        <div className="flex-1 text-right">
                          <div className="text-xs text-muted-foreground mb-0.5">Аналог</div>
                          <div className="font-semibold text-primary">{med.cheap}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === НАПОМИНАНИЯ === */}
        {activeTab === "reminders" && (
          <div className="animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Напоминания</h2>
                <p className="text-sm text-muted-foreground">Приём лекарств и визиты к врачу</p>
              </div>
              <button
                onClick={() => setShowAddReminder(!showAddReminder)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Icon name="Plus" size={16} fallback="Plus" />
                Добавить
              </button>
            </div>

            {/* Add reminder form */}
            {showAddReminder && (
              <div className="glass-card rounded-xl p-4 border-2 border-primary/20 animate-scale-in space-y-3">
                <h3 className="font-medium text-sm text-foreground">Новое напоминание</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setNewReminder(p => ({ ...p, type: "medication" }))}
                    className={`py-2 rounded-lg text-sm font-medium transition-all border ${newReminder.type === "medication" ? "bg-primary text-white border-primary" : "bg-white border-border text-foreground"}`}
                  >
                    💊 Лекарство
                  </button>
                  <button
                    onClick={() => setNewReminder(p => ({ ...p, type: "visit" }))}
                    className={`py-2 rounded-lg text-sm font-medium transition-all border ${newReminder.type === "visit" ? "bg-primary text-white border-primary" : "bg-white border-border text-foreground"}`}
                  >
                    🏥 Визит к врачу
                  </button>
                </div>
                <input
                  value={newReminder.title}
                  onChange={e => setNewReminder(p => ({ ...p, title: e.target.value }))}
                  placeholder={newReminder.type === "medication" ? "Название препарата" : "Специалист / клиника"}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Время</label>
                    <input
                      type="time"
                      value={newReminder.time}
                      onChange={e => setNewReminder(p => ({ ...p, time: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Дни</label>
                    <select
                      value={newReminder.days}
                      onChange={e => setNewReminder(p => ({ ...p, days: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option>Ежедневно</option>
                      <option>Пн, Ср, Пт</option>
                      <option>Пн–Пт</option>
                      <option>По выходным</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={addReminder} className="flex-1 bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">Сохранить</button>
                  <button onClick={() => setShowAddReminder(false)} className="px-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">Отмена</button>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Всего", value: reminders.length, icon: "Bell", color: "text-primary" },
                { label: "Активных", value: reminders.filter(r => r.active).length, icon: "CheckCircle2", color: "text-emerald-600" },
                { label: "Сегодня", value: reminders.filter(r => r.active && r.days === "Ежедневно").length, icon: "Calendar", color: "text-amber-600" },
              ].map(s => (
                <div key={s.label} className="glass-card rounded-xl p-3 text-center">
                  <Icon name={s.icon} size={18} className={`${s.color} mx-auto mb-1`} fallback="Circle" />
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Reminders list */}
            <div className="space-y-2">
              {reminders.length === 0 && (
                <div className="text-center py-10 text-muted-foreground text-sm">
                  <Icon name="BellOff" size={32} className="mx-auto mb-2 opacity-40" fallback="Bell" />
                  <p>Нет напоминаний. Добавьте первое!</p>
                </div>
              )}
              {reminders.map(r => (
                <div key={r.id} className={`glass-card rounded-xl p-4 transition-all ${!r.active ? "opacity-50" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${r.type === "medication" ? "bg-blue-50" : "bg-emerald-50"}`}>
                      <span className="text-lg">{r.type === "medication" ? "💊" : "🏥"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground truncate">{r.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Icon name="Clock" size={12} className="text-muted-foreground" fallback="Clock" />
                        <span className="text-xs text-muted-foreground">{r.time} · {r.days}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => toggleReminder(r.id)}
                        className={`w-11 h-6 rounded-full transition-all duration-200 relative ${r.active ? "bg-primary" : "bg-muted"}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm absolute top-1 transition-all duration-200 ${r.active ? "left-6" : "left-1"}`} />
                      </button>
                      <button onClick={() => deleteReminder(r.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                        <Icon name="Trash2" size={14} fallback="Trash" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Bottom disclaimer */}
      <footer className="max-w-2xl mx-auto px-4 py-6 text-center">
        <p className="text-xs text-muted-foreground">МедГид не заменяет консультацию врача. При ухудшении самочувствия обратитесь за медицинской помощью.</p>
      </footer>
    </div>
  );
}
