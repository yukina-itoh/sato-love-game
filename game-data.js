window.GAME_DATA = {
  title: "あと100年で全員佐藤さんになる恋愛ゲーム",
  subtitle: "結婚相談所 Marry Go Round へようこそ",
  intro: [
    "国民の約4人に1人が佐藤さんになった現代日本。",
    "あなたは婚活相談所 Marry Go Round で、気になる相手と3つの会話に挑みます。",
    "相手のツボに刺さる返事を選んで、ハッピーエンドを目指しましょう。"
  ],
  endings: {
    happy: {
      label: "HAPPY",
      note: "3問正解",
      title: "完全攻略",
      text: "気が合いすぎて、次の約束まで一瞬で決まりました。相談所の口コミ評価も星1.3から少しだけ回復したようです。"
    },
    good: {
      label: "GOOD",
      note: "",
      title: "まずまず好印象",
      text: "今日は楽しく話せました。連絡が来るかは、明日の相手の気分次第です。"
    },
    bad: {
      label: "BAD",
      note: "0問正解",
      title: "なかったことに",
      text: "この会話はそっと議事録から消されました。受付の相田さんだけが、すべてを見ていました。"
    }
  },
  characters: [
    {
      id: "sato",
      name: "佐藤",
      fullName: "佐藤太郎",
      tag: "普通を愛する、普通以上に普通な人",
      portrait: "sato",
      standingImage: "sato-standing.png?v=20261007-full-body",
      color: "#d84f4f",
      stats: ["佐藤濃度 92%", "ラーメン耐性 高", "Netflix 未加入"],
      opening: "はじめまして。僕は佐藤太郎です。",
      questions: [
        {
          prompt: "名前を聞いたあなたの第一声は？",
          choices: [
            {
              text: "とても素敵な名前ですね。",
              reaction: "そうですかね…？",
              mood: -1
            },
            {
              text: "なんか普通な名前ですね。",
              reaction: "ですよね。僕もそう思ってました。",
              mood: 1,
              correct: true
            }
          ]
        },
        {
          prompt: "好きな食べ物は何ですか？",
          choices: [
            {
              text: "ラーメンとか好きです。",
              reaction: "え！ 僕もラーメン好きです！",
              mood: 1,
              correct: true
            },
            {
              text: "タピオカとか好きです。",
              reaction: "僕、タピオカ嫌いなんですよね。",
              mood: -1
            }
          ]
        },
        {
          prompt: "休日は何されてるんですか？",
          choices: [
            {
              text: "ネトフリ見てます。",
              reaction: "僕、ネトフリ入ってないんですよね。",
              mood: -1
            },
            {
              text: "料理ハマってます。",
              reaction: "いいですね！ 僕も柔軟剤の組み合わせとか考えてます！",
              mood: 1,
              correct: true
            }
          ]
        }
      ],
      // 1つの文字列が1段落になります。セリフも行動もそのまま書けます。
      endingLines: {
        happy: [
          "佐藤「僕たち気が合いますね！今度ご飯でも行きましょう。」",
          "私「ご飯楽しみだな、佐藤さんも良い人だったし。（ドクン）これって、もしかして……」"
        ],
        good: [
          "佐藤「今日は楽しかったです！ありがとうございました。」",
          "私「……連絡、来なかったなぁ。」"
        ],
        bad: [
          "佐藤「そんな人だとは思いませんでした。この話はなかったことに。」",
          "私「そんなぁ…。」"
        ]
      }
    },
    {
      id: "teshigawara",
      name: "勅使河原",
      fullName: "勅使河原俊紀",
      tag: "冒険家。笑い声はHA HA HA",
      portrait: "teshigawara",
      standingImage: "teshigawara-standing.png?v=20261010",
      color: "#2c7f68",
      stats: ["冒険値 MAX", "アマゾン依存度 低", "海外経験 あり"],
      opening: "初めまして。私は勅使河原俊紀です。",
      questions: [
        {
          prompt: "珍しい名前を聞いたあなたは？",
          choices: [
            {
              text: "素敵な名前ですね！",
              reaction: "あぁ！",
              mood: -1
            },
            {
              text: "うぉー！ めっちゃ変！！",
              reaction: "良いリアクションだ！ HAHAHA",
              mood: 1,
              correct: true
            }
          ]
        },
        {
          prompt: "ご趣味は？",
          choices: [
            {
              text: "ハーバリウム作りです！",
              reaction: "そんなんじゃアマゾンで生き残れないぞ！",
              mood: -1
            },
            {
              text: "ジョギングとかしてます！",
              reaction: "体を動かすのは良いことだ！ HAHAHA",
              mood: 1,
              correct: true
            }
          ]
        },
        {
          prompt: "海外に行ったことは？",
          choices: [
            {
              text: "あります！ 次はカナダに行きたいです！",
              reaction: "素晴らしい！ 私も先日までアマゾンにいてね……",
              mood: 1,
              correct: true
            },
            {
              text: "ないです。海外って怖くて。",
              reaction: "視野が狭い！ もっと世界を見るべきだ！",
              mood: -1
            }
          ]
        }
      ],
      endingLines: {
        happy: [
          "勅使河原「あなたはとても素敵な女性だ！結婚しよう！」",
          "私「もうプロポーズされちゃった！この人が私の運命の人だったんだ！」"
        ],
        good: [
          "勅使河原「とても楽しかったよ！今度は一緒にアマゾンでも行こう！」",
          "私「アマゾンかあ……。仕事もあるのにどうしよう……」"
        ],
        bad: [
          "勅使河原「君の生き方じゃ世界に通じないぞ！……だがそんな君のチャンスを与えよう。私のこの毎日カレンダーを購入すれば今日から君も……ちょっと！待ちたまえ！」",
          "私は走って逃げた。"
        ]
      }
    },
    {
      id: "ado",
      name: "Ado",
      fullName: "AdoではないAdo",
      tag: "承認欲求と普通のあいだで揺れる人",
      portrait: "ado",
      standingImage: "ado-standing.png?v=20261010",
      color: "#5a63d8",
      stats: ["本人度 0%", "普通への憧れ 高", "歌唱予定 なし"],
      opening: "はじめまして。",
      questions: [
        {
          prompt: "はじめまして。",
          choices: [
            {
              text: "あなた、誰ですか……？",
              reaction: "分からないなんてまだまだだね。もっとネット見たら？",
              mood: -1
            },
            {
              text: "もしかして、あの有名アーティストさんですか？",
              reaction: "フッ。まあね。",
              mood: 1,
              correct:true
            }
          ]
        },
        {
          prompt: "(お仕事は何されてるんですか？)普段エンジニアとして働いてるよ。",
          choices: [
            {
              text: "え！？その恰好で！？",
              reaction: "あまり人を見た目で判断しない方がいいよ",
              mood: -1,
            },
            {
              text: "すごーい！将来安泰ですね",
              reaction: "こう見えて模範人間だからね",
              mood: 1,
              correct:true
            }
          ]
        },
        {
          prompt: "正しさとは、愚かさとは、何だと思う？",
          choices: [
            {
              text: "難しい質問ですね。私には分かりません。",
              reaction: "正直に言ってくれてうれしいよ。今から見つけてあげる。",
              mood: 1,
              correct:true
            },
            {
              text: "調和と盲目だと思います",
              reaction: "全然分かってないね。今から見せつけてあげる。",
              mood: -1
            }
          ]
        }
      ],
      endingLines: {
        happy: [
          "Ado「君とは波長が合うみたいだ。次のライブに招待してあげるよ。」",
          "私「すごく面白い人だったな。ライブも楽しみ！」"
        ],
        good: [
          "Ado「今日は良い時間を過ごせたよ。ありがとう。」",
          "私「次のお誘いなかったな……」"
        ],
        bad: [
          "Ado「君とは気が合わないみたいだ。今日は帰らせてもらうよ。」",
          "私「上手くいかなかったな……」"
        ]
      }
    }
  ]
};
