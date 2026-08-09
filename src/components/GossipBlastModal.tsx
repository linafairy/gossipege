import React from 'react';
import { X, Bell, Sparkles, MapPin, CheckCheck } from 'lucide-react';
import { GossipBlast } from '../types';
import { sounds } from '../utils/soundEffects';

interface GossipBlastModalProps {
  isOpen: boolean;
  blasts: GossipBlast[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

export const GossipBlastModal: React.FC<GossipBlastModalProps> = ({
  isOpen,
  blasts,
  onClose,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0B]/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#121215] border border-[#C5A059]/40 rounded-2xl shadow-2xl overflow-hidden text-[#E0D7C6] font-sans">
        {/* Header Header */}
        <div className="bg-[#0A0A0B] px-6 py-4 border-b border-[#C5A059]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1A181B] border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059] font-serif font-bold text-xs shadow-md">
              XOXO
            </div>
            <div>
              <h2 className="font-serif text-lg font-normal text-[#E0D7C6]">
                Рассылка от Сплетницы
              </h2>
              <p className="text-[11px] text-[#C5A059]/80 font-mono tracking-wider">Gossip Girl UES Feed</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { sounds.playClick(); onMarkAllAsRead(); }}
              className="text-xs text-[#C5A059] hover:text-[#E0D7C6] flex items-center gap-1 bg-[#1A181B] px-2.5 py-1 rounded-md border border-[#C5A059]/40 cursor-pointer"
              title="Прочитать все"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">Прочитано</span>
            </button>
            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="p-1 rounded-md text-[#E0D7C6]/70 hover:text-white hover:bg-[#1A181B] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gossip Feed List */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4 divide-y divide-[#C5A059]/20 bg-[#0A0A0B]">
          {blasts.map((blast) => (
            <div
              key={blast.id}
              className={`pt-4 first:pt-0 transition-colors ${
                blast.isNew ? 'bg-[#1A181B] -mx-2 px-3 py-2 rounded-xl border border-[#C5A059]/40' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-serif font-bold text-[#C5A059] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  {blast.title}
                </span>
                <span className="text-[10px] text-[#E0D7C6]/50 font-mono">{blast.time}</span>
              </div>
              <p className="text-xs text-[#E0D7C6]/90 leading-relaxed font-serif italic mb-2">
                «{blast.body}»
              </p>
              <div className="flex items-center justify-between text-[10px] text-[#C5A059]/60 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C5A059]" />
                  {blast.location}
                </span>
                <span className="font-serif text-[#C5A059] font-bold">XOXO, Gossip Girl</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#0A0A0B] px-6 py-3 border-t border-[#C5A059]/20 text-center text-xs text-[#C5A059]/80 font-serif italic">
          «Ты знаешь, что любишь меня. XOXO, Gossip Girl.»
        </div>
      </div>
    </div>
  );
};
