import React from 'react';
import { Volume2, VolumeX, Sparkles, Award, BookOpen, Bell, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface HeaderBarProps {
  completedRoomsCount: number;
  totalRooms: number;
  unlockedStickersCount: number;
  totalStickers: number;
  unreadBlastsCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenStickerBook: () => void;
  onOpenRuleSheet: () => void;
  onOpenGossipBlasts: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  completedRoomsCount,
  totalRooms,
  unlockedStickersCount,
  totalStickers,
  unreadBlastsCount,
  isMuted,
  onToggleMute,
  onOpenStickerBook,
  onOpenRuleSheet,
  onOpenGossipBlasts,
}) => {
  const progressPercent = Math.round((completedRoomsCount / totalRooms) * 100);

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0B]/90 backdrop-blur-md border-b border-[#C5A059]/30 text-[#E0D7C6] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => { sounds.playGossipBlast(); onOpenGossipBlasts(); }}>
            <div className="w-10 h-10 rounded-full bg-[#121215] flex items-center justify-center font-serif text-sm font-bold text-[#C5A059] shadow-lg border border-[#C5A059]/40 group-hover:border-[#C5A059] group-hover:scale-105 transition-all">
              XOXO
            </div>
            {unreadBlastsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#800020] text-[#E0D7C6] font-bold text-[10px] rounded-full flex items-center justify-center border border-[#C5A059]">
                {unreadBlastsCount}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#E0D7C6]">
                Gossip Girl
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#1A181B] text-[#C5A059] border border-[#C5A059]/40 font-mono tracking-[0.2em] uppercase">
                ЕГЭ Квест
              </span>
            </div>
            <p className="text-xs text-[#C5A059]/80 hidden sm:block font-serif italic">
              «Знаки препинания Верхнего Ист-Сайда»
            </p>
          </div>
        </div>

        {/* Quest Progress Bar */}
        <div className="hidden md:flex items-center gap-3 bg-[#121215] px-4 py-1.5 rounded-full border border-[#C5A059]/25 shadow-inner">
          <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin-slow" />
            <span>Прогресс: {completedRoomsCount}/{totalRooms}</span>
          </div>
          <div className="w-28 bg-[#0A0A0B] h-2 rounded-full overflow-hidden border border-[#C5A059]/20">
            <div
              className="bg-gradient-to-r from-[#800020] via-[#C5A059] to-[#E0D7C6] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[#C5A059] font-mono">{progressPercent}%</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Rule Cheat Sheet */}
          <button
            onClick={() => { sounds.playClick(); onOpenRuleSheet(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#121215] border border-[#C5A059]/30 text-[#E0D7C6] hover:text-white hover:border-[#C5A059] transition-all text-xs font-medium cursor-pointer shadow-md"
            title="Шпаргалка Блэр по пунктуации"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden sm:inline tracking-wider">Шпаргалка</span>
          </button>

          {/* Sticker Album */}
          <button
            onClick={() => { sounds.playClick(); onOpenStickerBook(); }}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#121215] border border-[#C5A059]/40 text-[#E0D7C6] hover:text-white hover:border-[#C5A059] transition-all text-xs font-medium cursor-pointer shadow-md group"
            title="Коллекция стикеров"
          >
            <Award className="w-3.5 h-3.5 text-[#C5A059] group-hover:scale-110 transition-transform" />
            <span className="tracking-wider">Стикеры ({unlockedStickersCount}/{totalStickers})</span>
            <Heart className="w-3 h-3 text-[#C5A059] fill-[#C5A059]/30 animate-pulse" />
          </button>

          {/* Gossip Blasts Bell */}
          <button
            onClick={() => { sounds.playGossipBlast(); onOpenGossipBlasts(); }}
            className="relative p-2 rounded-md bg-[#121215] border border-[#C5A059]/30 text-[#C5A059] hover:text-white hover:border-[#C5A059] transition-all cursor-pointer shadow-md"
            title="Рассылка от Сплетницы"
          >
            <Bell className="w-4 h-4 text-[#C5A059]" />
            {unreadBlastsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#800020] rounded-full animate-ping border border-[#C5A059]" />
            )}
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => { onToggleMute(); }}
            className="p-2 rounded-md bg-[#121215] border border-[#C5A059]/30 text-[#C5A059] hover:text-white hover:border-[#C5A059] transition-all cursor-pointer shadow-md"
            title={isMuted ? 'Включить звук' : 'Выключить звук'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#E0D7C6]/40" /> : <Volume2 className="w-4 h-4 text-[#C5A059]" />}
          </button>
        </div>
      </div>
    </header>
  );
};
