import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Sparkles, Key, Award, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Room, Question } from '../types';
import { sounds } from '../utils/soundEffects';

interface RoomQuestModalProps {
  room: Room;
  onClose: () => void;
  onCompleteRoom: (roomId: number, keyName: string, stickerId: string) => void;
}

export const RoomQuestModal: React.FC<RoomQuestModalProps> = ({
  room,
  onClose,
  onCompleteRoom,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedCommas, setSelectedCommas] = useState<number[]>([]);
  const [enteredTextAnswer, setEnteredTextAnswer] = useState<string>('');
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isRoomFinished, setIsRoomFinished] = useState<boolean>(false);
  const [isRoomFailed, setIsRoomFailed] = useState<boolean>(false);
  const [mistakesCount, setMistakesCount] = useState<number>(0);

  const question: Question = room.questions[currentQuestionIndex];

  // Toggle comma selection on number click
  const handleToggleComma = (num: number) => {
    if (hasChecked) return;
    sounds.playClick();
    if (selectedCommas.includes(num)) {
      setSelectedCommas(selectedCommas.filter((c) => c !== num));
    } else {
      setSelectedCommas([...selectedCommas, num].sort((a, b) => a - b));
    }
  };

  const handleCheckAnswer = () => {
    sounds.playClick();
    let correct = false;

    if (question.commaPositions) {
      // Check comma positions array match
      const userSorted = [...selectedCommas].sort((a, b) => a - b);
      const correctSorted = [...question.correctAnswers].sort((a, b) => a - b);
      correct =
        userSorted.length === correctSorted.length &&
        userSorted.every((val, idx) => val === correctSorted[idx]);
    } else if (question.correctAnswerText) {
      // Check text or selection match
      correct = enteredTextAnswer.trim().toLowerCase() === question.correctAnswerText.trim().toLowerCase();
    }

    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
      setMistakesCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentQuestionIndex + 1 < room.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedCommas([]);
      setEnteredTextAnswer('');
      setHasChecked(false);
      setShowHint(false);
    } else {
      // Finished all room questions!
      if (mistakesCount > 0 || !isCorrect) {
        sounds.playWrong();
        setIsRoomFailed(true);
      } else {
        sounds.playVictoryFanfare();
        setIsRoomFinished(true);
        onCompleteRoom(room.id, room.rewardKeyName, room.stickerRewardId);
      }
    }
  };

  const handleRetryQuestion = () => {
    sounds.playClick();
    setSelectedCommas([]);
    setEnteredTextAnswer('');
    setHasChecked(false);
    setShowHint(false);
  };

  const handleRestartRoom = () => {
    sounds.playClick();
    setCurrentQuestionIndex(0);
    setSelectedCommas([]);
    setEnteredTextAnswer('');
    setHasChecked(false);
    setIsCorrect(false);
    setShowHint(false);
    setMistakesCount(0);
    setIsRoomFailed(false);
    setIsRoomFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0A0A0B]/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#121215] border border-[#C5A059]/40 rounded-2xl shadow-2xl overflow-hidden text-[#E0D7C6] font-sans my-auto max-h-[92vh] flex flex-col">
        {/* Room Header Banner */}
        <div className="bg-[#0A0A0B] px-6 py-4 border-b border-[#C5A059]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1A181B] border border-[#C5A059]/50 flex items-center justify-center text-xl shadow-inner">
              {room.hostAvatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#1A181B] text-[#C5A059] border border-[#C5A059]/40 uppercase tracking-wider">
                  ЕГЭ {room.egeTaskNumber}
                </span>
                <span className="text-xs text-[#C5A059]/80 font-serif italic">{room.subtitle}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#E0D7C6]">
                {room.title}
              </h2>
            </div>
          </div>
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-1.5 rounded-md text-[#E0D7C6]/70 hover:text-white hover:bg-[#1A181B] cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Room Failed State */}
        {isRoomFailed ? (
          <div className="p-8 text-center space-y-6 flex-1 flex flex-col justify-center items-center">
            <div className="w-20 h-20 rounded-full bg-[#800020]/30 border-2 border-[#800020] flex items-center justify-center text-4xl shadow-2xl">
              ❌
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="font-serif text-2xl font-normal text-[#E0D7C6]">
                Комната Не Пройдена!
              </h3>
              <p className="text-xs font-serif italic text-[#C5A059]/90 leading-relaxed">
                «Верхний Ист-Сайд принимает только 100% идеальный результат! Вы допустили {mistakesCount} {mistakesCount === 1 ? 'ошибку' : mistakesCount < 5 ? 'ошибки' : 'ошибок'}. Начните задания комнаты заново и ответьте на все вопросы верно!»
              </p>
            </div>

            <div className="bg-[#0A0A0B] border border-[#C5A059]/30 p-4 rounded-xl max-w-sm w-full space-y-1 text-center">
              <span className="text-[10px] text-[#C5A059] uppercase font-mono tracking-wider block">Условие Получения Ключа</span>
              <p className="text-xs text-[#E0D7C6]">Все {room.questions.length} вопросов должны быть решены без единой ошибки.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <button
                onClick={handleRestartRoom}
                className="flex-1 py-3.5 rounded-lg bg-[#C5A059] text-[#0A0A0B] font-serif font-bold text-xs uppercase tracking-[0.15em] cursor-pointer shadow-xl hover:bg-[#E0D7C6] flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Пройти заново</span>
              </button>
              <button
                onClick={() => { sounds.playClick(); onClose(); }}
                className="py-3.5 px-6 rounded-lg bg-[#0A0A0B] text-[#E0D7C6] border border-[#C5A059]/30 font-serif font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#1A181B]"
              >
                Выйти
              </button>
            </div>
          </div>
        ) : isRoomFinished ? (
          <div className="p-8 text-center space-y-6 flex-1 flex flex-col justify-center items-center">
            <div className="w-20 h-20 rounded-full bg-[#1A181B] border-2 border-[#C5A059] flex items-center justify-center text-4xl shadow-2xl">
              🏆
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="font-serif text-2xl font-normal text-[#C5A059]">
                Комната Пройдена Великолепно!
              </h3>
              <p className="text-xs font-serif italic text-[#E0D7C6]/90 leading-relaxed">
                «{room.dialogue.victory}»
              </p>
            </div>

            {/* Unlocked Key & Sticker Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
              <div className="bg-[#0A0A0B] border border-[#C5A059]/40 p-4 rounded-xl flex items-center gap-3">
                <Key className="w-8 h-8 text-[#C5A059] shrink-0" />
                <div className="text-left">
                  <span className="text-[10px] text-[#C5A059] uppercase font-mono block tracking-wider">Получен Ключ</span>
                  <span className="font-mono font-bold text-sm text-[#E0D7C6]">{room.rewardKeyName}</span>
                </div>
              </div>

              <div className="bg-[#0A0A0B] border border-[#C5A059]/40 p-4 rounded-xl flex items-center gap-3">
                <Award className="w-8 h-8 text-[#C5A059] shrink-0" />
                <div className="text-left">
                  <span className="text-[10px] text-[#C5A059] uppercase font-mono block tracking-wider">Стикер В Альбоме</span>
                  <span className="font-serif font-bold text-xs text-[#E0D7C6]">Новый стикер Gossip Girl</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="px-8 py-3.5 rounded-lg bg-[#C5A059] text-[#0A0A0B] font-serif font-bold text-xs uppercase tracking-[0.15em] cursor-pointer shadow-xl hover:bg-[#E0D7C6]"
            >
              Вернуться в Особняк
            </button>
          </div>
        ) : (
          /* Question View Body */
          <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5">
            {/* Host Character Quote Box */}
            <div className="bg-[#0A0A0B] border border-[#C5A059]/30 rounded-xl p-4 flex items-start gap-3">
              <div className="text-2xl shrink-0">{room.hostAvatar}</div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#C5A059] mb-0.5">
                  {room.hostName} ({room.hostRole}):
                </h4>
                <p className="text-xs text-[#E0D7C6] font-serif italic leading-relaxed">
                  «{currentQuestionIndex === 0 ? room.dialogue.intro : question.characterComment}»
                </p>
              </div>
            </div>

            {/* Instruction & Progress */}
            <div className="flex items-center justify-between text-xs border-b border-[#C5A059]/20 pb-2">
              <span className="font-mono text-[#C5A059] font-bold">
                Вопрос {currentQuestionIndex + 1} из {room.questions.length}
              </span>
              <div className="flex items-center gap-2">
                {mistakesCount > 0 && (
                  <button
                    onClick={handleRestartRoom}
                    className="text-[11px] text-[#E0D7C6] bg-[#800020]/40 hover:bg-[#800020] px-2.5 py-0.5 rounded border border-[#800020] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                    title="Начать задания заново"
                  >
                    <RotateCcw className="w-3 h-3 text-[#C5A059]" />
                    <span>Пересдать ({mistakesCount} ош.)</span>
                  </button>
                )}
                <button
                  onClick={() => { sounds.playClick(); setShowHint(!showHint); }}
                  className="text-[#C5A059] hover:text-[#E0D7C6] flex items-center gap-1 font-serif text-xs cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Скрыть подсказку' : 'Подсказка Блэр'}</span>
                </button>
              </div>
            </div>

            {/* Hint Dropdown */}
            {showHint && (
              <div className="bg-[#1A181B] border border-[#C5A059]/40 p-3 rounded-lg text-xs text-[#C5A059] font-serif italic animate-fadeIn">
                💡 {room.dialogue.hint}
              </div>
            )}

            {/* Question Sentence Renderer */}
            <div className="bg-[#0A0A0B] border border-[#C5A059]/30 rounded-xl p-5 space-y-4">
              <p className="text-xs font-bold text-[#C5A059] uppercase tracking-wider font-mono">
                {question.instruction}
              </p>

              {/* Interactive Comma Selection Sentence */}
              {question.commaPositions ? (
                <div className="text-sm sm:text-base leading-loose font-serif text-[#E0D7C6] bg-[#121215] p-4 rounded-lg border border-[#C5A059]/20">
                  {question.sentence.split(/(\[\d+\])/g).map((part, index) => {
                    const match = part.match(/\[(\d+)\]/);
                    if (match) {
                      const num = parseInt(match[1], 10);
                      const isSelected = selectedCommas.includes(num);

                      return (
                        <button
                          key={index}
                          onClick={() => handleToggleComma(num)}
                          disabled={hasChecked}
                          className={`inline-flex items-center justify-center mx-1 px-2 py-0.5 rounded-md font-mono text-xs font-bold transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-[#C5A059] text-[#0A0A0B] border-[#C5A059] shadow-md scale-105'
                              : 'bg-[#1A181B] text-[#C5A059] border-[#C5A059]/30 hover:border-[#C5A059]'
                          }`}
                        >
                          [{num}] {isSelected ? ',' : ''}
                        </button>
                      );
                    }
                    return <span key={index}>{part}</span>;
                  })}
                </div>
              ) : (
                /* Text answer or analysis choice */
                <div className="space-y-3">
                  <p className="text-sm font-serif text-[#E0D7C6] bg-[#121215] p-4 rounded-lg border border-[#C5A059]/20 whitespace-pre-line leading-relaxed">
                    {question.sentence}
                  </p>
                  <input
                    type="text"
                    value={enteredTextAnswer}
                    onChange={(e) => setEnteredTextAnswer(e.target.value)}
                    disabled={hasChecked}
                    placeholder="Введи номера предложений (например: 12)..."
                    className="w-full bg-[#121215] border border-[#C5A059]/40 rounded-lg px-4 py-2.5 text-sm text-[#E0D7C6] focus:outline-none focus:border-[#C5A059] font-mono"
                  />
                </div>
              )}
            </div>

            {/* Answer Result & Explanation Box */}
            {hasChecked && (
              <div
                className={`p-4 rounded-xl border space-y-2 animate-fadeIn ${
                  isCorrect
                    ? 'bg-[#1A181B] border-[#C5A059] text-[#E0D7C6]'
                    : 'bg-[#800020]/40 border-[#800020] text-[#E0D7C6]'
                }`}
              >
                <div className="flex items-center gap-2 font-serif font-bold text-sm">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-[#C5A059]" />
                      <span className="text-[#C5A059]">Идеально! Правильный ответ!</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-[#E0D7C6]" />
                      <span>Ошибка! На Верхнем Ист-Сайде так не ставят знаки!</span>
                    </>
                  )}
                </div>

                <p className="text-xs leading-relaxed font-sans opacity-90">
                  {question.explanation}
                </p>

                {!isCorrect && (
                  <div className="p-2 rounded bg-[#800020]/30 border border-[#800020]/80 text-[11px] text-[#E0D7C6] flex items-center gap-2 font-sans">
                    <RotateCcw className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                    <span>Допущена ошибка! По завершении всех вопросов нужно будет пройти комнату заново без ошибок.</span>
                  </div>
                )}

                <div className="pt-1 text-[11px] font-mono italic opacity-80 border-t border-[#C5A059]/20">
                  Правило ЕГЭ: {question.egeRule}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              {!hasChecked ? (
                <button
                  onClick={handleCheckAnswer}
                  className="w-full py-3 rounded-lg bg-[#C5A059] text-[#0A0A0B] font-serif font-bold text-xs uppercase tracking-[0.15em] cursor-pointer hover:bg-[#E0D7C6] shadow-lg"
                >
                  Проверить Ответ
                </button>
              ) : (
                <div className="flex w-full gap-3">
                  {!isCorrect && (
                    <button
                      onClick={handleRetryQuestion}
                      className="flex-1 py-3 rounded-lg bg-[#0A0A0B] text-[#C5A059] border border-[#C5A059]/40 font-serif font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#1A181B] flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Попробовать снова</span>
                    </button>
                  )}
                  <button
                    onClick={handleNextQuestion}
                    className="flex-1 py-3 rounded-lg bg-[#C5A059] text-[#0A0A0B] font-serif font-bold text-xs uppercase tracking-[0.15em] cursor-pointer hover:bg-[#E0D7C6] flex items-center justify-center gap-2"
                  >
                    <span>{currentQuestionIndex + 1 < room.questions.length ? 'Следующий вопрос' : 'Завершить комнату'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
