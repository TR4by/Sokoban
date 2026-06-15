let tile = [];
let cursor;

class Editor {
  constructor() {
    this.isOn = false;
    this.showIcons = true;
    this.currentlyHeld = 'wall';
    cursor = new Tile('wall');
    this.fileInput = this.setup_file_input();
  }

  setup_file_input() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.addEventListener('change', (e) => {
      let file = e.target.files[0];
      if (!file) return;
      let reader = new FileReader();
      reader.onload = (evt) => {
        let text = evt.target.result.replace(/\r/g, '');
        game.maps[0] = text.split('\n');
        localStorage.setItem('sokoban_editor_map', text);
        this.load_level();
      };
      reader.readAsText(file);
      input.value = '';
    });
    return input;
  }

  open_file_dialog() {
    document.querySelector('canvas').dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    this.fileInput.click();
  }

  load_level() {
    let mapData = game.maps[0];
    for (let y = 0; y < 15; y++) {
      tile[y] = [];
      for (let x = 0; x < 15; x++) {
        let type = 'air';
        switch (mapData[y].charAt(x)) {
          case '0': type = 'air'; break;
          case '1': type = 'wall'; break;
          case 'O': type = 'floor'; break;
          case 'B': type = 'crate'; break;
          case 'X': type = 'crate_spot'; break;
          case 'V': type = 'lit_crate'; break;
          case 'D': type = 'dark_crate'; break;
          case '@': type = 'player_editor'; break;
        }
        tile[y][x] = new Tile(type);
      }
    }
  }

  show() {
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 15; x++) {
        tile[y][x].show(x, y);
      }
    }
    this.showCenter();
    if (this.isMouseOverIcons()) this.show_held_item();
    game.new_text('< Edit Mode >', 16, width / 2, height / 32, color(255, 255, 100), CENTER);
    if (this.showIcons) menu.show_editor_icons();
  }

  replace(mode) {
    if (this.isOn && this.isMouseOverIcons()) {
      for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
          if (mouseX > x * 40 && mouseX < x * 40 + 40 && mouseY > y * 40 && mouseY < y * 40 + 40) {
            if (mode === 1) tile[y][x].set_type('air');
            else tile[y][x].set_type(this.currentlyHeld);
            this.show();
          }
        }
      }
    }
  }

  isMouseOverIcons() {
    return !this.showIcons || (mouseX < 148 || mouseX > 548 || mouseY < 548 || mouseY > 628);
  }




  save_level() {
    let lines = this.generate_lines();
    game.maps[0] = lines;
    localStorage.setItem('sokoban_editor_map', lines.join('\n'));
  }

  download_level() {
    document.querySelector('canvas').dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    this.save_level();
    let lines = game.maps[0];
    let blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'map0.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  generate_lines() {
    let lines = [];
    for (let y = 0; y < 15; y++) {
      let line = '';
      for (let x = 0; x < 15; x++) {
        switch (tile[y][x].type) {
          case 'air': line += '0'; break;
          case 'wall': line += '1'; break;
          case 'floor': line += 'O'; break;
          case 'crate': line += 'B'; break;
          case 'crate_spot': line += 'X'; break;
          case 'lit_crate': line += 'V'; break;
          case 'dark_crate': line += 'D'; break;
          case 'player_editor': line += '@'; break;
        }
      }
      lines.push(line);
    }
    return lines;
  }

  show_held_item() {
    fill(255, 100, 100, 150);
    rect(mouseX - 22, mouseY - 22, 44, 44, 2);
    image(cursor.texture, mouseX - 20, mouseY - 20);
  }

  update_held_item() {
    menu.update_selected_item();
    cursor.set_type(this.currentlyHeld);
  }

  clear_level() {
    if (!window.confirm('Clear the level?')) return;
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 15; x++) {
        tile[y][x].set_type('air');
      }
    }
  }

  toggle() {
    menu.isOn = false;
    this.showIcons = true;
    if (this.isOn) this.save_level();
    this.isOn = !this.isOn;
    level_manager.select_level(0);
    this.load_level();
    this.update_held_item();
  }

  showCenter() {
    stroke(255, 255, 100);
    point(width / 2, height / 2)
    strokeWeight(1);
    noStroke();
  }
}
