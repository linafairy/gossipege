import React, { useState } from 'react';
import { X, BookOpen, Check, HelpCircle, ChevronRight, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface PunctuationRuleSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const RULES_GUIDE = [
  {
    task: 16,
    title: 'Задание 16: ССП и Однородные члены',
    summary: 'Запятые в сложносочинённом предложении и при однородных членах.',
    bullets: [
      'Запятая СТАВИТСЯ между частями ССП перед союзами И, А, НО, ДА (=НО), ИЛИ, ЛИБО.',
      'ИСКЛЮЧЕНИЕ: Запятая перед И НЕ ставится, если в начале предложения есть ОБЩИЙ второстепенный член (например, "В особняке горит камин и звучит музыка").',
      'При парных союзах (как..., так и...; не только..., но и...) запятая ставится ТОЛЬКО перед второй частью.',
      'При повторяющихся союзах (и..., и...; или..., или...) запятая ставится перед ВТОРОЙ и последующими частями.',
    ],
    example: 'В гостиной горел камин и тихо играл рояль, но Блэр думала только о Чаке.',
  },
  {
    task: 17,
    title: 'Задание 17: Обособленные члены предложения',
    summary: 'Причастные и деепричастные обороты.',
    bullets: [
      'Деепричастный оборот и одиночное деепричастие обособляются ВСЕГДА (отвечают на вопрос "что делая?", "что сделав?").',
      'Причастный оборот выделяется запятыми, если стоит ПОСЛЕ определяемого существительного ("Девушка, надевшая ободок, улыбнулась").',
      'Если причастный оборот стоит ПЕРЕД существительным, запятая НЕ нужна ("Надевшая ободок девушка улыбнулась").',
      'Исключение: если причастный оборот относится к ЛИЧНОМУ МЕСТОИМЕНИЮ (я, ты, он, она), он выделяется ВСЕГДА!',
    ],
    example: 'Серена, примерившая платье от Chanel, спустилась к гостившим у неё друзьям.',
  },
  {
    task: 18,
    title: 'Задание 18: Вводные слова и Обращения',
    summary: 'Обособление вводных конструкций и обращений.',
    bullets: [
      'Вводные слова и обращения выделяются запятыми с двух сторон.',
      'Обращения — это имена и названия адресатов ("Чак, где ты?", "Дорогой мой друг, слушай").',
      'Вводные слова выражают уверенность (безусловно, конечно), неуверенность (кажется, вероятно), источник сообщения (по словам Блэр).',
      'НЕ ЯВЛЯЮТСЯ ВВОДНЫМИ (запятыми не выделяются): однако (в начале предложения = но), ведь, даже, именно, якобы, будто, между тем, как раз.',
    ],
    example: 'Кажется, Чак, ты безусловно забыл своё обещание.',
  },
  {
    task: 19,
    title: 'Задание 19: Пунктуация в СПП',
    summary: 'Сложноподчинённые предложения.',
    bullets: [
      'Придаточное предложение отделяется от главного запятой с обеих сторон, если стоит внутри главного.',
      'Слово КОТОРЫЙ: запятая ставится перед НАЧАЛОМ придаточного предложения, а не обязательно перед словом "который" ("Особняк, на третьем этаже которого проходил бал...").',
      'Однородные придаточные с одиночным союзом И запятой между собой НЕ разделяются.',
    ],
    example: 'Блэр зашла в библиотеку, где стояли дубовые шкафы, и спросила Нейта про статью.',
  },
  {
    task: 20,
    title: 'Задание 20: Стык союзов (Правило «То-Но-Так»)',
    summary: 'Сложные предложения с разными видами связи.',
    bullets: [
      'На стыке двух союзов (ЧТО ЕСЛИ, ЧТО КОГДА, И ХОТЯ) запятая СТАВИТСЯ, если дальше в предложении НЕТ слов ТО, НО, ТАК.',
      'Если дальше ЕСТЬ слова ТО, НО, ТАК — запятая между союзами НЕ ставится!',
    ],
    example: 'Чак понял, что если он не придет, ТО Блэр его не простит. (Слово ТО есть — запятая между ЧТО и ЕСЛИ НЕ ставится).',
  },
  {
    task: 21,
    title: 'Задание 21: Пунктуационный анализ текста',
    summary: 'Анализ тире, двоеточия и запятых по одинаковым правилам.',
    bullets: [
      'Тире: 1) между подлежащим и сказуемым; 2) в БСП; 3) при приложении; 4) при однородных с обобщающим словом; 5) в прямой речи.',
      'Двоеточие: 1) при обобщающем слове перед однородными; 2) в БСП (причина, пояснение); 3) в прямой речи.',
      'Нужно найти предложения с ОДИНАКОВЫМ правилом постановки знака!',
    ],
    example: 'Нью-Йорк — город снов. Блэр — королева школы. (Правило: тире между подлежащим и сказуемым).',
  },
];

export const PunctuationRuleSheet: React.FC<PunctuationRuleSheetProps> = ({ isOpen, onClose }) => {
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentRule = RULES_GUIDE[activeTaskIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0B]/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#121215] border border-[#C5A059]/40 rounded-2xl shadow-2xl overflow-hidden text-[#E0D7C6] font-sans flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#0A0A0B] px-6 py-4 border-b border-[#C5A059]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1A181B] border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059] font-serif font-bold text-base">
              📖
            </div>
            <div>
              <h2 className="font-serif text-xl font-normal text-[#E0D7C6]">
                Шпаргалка Блэр Уолдорф по Пунктуации
              </h2>
              <p className="text-xs text-[#C5A059]/80 font-serif italic">ЕГЭ по русскому языку 2026: Задания 16-21</p>
            </div>
          </div>
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-1.5 rounded-md text-[#E0D7C6]/70 hover:text-white hover:bg-[#1A181B] cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body with Tabs */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-6 bg-[#0A0A0B]">
          {/* Sidebar Task Selector */}
          <div className="w-full md:w-56 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 shrink-0">
            {RULES_GUIDE.map((rule, idx) => (
              <button
                key={rule.task}
                onClick={() => { sounds.playClick(); setActiveTaskIndex(idx); }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer whitespace-nowrap md:whitespace-normal ${
                  activeTaskIndex === idx
                    ? 'bg-[#1A181B] border-[#C5A059] text-[#C5A059] font-bold shadow-md'
                    : 'bg-[#121215] border-[#C5A059]/20 text-[#E0D7C6]/70 hover:bg-[#1A181B] hover:text-[#E0D7C6]'
                }`}
              >
                <span className="font-mono">Задание {rule.task}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform hidden md:block ${activeTaskIndex === idx ? 'text-[#C5A059] transform translate-x-1' : 'opacity-40'}`} />
              </button>
            ))}
          </div>

          {/* Rule Detail Panel */}
          <div className="flex-1 bg-[#121215] border border-[#C5A059]/30 rounded-xl p-5 overflow-y-auto space-y-4">
            <div className="border-b border-[#C5A059]/20 pb-3">
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-[#1A181B] text-[#C5A059] border border-[#C5A059]/40 text-xs font-mono uppercase tracking-wider mb-1">
                ЕГЭ {currentRule.task}
              </div>
              <h3 className="font-serif text-lg font-normal text-[#E0D7C6]">
                {currentRule.title}
              </h3>
              <p className="text-xs text-[#C5A059]/80 font-serif italic">{currentRule.summary}</p>
            </div>

            {/* Bullets */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-wider font-mono flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                Ключевые правила:
              </h4>
              <ul className="space-y-2">
                {currentRule.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#E0D7C6]/90 leading-relaxed">
                    <span className="text-[#C5A059] mt-0.5 font-bold">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Example Box */}
            <div className="bg-[#0A0A0B] border border-[#C5A059]/30 rounded-lg p-3.5 text-xs">
              <span className="font-bold text-[#C5A059] block mb-1 font-mono uppercase tracking-wider text-[10px]">Пример из жизни Верхнего Ист-Сайда:</span>
              <p className="font-serif italic text-[#E0D7C6]">«{currentRule.example}»</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-[#0A0A0B] px-6 py-3 border-t border-[#C5A059]/20 text-center text-xs text-[#C5A059]/80 font-serif italic">
          «Знание этих правил гарантирует вам 100 баллов на ЕГЭ и уважение Блэр Уолдорф!»
        </div>
      </div>
    </div>
  );
};
