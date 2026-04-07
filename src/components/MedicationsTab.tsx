import { useState } from "react";
import Icon from "@/components/ui/icon";

const MEDICATIONS = [
  { expensive: "Нурофен", cheap: "Ибупрофен", category: "Обезболивающее/НПВС", economy: "до 85%" },
  { expensive: "Терафлю", cheap: "Парацетамол + аскорбиновая кислота", category: "ОРВИ/грипп", economy: "до 90%" },
  { expensive: "Эссенциале", cheap: "Фосфоглив", category: "Гепатопротектор", economy: "до 60%" },
  { expensive: "Де-нол", cheap: "Висмута трикалия дицитрат", category: "ЖКТ", economy: "до 75%" },
  { expensive: "Актовегин", cheap: "Церебролизин", category: "Ноотроп", economy: "до 50%" },
  { expensive: "Кларитин", cheap: "Лоратадин", category: "Антигистаминное", economy: "до 92%" },
  { expensive: "Мезим форте", cheap: "Панкреатин", category: "Ферменты/ЖКТ", economy: "до 80%" },
  { expensive: "Но-шпа", cheap: "Дротаверин", category: "Спазмолитик", economy: "до 90%" },
  { expensive: "Мирамистин", cheap: "Хлоргексидин", category: "Антисептик", economy: "до 95%" },
  { expensive: "Зиртек", cheap: "Цетиризин", category: "Антигистаминное", economy: "до 88%" },
  { expensive: "Диффлюкан", cheap: "Флуконазол", category: "Противогрибковое", economy: "до 95%" },
  { expensive: "Лазолван", cheap: "Амброксол", category: "Отхаркивающее", economy: "до 85%" },
  { expensive: "Ренни", cheap: "Кальция карбонат + магния карбонат", category: "Антацид/ЖКТ", economy: "до 70%" },
  { expensive: "Смекта", cheap: "Диосмектит", category: "Сорбент/ЖКТ", economy: "до 75%" },
  { expensive: "Називин", cheap: "Оксиметазолин", category: "Сосудосуживающее", economy: "до 80%" },
  { expensive: "Вольтарен", cheap: "Диклофенак", category: "НПВС/мазь", economy: "до 90%" },
  { expensive: "Омез", cheap: "Омепразол", category: "ЖКТ/антисекреторное", economy: "до 85%" },
  { expensive: "Линекс", cheap: "Бифидумбактерин", category: "Пробиотик", economy: "до 80%" },
  { expensive: "Найз", cheap: "Нимесулид", category: "Обезболивающее/НПВС", economy: "до 75%" },
  { expensive: "Аквамарис", cheap: "Натрия хлорид 0.9%", category: "Назальное средство", economy: "до 95%" },
];

export default function MedicationsTab() {
  const [medSearch, setMedSearch] = useState("");

  const filteredMeds = MEDICATIONS.filter(m =>
    m.expensive.toLowerCase().includes(medSearch.toLowerCase()) ||
    m.cheap.toLowerCase().includes(medSearch.toLowerCase()) ||
    m.category.toLowerCase().includes(medSearch.toLowerCase())
  );

  return (
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
  );
}