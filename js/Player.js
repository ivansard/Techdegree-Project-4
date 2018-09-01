"use-strict";

class Player {
  constructor(colorRectangle,  filledBoxClass) {
    this.colorRectangle = colorRectangle;
    this.filledBoxClass = filledBoxClass;
    this.checkedBoxes = [];
  }

  get colorRectangle(){
    return this._colorRectangle;
  }

  set colorRectangle( newColorRectangle ){
    this._colorRectangle = newColorRectangle;
  }

  get filledBoxClass(){
    return this._filledBoxClass;
  }

  set filledBoxClass( newFilledBoxClass ){
    this._filledBoxClass = newFilledBoxClass;
  }

  get checkedBoxes(){
    return this._checkedBoxes;
  }

  set checkedBoxes( newFilledBoxClass ){
    this._checkedBoxes = newFilledBoxClass;
  }


}
