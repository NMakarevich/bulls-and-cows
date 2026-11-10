import header from './header/header.ts';
import { createElement } from '../../../utils/createElement.ts';
import button from '../button/button.ts';
import footer from './footer/footer.ts';
import select from '../select/select.ts';

import timer from '../../core/timer.ts';
import './layout.css';
import generateSecret from '../../core/generateSecret.ts';
import type { Base } from '../../core/types.ts';
import { BASE_LIST } from '../../core/constants.ts';
import createDigitalValidator from '../../core/createDigitalValidator.ts';
import isEnteredGuess from '../../core/isEnteredGuess.ts';
import type { GameSession, GuessTurn, SecretVariantsStorage } from './types.ts';
import isValidGuess from '../../core/isValidGuess.ts';
import evaluateGuess from '../../core/evaluateGuess.ts';
import countPossibleSecrets from '../../core/countPossibleSecrets.ts';
import { saveGameResults } from '../../../utils/localStorage.ts';
import results from '../results/results.ts';

export default function layout() {
  const headerElement = header(resetGame, showResults);
  const footerElement = footer();

  let guessField: HTMLInputElement;
  let guessList: HTMLOListElement;
  let settings: HTMLElement;
  let startGameButton: HTMLButtonElement;
  let gameField: HTMLElement;
  let secretVariants: HTMLElement;
  let resultsElement: HTMLElement;
  const secretVariantsStorage: SecretVariantsStorage = {
    bin: {},
    oct: {},
    dec: {},
    hex: {},
  };
  const gameSessionInit: GameSession = {
    base: 'bin',
    length: 0,
    guessHistory: [],
    secret: '',
  };
  let gameSession: GameSession = { ...gameSessionInit };

  const { start, finish } = timer();

  const baseSelect = select({ options: BASE_LIST as unknown as string[] });

  const getLengthOptions = () => {
    const base = baseSelect.dataset.value;
    if (!base) return [];
    if (base === 'bin') return [2];
    return [2, 3, 4, 5, 6];
  };

  let lengthSelect = select({ options: getLengthOptions() });

  const handleGuess = () => {
    const guess = guessField.value;
    if (
      !guess ||
      guess.length !== gameSession.length ||
      isEnteredGuess(gameSession.guessHistory, guess)
    ) {
      return;
    }
    if (isValidGuess(guess, gameSession.length, gameSession.base)) {
      const { bulls, cows } = evaluateGuess(gameSession.secret, guess);
      gameSession.guessHistory = [...gameSession.guessHistory, guess];
      guessList.appendChild(guessElement({ guess, bulls, cows }));
      if (bulls === gameSession.length) {
        const gameTime = finish();
        const guessTurns = gameSession.guessHistory.length;
        saveGameResults(gameSession.base, gameSession.length, {
          time: gameTime,
          turns: guessTurns,
        });
        guessList.after(
          createElement('p', {
            children: [`Игра окончена. Количество попыток: ${guessTurns}, время: ${gameTime}`],
          })
        );
      }
    }
    guessField.value = '';
  };

  const handleChangeBase = () => {
    const newSelect = select({ options: getLengthOptions() });
    settings.replaceChild(newSelect, lengthSelect);
    lengthSelect = newSelect;
  };

  baseSelect.addEventListener('change', handleChangeBase);

  function startGame() {
    baseSelect.setAttribute('disabled', '');
    lengthSelect.setAttribute('disabled', '');
    startGameButton.disabled = true;
    gameField.classList.add('in-game');

    const base = baseSelect.dataset.value as Base;
    const length = Number(lengthSelect.dataset.value);
    if (base && length) {
      const secret = generateSecret(length, base);
      const validator = createDigitalValidator(base);
      gameSession = Object.assign(gameSession, { base, length, secret, validator });
      let variants = secretVariantsStorage[base][length];
      if (!variants) {
        variants = countPossibleSecrets(base, Number(length));
        secretVariantsStorage[base][length] = variants;
      }
      secretVariants.textContent = `Количество возможных комбинаций: ${variants}`;

      start();
    }
  }

  function resetGame() {
    guessList.replaceChildren('');
    baseSelect.removeAttribute('disabled');
    lengthSelect.removeAttribute('disabled');
    startGameButton.disabled = false;
    gameField.classList.remove('in-game');
    gameSession = { ...gameSessionInit };
  }

  function showResults() {
    resultsElement.replaceChildren(button({ text: 'Закрыть', onClick: closeResults }), results());
    resultsElement.classList.add('open');
  }

  function closeResults() {
    resultsElement.replaceChildren('');
    resultsElement.classList.remove('open');
  }

  function handleKeydown(event: Event) {
    event.preventDefault();
    const { base } = gameSession;
    const isValidChar = createDigitalValidator(base as Base);
    if (event instanceof KeyboardEvent) {
      if (event.key === 'Backspace') {
        guessField.value = guessField.value.slice(0, -1);
      } else if (!isValidChar(event.key)) {
        return;
      } else if (isValidChar(event.key)) {
        guessField.value += event.key;
      }
    }
  }

  const guessElement = (turn: GuessTurn) => {
    const { guess, bulls, cows } = turn;
    return createElement('li', {
      classList: ['guess-list__item'],
      children: [`${guess}: bulls: ${bulls}, cows: ${cows}`],
    });
  };

  const mainElement = createElement('main', {
    classList: ['main'],
    children: [
      createElement('div', {
        classList: ['container'],
        children: [
          createElement('div', {
            classList: ['settings'],
            children: [
              baseSelect,
              lengthSelect,
              button({
                text: 'Начать игру',
                onClick: startGame,
                setRef: (ref) => (startGameButton = ref),
              }),
            ],
            setRef: (ref) => (settings = ref),
          }),
          createElement('div', {
            classList: ['game'],
            setRef: (element) => (gameField = element),
            children: [
              createElement('div', {
                classList: ['controls'],
                children: [
                  createElement('input', {
                    classList: ['guess-field'],
                    attributes: { type: 'text', name: 'guess' },
                    setRef: (ref) => (guessField = ref as typeof guessField),
                    eventHandlers: [{ type: 'keydown', callback: handleKeydown }],
                  }),
                  button({ text: 'Угадать', onClick: handleGuess }),
                ],
              }),
              createElement('div', {
                classList: ['combinations'],
                setRef: (element) => (secretVariants = element),
              }),
              createElement('ol', {
                classList: ['guess-list'],
                setRef: (ref) => (guessList = ref as typeof guessList),
              }),
            ],
          }),
          createElement('div', {
            classList: ['results'],
            setRef: (element) => (resultsElement = element),
          }),
        ],
      }),
    ],
  });

  const render = () => {
    document.body.append(headerElement, mainElement, footerElement);
  };

  return { render } as const;
}
