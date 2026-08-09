export type EGETaskNumber = 16 | 17 | 18 | 19 | 20 | 21;

export interface Question {
  id: string;
  taskNumber: EGETaskNumber;
  instruction: string;
  sentence: string; // E.g. "Блэр [1] сидевшая на шелковом диване [2] поправила ободок [3] и взглянула на Чака [4] вошедшего в гостиную."
  commaPositions?: number[]; // [1, 2, 4]
  correctAnswers: number[]; // Array of correct number indices for commas
  correctAnswerText?: string; // For string/choice questions
  explanation: string;
  egeRule: string;
  characterComment: string;
  hint: string;
}

export interface RoomDialogue {
  intro: string;
  hint: string;
  victory: string;
  failure: string;
}

export interface Room {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  hostName: string;
  hostRole: string;
  hostQuote: string;
  hostAvatar: string;
  themeColor: string; // Tailwind color class or hex
  accentGlow: string;
  bgImageUrl: string;
  egeTaskNumber: EGETaskNumber;
  egeTopicName: string;
  egeShortRule: string;
  unlockPasscode: string | null; // Passcode or key needed if locked manually, null for room 1
  rewardKeyName: string; // Key awarded when room is passed
  stickerRewardId: string;
  dialogue: RoomDialogue;
  questions: Question[];
}

export interface Sticker {
  id: string;
  title: string;
  quote: string;
  author: string;
  styleTag: string;
  bgGradient: string;
  textColor: string;
  badgeText: string;
  unlockedByDefault?: boolean;
}

export interface GossipBlast {
  id: string;
  time: string;
  title: string;
  body: string;
  location: string;
  isNew: boolean;
}

export interface UserQuestProgress {
  unlockedRoomIds: number[]; // e.g. [1, 2]
  completedRoomIds: number[];
  keysCollected: string[]; // e.g. ["WALDORF_KEY", "SERENA_KEY"]
  stickersUnlocked: string[];
  totalScore: number;
  correctAnswersCount: number;
  totalQuestionsAttempted: number;
  customCodeEntered?: string;
}
