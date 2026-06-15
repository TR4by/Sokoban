class Button {
  constructor(setX, setY, setXSize, setYSize, text, setId) {
    this.x = setX;
    this.y = setY;
    this.xSize = setXSize;
    this.ySize = setYSize;
    this.id = setId + 1;
    this.isLevelBeaten = false;
  }

  show() {
    if (mouseX > this.x + 10 && mouseX < this.x + this.xSize + 10 && mouseY > this.y && mouseY < this.y + this.ySize) {
      fill(230, 230, 230);
    } else if (level_manager.currentLevel === this.id && this.isLevelBeaten) {
      fill(255, 255, 50);
    } else if (this.isLevelBeaten) {
      fill(200, 200, 100);
    } else if (level_manager.currentLevel === this.id) {
      fill(230, 100, 125);
    } else {
      fill(180);
    }
    rect(this.x + 10, this.y, this.xSize, this.ySize, 6);
    game.new_text(String(this.id), 16, this.x + 30, this.y + 8, color(80, 80, 80), CENTER);
  }

  press() {
    if (mouseX > this.x + 10 && mouseX < this.x + this.xSize + 10 && mouseY > this.y && mouseY < this.y + this.ySize) {
      if (this.id > 0) level_manager.select_level(this.id);
      else if (this.id === 0) editor.toggle();
    }
  }
}
