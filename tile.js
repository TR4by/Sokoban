class Tile {
  constructor(setType) {
    this.size = 40;
    this.type = setType;
    this.standingOn = 'floor';
    this.canStand = false;
    this.canPush = false;
    this.texture = null;
    this.set_type(this.type);
  }

  show(x, y) {
    image(this.texture, x * this.size, y * this.size);
  }

  set_type(setType) {
    this.type = setType;
    this.canPush = false;
    this.canStand = false;
    switch (this.type) {
      case 'air':
        this.texture = game.air_texture;
        break;
      case 'wall':
        this.texture = game.wall_texture;
        break;
      case 'floor':
        this.texture = game.floor_texture;
        this.canStand = true;
        break;
      case 'crate':
        this.texture = game.crate_texture;
        this.canPush = true;
        break;
      case 'crate_spot':
        this.texture = game.cratespot_texture;
        this.canStand = true;
        break;
      case 'lit_crate':
        this.texture = game.litcrate_texture;
        this.canPush = true;
        break;
      case 'dark_crate':
        this.texture = game.darkcrate_texture;
        this.canStand = true;
        break;
      case 'player':
        this.texture = game.player_down_texture;
        break;
      case 'player_editor':
        this.texture = game.player_editor_texture;
        break;
    }
  }
}
