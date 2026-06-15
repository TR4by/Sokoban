class AssetManager {
  load_textures() {
    this.air_texture = this.assign_texture('air.png');
    this.wall_texture = this.assign_texture('wall.png');
    this.floor_texture = this.assign_texture('floor.png');
    this.crate_texture = this.assign_texture('crate.png');
    this.cratespot_texture = this.assign_texture('cratespot.png');
    this.litcrate_texture = this.assign_texture('litcrate.png');
    this.darkcrate_texture = this.assign_texture('darkcrate.png');
    this.player_right_texture = this.assign_texture('player_right.png');
    this.player_left_texture = this.assign_texture('player_left.png');
    this.player_up_texture = this.assign_texture('player_up.png');
    this.player_down_texture = this.assign_texture('player_down.png');
    this.player_editor_texture = this.assign_texture('player_editor.png');
    this.save_texture = this.assign_texture('save.png');
    this.load_texture = this.assign_texture('load.png');
  }

  load_maps() {
    this.maps = [];
    for (let i = 0; i <= 30; i++) {
      this.maps[i] = loadStrings('data/map' + i + '.txt');
    }
  }

  assign_texture(image) {
    return loadImage('data/' + image);
  }

  new_text(txt, size, x, y, colour, alignment) {
    textSize(size);
    fill(colour);
    textAlign(alignment, alignment);
    text(txt, x, y);
  }
}
