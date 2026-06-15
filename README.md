# Sokoban

[Play it right now!](https://tr4by.github.io/Sokoban/)

A classic Sokoban puzzle game ported to [p5.js](https://p5js.org/). Originally built in Processing 3 as a first-year university project.

The player's goal is to push every crate onto its marked spot. Uniquely, in this version, crates can be shoved into the void to create platforms the player can walk across.

The game has 30 hand-crafted levels of increasing difficulty, a level select menu with progress tracking, and a fully functional in-game level editor.

## Screenshots

![Void mechanic](Screenshots/Void_Screenshot.png)

*Crates pushed into the void become walkable platforms*

![Level editor](Screenshots/Editor_Screenshot.png)

*In-game level editor*

## Running online
You can play it right now by clicking the link below:

https://tr4by.github.io/Sokoban/

## How to Run Locally

Start a local static server in this directory:
```bash
# Using Node.js
npx serve .

# Or using Python
python -m http.server
```
Then open the server's URL in your web browser. 

## Controls

### Game

- **Arrow keys** - Move
- `R` - Restart level
- `N` - Next level
- `B` - Previous level
- `L` - Open level select
- `E` - Open level editor
- `Enter` - Continue to next level (after completing one)
- `]` - Reset all progress

### Level Editor

- `1` through `7` - Select tile from toolbar
- `R` - Clear the canvas
- `E` - Exit editor (saves automatically to local storage)
- `H` - Toggle toolbar visibility
- `Left click` - Place selected tile
- `Right click` - Erase tile
- **Save icon** - Download level as `map0.txt`
- **Load icon** - Import a `map0.txt` file

## Game Objects

- `0` - Void
- `O` - Floor
- `1` - Wall
- `B` - Crate
- `V` - Crate on spot (placed correctly)
- `X` - Crate spot
- `D` - Crate in void (acts as a platform)
- `@` - Player

## Level Format

Levels are plain text files (`map1.txt` through `map30.txt`) stored in the `data/` folder. Each file is a 15x15 grid of the symbols above. `map0.txt` is the level editor's working file. Progress is saved in the browser's `localStorage`.

## Credits

Development: Tomasz Raby  
Textures: Nymphaeale

Built with [p5.js](https://p5js.org/).
