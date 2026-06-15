Object[][] object = new Object[15][15];
Object playerGround;

class Level
{
  int playerPos[] = new int[2];
  int nextPlayerPos[] = new int[2];
  int goalCount;
  boolean won;
  Object currentObj, nextObj, nextNextObj;
  
  void load(int num)
  {
    String levelName = level_manager.get_level_name(num);
    String[] mapData = loadStrings(levelName);
    String type = "air";
    goalCount = 0;
    won = false;
    
    for (int y = 0; y < object.length; y++)
    {
      for (int x = 0; x < object.length; x++)
      {
        switch(mapData[y].charAt(x))
        {
          case '0':
            type = "air";
            break;
          case '1':
            type = "wall";
            break;
          case 'O':
            type = "floor";
            break;
          case 'B':
            type = "crate";
            break;
          case 'X':
            type = "crate_spot";
            goalCount++;
            break;
          case 'V':
            type = "lit_crate";
            goalCount++;
            break;
          case 'D':
            type = "dark_crate";
            break;
          case '@':
            type = "player";
            playerPos[0] = x; playerPos[1] = y;
            break;
        }
        object[x][y] = new Object(type);
        if (object[x][y].type == "player")
        {
          playerGround = new Object("floor");
          object[x][y].texture = game.player_down_texture;
        }
      }
    }
  }
  
  void show()
  {
    playerGround.show(playerPos[0], playerPos[1]);
    for (int y = 0; y < object.length; y++)
    {
      for (int x = 0; x < object.length; x++)
      {
        object[x][y].show(x, y);
      }
    }
    menu.show_hints();
    if (won)
    {
      if (level_manager.currentLevel == 30)
      game.new_text("Last level complete!\nPress 'L' to open level select.",  32, width/2, 14*height/16, color(255, 255, 100), CENTER);
      else
      game.new_text("Level complete!\nPress enter to continue.", 32, width/2, 14*height/16, color(255, 255, 100), CENTER);
    }
  }
  
  void rotate_player(int x, int y)
  {
    if (x == 1)
    {
      nextObj.texture = game.player_right_texture;
    }
    else if (x == -1)
    {
      nextObj.texture = game.player_left_texture;
    }
    else if (y == -1)
    {
      nextObj.texture = game.player_up_texture;
    }
    else if (y == 1)
    {
      nextObj.texture = game.player_down_texture;
    }
  }
  
  void get_move_objects(int x, int y)
  {
    currentObj = object[ playerPos[0] ][ playerPos[1] ];
    if (playerPos[0] + x > object.length-1 || playerPos[0] + x < 0 || playerPos[1] + y > object.length-1 || playerPos[1] + y < 0)
    {
      nextObj = currentObj;
    }
    else
    {
      nextObj = object[ playerPos[0] + x ][ playerPos[1] + y ];
    }
    if (playerPos[0] + x*2 > object.length-1 || playerPos[0] + x*2 < 0 || playerPos[1] + y*2 > object.length-1 || playerPos[1] + y*2 < 0)
    {
      nextNextObj = currentObj;
    }
    else
    {
      nextNextObj = object[ playerPos[0] + 2*x ][ playerPos[1] + 2*y ];
    }
  }
  
  void update_player(int x, int y)
  {
    currentObj.set_type(currentObj.standingOn);
    if (nextObj.type == "crate_spot" || nextObj.type == "lit_crate")
    {
      nextObj.standingOn = "crate_spot";
    }
    else if (nextObj.type == "dark_crate")
    {
      nextObj.standingOn = "dark_crate";
    }
    else if (nextObj.type == "crate")
    {
      currentObj.standingOn = nextObj.standingOn;
    }
    else
    {
      nextObj.standingOn = "floor";
    }
    playerGround.set_type(nextObj.standingOn); 
    nextObj.set_type("player");
    rotate_player(x, y);
    playerPos[0] += x; playerPos[1] += y;
  }
  
  void player_move(int x, int y)
  {
    get_move_objects(x, y);
    
    //Pushing crates:
    if (nextObj.canPush && nextNextObj.canStand || nextObj.canPush && nextNextObj.type == "air")
    {
      if (nextNextObj.type == "floor") //If there is nothing behind the crate
      {
        nextNextObj.set_type("crate");
        nextNextObj.standingOn = "floor";
      } 
      else if (nextNextObj.type == "crate_spot") //If there's a crate spot behind the crate
      {
        nextNextObj.set_type("lit_crate");
        nextNextObj.standingOn = "crate_spot";
      }
      else if (nextNextObj.type == "air")
      {
        nextNextObj.set_type("dark_crate");
        nextNextObj.standingOn = "dark_crate";
      }
      else if (nextNextObj.type == "dark_crate")
      {
        nextNextObj.set_type("crate");
        nextNextObj.standingOn = "dark_crate";
      }
      update_player(x, y);
      is_level_complete();
    }
    
    
    //Moving:
    else if(nextObj.canStand)
    {
      update_player(x, y);
    }
    show();
  }
  
  void is_level_complete()
  {
    int count = 0;
    for (int y = 0; y < object.length; y++)
    {
      for (int x = 0; x < object.length; x++)
      {
        if (object[x][y].type == "lit_crate")  
        {
          count++;
        }
      }
    }
    if (count == goalCount)
    {
      level_won();
    }
  }
  void level_won()
  {
    won = true;
    if (level_manager.currentLevel != 0)
    {
      level_manager.levelBeaten[level_manager.currentLevel-1] = true;
      level_manager.save_beaten_levels();
      menu.isOn = false;
      menu.updateButtons();
    }
  }
}
