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
      note: "1-2問正解",
      title: "まずまず好印象",
      text: "今日は楽しく話せました。連絡が来るかは、明日の佐藤濃度と相手の気分しだいです。"
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
      color: "#d84f4f",
      stats: ["佐藤濃度 92%", "ラーメン耐性 高", "Netflix 未加入"],
      opening: "はじめまして。僕は佐藤太郎です。",
      questions: [
        {
          prompt: "名前を聞いたあなたの第一声は？",
          choices: [
            {
              text: "とても素敵な名前ですね",
              reaction: "そうですかね…？",
              mood: -1
            },
            {
              text: "なんか普通な名前ですね",
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
              text: "ラーメンとか好きです",
              reaction: "え！ 僕もラーメン好きです！",
              mood: 1,
              correct: true
            },
            {
              text: "〇〇とか好きです",
              reaction: "僕、『とか』そのものはちょっと苦手なんですよね。",
              mood: -1
            }
          ]
        },
        {
          prompt: "休日は何されてるんですか？",
          choices: [
            {
              text: "ネトフリ見てます",
              reaction: "僕、ネトフリ入ってないんですよね。気まずい沈黙が流れました。",
              mood: -1
            },
            {
              text: "料理ハマってます",
              reaction: "いいですね！ 僕も柔軟剤の組み合わせとか考えてます！",
              mood: 1,
              correct: true
            }
          ]
        }
      ],
      endingLines: {
        happy: "僕たち気が合いますね！今度ご飯でも行きましょう。「ご飯楽しみだな、佐藤さんも良い人だったし。（ドクン）これって、もしかして……」",
        good: "今日は楽しかったです。ありがとうございました。「……連絡、来なかったなぁ。」",
        bad: "そんな人だとは思いませんでした。この話はなかったことに。「そんなぁ…。」"
      }
    },
    {
      id: "teshigawara",
      name: "勅使河原",
      fullName: "勅使河原俊紀",
      tag: "冒険家。笑い声はHA HA HA",
      portrait: "teshigawara",
      color: "#2c7f68",
      stats: ["冒険値 MAX", "アマゾン依存度 低", "海外経験 あり"],
      opening: "初めまして。私は勅使河原俊紀です。",
      questions: [
        {
          prompt: "珍しい名前を聞いたあなたは？",
          choices: [
            {
              text: "素敵な名前ですね！",
              reaction: "あぁ！ 少しだけ照れているようです。",
              mood: 0
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
              reaction: "素晴らしい！ 私も先日までアマゾンにいてね…。",
              mood: 1,
              correct: true
            },
            {
              text: "ないです。海外って怖くて",
              reaction: "視野が狭い！ もっと世界を見るべきだ！",
              mood: -1
            }
          ]
        }
      ],
      endingLines: {
        happy: "次のデートはカナダかAmazonだ！ HAHAHA",
        good: "悪くない。だが冒険はまだ始まったばかりだ。",
        bad: "この視野では、世界の広さに耐えられないな。"
      }
    },
    {
      id: "ado",
      name: "Ado",
      fullName: "AdoではないAdo",
      tag: "承認欲求と普通のあいだで揺れる人",
      portrait: "ado",
      color: "#5a63d8",
      stats: ["本人度 0%", "普通への憧れ 高", "歌唱予定 なし"],
      opening: "どうも。Adoです。Adoのこと、Adoって呼ぶよ。",
      questions: [
        {
          prompt: "第一印象をどう伝える？",
          choices: [
            {
              text: "本物のAdoですか？ サインください",
              reaction: "AdoではないAdoだよ。そこを間違えると話が早く終わるよ。",
              mood: -1
            },
            {
              text: "普通に話せてうれしいです",
              reaction: "普通に見てくれるの、意外とありがたいかも。",
              mood: 1,
              correct: true
            }
          ]
        },
        {
          prompt: "Adoが悩みを打ち明けました。",
          choices: [
            {
              text: "変なところも含めて、Adoさんです",
              reaction: "変って言われるの、今日はちょっと悪くない。",
              mood: 1,
              correct: true
            },
            {
              text: "毎回Adoですって名乗れば得ですよ",
              reaction: "それはメリハリじゃなくて、ただの自己紹介過多だよ。",
              mood: -1
            }
          ]
        },
        {
          prompt: "帰り道、最後にかける言葉は？",
          choices: [
            {
              text: "うっせぇわ、って言えます？",
              reaction: "そのお願い、いちばん普通じゃないやつ。",
              mood: -1
            },
            {
              text: "また普通にお茶しましょう",
              reaction: "普通に、っていいね。じゃあ次は本当に普通のお茶で。",
              mood: 1,
              correct: true
            }
          ]
        }
      ],
      endingLines: {
        happy: "普通に楽しかった。普通なのに、ちゃんと特別だったよ。",
        good: "今日はまあまあ。次はAdoじゃない時間も見てほしいな。",
        bad: "Adoという存在を雑に扱うと、Adoは帰ります。"
      }
    }
  ]
};
