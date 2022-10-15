
//Metallophone:鉄琴
//Xylophone；木琴

class Gakki {
    constructor() {
        this.kind = Gakki_Kind.None; //楽器の種類
        this.colors = []; //音に対応する色 [0,0,200],[200,0,10]のようにカラーを複数もつ
        this.sound_name = null; //該当の音の名前
        this.sound = null;//該当の音。これは一つ
    }
    
    //種別を追加する
    setKind(kind){
        this.kind = kind;
    }

    //色を追加する
    addColor(color){
        this.colors.push(color);
    }

    //該当色の情報をクリアする
    clearColor(){
        this.color = []
    }

    //該当の曲を設定する
    setSoundName(name){
        this.sound_name = name;
    }

    //該当の曲を設定する
    setSound(sound){
        this.sound = sound;
    }

    //曲をロードする。
    loadSound(){
        this.sound = loadSound(this.sound_name);
    }

    //曲のロード状態を確認する。
    isLoaded(){
        return this.sound.isLoaded();
    }
}
