import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Reminder {
  id: string;
  type: "medication" | "visit";
  title: string;
  time: string;
  days: string;
  active: boolean;
}

const INITIAL_REMINDERS: Reminder[] = [
  { id: "1", type: "medication", title: "Витамин D", time: "08:00", days: "Ежедневно", active: true },
  { id: "2", type: "medication", title: "Омега-3", time: "13:00", days: "Ежедневно", active: true },
  { id: "3", type: "visit", title: "Приём кардиолога", time: "10:30", days: "15 апреля", active: true },
];

export default function RemindersTab() {
  const [reminders, setReminders] = useState<Reminder[]>(INITIAL_REMINDERS);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({ type: "medication" as "medication" | "visit", title: "", time: "09:00", days: "Ежедневно" });

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

  return (
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
  );
}
