let level_button = new Array(30);
let icon = new Array(9);

class Menu {
  constructor() {
    this.isOn = false;
    this.buttonRows = 3;
    this.selectedX = 0;
    this.selectedY = 0;
  }

  init() {
    for (let i = 0; i < this.buttonRows; i++) {
      for (let j = 0; j < level_button.length / this.buttonRows; j++) {
        level_button[j + 10 * i] = new Button(
          j * width / level_button.length * this.buttonRows,
          15 * height / 16 - 40 + 25 * i,
          40, 20,
          String(j + 10 * i),
          j + 10 * i
        );
      }
    }
    for (let i = 0; i < 7; i++) {
      icon[i] = new Icon(i, i * width / 7 / 2 + width / 4, 15 * height / 16);
    }
    icon[7] = new Icon(7, 455, 15 * height / 16);
    icon[8] = new Icon(8, 498, 15 * height / 16);
    level_manager.levelBeaten = new Array(level_button.length).fill(false);
    level_manager.read_beaten_levels();
    this.updateButtons();
  }

  show_levels() {
    for (let i = 0; i < level_button.length; i++) level_button[i].show();
  }

  show_editor_icons() {
    fill(100, 100, 100, 150);
    rect(148, 550, 400, 80, 2);
    this.editor_show_selected_item(this.selectedX, this.selectedY);
    for (let i = 0; i < icon.length; i++) icon[i].show();
  }

  editor_show_selected_item(x, y) {
    fill(255, 100, 100, 150);
    rect(x - 2, y - 2, 44, 60, 2);
  }

  press() {
    if (menu.isOn) {
      for (let i = 0; i < level_button.length; i++) level_button[i].press();
    } else if (editor.isOn && editor.showIcons) {
      for (let i = 0; i < icon.length; i++) icon[i].press();
    }
  }

  update_selected_item() {
    for (let i = 0; i < icon.length; i++) {
      if (icon[i].type === editor.currentlyHeld) {
        this.selectedX = icon[i].x;
        this.selectedY = icon[i].y;
      }
    }
  }

  updateButtons() {
    for (let i = 0; i < level_button.length; i++) {
      level_button[i].isLevelBeaten = level_manager.levelBeaten[i];
    }
  }

  show_hints() {
    if (level_manager.currentLevel === 1 && !level_manager.levelBeaten[level_manager.currentLevel - 1]) {
      game.new_text('Use arrow keys to move.', 32, width / 2, height / 32, color(255), CENTER);
    } else if (level_manager.currentLevel === 2 && !level_manager.levelBeaten[level_manager.currentLevel - 1]) {
      game.new_text("Press 'R' to restart.", 16, width / 2, height / 32, color(255), CENTER);
    } else if (level_manager.currentLevel === 3 && !level_manager.levelBeaten[level_manager.currentLevel - 1]) {
      game.new_text("Use 'L' to open level select, or \nuse 'B' and 'N' to move through the levels.", 24, width / 2, 2 * height / 32, color(255), CENTER);
    } else if (level_manager.currentLevel === 4 && !level_manager.levelBeaten[level_manager.currentLevel - 1]) {
      game.new_text('Throw boxes down the void to make platforms.', 24, width / 2, height / 32, color(255), CENTER);
    }
  }
}
