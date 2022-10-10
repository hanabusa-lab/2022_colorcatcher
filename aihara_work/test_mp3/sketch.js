let gCanvasSize = [1600, 1200]; //キャンバスサイズ
let gBellList = [];
let gAmplList = [];
let gPeakList = [];
let amplitude;


//アセットの読み込み、各種情報の初期化
function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  frameRate(30);
  gBellList.push(loadSound('assets/bell_1.mp3'));
  gBellList.push(loadSound('assets/bell_2.mp3'));
  gBellList.push(loadSound('assets/bell_3.mp3'));
  gBellList.push(loadSound('assets/bell_4.mp3'));

  
  //for(elem of gBellList){
   
    //gAmplList.push(amplitude);  
  //}
}

//画面関連の初期化
function setup() {
  createCanvas(gCanvasSize[0], gCanvasSize[1]);
  for(elem of gBellList){
    tamplitude = new p5.Amplitude();
    tamplitude.setInput(elem);
    gAmplList.push(tamplitude); 
  }
  for(elem of gBellList){
    gPeakList.push(elem.getPeaks(1));
    console.log("peak ",elem.getPeaks(1)[0]);
  }
 
}

//描画処理
function draw() {
  //背景の塗りつぶし
  background(0);
  fill(255);
  textSize(20);
  for(let index in gAmplList){
    text("amp of sound["+index+"]="+gAmplList[index].getLevel(), 10, 20+20*index);
  }
  
  //image(gBackImg, 0, 0);

  //音と連動して,bluetoothにコマンドを送信する。
  //while(gMessageQueue.length!=0){
  if(gAmplList[0].getLevel()>0.1){
    //console.log("gMessageQueue.len=",gMessageQueue.length)
    //let data = gMessageQueue.shift()
    onSendMsg();
  }
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
    for(elem of gBellList){
      if(!elem.isPlaying()){
      elem.play(); // 音を再生！
      }
    } 
  }else if (key === "b") {
    console.log("key b");
    for(elem of gBellList){
      if(elem.isPlaying()){
      elem.stop(); // 音を再生！
      }
    } 
  }

}

