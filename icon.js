class Icon {
  constructor(num, setX, setY) {
    this.size = 40;
    this.x = setX;
    this.y = setY - 10;
    switch (num) {
      case 0: this.type = 'wall'; this.texture = game.wall_texture; break;
      case 1: this.type = 'floor'; this.texture = game.floor_texture; break;
      case 2: this.type = 'crate_spot'; this.texture = game.cratespot_texture; break;
      case 3: this.type = 'crate'; this.texture = game.crate_texture; break;
      case 4: this.type = 'lit_crate'; this.texture = game.litcrate_texture; break;
      case 5: this.type = 'dark_crate'; this.texture = game.darkcrate_texture; break;
      case 6: this.type = 'player_editor'; this.texture = game.player_editor_texture; break;
      case 7: this.type = 'save'; this.texture = game.save_texture; break;
      case 8: this.type = 'load'; this.texture = game.load_texture; break;
    }
  }

  show() {
    image(this.texture, this.x, this.y);
  }

  press() {
    if (mouseX > this.x && mouseX < this.x + this.size && mouseY > this.y && mouseY < this.y + this.size) {
      if (this.type === 'save') editor.download_level();
      else if (this.type === 'load') editor.open_file_dialog();
      else editor.currentlyHeld = this.type;
    }
  }
}
