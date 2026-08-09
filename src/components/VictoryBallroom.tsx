import React, { useState } from 'react';
import { Crown, Sparkles, Award, RotateCcw, Share2, CheckCircle2, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface VictoryBallroomProps {
  unlockedStickersCount: number;
  totalStickersCount: number;
  onResetQuest: () => void;
  onOpenStickerBook: () => void;
}

export const VictoryBallroom: React.FC<VictoryBallroomProps> = ({
  unlockedStickersCount,
  totalStickersCount,
  onResetQuest,
  onOpenStickerBook,
}) => {
  const [userName, setUserName] = useState<string>('Королева Пунктуации');

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn editorial-grid-bg min-h-screen">
      {/* Crown Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-[#121215] border border-[#C5A059]/40 p-8 sm:p-12 text-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#1A181B] border-2 border-[#C5A059] flex items-center justify-center text-4xl shadow-2xl">
            👑
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#E0D7C6] tracking-tight">
            Коронация Верхнего Ист-Сайда
          </h2>

          <p className="text-sm sm:text-base text-[#C5A059]/90 font-serif italic leading-relaxed">
            «Ты прошла все 6 комнат особняка, разгадала секреты Блэр, Серены, Чака, Нейта и Дороты и сдала пунктуацию ЕГЭ на 100 баллов! XOXO, Gossip Girl.»
          </p>
        </div>
      </div>

      {/* Official Certificate Card */}
      <div className="relative bg-[#121215] border border-[#C5A059] rounded-2xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
        <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase font-bold tracking-[0.2em]">
            OFFICIAL DIPLOMA 2026
          </span>
          <span className="text-xs font-serif italic text-[#E0D7C6]">
            Upper East Side Academy
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-2xl font-normal text-[#C5A059]">
            СЕРТИФИКАТ ЭКСПЕРТА ПУНКТУАЦИИ ЕГЭ
          </h3>
          <p className="text-xs text-[#E0D7C6]/70 font-serif">Настоящим подтверждается, что</p>

          <div className="max-w-md mx-auto">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-[#C5A059]/60 rounded-lg px-4 py-2 text-center text-lg font-serif font-bold text-[#E0D7C6] focus:outline-none focus:border-[#C5A059]"
              placeholder="Введи свое имя..."
            />
          </div>

          <p className="text-xs text-[#E0D7C6]/80 font-serif italic max-w-lg mx-auto leading-relaxed pt-2">
            Безупречно владеет правилами Заданий 16, 17, 18, 19, 20 и 21 ЕГЭ по русскому языку и имеет право носить главный золотой ободок Верхнего Ист-Сайда.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-2">
          <div className="bg-[#0A0A0B] p-3.5 rounded-xl border border-[#C5A059]/30">
            <span className="text-[10px] text-[#C5A059] uppercase block font-mono tracking-wider">Балл ЕГЭ</span>
            <span className="font-serif font-bold text-2xl text-[#E0D7C6]">100/100</span>
          </div>

          <div className="bg-[#0A0A0B] p-3.5 rounded-xl border border-[#C5A059]/30">
            <span className="text-[10px] text-[#C5A059] uppercase block font-mono tracking-wider">Комнат Пройдено</span>
            <span className="font-serif font-bold text-2xl text-[#E0D7C6]">6 / 6</span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-[#0A0A0B] p-3.5 rounded-xl border border-[#C5A059]/30">
            <span className="text-[10px] text-[#C5A059] uppercase block font-mono tracking-wider">Стикеры</span>
            <span className="font-serif font-bold text-2xl text-[#E0D7C6]">{unlockedStickersCount}/{totalStickersCount}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => { sounds.playClick(); onOpenStickerBook(); }}
            className="px-6 py-3 rounded-lg bg-[#C5A059] text-[#0A0A0B] font-serif font-bold text-xs uppercase tracking-[0.15em] flex items-center gap-2 cursor-pointer hover:bg-[#E0D7C6]"
          >
            <Award className="w-4 h-4 text-[#0A0A0B]" />
            <span>Открыть альбомы стикеров</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); onResetQuest(); }}
            className="px-6 py-3 rounded-lg bg-[#0A0A0B] text-[#C5A059] border border-[#C5A059]/40 hover:text-white hover:border-[#C5A059] font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Начать квест заново</span>
          </button>
        </div>

        <div className="text-center pt-2 text-[11px] font-serif italic text-[#C5A059]/80">
          «You know you love me. XOXO, Gossip Girl.»
        </div>
      </div>
    </div>
  );
};
