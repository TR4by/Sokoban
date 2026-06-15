class Level_manager
{
  int currentLevel, levelCount;
  boolean[] levelBeaten;
  
  Level_manager()
  {
    currentLevel = 1;
    levelCount = 31;
  }
  
  String get_level_name(int num)
  {
    return "map" + num + ".txt";
  }
  
  boolean is_level_valid(int levelNumber)
  {
    if (levelNumber > -1 && levelNumber < levelCount) return true;
    else return false;
  }
  
  void reset_level()
  {
    level.load(currentLevel);
    level.show();
  }
  
  void next_level(int dir)
  {
    int nextLevel = currentLevel;
    if (dir == 1) nextLevel++;
    else if (dir == -1) nextLevel--;
    if (is_level_valid(nextLevel) && !editor.isOn)
    {
      currentLevel = nextLevel;
      reset_level();
    }
  }
  
  void select_level(int num)
  {
    int nextLevel = num;
    menu.isOn = false;
    if (is_level_valid(nextLevel))
    {
      currentLevel = nextLevel;
      reset_level();
    }
  }
  
  void read_beaten_levels()
  {
    String[] saveData = loadStrings("save.txt");
    for (int i = 0; i < levelCount-1; i++)
    {
      switch(saveData[0].charAt(i))
      {
        case '0':
          levelBeaten[i] = false;
          break;
        case '1':
          levelBeaten[i] = true;
          break;
      }
    }
  }
  
  void save_beaten_levels()
  {
    String beatenString = "";
    String[] beatenList = new String[1];
    for (int i = 0; i < levelCount-1; i++)
    {
      if (levelBeaten[i]) beatenString += 1;
      else beatenString += 0;
    }
    beatenList[0] = beatenString;
    saveStrings("save.txt", beatenList);
  }
  
  void reset_progress()
  {
    for (int i = 0; i < levelBeaten.length; i++)
    {
      levelBeaten[i] = false;
    }
    save_beaten_levels();
    menu.updateButtons();
  }
    
}
