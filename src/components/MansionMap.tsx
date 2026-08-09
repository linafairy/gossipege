import React, { useState } from 'react';
import { Lock, Unlock, Key, CheckCircle, Sparkles, ChevronRight, AlertCircle, Award } from 'lucide-react';
import { Room } from '../types';
import { sounds } from '../utils/soundEffects';

interface MansionMapProps {
  rooms: Room[];
  unlockedRoomIds: number[];
  completedRoomIds: number[];
  collectedKeys: string[];
  onSelectRoom: (room: Room) => void;
  onManualUnlockWithPasscode: (roomId: number, passcode: string) => boolean;
}

export const MansionMap: React.FC<MansionMapProps> = ({
  rooms,
  unlockedRoomIds,
  completedRoomIds,
  collectedKeys,
  onSelectRoom,
  onManualUnlockWithPasscode,
}) => {
  const [activeCodeInputRoomId, setActiveCodeInputRoomId] = useState<number | null>(null);
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [codeError, setCodeError] = useState<string | null>(null);

  const handleUnlockAttempt = (roomId: number) => {
    if (!enteredCode.trim()) return;
    sounds.playClick();
    const success = onManualUnlockWithPasscode(roomId, enteredCode.trim().toUpperCase());
    if (success) {
      sounds.playUnlock();
      setActiveCodeInputRoomId(null);
      setEnteredCode('');
      setCodeError(null);
    } else {
      sounds.playWrong();
      setCodeError('Неверный ключ от замка! Пройди предыдущие комнаты!');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 editorial-grid-bg min-h-screen">
      {/* Hero Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-[#121215] border border-[#C5A059]/30 p-6 sm:p-10 text-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A181B] border border-[#C5A059]/40 text-[#C5A059] text-[11px] font-mono tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
            Upper East Side Exclusive Quest
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#E0D7C6] tracking-tight leading-tight">
            Особняк Сплетницы
          </h2>

          <p className="text-sm sm:text-base text-[#C5A059]/90 font-serif italic max-w-2xl mx-auto leading-relaxed">
            Исследуй 6 шикарных комнат особняка, отпирай золотые замки ключами персонажей и сдай пунктуацию ЕГЭ 2026 на 100 баллов.
          </p>

          {/* Keys Inventory Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-[#C5A059] font-mono uppercase tracking-widest font-bold">Ваши Ключи:</span>
            {collectedKeys.length === 0 ? (
              <span className="text-xs text-[#E0D7C6]/50 italic">Собери свой первый ключ в Гостиной Блэр</span>
            ) : (
              collectedKeys.map((keyName) => (
                <span
                  key={keyName}
                  className="px-3 py-1 rounded-full bg-[#1A181B] text-[#C5A059] border border-[#C5A059]/40 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Key className="w-3 h-3 text-[#C5A059]" />
                  {keyName}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 6 Mansion Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => {
          const isUnlocked = unlockedRoomIds.includes(room.id);
          const isCompleted = completedRoomIds.includes(room.id);

          return (
            <div
              key={room.id}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between shadow-xl ${
                isCompleted
                  ? 'border-[#C5A059]/60 bg-[#121215]'
                  : isUnlocked
                  ? 'border-[#C5A059]/40 bg-[#121215] hover:border-[#C5A059] hover:shadow-2xl hover:-translate-y-1'
                  : 'border-[#C5A059]/15 bg-[#0A0A0B]/90 opacity-85'
              }`}
            >
              {/* Room Background Image with Gradient Overlay */}
              <div className="relative h-48 w-full overflow-hidden bg-[#0A0A0B]">
                <img
                  src={room.bgImageUrl}
                  alt={room.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isUnlocked ? 'group-hover:scale-105' : 'blur-[2px] opacity-60'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/60 to-transparent" />

                {/* Task Badge & Room Number */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#0A0A0B]/80 backdrop-blur-md text-[#C5A059] border border-[#C5A059]/30 font-mono text-[11px] font-bold shadow-md">
                    Задание {room.egeTaskNumber} ЕГЭ
                  </span>

                  {/* Lock Indicator */}
                  {isCompleted ? (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#1A181B] text-[#C5A059] border border-[#C5A059] font-bold text-xs shadow-md">
                      <CheckCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                      Пройдена
                    </span>
                  ) : isUnlocked ? (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#121215] text-[#C5A059] border border-[#C5A059]/50 font-bold text-xs shadow-md animate-pulse">
                      <Unlock className="w-3.5 h-3.5 text-[#C5A059]" />
                      Открыта
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#800020]/80 text-[#E0D7C6] border border-[#C5A059]/30 font-bold text-xs shadow-md">
                      <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                      Заперта
                    </span>
                  )}
                </div>

                {/* Host Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#121215]/90 border border-[#C5A059]/50 backdrop-blur-md flex items-center justify-center text-base shadow-md">
                    {room.hostAvatar}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#E0D7C6] drop-shadow">
                      {room.hostName}
                    </h4>
                    <span className="text-[10px] text-[#C5A059] font-mono uppercase tracking-wider block drop-shadow">
                      {room.hostRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* Room Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#E0D7C6] group-hover:text-[#C5A059] transition-colors">
                    {room.title}
                  </h3>
                  <p className="text-xs text-[#C5A059]/80 font-serif italic mb-3">
                    {room.subtitle}
                  </p>
                  <p className="text-xs text-[#E0D7C6]/70 line-clamp-2 leading-relaxed bg-[#0A0A0B]/80 p-2.5 rounded-lg border border-[#C5A059]/20 font-sans">
                    {room.egeTopicName}
                  </p>
                </div>

                {/* Action Controls */}
                <div>
                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onSelectRoom(room);
                      }}
                      className={`w-full py-3 px-4 rounded-lg font-serif font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                        isCompleted
                          ? 'bg-[#1A181B] text-[#C5A059] border border-[#C5A059]/40 hover:bg-[#121215]'
                          : 'bg-[#C5A059] text-[#0A0A0B] hover:bg-[#E0D7C6] font-bold shadow-[#C5A059]/20'
                      }`}
                    >
                      <span>{isCompleted ? 'Перепройти комнату' : 'Войти в комнату'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {activeCodeInputRoomId === room.id ? (
                        <div className="space-y-2 bg-[#0A0A0B] p-3 rounded-lg border border-[#C5A059]/40 animate-fadeIn">
                          <label className="text-[11px] text-[#C5A059] block font-mono font-bold tracking-wider uppercase">
                            Пароль от замка:
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={enteredCode}
                              onChange={(e) => setEnteredCode(e.target.value)}
                              placeholder="Введи пароль..."
                              className="flex-1 bg-[#121215] border border-[#C5A059]/40 rounded-md px-2.5 py-1.5 text-xs text-[#E0D7C6] focus:outline-none focus:border-[#C5A059] uppercase font-mono"
                            />
                            <button
                              onClick={() => handleUnlockAttempt(room.id)}
                              className="px-3 py-1.5 rounded-md bg-[#800020] hover:bg-[#a00028] text-[#E0D7C6] font-bold text-xs cursor-pointer border border-[#C5A059]/40"
                            >
                              Открыть
                            </button>
                          </div>
                          {codeError && (
                            <p className="text-[10px] text-[#E0D7C6] flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-[#C5A059]" />
                              {codeError}
                            </p>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            sounds.playClick();
                            setActiveCodeInputRoomId(room.id);
                          }}
                          className="w-full py-3 px-4 rounded-lg bg-[#0A0A0B] border border-[#C5A059]/30 text-[#C5A059] hover:border-[#C5A059] font-serif font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                        >
                          <Lock className="w-4 h-4 text-[#C5A059]" />
                          <span>Ввести пароль от замка</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
