class Button
{
  int x, y, xSize, ySize, id;
  boolean isLevelBeaten;
  
  Button(int setX, int setY, int setXSize, int setYSize, String text, int setId)
  {
    x = setX;
    y = setY;
    xSize = setXSize;
    ySize = setYSize;
    id = setId + 1;
    isLevelBeaten = false;
  }
  
  void show()
  {
    if (mouseX > x + 10 && mouseX < x + xSize + 10 && mouseY > y && mouseY < y + ySize) fill(230, 230, 230);
    else if (level_manager.currentLevel == id && isLevelBeaten) fill(255, 255, 50);
    else if (isLevelBeaten) fill(200, 200, 100);
    else if (level_manager.currentLevel == id) fill(230, 100, 125);
    else fill(180);
    rect(x + 10, y, xSize, ySize, 6);
    game.new_text(str(id), 16, x + 30, y + 8, color(80, 80, 80), CENTER);
  }
  
  void press()
  {
    if (mouseX > x + 10 && mouseX < x + xSize + 10 && mouseY > y && mouseY < y + ySize)
    {
      if (id > 0) level_manager.select_level(id);
      else if (id == 0) editor.toggle();
    }
  }
}
