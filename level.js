let object = [];
let playerGround;

class Level {
  constructor() {
    this.playerPos = [0, 0];
    this.goalCount = 0;
    this.won = false;
    this.currentObj = null;
    this.nextObj = null;
    this.nextNextObj = null;
  }

  load(num) {
    let mapData = game.maps[num];
    let type = 'air';
    this.goalCount = 0;
    this.won = false;

    for (let y = 0; y < 15; y++) {
      object[y] = [];
      for (let x = 0; x < 15; x++) {
        switch (mapData[y].charAt(x)) {
          case '0': type = 'air'; break;
          case '1': type = 'wall'; break;
          case 'O': type = 'floor'; break;
          case 'B': type = 'crate'; break;
          case 'X': type = 'crate_spot'; this.goalCount++; break;
          case 'V': type = 'lit_crate'; this.goalCount++; break;
          case 'D': type = 'dark_crate'; break;
          case '@': type = 'player'; this.playerPos[0] = x; this.playerPos[1] = y; break;
        }
        object[y][x] = new Tile(type);
        if (object[y][x].type === 'player') {
          playerGround = new Tile('floor');
          object[y][x].texture = game.player_down_texture;
        }
      }
    }
  }

  show() {
    playerGround.show(this.playerPos[0], this.playerPos[1]);
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 15; x++) {
        object[y][x].show(x, y);
      }
    }
    menu.show_hints();
    if (this.won) {
      if (level_manager.currentLevel === 30) {
        game.new_text("Last level complete!\nPress 'L' to open level select.", 32, width / 2, 14 * height / 16, color(255, 255, 100), CENTER);
      } else {
        game.new_text('Level complete!\nPress enter to continue.', 32, width / 2, 14 * height / 16, color(255, 255, 100), CENTER);
      }
    }
  }

  rotate_player(x, y) {
    if (x === 1) this.nextObj.texture = game.player_right_texture;
    else if (x === -1) this.nextObj.texture = game.player_left_texture;
    else if (y === -1) this.nextObj.texture = game.player_up_texture;
    else if (y === 1) this.nextObj.texture = game.player_down_texture;
  }

  get_move_objects(x, y) {
    let px = this.playerPos[0];
    let py = this.playerPos[1];
    this.currentObj = object[py][px];

    this.nextObj = (px + x < 0 || px + x > 14 || py + y < 0 || py + y > 14)
      ? this.currentObj
      : object[py + y][px + x];

    this.nextNextObj = (px + x * 2 < 0 || px + x * 2 > 14 || py + y * 2 < 0 || py + y * 2 > 14)
      ? this.currentObj
      : object[py + y * 2][px + x * 2];
  }

  update_player(x, y) {
    this.currentObj.set_type(this.currentObj.standingOn);
    if (this.nextObj.type === 'crate_spot' || this.nextObj.type === 'lit_crate') {
      this.nextObj.standingOn = 'crate_spot';
    } else if (this.nextObj.type === 'dark_crate') {
      this.nextObj.standingOn = 'dark_crate';
    } else if (this.nextObj.type === 'crate') {
      this.currentObj.standingOn = this.nextObj.standingOn;
    } else {
      this.nextObj.standingOn = 'floor';
    }
    playerGround.set_type(this.nextObj.standingOn);
    this.nextObj.set_type('player');
    this.rotate_player(x, y);
    this.playerPos[0] += x;
    this.playerPos[1] += y;
  }

  player_move(x, y) {
    this.get_move_objects(x, y);

    if ((this.nextObj.canPush && this.nextNextObj.canStand) || (this.nextObj.canPush && this.nextNextObj.type === 'air')) {
      if (this.nextNextObj.type === 'floor') {
        this.nextNextObj.set_type('crate');
        this.nextNextObj.standingOn = 'floor';
      } else if (this.nextNextObj.type === 'crate_spot') {
        this.nextNextObj.set_type('lit_crate');
        this.nextNextObj.standingOn = 'crate_spot';
      } else if (this.nextNextObj.type === 'air') {
        this.nextNextObj.set_type('dark_crate');
        this.nextNextObj.standingOn = 'dark_crate';
      } else if (this.nextNextObj.type === 'dark_crate') {
        this.nextNextObj.set_type('crate');
        this.nextNextObj.standingOn = 'dark_crate';
      }
      this.update_player(x, y);
      this.is_level_complete();
    } else if (this.nextObj.canStand) {
      this.update_player(x, y);
    }

    this.show();
  }

  is_level_complete() {
    let count = 0;
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 15; x++) {
        if (object[y][x].type === 'lit_crate') count++;
      }
    }
    if (count === this.goalCount) this.level_won();
  }

  level_won() {
    this.won = true;
    if (level_manager.currentLevel !== 0) {
      level_manager.levelBeaten[level_manager.currentLevel - 1] = true;
      level_manager.save_beaten_levels();
      menu.isOn = false;
      menu.updateButtons();
    }
  }
}
