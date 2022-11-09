let gCanvasSize = [1600, 1200]; //キャンバスサイズ

let gPlayerList = [];//プレイヤーのリスト
let gGakkiList = []//楽器のリスト

let gUiImgList = [];// UIイメージオブジェクトを格納するリスト
let gIconImgList = [];// UIイメージオブジェクトを格納するリスト
let gOtherImgList = [];

let imgTest;
let song;

let isClicked = false;


//楽器種別
const Gakki_Kind = {
  None: 0, Piano0: 1, Metallophone0: 2, Xylophone0: 3, Triangle0: 4,
  Tambourine0: 5, Drum0: 6, Trumpet0: 7, Trombone0: 8, Violin0: 9
};

//曲ごとの定義
//ジングルベル
const BELL_SET = [
  { "sound": "assets/bell_1.mp3", "gakki": Gakki_Kind.Piano0, "color": [[200, 1, 2]], "pos": [20, 20] },
  { "sound": "assets/bell_2.mp3", "gakki": Gakki_Kind.Metallophone0, "color": [[1, 200, 2]], "pos": [120, 20] },
  { "sound": "assets/bell_3.mp3", "gakki": Gakki_Kind.Xylophone0, "color": [[1, 2, 200]], "pos": [220, 20] },
  { "sound": "assets/bell_4.mp3", "gakki": Gakki_Kind.Triangle0, "color": [[200, 200, 1]], "pos": [320, 20] }
]

//聖者の行進
const SEIJA_SET = [
  { "imgDirectory": ["assets/Gakki/music_piano_gray.png", "assets/Gakki/music_piano.png"], "sound": "assets/chairo1_1.mp3", "gakki": Gakki_Kind.Piano0, "color": [[255, 50, 50]], "pos": [20, 20], "colorMatched": false },
  { "imgDirectory": ["assets/Gakki/music_tubular_bells_chimes_gray.png", "assets/Gakki/music_tubular_bells_chimes.png"], "sound": "assets/chairo4.mp3", "gakki": Gakki_Kind.Metallophone0, "color": [[50, 255, 50]], "pos": [320, 20], "colorMatched": false },
  { "imgDirectory": ["assets/Gakki/music_alto_saxophone_gray.png", "assets/Gakki/music_alto_saxophone.png"], "sound": "assets/chairo7.mp3", "gakki": Gakki_Kind.Xylophone0, "color": [[50, 50, 255]], "pos": [620, 20], "colorMatched": false },
  { "imgDirectory": ["assets/Gakki/windchime_gray.png", "assets/Gakki/windchime.png"], "sound": "assets/chairo10.mp3", "gakki": Gakki_Kind.Triangle0, "color": [[200, 200, 50]], "pos": [920, 20], "colorMatched": false },
  { "imgDirectory": ["assets/Gakki/music_base_gray.png", "assets/Gakki/music_base.png"], "sound": "assets/chairo2.mp3", "gakki": Gakki_Kind.Tambourine0, "color": [[50, 255, 255]], "pos": [20, 250], "colorMatched": false },
  { "imgDirectory": ["assets/Gakki/drumset_gray.png", "assets/Gakki/drumset.png"], "sound": "assets/chairo5.mp3", "gakki": Gakki_Kind.Drum0, "color": [[255, 50, 255]], "pos": [320, 250], "colorMatched": false },
  { "imgDirectory": ["assets/Gakki/music_guitar_lespaul_gray.png", "assets/Gakki/music_guitar_lespaul.png"], "sound": "assets/chairo8.mp3", "gakki": Gakki_Kind.Trumpet0, "color": [[255, 130, 50]], "pos": [620, 250], "colorMatched": false },
  { "imgDirectory": ["assets/Gakki/music_violin_gray.png", "assets/Gakki/music_violin.png"], "sound": "assets/chairo12.mp3", "gakki": Gakki_Kind.Trombone0, "color": [[50, 255, 130]], "pos": [920, 250], "colorMatched": false }
]

const UI_IMG_SET = ['assets/UI/red.png', 'assets/UI/green.png', 'assets/UI/blue.png', 'assets/UI/empty.png', 'assets/UI/dodai.png']
const ICON_IMG_SET = ['assets/UI/player0.png', 'assets/UI/player1.png', 'assets/UI/player2.png', 'assets/UI/player3.png']
const OTHER_IMG_SET = ['assets/backimg.png']

const SEIJA_PlAYER_SET = [
  { "gakkis": [Gakki_Kind.Piano0, Gakki_Kind.Tambourine0] },
  { "gakkis": [Gakki_Kind.Metallophone0, Gakki_Kind.Drum0] },
  { "gakkis": [Gakki_Kind.Xylophone0, Gakki_Kind.Trumpet0] },
  { "gakkis": [Gakki_Kind.Triangle0, Gakki_Kind.Trombone0] }
]

//曲のセットを行進する
function updateSoundSet(sound_set) {
  gGakkiList = [];

  for (elem of sound_set) {
    gakki = new Gakki();
    gakki.setKind(elem["gakki"]);
    for (color of elem["color"]) {
      gakki.addColor(color);
    }
    gakki.setSoundName(elem["sound"]);
    gakki.setPos(elem["pos"]);
    gakki.setColorMatched(elem["colorMatched"])
    gakki.setImgDir(elem["imgDirectory"])
    gakki.setImg();
    gGakkiList.push(gakki);
  }
}

function updatePlayerSet(player_set) {
  let i = 0;
  let playerSet = [];
  for (p of gPlayerList) {
    playerSet = player_set[i];
    p.updateGakki(playerSet["gakkis"])
    p.setPos([20 + i * 300, 500]);
    i = i + 1;
  }

}

//アセットの読み込み、各種情報の初期化
function preload() {

  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called

  song = loadSound('assets/seija_1.mp3');
  //最初は聖者の行進を読んでおく
  updateSoundSet(SEIJA_SET);



  /*
  for (let i = 0; i < 4; i++) {
    let player = new Player();
    player.setDevame("player" + i);
    // player.setPos([20 + i*300, 500])
    // updateGakkiofPlayer(player);
    gPlayerList.push(player);
  }
  */


  for (let imgUiDir of UI_IMG_SET) {
    let imgUi = loadImage(imgUiDir);
    gUiImgList.push(imgUi);
  }

  for (let icon of ICON_IMG_SET) {
    let imgIcon = loadImage(icon);
    gIconImgList.push(imgIcon);
  }

  for (let other of OTHER_IMG_SET) {
    let imgOther = loadImage(other);
    gOtherImgList.push(imgOther);
  }




  frameRate(30);
}

//画面関連の初期化
function setup() {
  createCanvas(gCanvasSize[0], gCanvasSize[1]);
  //楽曲を読み込む
  for (let elem of gGakkiList) {
    elem.loadSound();
  }

}

//描画処理
function draw() {

  //背景の塗りつぶし
  /*
  for(i = 0;i<4;i++){
    let player = new Player();
    player.setDevame("player" + str(i));
    player.setColor([1,2,3]);
    player.setPos([20 + i * 100, 220]);
    // player.setKind(Gakki_Kind.Piano)
    // player.updateGakki(gakki.kind);
    //  updateGakkiofPlayer(player);
    // player.gakkis = [Piano]
    gPlayerList.push(player);
  }*/

  updatePlayerSet(SEIJA_PlAYER_SET);

  // background(240, 240, 200);
  image(gOtherImgList[0], 0, 0, gOtherImgList[0].width * 2, gOtherImgList[0].height * 2);
  fill(255);
  textSize(20);

  //現在のプレーヤーの状態で音を変える。
  cntrlSoundByPlayer();

  dispGakkiStatus();

  dispCurrentPlayerColor();

  dispParamDebug();

  let volGain = 0;
  if (second() % 2 == 0) {
    volGain = 255;
  }
  let volumes = calcAmpOfPlayers();
  onSendVolume("", volumes);

}

function keyPressed() {
  console.log("key=", key, keyCode);
  if (key == "Enter") {
    console.log("play current gakki_set");
    //全てロードしているか確認する
    var loadFg = true;
    for (let elem of gGakkiList) {
      if (!elem.sound.isLoaded()) {
        loadFg = false;
      }
    }
    if (!loadFg) {
      console.log("not loaded.")
      return;
    }

    for (let elem of gGakkiList) {
      if (!elem.sound.isPlaying()) {
        elem.sound.play();
        elem.sound.setVolume(1);
        console.log("elem play", elem)
      }
    }
  } else if (key == "s") {
    console.log("stop sound");
    for (let elem of gGakkiList) {
      if (elem.sound.isPlaying()) {
        elem.sound.stop();
      }
    }
  } else if (key == "m") {
    console.log("mute");
    for (let elem of gGakkiList) {
      if (elem.sound.isPlaying()) {
        elem.sound.setVolume(0);
      }
    }
  } else if (key == "u") {
    console.log("unmute");
    for (let elem of gGakkiList) {
      if (elem.sound.isPlaying()) {
        elem.sound.setVolume(1);
      }
    }
  } else if (key == "1" || key == "2" || key == "3" || key == "4") {
    //プレイヤー1がいない場合には、追加する。いた場合には、削除する。
    var findFg = false;
    for (let i in gPlayerList) {
      if (gPlayerList[i].devname == "player" + key) {
        // findFg = true;
        //リストから削除
        // gPlayerList.splice(i, 1);
        // console.log("remove "+key+" gakki user");
        break;
      }
    }
    //追加する。
    if (!findFg) {
      console.log("add " + key + " gakki user");
      let player = new Player();
      player.setDevame("player" + key);
      if (key == "1") {
        player.setColor([200, 1, 2]);
        // player.setPos([20, 220])
      } else if (key == "2") {
        player.setColor([1, 200, 2]);
        // player.setPos([120, 220])
      } else if (key == "3") {
        player.setColor([1, 2, 200]);
        // player.setPos([220, 220])
      } else if (key == "4") {
        player.setColor([200, 200, 1]);
        // player.setPos([320, 220])
      }
      //プレイヤーの楽器を行進する。
      // updateGakkiofPlayer(player);
      gPlayerList.push(player);
    }
  } else if (key == "z") {
    for (let player of gPlayerList) {
      player.color = [1, 2, 3];
    }
  } else if (key == "x") {
    for (let player of gPlayerList) {
      player.color = [200, 1, 2];
    }
  } else if (key == "c") {
    for (let player of gPlayerList) {
      player.color = [1, 200, 2];
    }
  } else if (key == "v") {
    for (let player of gPlayerList) {
      player.color = [1, 2, 200];
    }
  } else if (key == "b") {
    for (let player of gPlayerList) {
      player.color = [200, 200, 1];
    }
  } else if (key == "n") {
    for (let player of gPlayerList) {
      player.color = [150, 200, 255];
    }
    //vの場合には、繋がっているplayerにvolumeを送付する。
    //テストとして、player登録されている全てのmicro:bitに送付する。
  } else if (key == "v") {
    console.log("send vol");
    for (player of gPlayerList) {
      for (elem of player.gakkis) {
        onSendVolume(elem, 255)
      }
    }
  }

}


function mouseClicked() {

  console.log("mouseCliced");
  isClicked = true; // ユーザ操作が入らないと音楽が再生許可されない問題の解決のため
  checkPlayerColorMatched();

}


//プレイヤーの現在の色を使って、playerが利用する楽器を行進する。
function updateGakkiofPlayer(player) {
  //楽器リストの中で、プレイヤーの色に一番近い楽器を取得する。
  //一応、該当する色がなかったら、追加しない。
  var hued = 999; //色相の差分
  var hurc = getHue(player.color);
  var gakki = null;
  var hue = 0;

  for (let elem of gGakkiList) {
    for (let color of elem.colors) {
      hue = getHue(color)
      if (Math.abs(hurc - hue) < hued) {
        hued = Math.abs(hurc - hue);
        gakki = elem;
      }
    }
  }

  //色差分が遠かった場合には、楽器を更新しない。
  if (hued > 100) {
    return;
  }
  // player.updateGakki(gakki.kind);
}

//楽器のリストの中で、一番ちかい色の楽器を選ぶ。
function searchNearGakki(color) {
  //一応、該当する色がなかったら、追加しない。
  hued = 999;
  var hurc = getHue(color);
  var gakkis = Object.keys(Color_Gakki_Map);
  var gakki = Gakki_Kind.None;

  for (let elem of gakkis) {
    hue = getHue(Color_Gakki_Map[elem])
    if (Math.abs(hurc - hue) < hued) {
      hued = Math.abs(hurc - hue);
      gakki = elem;
    }
  }

  //色差分が遠かった場合には、楽器を更新しない。
  if (hued > 100) {
    return;
  }
  return gakki;
}

//rgbから色相を取得する
function getHue(color = []) {
  var r = color[0];
  var g = color[1];
  var b = color[2];
  var hue = 0;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);

  //------------------
  // 色相
  //------------------
  if ((r == g) && (r == b)) {
    // r = g = b
    hue = 0;
  }
  else if ((r >= g) && (r >= b)) {
    // r が最大
    hue = 60 * (g - b) / (max - min);
  }
  else if ((g >= r) && (g >= b)) {
    // g が最大
    hue = 60 * (b - r) / (max - min) + 120;
  }
  else if ((b >= r) && (b >= g)) {
    // b が最大
    hue = 60 * (r - g) / (max - min) + 240;
  }

  if (this.hue < 0) {
    hue += 360;
  }
  hue = Math.round(hue);
  return hue;
}


//現在のプレーヤーの状態で音を変える。
function cntrlSoundByPlayer() {
  //現在のプレーヤーが担当している音のみを再生する。
  var i = 0;
  var isGakkiPlaying = 0;
  //演奏対象の楽器リストを更新する。

  if (isClicked == true) {
    for (let gakki of gGakkiList) {
      if (gakki.sound.isPlaying()) {
        isGakkiPlaying = 1;
      }
    }

    for (let gakki of gGakkiList) {
      if (gakki.colorMatched == true) {
        gakki.sound.setVolume(1);
      } else {
        gakki.sound.setVolume(0);
      }

      if (isGakkiPlaying == 0) {
        gakki.sound.play();

      }

    }
  }
}



function dispGakkiStatus() {

  for (let gakki of gGakkiList) {
    var i = 0;
    var isColorMatched = 0;

    for (let gakkiColor of gakki.colors) {
      if (gakki.colorMatched == true) {
        isColorMatched = 1;

        fill(gakkiColor);
        circle(gakki.pos[0] + gakki.dispSize[0] / 2, gakki.pos[1] + gakki.dispSize[0] / 2, gakki.dispSize[0]);
        image(gakki.img[1], gakki.pos[0], gakki.pos[1], (gakki.dispSize[0] / 900) * gakki.img[1].width, (gakki.dispSize[1] / 900) * gakki.img[1].height)
      } else {

        fill([150, 150, 150]);
        rect(gakki.pos[0], gakki.pos[1], gakki.dispSize[0], gakki.dispSize[1]);

        let isMatched = false;
        let dispColor = [];
        for (let player of gPlayerList) {
          if (checkColorMatched(player.color, gakkiColor)) {
            isMatched = true;
          }
        }
        if (isMatched == true) {
          let f = 30;
          let g = 2;

          for (let i = 0; i < 3; i++) {
            if (gakki.count >= 0) {
              dispColor.push(150 + (gakkiColor[i] - 150) * gakki.count / f);
            } else {
              dispColor.push(gakkiColor[i] - (gakkiColor[i] - 150) * (f + gakki.count * g) / f);
            }

          }
          fill(dispColor);
          rect(gakki.pos[0], gakki.pos[1], gakki.dispSize[0], gakki.dispSize[1]);
          gakki.setCount(gakki.count + 1);
          if (gakki.count > f) {
            gakki.setCount(-f / g);
          }

        }
        image(gakki.img[0], gakki.pos[0], gakki.pos[1], (gakki.dispSize[0] / 900) * gakki.img[0].width, (gakki.dispSize[1] / 900) * gakki.img[0].height)
        fill(gakkiColor);
        circle(gakki.pos[0] + gakki.dispSize[0], gakki.pos[1] + gakki.dispSize[1] / 10, gakki.dispSize[0] / 3);
      }

      i = i + 1;
    }

  }

}


function checkPlayerColorMatched() {
  var i = 0;
  for (let gakki of gGakkiList) {
    if (isMousePosRange(gakki.pos, gakki.dispSize)) {
      for (let gakkiColor of gakki.colors) {
        for (let player of gPlayerList) {

          if (checkColorMatched(player.color, gakkiColor)) {
            console.log("color matched!");
            gakki.setColorMatched(true);
          }

        }
        i = i + 1;
      }
    }
  }
}


function dispParamDebug() {

}


function isMousePosRange(position, range) {
  if ((mouseX >= (position[0] - range[0] / 2)) && (mouseX <= (position[0] + range[0] / 2))) {
    if ((mouseY >= (position[1] - range[1] / 2)) && (mouseY <= (position[1] + range[1] / 2))) {
      return true;
    }
  }

  return false;

}


function dispCurrentPlayerColor() {
  var i = 0;
  for (let player of gPlayerList) {

    var gain = 1 / 130;
    image(gUiImgList[4], player.pos[0] - 90, player.pos[1] + 120, gUiImgList[4].width * player.dispSize[0] * gain, gUiImgList[4].height * player.dispSize[0] * gain);
    var gain = 1 / 300;
    fill(player.color);
    circle(player.pos[0] + player.dispSize[0] / 2, player.pos[1] + player.dispSize[0] / 2, player.dispSize[0]);
    image(gIconImgList[i], player.pos[0] + 5, player.pos[1] + 90, gIconImgList[i].width * player.dispSize[0] * gain, gIconImgList[i].height * player.dispSize[0] * gain);

    for (let i = 0; i < 3; i++) {
      for (let j = 1; j <= 5; j++) {
        image(gUiImgList[3], player.pos[0] + i * 50, player.pos[1] + 200 + (50 - j * 20), gUiImgList[i].width / 7, gUiImgList[i].height / 5);
      }
    }
    for (let i = 0; i < 3; i++) {
      numDisp = player.color[i] / 50;
      for (let j = 1; j <= numDisp; j++) {
        image(gUiImgList[i], player.pos[0] + i * 50, player.pos[1] + 200 + (50 - j * 20), gUiImgList[i].width / 7, gUiImgList[i].height / 5);
      }
    }
    i = i + 1;
  }
}


function checkColorMatched(colorPlayer, colorGakki) {

  var score = 0;
  var machedThreshold = 50;

  score = 100 - (Math.abs(colorGakki[0] - colorPlayer[0]) + Math.abs(colorGakki[1] - colorPlayer[1]) + Math.abs(colorGakki[2] - colorPlayer[2])) * 100 / 765;
  if (score > machedThreshold) {
    return true;
  } else {
    return false;
  }

}

function calcAmpOfPlayers() {
  let amp = 0;
  let ampPlayers = [];
  for (let player of gPlayerList) {
    amp = 0;

    for (let gakki of gGakkiList) {
      if (player.gakkis.indexOf(gakki.kind) != -1) {
        let gain = 1;
        amp = amp + gakki.ampAnalyer.getLevel() * 255 * gain;
        amp = Math.min(amp, 254);
        amp = Math.max(amp, 20);
        amp = Math.trunc(amp);
      }
    }
    if (amp == 0) {
      amp = 200;
    }
    ampPlayers.push(amp);
  }
  console.log("ampPlayers: " + ampPlayers);
  return ampPlayers;

}

