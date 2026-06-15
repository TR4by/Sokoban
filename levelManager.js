class LevelManager {
  constructor() {
    this.currentLevel = 1;
    this.levelCount = 31;
    this.levelBeaten = new Array(30).fill(false);
  }

  is_level_valid(levelNumber) {
    return levelNumber > -1 && levelNumber < this.levelCount;
  }

  reset_level() {
    level.load(this.currentLevel);
    level.show();
  }

  next_level(dir) {
    let nextLevel = this.currentLevel + dir;
    if (this.is_level_valid(nextLevel) && !editor.isOn) {
      this.currentLevel = nextLevel;
      this.reset_level();
    }
  }

  select_level(num) {
    menu.isOn = false;
    if (this.is_level_valid(num)) {
      this.currentLevel = num;
      this.reset_level();
    }
  }

  read_beaten_levels() {
    let saveData = localStorage.getItem('sokoban_save');
    if (!saveData) return;
    for (let i = 0; i < this.levelCount - 1; i++) {
      this.levelBeaten[i] = saveData.charAt(i) === '1';
    }
  }

  save_beaten_levels() {
    let beatenString = '';
    for (let i = 0; i < this.levelCount - 1; i++) {
      beatenString += this.levelBeaten[i] ? '1' : '0';
    }
    localStorage.setItem('sokoban_save', beatenString);
  }

  reset_progress() {
    this.levelBeaten.fill(false);
    this.save_beaten_levels();
    menu.updateButtons();
  }
}
