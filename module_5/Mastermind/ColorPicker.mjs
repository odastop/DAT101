"use strict";
//imports
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import MastermindBoard from "./MastermindBoard.mjs";
import { GameProps } from "./Mastermind.mjs";

//henter posisjoner for fargevelgere
const Positions = MastermindBoard.ColorPicker;

//klasse for color pickers brukt av spilleren
export class TColorPicker extends libSprite.TSpriteDraggable {
  #spcvs;
  #spi;
  #color;
  #snapPos;
  #snapIndex;
  #hasMoved;
  constructor(spcvs, spriteInfo, color, index){
    super(spcvs, spriteInfo,Positions[color]);
    this.index = index;
    this.snapTo = GameProps.snapTo;
    this.#spcvs = spcvs;
    this.#spi = spriteInfo;
    this.#color = color;
    this.#snapPos = null;
    this.#hasMoved = false;
    this.#snapIndex = -1;
  }

  //kan ikke dra oppå andre like items
  onCanDrop(){
    return false;
  }

  //kloner color picker når den er droppet. Kan da brukes flere ganger.
  clone(){
    return new TColorPicker(
      this.#spcvs,
      this.#spi,
      this.#color,
      this.index
    )
  }

  onDrop(aDropPosition){
    GameProps.colorPickers.push(this.clone());
    this.#snapIndex = GameProps.snapTo.positions.indexOf(aDropPosition);
    this.#snapPos = new lib2D.TPoint();
    this.#snapPos.x = GameProps.snapTo.positions[this.#snapIndex].x;
    this.#snapPos.y = GameProps.snapTo.positions[this.#snapIndex].y;
    GameProps.snapTo.positions[this.#snapIndex] = null;
    this.#hasMoved = true;
    GameProps.playerAnswers[this.#snapIndex] = this;
  }

  //kalles når spilleren trykker på en color picker
  onMouseDown(){
    super.onMouseDown();
    const index = GameProps.colorPickers.indexOf(this);
    GameProps.colorPickers.splice(index, 1);
    GameProps.colorPickers.push(this);
    if(this.#snapPos !== null){
      console.log("Pushing snapPos", this.#snapPos);
      GameProps.snapTo.positions[this.#snapIndex] = this.#snapPos;
      this.#snapPos = null;
      GameProps.playerAnswers[this.#snapIndex] = null;
    }
  }

  //kalles hvis spilleren slipper color picker utenfor et valgt område.
  onCancelDrop(){
    if(this.#hasMoved){
      const index = GameProps.colorPickers.indexOf(this);
      GameProps.colorPickers.splice(index, 1);
      this.spcvs.removeSpriteButton(this); 
    }
  }
} 
