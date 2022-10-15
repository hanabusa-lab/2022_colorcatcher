let gCanvasSize = [1600, 1200]; //キャンバスサイズ

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
    gGakkiList.push(gakki);
  }
}

//アセットの読み込み、各種情報の初期化
function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  frameRate(30);
}

//画面関連の初期化
function setup() {
  createCanvas(gCanvasSize[0], gCanvasSize[1]);

  //最初は聖者の行進を読んでおく
  updateSoundSet(SEIJA_SET);

  //楽曲を読み込む
  for(elem of gGakkiList){
    elem.loadSound();
  }
}

//描画処理
function draw() {
  //背景の塗りつぶし
  background(0);
  fill(255);
  textSize(20);

  //現在のプレーヤーの状態で音を変える。
  cntrlSoundByPlayer();
}

function keyPressed() {
  console.log("key=",key, keyCode); 
  if (key == "Enter") {
    console.log("play current gakki_set");
    //全てロードしているか確認する
    var loadFg = true;
    for(elem of gGakkiList){
      if(!elem.sound.isLoaded()){
        loadFg = false;
      }
    }
    if(!loadFg){
      console.log("not loaded.")
      return;
    }

    for(elem of gGakkiList){
      if(!elem.sound.isPlaying()){
        elem.sound.play();
        elem.sound.setVolume(1);
        console.log("elem play",elem)
      }
    }
  }else if (key == "s") {
    console.log("stop sound");
    for(elem of gGakkiList){
      if(elem.sound.isPlaying()){
        elem.sound.stop();
      }
    }
  }else if (key == "m") {
    console.log("mute");
    for(elem of gGakkiList){
      if(elem.sound.isPlaying()){
        elem.sound.setVolume(0);
      }
    }
  }else if (key == "u") {
    console.log("unmute");
    for(elem of gGakkiList){
      if(elem.sound.isPlaying()){
        elem.sound.setVolume(1);
      }
    }
  }else if (key == "1" || key == "2" || key == "3" || key == "4") {
    //プレイヤー1がいない場合には、追加する。いた場合には、削除する。
    var findFg=false;
    for(i in gPlayerList){
      if(gPlayerList[i].devname=="player"+key){
        findFg = true;
        //リストから削除
        gPlayerList.splice(i, 1);
        console.log("remove "+key+" gakki user");
        break;
      }
    }
    //追加する。
    if(!findFg){
      console.log("add "+key+" gakki user");
      let player = new Player();
      player.setDevame("player"+key);
      if(key == "1"){
        player.setColor([200,0,0]);
      }else if(key == "2"){
        player.setColor([0,200,0]);
      }else if(key == "3"){
        player.setColor([0,0,200]);
      }else if(key == "4"){
        player.setColor([200,200,0]);
      }
      //プレイヤーの楽器を行進する。
      updateGakkiofPlayer(player);
      gPlayerList.push(player);
    }
  }
}

//プレイヤーの現在の色を使って、playerが利用する楽器を行進する。
function updateGakkiofPlayer(player){
  //楽器リストの中で、プレイヤーの色に一番近い楽器を取得する。
  //一応、該当する色がなかったら、追加しない。
  var hued = 999; //色相の差分
  var hurc =getHue(player.color); 
  var gakki = null;
  var hue = 0;
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
  player.updateGakki(gakki.kind);
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
function cntrlSoundByPlayer(){
  //現在のプレーヤーが担当している音のみを再生する。
  curGakkiList = []
  for(player of gPlayerList ){
    for(gakki of player.gakkis){
      if(!curGakkiList.includes(gakki)){
        curGakkiList.push(gakki);
      }
    }
  }
  console.log("curGakki=",curGakkiList);

  //演奏対象の楽器リストを更新する。
  for(gakki of gGakkiList){
    if(curGakkiList.includes(gakki.kind)){
      gakki.setEnable(true);
      if(gakki.sound.isPlaying()){
        gakki.sound.setVolume(1);
      }     
    }else{
      gakki.setEnable(false);
      if(gakki.sound.isPlaying()){
        gakki.sound.setVolume(0);
      }   
    }
  }
}



