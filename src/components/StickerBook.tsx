import React, { useState } from 'react';
import { X, Award, Sparkles, Lock, Heart, CheckCircle, Share2 } from 'lucide-react';
import { INITIAL_STICKERS } from '../data/stickersData';
import { Sticker } from '../types';
import { sounds } from '../utils/soundEffects';

interface StickerBookProps {
  isOpen: boolean;
  unlockedStickerIds: string[];
  onClose: () => void;
}

export const StickerBook: React.FC<StickerBookProps> = ({
  isOpen,
  unlockedStickerIds,
  onClose,
}) => {
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);

  if (!isOpen) return null;

  const totalStickers = INITIAL_STICKERS.length;
  const unlockedCount = unlockedStickerIds.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0B]/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#121215] border border-[#C5A059]/40 rounded-2xl shadow-2xl overflow-hidden text-[#E0D7C6] font-sans flex flex-col max-h-[90vh]">
        {/* Album Header */}
        <div className="bg-[#0A0A0B] px-6 py-4 border-b border-[#C5A059]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1A181B] border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059] font-serif font-bold text-sm shadow-lg">
              💋
            </div>
            <div>
              <h2 className="font-serif text-xl font-normal text-[#E0D7C6]">
                Коллекция Стикеров Gossip Girl
              </h2>
              <p className="text-xs text-[#C5A059]/80 font-serif italic">
                Разблокировано: {unlockedCount} из {totalStickers} стикеров
              </p>
            </div>
          </div>
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-1.5 rounded-md text-[#E0D7C6]/70 hover:text-white hover:bg-[#1A181B] cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sticker Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-[#0A0A0B]">
          {INITIAL_STICKERS.map((sticker) => {
            const isUnlocked = unlockedStickerIds.includes(sticker.id);

            return (
              <div
                key={sticker.id}
                onClick={() => {
                  if (isUnlocked) {
                    sounds.playClick();
                    setSelectedSticker(sticker);
                  } else {
                    sounds.playWrong();
                  }
                }}
                className={`relative group cursor-pointer rounded-xl p-4 transition-all duration-300 transform border ${
                  isUnlocked
                    ? 'bg-[#121215] border-[#C5A059]/40 shadow-xl hover:-translate-y-1 hover:border-[#C5A059]'
                    : 'bg-[#0A0A0B] border-[#C5A059]/15 opacity-60 grayscale'
                }`}
              >
                {/* Sticker Frame Simulation */}
                <div
                  className={`w-full rounded-lg p-3 bg-[#1A181B] border border-[#C5A059]/30 shadow-inner flex flex-col justify-between min-h-[140px] text-center relative overflow-hidden`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0A0A0B] text-[#C5A059] border border-[#C5A059]/30">
                      {sticker.badgeText}
                    </span>
                    {isUnlocked ? (
                      <CheckCircle className="w-4 h-4 text-[#C5A059] drop-shadow" />
                    ) : (
                      <Lock className="w-4 h-4 text-[#E0D7C6]/40" />
                    )}
                  </div>

                  {/* Title / Main Quote */}
                  <div className="my-2">
                    <h3 className="font-serif text-sm font-bold leading-tight text-[#E0D7C6]">
                      {sticker.title}
                    </h3>
                  </div>

                  {/* Author Tag */}
                  <div className="text-[10px] font-serif italic text-[#C5A059]/80 tracking-wider">
                    — {sticker.author}
                  </div>
                </div>

                {/* Sticker Lock Overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-[#0A0A0B]/80 rounded-xl flex flex-col items-center justify-center p-2 text-center border border-[#C5A059]/10">
                    <Lock className="w-6 h-6 text-[#C5A059] mb-1" />
                    <span className="text-[11px] font-medium text-[#E0D7C6]/70 font-serif">
                      Пройди комнату, чтобы открыть
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sticker Detail Modal View */}
        {selectedSticker && (
          <div className="fixed inset-0 z-60 bg-[#0A0A0B]/90 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#121215] border border-[#C5A059] rounded-2xl p-6 max-w-md w-full text-center relative shadow-2xl">
              <button
                onClick={() => setSelectedSticker(null)}
                className="absolute top-4 right-4 p-1.5 text-[#E0D7C6]/60 hover:text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="inline-block mb-3 px-3.5 py-1 rounded-full bg-[#1A181B] text-[#C5A059] border border-[#C5A059]/40 text-xs font-mono font-bold tracking-wider uppercase">
                Стикер Заблокирован в альбоме ✨
              </div>

              {/* Big Sticker Display */}
              <div
                className="w-full rounded-xl p-6 bg-[#0A0A0B] border border-[#C5A059] shadow-2xl my-4 text-center transform"
              >
                <span className="text-3xl font-serif block mb-2 text-[#C5A059]">💋</span>
                <h3 className="font-serif text-xl font-normal text-[#E0D7C6] mb-2">
                  «{selectedSticker.title}»
                </h3>
                <p className="text-xs font-serif italic text-[#E0D7C6]/90 leading-relaxed mb-3">
                  "{selectedSticker.quote}"
                </p>
                <div className="text-xs font-serif font-bold text-[#C5A059]">
                  — {selectedSticker.author}
                </div>
              </div>

              <button
                onClick={() => setSelectedSticker(null)}
                className="w-full mt-2 py-2.5 rounded-lg bg-[#C5A059] text-[#0A0A0B] font-serif font-bold text-xs uppercase tracking-[0.15em] cursor-pointer hover:bg-[#E0D7C6]"
              >
                Вернуться в альбом
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-[#0A0A0B] px-6 py-3 border-t border-[#C5A059]/20 text-center text-xs text-[#C5A059]/80 font-serif italic">
          «Каждый стикер — доказательство твоего триумфа в Верхнем Ист-Сайде!»
        </div>
      </div>
    </div>
  );
};
