Button[] level_button = new Button[30];
Icon[] icon = new Icon[7];

class Menu
{
  int buttonRows;
  boolean isOn;
  int selectedX, selectedY;
  Menu()
  {
    isOn = false;
    buttonRows = 3;
  }
  
  void init()
  {
    for (int i = 0; i < buttonRows; i++)
    {
      for (int j = 0; j < level_button.length/buttonRows; j++)
      {
        level_button[j + 10*i] = new Button(j*width/level_button.length*buttonRows, 15*height/16 - 40 + 25 * i, 40, 20, str(j  + 10*i), j + 10*i);
      }
    }
    for (int i = 0; i < icon.length; i++) icon[i] = new Icon(i, i*width/(icon.length)/2 + width/4, 15*height/16);
    level_manager.levelBeaten = new boolean[level_button.length];
    level_manager.read_beaten_levels();
    updateButtons();
  }
  
  void show_levels()
  {
    for (int i = 0; i < level_button.length; i++) level_button[i].show();
  }
  
  void show_editor_icons()
  {
    fill(100, 100, 100, 150);
    rect(148, 550, 300, 80, 2);
    editor_show_selected_item(selectedX, selectedY);
    for (int i = 0; i < icon.length; i++) icon[i].show();
  }
  
  void editor_show_selected_item(int x, int y)
  {
    fill(255, 100, 100, 150);
    rect(x-2, y-2, 44, 60, 2);
  }
  
  void press()
  {
    if (menu.isOn) for (int i = 0; i < level_button.length; i++) level_button[i].press();
    else if (editor.isOn && editor.showIcons) for (int i = 0; i < icon.length; i++) icon[i].press();
  }
  
  void update_selected_item()
  {
    for (int i = 0; i < icon.length; i++)
    {
      if (icon[i].type == editor.currentlyHeld)
      {
        selectedX = icon[i].x;
        selectedY = icon[i].y; 
      }
    }
  }
  
  void updateButtons()
  {
    for (int i = 0; i < level_button.length; i++)
    {
      if (level_manager.levelBeaten[i]) level_button[i].isLevelBeaten = true;
      else level_button[i].isLevelBeaten = false;
    }
  }
  
  void show_hints()
  {
    if (level_manager.currentLevel == 1 && !level_manager.levelBeaten[level_manager.currentLevel-1])
    {
      game.new_text("Use arrow keys to move.", 32, width/2, height/32, color(255), CENTER);
    }
    else if (level_manager.currentLevel == 2 && !level_manager.levelBeaten[level_manager.currentLevel-1])
    {
      game.new_text("Press 'R' to restart.", 16, width/2, height/32, color(255), CENTER);
    }
    else if (level_manager.currentLevel == 3 && !level_manager.levelBeaten[level_manager.currentLevel-1])
    {
      game.new_text("Use 'L' to open level select, or \nuse 'B' and 'N' to move through the levels.", 24, width/2, 2*height/32, color(255), CENTER);
    }
    else if (level_manager.currentLevel == 4 && !level_manager.levelBeaten[level_manager.currentLevel-1])
    {
      game.new_text("Throw boxes down the void to make platforms.", 24, width/2, height/32, color(255), CENTER);
    }
  }
}
