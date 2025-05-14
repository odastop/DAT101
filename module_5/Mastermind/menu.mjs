"use strict";
//imports
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import{ GameProps, SpriteInfoList, moveRoundIndicator, newGame} from "./Mastermind.mjs";
import MastermindBoard from "./MastermindBoard.mjs";

//Menu klasse som håndterer knapper og diverse
export class TMenu {
  #buttonNewGame;
  #buttonCheckAnswer;
  #buttonCheat;
  #panelCheat;
  #colorHints;
  #spcvs;
  #roundNumber;
  constructor(aSpriteCanvas){
    this.#spcvs = aSpriteCanvas;
    this.#roundNumber = 1;

    //meny knapper
    this.#buttonNewGame = 
    new libSprite.TSpriteButtonHaptic(
      aSpriteCanvas,
      SpriteInfoList.ButtonNewGame,
      MastermindBoard.ButtonNewGame);
    

    this.#buttonCheckAnswer = 
    new libSprite.TSpriteButtonHaptic(
      aSpriteCanvas,
      SpriteInfoList.ButtonCheckAnswer,
      MastermindBoard.ButtonCheckAnswer);
    
    this.#buttonCheat = 
    new libSprite.TSpriteButtonHaptic(
      aSpriteCanvas,
      SpriteInfoList.ButtonCheat,
      MastermindBoard.ButtonCheat);

    this.#panelCheat = 
      new libSprite.TSprite(
        aSpriteCanvas,
        SpriteInfoList.PanelHideAnswer,
        MastermindBoard.PanelHideAnswer);   
    
    // gjøre knappene klikkbare
    this.#buttonCheat.onClick = this.onButtonCheatClick;
    this.#buttonCheckAnswer.onClick = this.onCheckAnswerClick;
    this.#buttonNewGame.onClick = this.onButtonNewGameClick;
    this.#colorHints = [];
  }

  //tegne menyelementene
  draw(){
    this.#buttonNewGame.draw();
    this.#buttonCheckAnswer.draw();
    this.#buttonCheat.draw();
    this.#panelCheat.draw();
    for(let i = 0; i < this.#colorHints.length; i++){
      const colorHint = this.#colorHints[i];
      colorHint.draw();
    }
  }

  // bytter fra å kunne se fasit og ikke se fasit
  onButtonCheatClick = () =>{
    this.#panelCheat.visible = !this.#panelCheat.visible;
  }

  //kalles når knappen for check answer klikkes
  onCheckAnswerClick = () =>{
    const answerObject = { color : 0, pos: -1, checkThis: true};
    const computerAnswerList = [];
    for(let i = 0 ; i < 4; i++){
      const obj = Object.create(answerObject);
      const computerAnswer = GameProps.computerAnswers[i];
      obj.color = computerAnswer.index;
      obj.pos = i;
      computerAnswerList.push(obj);
    }
    const playerAnswerList = [];
    for(let i = 0; i < 4; i++){
      if(GameProps.playerAnswers[i] === null){
        return;
      }
      const obj = Object.create(answerObject);
      const playerAnswer = GameProps.playerAnswers[i];
      obj.color = playerAnswer.index;
      obj.pos = i;
      playerAnswerList.push(obj);
    }

    let answerColorHintIndex = 0;
    let numberOfCorrectColors = 0;

    //sjekker for korrekt farge og posisjon
    for(let i = 0; i < 4; i++){
      const computerAnswer = computerAnswerList[i];
      const playerAnswer = playerAnswerList[i];
      if(computerAnswer.color === playerAnswer.color){
        console.log(`Riktig farge på plass ${i + 1}`);
        answerColorHintIndex = this.#createColorHint(answerColorHintIndex, 1);
        computerAnswer.checkThis = playerAnswer.checkThis = false;
        numberOfCorrectColors++;
      }
    }

    // betingelse for å kunne vinne
    if(numberOfCorrectColors === 4){
      console.log("Gratulerer, du har vunnet!");
      this.#panelCheat.visible = false;
      return; 
    }

    //sjekker for korrekt farge men feil posisjon
    for(let i = 0; i < 4; i++){
      const playerAnswer = playerAnswerList[i];
      if(playerAnswer.checkThis){
        for(let j = 0; j < 4; j++){
          const computerAnswer = computerAnswerList[j];
          if(computerAnswer.checkThis && (playerAnswer.pos !== computerAnswer.pos)){
            if(playerAnswer.color === computerAnswer.color){
              console.log(`Rett farge på feil plass - ${playerAnswer.pos + 1} , ${computerAnswer.pos + 1}`);
              answerColorHintIndex = this.#createColorHint(answerColorHintIndex, 0);
              computerAnswer.checkThis = playerAnswer.checkThis = false;
            }
          }

        }
      } 
    }
    this.#setNextRound();
  } 

  //starte nytt spill
  onButtonNewGameClick = () =>{
    this.#roundNumber = 1;
    this.#colorHints = [];
    newGame();
  }

  // lager ny fasit og lagrer i hint sprite
  #createColorHint(posIndex, colorIndex){
    const pos = GameProps.answerHintRow[posIndex++];
    const colorHintSPI = SpriteInfoList.ColorHint;
    const colorHint = new libSprite.TSprite(this.#spcvs, colorHintSPI, pos);
    colorHint.index = colorIndex;
    this.#colorHints.push(colorHint);
    return posIndex; 
  } 

  //går videre til neste runde eller avslutte spill
  #setNextRound(){
    this.#roundNumber++;
    if(this.#roundNumber > 10){
      console.log("Du har tapt, prøv igjen!");
      this.#panelCheat.visible = false;
      return;
    }
    const rowText = `Row${this.#roundNumber}`;
    GameProps.snapTo.positions = MastermindBoard.ColorAnswer[rowText];
    GameProps.answerHintRow = MastermindBoard.AnswerHint[rowText];
    moveRoundIndicator();
    //resetter svar
    for(let i = 0; i < 4; i++){
      GameProps.playerAnswers[i].disable = true;
      GameProps.playerAnswers[i] = null;
    }
  }

} 
