const state = {
  character: null,
  questionIndex: 0,
  correct: 0,
  answered: false
};

const els = {
  title: document.querySelector("#gameTitle"),
  reset: document.querySelector("#resetButton"),
  stage: document.querySelector("#stage"),
  portrait: document.querySelector("#portrait"),
  profileLabel: document.querySelector("#profileLabel"),
  characterName: document.querySelector("#characterName"),
  characterTag: document.querySelector("#characterTag"),
  statsList: document.querySelector("#statsList"),
  sceneLabel: document.querySelector("#sceneLabel"),
  scoreLabel: document.querySelector("#scoreLabel"),
  speaker: document.querySelector("#speaker"),
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
  let art = els.portrait.querySelector(".portrait-art");
  if (!art) {
    art = document.createElement("img");
    art.className = "portrait-art";
    art.alt = "";
    els.portrait.append(art);
  }
  if (display.standingImage) {
    art.src = display.standingImage;
    art.hidden = false;
  } else {
    art.removeAttribute("src");
    art.hidden = true;
  }
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

function setDialogue({ speaker, message, scene, score }) {
  els.speaker.textContent = speaker;
  els.message.textContent = message;
  els.message.scrollTop = 0;
  els.choices.scrollTop = 0;
  els.sceneLabel.textContent = scene;
  els.scoreLabel.textContent = score;
}

function showStart() {
  state.character = null;
  state.questionIndex = 0;
  state.correct = 0;
  state.answered = false;
  els.title.textContent = GAME_DATA.title;
  setProfile(null);
  setDialogue({
    speaker: "相田",
    message: `${GAME_DATA.subtitle}\n\n${GAME_DATA.intro.join("\n")}`,
    scene: "攻略対象選択",
    score: `攻略対象 ${GAME_DATA.characters.length}人`
  });

  els.choices.className = "choices character-select";
  els.choices.replaceChildren(
    ...GAME_DATA.characters.map((character) =>
      button(
        `<span class="choice-title">${character.name}</span><span class="choice-meta">${character.tag}</span>`,
        () => startRoute(character.id)
      )
    )
  );
}

function startRoute(id) {
  const character = GAME_DATA.characters.find((item) => item.id === id);
  if (!character) return;

  state.character = character;
  state.questionIndex = 0;
  state.correct = 0;
  state.answered = false;
  setProfile(character);
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

  if (choice.correct) {
    state.correct += 1;
  }

  const prefix = choice.correct ? "好感度アップ" : choice.mood === 0 ? "反応は普通" : "好感度ダウン";
  setDialogue({
    speaker: state.character.name,
    message: `${prefix}\n${choice.reaction}`,
    scene: `${state.character.name} ルート`,
    score: `正解 ${state.correct} / ${state.character.questions.length}`
  });

  const isLast = state.questionIndex >= state.character.questions.length - 1;
  els.choices.replaceChildren(
    button(isLast ? "結果を見る" : "次の会話へ", () => {
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
  const line = character.endingLines[key];

  setDialogue({
    speaker: ending.label,
    message: `${ending.title} (${ending.note})\n\n${ending.text}\n\n${character.name}: 「${line}」`,
    scene: `${character.name} エンディング`,
    score: `正解 ${state.correct} / ${total}`
  });

  els.choices.className = "choices";
  els.choices.replaceChildren(
    button("同じ相手でもう一度", () => startRoute(character.id), "primary-button"),
    button("相手を選び直す", showStart, "primary-button")
  );
}

els.reset.addEventListener("click", showStart);
showStart();
