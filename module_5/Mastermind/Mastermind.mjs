"use strict";
//imports
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TColorPicker } from "./ColorPicker.mjs";
import MastermindBoard from "./MastermindBoard.mjs";
import { TMenu } from "./menu.mjs";

//sprite info, inkludert for spillebrettet
export const SpriteInfoList = {
  Board:              { x: 640, y:   0, width: 441, height: 640, count: 1 },
  ButtonNewGame:      { x:   0, y:  45, width: 160, height:  45, count: 4 },
  ButtonCheckAnswer:  { x:   0, y:   0, width: 160, height:  45, count: 4 },
  ButtonCheat:        { x:   0, y: 139, width:  75, height:  49, count: 4 },
  PanelHideAnswer:    { x:   0, y:  90, width: 186, height:  49, count: 1 },
  ColorPicker:        { x:   0, y: 200, width:  34, height:  34, count: 8 },
  ColorHint:          { x:   0, y: 250, width:  19, height:  18, count: 3 },
};

//sette opp canvas
const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);

//felles objekter som blir brukt i flere moduler
export const GameProps = {
  board: null,
  colorPickers:[],
  snapTo:{
    positions: MastermindBoard.ColorAnswer.Row1,
    distance: 20
  },
  computerAnswers: [],
  roundIndicator: null,
  menu: null,
  playerAnswers: [null, null, null, null],
  answerHintRow: MastermindBoard.AnswerHint.Row1,
}

//nytt spill. resetter det som trengs til start.
export function newGame() {
  for(let i = 0; i < GameProps.colorPickers.length; i++){
    const colorPicker = GameProps.colorPickers[i];
    spcvs.removeSpriteButton(colorPicker);
  }
  GameProps.colorPickers = [];
  const ColorKeys = Object.keys(MastermindBoard.ColorPicker);
  
  //går til første rad
  GameProps.snapTo.positions = MastermindBoard.ColorAnswer.Row1;
  moveRoundIndicator();

  //lager nye color picker knapper
  for(let i = 0; i < ColorKeys.length; i++){
    const colorName = ColorKeys[i];
    const colorPicker = new TColorPicker(spcvs, SpriteInfoList.ColorPicker, colorName, i);
    GameProps.colorPickers.push(colorPicker);
  }

  generateComputerAnswer();
}

//tegner spillet
function drawGame(){
  spcvs.clearCanvas();

  //her tegnes spillebrettet først.
  GameProps.board.draw();

  for(let i = 0; i < GameProps.computerAnswers.length; i++){
    const computerAnswer = GameProps.computerAnswers[i];
    computerAnswer.draw();
  }
  
  GameProps.roundIndicator.draw();

  GameProps.menu.draw();

  //tegner fargevelgere
  for(let i = 0; i < GameProps.colorPickers.length; i++){
    const colorPicker = GameProps.colorPickers[i];
    colorPicker.draw();
  }

  requestAnimationFrame(drawGame);
}

//velger tilfeldig 4 farger som hemmelig svar
function generateComputerAnswer(){
  for(let i = 0; i < 4 ; i++){
    const colorIndex = Math.floor(Math.random() * SpriteInfoList.ColorPicker.count);
    const pos = MastermindBoard.ComputerAnswer[i];
    const sprite = new libSprite.TSprite(spcvs, SpriteInfoList.ColorPicker,pos);
    sprite.index = colorIndex;
    GameProps.computerAnswers.push(sprite);
  }

}


export function moveRoundIndicator(){
  const pos = GameProps.snapTo.positions[0];
  GameProps.roundIndicator.x = pos.x - 84;
  GameProps.roundIndicator.y = pos.y + 7;
}

//loader spillet
function loadGame() {
  //canvas størrelsen skal matche dimensjonene til brettet
  cvs.width = SpriteInfoList.Board.width;
  cvs.height = SpriteInfoList.Board.height;
  spcvs.updateBoundsRect();
  //instanserer ved hjelp av SpriteInfoList.Board
  let pos = new lib2D.TPoint(0, 0);
  GameProps.board = new libSprite.TSprite(spcvs, SpriteInfoList.Board, pos);

  pos = GameProps.snapTo.positions[0];
  GameProps.roundIndicator = new libSprite.TSprite(spcvs, SpriteInfoList.ColorHint, pos);
  GameProps.roundIndicator.index = 2;
  moveRoundIndicator();

  GameProps.menu = new TMenu(spcvs);

  //starter nytt spill og tegner
  newGame();
  requestAnimationFrame(drawGame); 
}

//main
spcvs.loadSpriteSheet("./Media/SpriteSheet.png", loadGame);
window.addEventListener("resize", spcvs.updateBoundsRect.bind(spcvs));
