import { GossipBlast } from '../types';

export const INITIAL_GOSSIP_BLASTS: GossipBlast[] = [
  {
    id: 'blast_1',
    time: 'Только что',
    title: 'SPOTTED: Таинственная гостья в особняке',
    body: 'Сплетница передает: кто-то загадочный вошел в пентхаус на Пятой авеню с учебником по пунктуации ЕГЭ. Сможет ли она разгадать секреты Блэр и открытые замки?',
    location: 'Upper East Side, 5th Ave',
    isNew: true,
  },
  {
    id: 'blast_2',
    time: '5 мин назад',
    title: 'SPOTTED: Блэр Уолдорф проверяет запятые',
    body: 'Говорят, Блэр обещала отдать свой Золотой Ключ только той, кто точно знает правила ССП в Задании 16. Ободок уже наготове!',
    location: 'Пентхаус Уолдорфов',
    isNew: true,
  },
  {
    id: 'blast_3',
    time: '12 мин назад',
    title: 'SPOTTED: Чак Басс в отеле The Empire',
    body: 'Чак замечен в своем люксе за изучением вводных слов в Задании 18. "Различить вводное слово и союз — это вопрос чести", — прокомментировал Басс.',
    location: 'The Empire Hotel Suite',
    isNew: false,
  },
];
