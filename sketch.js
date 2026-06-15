let level;
let editor;
let menu;
let level_manager;
let game;

function preload() {
  game = new AssetManager();
  game.load_textures();
  game.load_maps();
}

function setup() {
  let cnv = createCanvas(600, 600);
  cnv.elt.addEventListener('contextmenu', e => e.preventDefault());
  noSmooth();
  level_manager = new LevelManager();
  level = new Level();
  editor = new Editor();
  menu = new Menu();
  let savedEditorMap = localStorage.getItem('sokoban_editor_map');
  if (savedEditorMap) game.maps[0] = savedEditorMap.split('\n');
  menu.init();
  level.load(level_manager.currentLevel);
  noStroke();
}

function draw() {
  if (editor.isOn) editor.show();
  else if (menu.isOn) menu.show_levels();
  else level.show();
}

function keyPressed() {
  let k = key.toLowerCase();

  if (!level.won && !editor.isOn) {
    switch (keyCode) {
      case UP_ARROW: level.player_move(0, -1); break;
      case DOWN_ARROW: level.player_move(0, 1); break;
      case LEFT_ARROW: level.player_move(-1, 0); break;
      case RIGHT_ARROW: level.player_move(1, 0); break;
    }
  }

  if (keyCode === ENTER && level.won) level_manager.next_level(1);

  switch (k) {
    case 'r': level_manager.reset_level(); break;
    case 'n': level_manager.next_level(1); break;
    case 'b': level_manager.next_level(-1); break;
    case 'e': editor.toggle(); break;
    case 'l': if (!editor.isOn) menu.isOn = !menu.isOn; break;
    case ']': level_manager.reset_progress(); break;
    case 'w': level.level_won(); break;
  }

  if (editor.isOn) {
    switch (k) {
      case '1': editor.currentlyHeld = 'wall'; break;
      case '2': editor.currentlyHeld = 'floor'; break;
      case '3': editor.currentlyHeld = 'crate_spot'; break;
      case '4': editor.currentlyHeld = 'crate'; break;
      case '5': editor.currentlyHeld = 'lit_crate'; break;
      case '6': editor.currentlyHeld = 'dark_crate'; break;
      case '7': editor.currentlyHeld = 'player_editor'; break;
      case 'r': editor.clear_level(); break;
      case 'h': editor.showIcons = !editor.showIcons; break;
    }
    editor.update_held_item();
  }

  // Prevent arrow keys from scrolling the page
  return false;
}

function mouseDragged() {
  if (editor.isOn) {
    if (mouseButton === 'left') editor.replace(0);
    else if (mouseButton === 'right') editor.replace(1);
  }
}

function mousePressed() {
  if (!editor.isOn && mouseButton === 'left') {
    menu.press();
  } else if (editor.isOn) {
    if (mouseButton === 'left') {
      menu.press();
      editor.replace(0);
      editor.update_held_item();
    } else if (mouseButton === 'right') {
      editor.replace(1);
    }
  }
}
