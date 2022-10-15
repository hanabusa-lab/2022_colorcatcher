let gCanvasSize = [1600, 1200]; //キャンバスサイズ
//テスト
let gBellList = [];
let gAmplList = [];
let gPeakList = [];
let amplitude;

let gPlayerList = [];//プレイヤーのリスト
let gGakkiList = []//楽器のリスト

//楽器種別
const Gakki_Kind = { None:0, Piano:1, Metallophone:2, Xylophone:3, Triangle:4,
  Tambourine:5, Drum:6 };

//曲ごとの定義
//ジングルベル
const BELL_SET = [
  {"sound":"assets/bell_1.mp3", "gakki":Gakki_Kind.Piano, "color":[[200,0,0]]},
  {"sound":"assets/bell_2.mp3", "gakki":Gakki_Kind.Metallophone, "color":[[0,200,0]]},
  {"sound":"assets/bell_3.mp3", "gakki":Gakki_Kind.Xylophone, "color":[[0,0,200]]},
  {"sound":"assets/bell_4.mp3", "gakki":Gakki_Kind.Triangle, "color":[[200,200,000]]}
]

//聖者の行進
const SEIJA_SET = [
  {"sound":"assets/seija_1.mp3", "gakki":Gakki_Kind.Piano, "color":[[200,0,0]]},
  {"sound":"assets/seija_2.mp3", "gakki":Gakki_Kind.Metallophone, "color":[[0,200,0]]},
  {"sound":"assets/seija_3.mp3", "gakki":Gakki_Kind.Xylophone, "color":[[0,0,200]]},
  {"sound":"assets/seija_4.mp3", "gakki":Gakki_Kind.Triangle, "color":[[200,200,000]]}
]

//楽器に相当する色を定義する。
/*
const Color_Gakki_Map =
{ Gakki_Kind.Piano:[200,0,0],
  Gakki_Kind.Metallophone:[0,200,0],
  Gakki_Kind.Xylophone:[0,0,200]
}*/

//曲のセットを行進する
function updateSoundSet(sound_set){
  gGakkiList = [];

  for(elem of sound_set){
    gakki = new Gakki();
    gakki.setKind(elem["gakki"]);
    for(color of elem["color"]){
      gakki.addColor(color);
    }
    gakki.setSoundName(elem["sound"]);
  }
}

//アセットの読み込み、各種情報の初期化
function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  frameRate(30);
  /*gBellList.push(loadSound('assets/bell_1.mp3'));
  gBellList.push(loadSound('assets/bell_2.mp3'));
  gBellList.push(loadSound('assets/bell_3.mp3'));
  gBellList.push(loadSound('assets/bell_4.mp3'));
  */  
}

//画面関連の初期化
function setup() {
  createCanvas(gCanvasSize[0], gCanvasSize[1]);

  //最初は聖者の行進を読んでおく
  updateSoundSet(SEIJA_SET);

  /*
  for(elem of gBellList){
    tamplitude = new p5.Amplitude();
    tamplitude.setInput(elem);
    gAmplList.push(tamplitude); 
  }
  for(elem of gBellList){
    gPeakList.push(elem.getPeaks(1));
    console.log("peak ",elem.getPeaks(1)[0]);
  }
  */
}

//描画処理
function draw() {
  //背景の塗りつぶし
  background(0);
  fill(255);
  textSize(20);
  /*
  for(let index in gAmplList){
    text("amp of sound["+index+"]="+gAmplList[index].getLevel(), 10, 20+20*index);
  }*/
  
  //image(gBackImg, 0, 0);

  //音と連動して,bluetoothにコマンドを送信する。
  //while(gMessageQueue.length!=0){
  /*if(gAmplList[0].getLevel()>0.1){
    //console.log("gMessageQueue.len=",gMessageQueue.length)
    //let data = gMessageQueue.shift()
    onSendMsg();
  }*/
//}

  /*switch (key) {
    case "x":
      break;
  }*/
}

function keyPressed() {
  console.log("key");
   
  if (key === "a") {
    console.log("key a");
    /*for(elem of gBellList){
      if(!elem.isPlaying()){
      elem.play(); // 音を再生！
      }
    }*/
  }else if (key === "b") {
    console.log("key b");
    /*for(elem of gBellList){
      if(elem.isPlaying()){
      elem.stop(); // 音を再生！
      }
    }*/
  }
}

//プレイヤーの現在の色を使って、playerが利用する楽器を行進する。
function updateGakkiofPlayer(player){
  //楽器リストの中で、プレイヤーの色に一番近い楽器を取得する。
  //一応、該当する色がなかったら、追加しない。
  hued = 999; //色相の差分
  var hurc =getHue(player.color); 
  var gakki = none;
  for(elem of gGakkiList){
    for(color of elem.colors){
      hue = getHue(color)
      if(Math.abs(hurc-hue)<hued){
          hued = Math.abs(hurc-hue);
          gakki = elem;
      }
    }
  }

  //色差分が遠かった場合には、楽器を更新しない。
  if(hued > 100){
    return;
  }
  playser.updateGakki(gakki.kind);
}

 //楽器のリストの中で、一番ちかい色の楽器を選ぶ。
 function searchNearGakki(color){
  //一応、該当する色がなかったら、追加しない。
  hued = 999;
  var hurc =getHue(color); 
  var gakkis = Object.keys(Color_Gakki_Map);
  var gakki = Gakki_Kind.None;

  for(elem of gakkis){
      hue = getHue(Color_Gakki_Map[elem])
      if(Math.abs(hurc-hue)<hued){
          hued = Math.abs(hurc-hue);
          gakki = elem;
      }
  }

  //色差分が遠かった場合には、楽器を更新しない。
  if(hued > 100){
      return;
  }
  return gakki;
}

//rgbから色相を取得する
function getHue(color = []){
  var r = color[0];
  var g = color[1];
  var b = color[2];
  var heu;

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



