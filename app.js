const MAX_LIVES = 3;

const state = {
  character: null,
  previewCharacter: null,
  questionIndex: 0,
  correct: 0,
  lives: MAX_LIVES,
  pendingLifeLoss: false,
  answered: false
};

const els = {
  titleScreen: document.querySelector("#titleScreen"),
  start: document.querySelector("#startButton"),
  shell: document.querySelector("#gameShell"),
  title: document.querySelector("#gameTitle"),
  home: document.querySelector("#homeButton"),
  reset: document.querySelector("#resetButton"),
  stage: document.querySelector("#stage"),
  lifeMeter: document.querySelector("#lifeMeter"),
  salonLabel: document.querySelector(".background-sign span"),
  portrait: document.querySelector("#portrait"),
  profileLabel: document.querySelector("#profileLabel"),
  characterName: document.querySelector("#characterName"),
  characterTag: document.querySelector("#characterTag"),
  statsList: document.querySelector("#statsList"),
  sceneLabel: document.querySelector("#sceneLabel"),
  scoreLabel: document.querySelector("#scoreLabel"),
  speaker: document.querySelector("#speaker"),
  dialoguePanel: document.querySelector(".dialogue-panel"),
  message: document.querySelector("#message"),
  choices: document.querySelector("#choices")
};

function setAccent(color) {
  document.documentElement.style.setProperty("--accent", color || "#d84f4f");
  document.documentElement.style.setProperty("--accent-soft", tint(color || "#d84f4f", 0.82));
}

function tint(hex, amount) {
  const value = hex.replace("#", "");
  const rgb = [0, 2, 4].map((start) => parseInt(value.slice(start, start + 2), 16));
  const mixed = rgb.map((channel) => Math.round(channel + (255 - channel) * amount));
  return `rgb(${mixed.join(", ")})`;
}

function button(label, onClick, className = "choice-button") {
  const el = document.createElement("button");
  el.type = "button";
  el.className = className;
  el.innerHTML = label;
  el.addEventListener("click", onClick);
  return el;
}

function setStandingImage(src) {
  let art = els.portrait.querySelector(".portrait-art");
  if (!art) {
    art = document.createElement("img");
    art.className = "portrait-art";
    art.alt = "";
    els.portrait.append(art);
  }
  if (src) {
    art.src = src;
    art.hidden = false;
  } else {
    art.removeAttribute("src");
    art.hidden = true;
  }
}

function setProfile(character) {
  const active = Boolean(character);
  const display = character || {
    color: "#d84f4f",
    portrait: "default",
    name: "???",
    tag: "相手を選んでください",
    stats: []
  };

  setAccent(display.color);
  document.body.classList.toggle("route-active", active);
  els.stage.classList.toggle("is-route-active", active);
  els.portrait.className = `portrait portrait-${display.portrait}${display.standingImage ? " has-portrait-art" : ""}`;
  setStandingImage(display.standingImage);
  els.profileLabel.textContent = active ? "攻略対象" : "相談所";
  els.characterName.textContent = active ? display.fullName : "Marry Go Round";
  els.characterTag.textContent = display.tag;
  els.statsList.replaceChildren(
    ...display.stats.map((stat) => {
      const li = document.createElement("li");
      li.textContent = stat;
      return li;
    })
  );
  if (active && window.matchMedia("(max-width: 920px)").matches) {
    window.scrollTo(0, 0);
  }
}

function updateLives() {
  if (!els.lifeMeter) return;
  els.lifeMeter.hidden = !state.character;
  const pendingNote = state.pendingLifeLoss ? "（1つ減少予定）" : "";
  els.lifeMeter.setAttribute("aria-label", `残りライフ ${state.lives} / ${MAX_LIVES}${pendingNote}`);
  els.lifeMeter.replaceChildren(...Array.from({ length: MAX_LIVES }, (_, index) => {
    const heart = document.createElement("img");
    const filled = index < state.lives;
    const broken = state.pendingLifeLoss && index === state.lives - 1;
    heart.className = `life-heart${broken ? " is-broken" : filled ? "" : " is-empty"}`;
    heart.src = filled && !broken
      ? "life-heart-full.jpg?v=20261016-v2"
      : "life-heart-broken.png?v=20261021-gray";
    heart.alt = "";
    heart.draggable = false;
    heart.width = 30;
    heart.height = 34;
    heart.setAttribute("aria-hidden", "true");
    return heart;
  }));
}

function renderMessage(target, message, feedback) {
  target.textContent = message;
  if (feedback) {
    const status = document.createElement("span");
    status.className = `reaction-status reaction-status-${feedback.tone}`;
    const brackets = feedback.brackets || "［］";
    status.textContent = `${brackets[0]}${feedback.label}${brackets[1]}\n`;
    const line = document.createElement("span");
    line.textContent = message;
    target.replaceChildren(status, line);
  }
}

function reserveDialogueSpace(character) {
  if (!document.body.classList.contains("royal-theme") || !els.dialoguePanel) return;
  let sizer = els.dialoguePanel.querySelector(".dialogue-sizer");
  if (!sizer) {
    sizer = document.createElement("div");
    sizer.className = "dialogue-sizer";
    sizer.setAttribute("aria-hidden", "true");
    sizer.inert = true;
    els.dialoguePanel.append(sizer);
  }

  // Invisible grid items reserve the largest wrapped text and choice set.
  const messages = document.createElement("div");
  messages.className = "message-box dialogue-message-sizer";
  const addMessage = (message, feedback) => {
    const line = document.createElement("p");
    line.className = "message";
    renderMessage(line, message, feedback);
    messages.append(line);
  };
  addMessage(character.opening);
  const choices = document.createElement("div");
  choices.className = "dialogue-choice-sizer";
  for (const question of character.questions) {
    addMessage(question.prompt);
    const pair = document.createElement("div");
    pair.className = "choices";
    for (const choice of question.choices) {
      const isDown = !choice.correct && choice.mood !== 0;
      addMessage(choice.reaction, {
        label: choice.correct ? "好感度アップ" : isDown ? "好感度ダウン" : "反応は普通",
        tone: choice.correct ? "up" : isDown ? "down" : "neutral",
        brackets: choice.correct || isDown ? "【】" : "［］"
      });
      const option = document.createElement("button");
      option.type = "button";
      option.className = "choice-button";
      option.tabIndex = -1;
      option.innerHTML = choice.text;
      pair.append(option);
    }
    choices.append(pair);
  }
  sizer.replaceChildren(messages, choices);
}

function setDialogue({ speaker, message, scene, score, feedback }) {
  els.speaker.textContent = speaker;
  renderMessage(els.message, message, feedback);
  els.message.scrollTop = 0;
  els.choices.scrollTop = 0;
  els.sceneLabel.textContent = scene;
  els.scoreLabel.textContent = score;
  updateLives();
}

function showStart() {
  els.titleScreen.hidden = true;
  els.shell.hidden = false;
  document.body.classList.remove("title-active");
  state.character = null;
  state.previewCharacter = null;
  state.questionIndex = 0;
  state.correct = 0;
  state.lives = MAX_LIVES;
  state.pendingLifeLoss = false;
  state.answered = false;
  els.stage.classList.remove("is-ending");
  els.stage.removeAttribute("data-ending");
  const illustrated = document.body.classList.contains("royal-theme");
  els.stage.classList.toggle("is-selecting", illustrated);
  if (illustrated) els.salonLabel.textContent = "結婚相談所";
  els.title.textContent = GAME_DATA.title;
  setProfile(null);
  setDialogue({
    speaker: "相田",
    message: `${GAME_DATA.subtitle}\n\n${GAME_DATA.intro.join("\n")}`,
    scene: "攻略対象選択",
    score: `攻略対象 ${GAME_DATA.characters.length}人`
  });

  if (illustrated) {
    showCharacterSelection();
    return;
  }

  els.choices.className = "choices character-select";
  els.choices.replaceChildren(
    ...GAME_DATA.characters.map((character) => {
      const label = `<span class="choice-title">${character.name}</span><span class="choice-meta">${character.tag}</span>`;
      return button(label, () => startRoute(character.id));
    })
  );
}

function showCharacterSelection() {
  const order = ["teshigawara", "sato", "ado"];
  const characters = order.map((id) => GAME_DATA.characters.find((item) => item.id === id)).filter(Boolean);
  characters.push(...GAME_DATA.characters.filter((item) => !order.includes(item.id)));
  const lineup = document.createElement("div");
  lineup.className = "character-lineup";
  lineup.setAttribute("role", "group");
  lineup.setAttribute("aria-label", "相手の紹介");
  lineup.style.setProperty("--figure-count", GAME_DATA.characters.length);

  const detail = document.createElement("section");
  detail.className = "selection-detail";
  detail.id = "selectionDetail";
  detail.setAttribute("aria-labelledby", "selectionName");
  detail.setAttribute("aria-live", "polite");
  const name = document.createElement("h2");
  name.id = "selectionName";
  const description = document.createElement("p");
  description.id = "selectionDescription";
  const confirm = button("この人で遊ぶ", () => startRoute(state.previewCharacter.id), "primary-button selection-confirm");
  confirm.disabled = characters.length === 0;
  detail.append(name, description, confirm);

  const figures = characters.map((character, index) => {
    const figure = button("", () => preview(character), `character-figure figure-${character.portrait}`);
    figure.style.setProperty("--figure-index", index);
    figure.setAttribute("aria-label", `${character.fullName || character.name}の紹介`);
    figure.setAttribute("aria-controls", "selectionDetail");
    figure.setAttribute("aria-pressed", "false");
    if (character.standingImage) {
      const image = document.createElement("img");
      image.src = character.standingImage;
      image.alt = "";
      image.draggable = false;
      figure.append(image);
    } else {
      figure.textContent = character.name;
    }
    lineup.append(figure);
    return { character, figure };
  });

  function preview(character) {
    state.previewCharacter = character;
    name.textContent = character.fullName || character.name;
    description.textContent = character.description || character.tag;
    figures.forEach(({ character: item, figure }) => {
      const selected = item.id === character.id;
      figure.classList.toggle("is-selected", selected);
      figure.setAttribute("aria-pressed", String(selected));
    });
  }

  els.choices.className = "choices character-showcase";
  els.choices.replaceChildren(lineup, detail);
  if (figures.length) preview(GAME_DATA.characters[0]);
  window.scrollTo(0, 0);
}

function showTitle() {
  showStart();
  els.titleScreen.hidden = false;
  els.shell.hidden = true;
  document.body.classList.add("title-active");
  window.scrollTo(0, 0);
}

function startRoute(id) {
  const character = GAME_DATA.characters.find((item) => item.id === id);
  if (!character) return;

  state.character = character;
  state.previewCharacter = null;
  state.questionIndex = 0;
  state.correct = 0;
  state.lives = MAX_LIVES;
  state.pendingLifeLoss = false;
  state.answered = false;
  els.stage.classList.remove("is-ending");
  els.stage.removeAttribute("data-ending");
  els.stage.classList.remove("is-selecting");
  if (document.body.classList.contains("royal-theme")) els.salonLabel.textContent = "結婚相談所";
  setProfile(character);
  reserveDialogueSpace(character);
  els.choices.className = "choices";
  setDialogue({
    speaker: character.name,
    message: character.opening,
    scene: "初対面",
    score: `正解 0 / ${character.questions.length}`
  });
  els.choices.replaceChildren(button("会話を始める", showQuestion, "primary-button"));
}

function showQuestion() {
  const { character, questionIndex, correct } = state;
  const question = character.questions[questionIndex];
  state.answered = false;
  setStandingImage(character.standingImage);

  setDialogue({
    speaker: character.name,
    message: question.prompt,
    scene: `${character.name} ルート ${questionIndex + 1} / ${character.questions.length}`,
    score: `正解 ${correct} / ${character.questions.length}`
  });

  els.choices.replaceChildren(
    ...question.choices.map((choice) => button(choice.text, () => chooseAnswer(choice)))
  );
}

function chooseAnswer(choice) {
  if (state.answered) return;
  state.answered = true;
  state.pendingLifeLoss = !choice.correct && state.lives > 0;

  if (choice.correct) {
    state.correct += 1;
  }

  const isDown = !choice.correct && choice.mood !== 0;
  const prefix = choice.correct ? "好感度アップ" : isDown ? "好感度ダウン" : "反応は普通";
  const reactionImage = choice.correct ? state.character.upStandingImage : isDown ? state.character.downStandingImage : null;
  setStandingImage(reactionImage || state.character.standingImage);
  setDialogue({
    speaker: state.character.name,
    message: choice.reaction,
    feedback: {
      label: prefix,
      tone: choice.correct ? "up" : isDown ? "down" : "neutral",
      brackets: choice.correct || isDown ? "【】" : "［］"
    },
    scene: `${state.character.name} ルート`,
    score: `正解 ${state.correct} / ${state.character.questions.length}`
  });

  const isLast = state.questionIndex >= state.character.questions.length - 1;
  els.choices.replaceChildren(
    button(isLast ? "結果を見る" : "次の会話へ", () => {
      if (!state.answered) return;
      state.answered = false;
      if (state.pendingLifeLoss) {
        state.lives = Math.max(0, state.lives - 1);
        state.pendingLifeLoss = false;
      }
      if (isLast) {
        showEnding();
      } else {
        state.questionIndex += 1;
        showQuestion();
      }
    }, "primary-button")
  );
}

function showEnding() {
  const character = state.character;
  const total = character.questions.length;
  const key = state.correct === total ? "happy" : state.correct === 0 ? "bad" : "good";
  const ending = GAME_DATA.endings[key];
  const lines = character.endingLines[key];
  const line = Array.isArray(lines) ? lines.join("\n") : lines;
  const note = ending.note || `${state.correct}問正解`;
  els.stage.classList.add("is-ending");
  els.stage.setAttribute("data-ending", key);
  const endingImage = key === "happy" ? character.upStandingImage
    : key === "bad" ? character.downStandingImage : character.standingImage;
  setStandingImage(endingImage || character.standingImage);

  setDialogue({
    speaker: ending.label,
    message: line,
    feedback: {
      label: `${ending.title} (${note})`,
      tone: key === "bad" ? "down" : "up",
      brackets: "【】"
    },
    scene: `${character.name} エンディング`,
    score: `正解 ${state.correct} / ${total}`
  });

  els.choices.className = "choices";
  els.choices.replaceChildren(
    button("同じ相手でもう一度", () => startRoute(character.id), "primary-button"),
    button("相手を選び直す", showStart, "primary-button")
  );
}

els.start.addEventListener("click", (event) => {
  showStart();
  if (event.detail !== 0) return;
  els.choices.querySelector('[aria-pressed="true"]')?.focus({ preventScroll: true });
  if (!state.previewCharacter) els.choices.querySelector("button")?.focus({ preventScroll: true });
});
els.reset.addEventListener("click", () => {
  showTitle();
  els.start.focus({ preventScroll: true });
});
els.home.addEventListener("click", () => {
  showTitle();
  els.start.focus({ preventScroll: true });
});
showTitle();
