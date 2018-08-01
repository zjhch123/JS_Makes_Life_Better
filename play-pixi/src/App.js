import '@css/base.css';
import './assets/images/treasureHunter.png';
import * as PIXI from 'pixi.js';

// 这是为了更新html之后页面能自动刷新而写的。不要删
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}

function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function hitTestRectangle(r1, r2) {
  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

function contain(sprite, container) {
  let collision;

  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }

  //Return the `collision` value
  return collision;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Rectangle = PIXI.Rectangle

let app = new Application({width: 512, height: 512})
document.body.appendChild(app.view)

loader.add(require("./assets/images/treasureHunter.json")).load(setup)

let explorer
let treasure
let blobs = []
let door
let healthBar
let message

let state = null
const gameScene = new PIXI.Container()
const gameOverScene = new PIXI.Container()

function setup() {
  gameOverScene.visible = false
  app.stage.addChild(gameScene)
  app.stage.addChild(gameOverScene)

  let id = resources[require("./assets/images/treasureHunter.json")].textures
  let dungeon = new Sprite(id["dungeon.png"])
  gameScene.addChild(dungeon)

  door = new Sprite(id["door.png"])
  door.position.set(32, 0)
  gameScene.addChild(door)

  explorer = new Sprite(id["explorer.png"])
  explorer.position.set(0, 10)
  explorer.vx = 0
  explorer.vy = 0
  gameScene.addChild(explorer)

  treasure = new Sprite(id["treasure.png"])
  treasure.position.set(gameScene.width - treasure.width - 48, app.stage.height / 2 - treasure.height / 2)
  gameScene.addChild(treasure)

  let blobNum = 10
  let spacing = 48
  let xOffset = 8
  let speed = 6
  let direction = 1

  for (let i = 0; i < blobNum; i++) {
    let blob = new Sprite(id["blob.png"])
    let x = spacing * i + xOffset
    let y = randomInt(60, app.stage.height - blob.height - 40)

    blob.x = x + 50
    blob.y = y

    blob.vy = speed * direction * randomInt(80, 100) / 100
    direction *= -1
    blobs.push(blob)

    gameScene.addChild(blob)
  }

  bindkey()

  healthBar = new PIXI.Container()
  healthBar.position.set(app.stage.width - 170, 4)
  gameScene.addChild(healthBar)

  let innerBar = new PIXI.Graphics()
  innerBar.beginFill(0x000000)
  innerBar.drawRect(0, 0, 128, 8)
  innerBar.endFill()
  healthBar.addChild(innerBar)

  let outerBar = new PIXI.Graphics()
  outerBar.beginFill(0xFF3300)
  outerBar.drawRect(0, 0, 128, 8)
  outerBar.endFill()
  healthBar.addChild(outerBar)

  healthBar.outer = outerBar

  let style = new PIXI.TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: 'white'
  })

  message = new PIXI.Text("The End!", style)
  message.x = 120
  message.y = app.stage.height / 2 - 32
  gameOverScene.addChild(message)

  state = play
  app.ticker.add(delta => gameLoop(delta))
}

function bindkey() {
  let left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40)
  
  left.press = () => {
    explorer.vx = -2;
    explorer.vy = 0;
  };
  left.release = () => {
    if (!right.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  up.press = () => {
    explorer.vy = -2;
    explorer.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  right.press = () => {
    explorer.vx = 2;
    explorer.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  //Down
  down.press = () => {
    explorer.vy = 2;
    explorer.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };
}

function gameLoop(delta) {
  state(delta)
}

function play(delta) {
  let explorerHit = false
  explorer.x += explorer.vx
  explorer.y += explorer.vy
  contain(explorer, {x: 28, y: 10, width: 488, height: 480});
  blobs.forEach(blob => {
    blob.y += blob.vy
    let blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 480});
    if (blobHitsWall === "top" || blobHitsWall === "bottom") {
      blob.vy *= -1;
    }
    if (hitTestRectangle(explorer, blob)) {
      explorerHit = true;
    }
  })
  if (explorerHit) {
    explorer.alpha = 0.5
    healthBar.outer.width -= 2
  } else {
    explorer.alpha = 1
  }
  if (hitTestRectangle(explorer, treasure)) {
    treasure.x = explorer.x + 8;
    treasure.y = explorer.y + 8;
  }
  if (hitTestRectangle(treasure, door)) {
    state = end;
    message.text = "You won!";
  }
  if (healthBar.outer.width < 0) {
    state = end;
    message.text = "You lost!";
  }
}

function end(delay) {
  gameScene.visible = false
  gameOverScene.visible = true
}