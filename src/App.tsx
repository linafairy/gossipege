import React, { useState, useEffect } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { MansionMap } from './components/MansionMap';
import { RoomQuestModal } from './components/RoomQuestModal';
import { StickerBook } from './components/StickerBook';
import { PunctuationRuleSheet } from './components/PunctuationRuleSheet';
import { GossipBlastModal } from './components/GossipBlastModal';
import { VictoryBallroom } from './components/VictoryBallroom';

import { ROOMS_DATA } from './data/roomsData';
import { INITIAL_STICKERS } from './data/stickersData';
import { INITIAL_GOSSIP_BLASTS } from './data/gossipBlastsData';
import { Room, GossipBlast } from './types';
import { sounds } from './utils/soundEffects';

const STORAGE_KEY = 'gossip_girl_ege_quest_progress_v1';

export default function App() {
  // Quest State
  const [unlockedRoomIds, setUnlockedRoomIds] = useState<number[]>([1]);
  const [completedRoomIds, setCompletedRoomIds] = useState<number[]>([]);
  const [collectedKeys, setCollectedKeys] = useState<string[]>([]);
  const [unlockedStickerIds, setUnlockedStickerIds] = useState<string[]>(['xoxo_gossip_girl']);

  // Modals UI
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [isStickerBookOpen, setIsStickerBookOpen] = useState<boolean>(false);
  const [isRuleSheetOpen, setIsRuleSheetOpen] = useState<boolean>(false);
  const [isGossipBlastsOpen, setIsGossipBlastsOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Gossip Girl Blasts Feed
  const [blasts, setBlasts] = useState<GossipBlast[]>(INITIAL_GOSSIP_BLASTS);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.unlockedRoomIds) setUnlockedRoomIds(parsed.unlockedRoomIds);
        if (parsed.completedRoomIds) setCompletedRoomIds(parsed.completedRoomIds);
        if (parsed.collectedKeys) setCollectedKeys(parsed.collectedKeys);
        if (parsed.unlockedStickerIds) setUnlockedStickerIds(parsed.unlockedStickerIds);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    try {
      const stateToSave = {
        unlockedRoomIds,
        completedRoomIds,
        collectedKeys,
        unlockedStickerIds,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // ignore
    }
  }, [unlockedRoomIds, completedRoomIds, collectedKeys, unlockedStickerIds]);

  const handleToggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  // Complete a room
  const handleCompleteRoom = (roomId: number, keyName: string, stickerId: string) => {
    // Mark room as completed
    if (!completedRoomIds.includes(roomId)) {
      setCompletedRoomIds((prev) => [...prev, roomId]);
    }

    // Award key
    if (!collectedKeys.includes(keyName)) {
      setCollectedKeys((prev) => [...prev, keyName]);
    }

    // Award sticker
    if (!unlockedStickerIds.includes(stickerId)) {
      setUnlockedStickerIds((prev) => [...prev, stickerId]);
    }

    // Auto-unlock next room
    const nextRoomId = roomId + 1;
    if (nextRoomId <= ROOMS_DATA.length && !unlockedRoomIds.includes(nextRoomId)) {
      setUnlockedRoomIds((prev) => [...prev, nextRoomId]);
    }

    // Add Gossip Girl blast
    const room = ROOMS_DATA.find((r) => r.id === roomId);
    if (room) {
      const newBlast: GossipBlast = {
        id: `blast_${Date.now()}`,
        time: 'Только что',
        title: `SPOTTED: Комната «${room.title}» покорена!`,
        body: `Сплетница в шоке: получен ключ ${keyName}! Кто-то явно претендует на главный ободок Верхнего Ист-Сайда.`,
        location: room.subtitle,
        isNew: true,
      };
      setBlasts((prev) => [newBlast, ...prev]);
    }
  };

  // Manual unlock with passcode / key entry
  const handleManualUnlockWithPasscode = (roomId: number, passcode: string): boolean => {
    const targetRoom = ROOMS_DATA.find((r) => r.id === roomId);
    if (!targetRoom) return false;

    const validPasscodes = [
      targetRoom.unlockPasscode,
      targetRoom.hostName.toUpperCase(),
      `KEY_${roomId}`,
    ].filter(Boolean);

    // Also check if user has collected key from previous room
    const prevRoom = ROOMS_DATA.find((r) => r.id === roomId - 1);
    const prevKey = prevRoom ? prevRoom.rewardKeyName : null;

    const isPasscodeValid =
      validPasscodes.some((p) => p && p.toUpperCase() === passcode) ||
      (prevKey && collectedKeys.includes(prevKey)) ||
      passcode === prevKey;

    if (isPasscodeValid) {
      if (!unlockedRoomIds.includes(roomId)) {
        setUnlockedRoomIds((prev) => [...prev, roomId]);
      }
      return true;
    }

    return false;
  };

  // Reset progress
  const handleResetQuest = () => {
    sounds.playClick();
    setUnlockedRoomIds([1]);
    setCompletedRoomIds([]);
    setCollectedKeys([]);
    setUnlockedStickerIds(['xoxo_gossip_girl']);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleMarkAllBlastsAsRead = () => {
    setBlasts((prev) => prev.map((b) => ({ ...b, isNew: false })));
  };

  const unreadBlastsCount = blasts.filter((b) => b.isNew).length;
  const isQuestFullyCompleted = completedRoomIds.length === ROOMS_DATA.length;

  return (
    <div className="min-h-screen bg-stone-950 text-amber-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* Top Header Bar */}
      <HeaderBar
        completedRoomsCount={completedRoomIds.length}
        totalRooms={ROOMS_DATA.length}
        unlockedStickersCount={unlockedStickerIds.length}
        totalStickers={INITIAL_STICKERS.length}
        unreadBlastsCount={unreadBlastsCount}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenStickerBook={() => setIsStickerBookOpen(true)}
        onOpenRuleSheet={() => setIsRuleSheetOpen(true)}
        onOpenGossipBlasts={() => {
          setIsGossipBlastsOpen(true);
          handleMarkAllBlastsAsRead();
        }}
      />

      {/* Main Content Body */}
      <main className="flex-1 pb-16">
        {isQuestFullyCompleted ? (
          <VictoryBallroom
            unlockedStickersCount={unlockedStickerIds.length}
            totalStickersCount={INITIAL_STICKERS.length}
            onResetQuest={handleResetQuest}
            onOpenStickerBook={() => setIsStickerBookOpen(true)}
          />
        ) : (
          <MansionMap
            rooms={ROOMS_DATA}
            unlockedRoomIds={unlockedRoomIds}
            completedRoomIds={completedRoomIds}
            collectedKeys={collectedKeys}
            onSelectRoom={(room) => setActiveRoom(room)}
            onManualUnlockWithPasscode={handleManualUnlockWithPasscode}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-amber-500/20 py-4 px-6 text-center text-xs text-amber-200/60 font-serif italic">
        «Ты знаешь, что любишь меня. XOXO, Gossip Girl.» • ЕГЭ по русскому языку 2026
      </footer>

      {/* Room Quest Modal */}
      {activeRoom && (
        <RoomQuestModal
          room={activeRoom}
          onClose={() => setActiveRoom(null)}
          onCompleteRoom={handleCompleteRoom}
        />
      )}

      {/* Sticker Album Modal */}
      <StickerBook
        isOpen={isStickerBookOpen}
        unlockedStickerIds={unlockedStickerIds}
        onClose={() => setIsStickerBookOpen(false)}
      />

      {/* Punctuation Cheat Sheet Modal */}
      <PunctuationRuleSheet
        isOpen={isRuleSheetOpen}
        onClose={() => setIsRuleSheetOpen(false)}
      />

      {/* Gossip Blasts Modal */}
      <GossipBlastModal
        isOpen={isGossipBlastsOpen}
        blasts={blasts}
        onClose={() => setIsGossipBlastsOpen(false)}
        onMarkAllAsRead={handleMarkAllBlastsAsRead}
      />
    </div>
  );
}
