let gCanvasSize = [1600, 1200]; //キャンバスサイズ

//アセットの読み込み、各種情報の初期化
function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  frameRate(30);

}

//画面関連の初期化
function setup() {
  createCanvas(gCanvasSize[0], gCanvasSize[1]);
}

//描画処理
function draw() {
  //背景の塗りつぶし
  background(0);
  fill(255);
  textSize(20);
  //image(gBackImg, 0, 0);

  //音と連動して,bluetoothにコマンドを送信する。
  while(gMessageQueue.length!=0){
    console.log("gMessageQueue.len=",gMessageQueue.length)
    let data = gMessageQueue.shift()
    onSendMsg();
  }

  switch (key) {
    case "a":
      break;
      break;
  }
}
