class OldPlayer{
  playTheMusicPlease(oldSetting:string):void{
    console.log('playing...')
  }
}

interface Player{
  play():void;
}

class OldPlayerUpdate implements Player{
  private OldPlayer:OldPlayer;
  constructor(){
    this.OldPlayer = new OldPlayer();
  }
  play():void{
    //if... else ...
    this.OldPlayer.playTheMusicPlease('oldSetting');
  }
}



let player:Player = new OldPlayerUpdate();
player.play();
