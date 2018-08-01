import '@css/base.css';
import * as PIXI from 'pixi.js';

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

const Application = PIXI.Application
const Sprite = PIXI.Sprite
const loader = PIXI.loader
const resources = PIXI.loader.resources

const app = new Application({width: 256, height: 256})

document.body.appendChild(app.view)

loader.add([
  './assets/images/animals.json',
]).load(setup)

let cat = null,
    hedgehog = null,
    tiger = null,
    animals = null,
    state = null,
    rectangle = null

function setup() {
  let id = resources['./assets/images/animals.json'].textures
  cat = new Sprite(id['cat.png'])
  cat.position.set(0, 0)
  // hedgehog = new Sprite(id['hedgehog.png'])
  // hedgehog.position.set(32, 32)
  // tiger = new Sprite(id['tiger.png'])
  // tiger.position.set(64, 64)

  animals = new PIXI.Container()
  animals.addChild(cat)
  // animals.addChild(hedgehog)
  // animals.addChild(tiger)

  animals.vx = 0
  animals.vy = 0

  app.stage.addChild(animals)
  bindkey()

  rectangle = new PIXI.Graphics()
  rectangle.lineStyle(2, 0xf69c9f, 1)
  rectangle.beginFill(0x00ff00)
  rectangle.drawRect(0, 0, 80, 80)
  rectangle.endFill()


  rectangle.x = 160
  rectangle.y = 80

  app.stage.addChild(rectangle)

  state = play
  app.ticker.add(delta => gameLoop(delta))
}

function bindkey() {
  let left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40)
  
  left.press = () => {
    animals.vx = -5;
    animals.vy = 0;
  };
  left.release = () => {
    if (!right.isDown && animals.vy === 0) {
      animals.vx = 0;
    }
  };

  up.press = () => {
    animals.vy = -5;
    animals.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && animals.vx === 0) {
      animals.vy = 0;
    }
  };

  right.press = () => {
    animals.vx = 5;
    animals.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && animals.vy === 0) {
      animals.vx = 0;
    }
  };

  //Down
  down.press = () => {
    animals.vy = 5;
    animals.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && animals.vx === 0) {
      animals.vy = 0;
    }
  };
}

function gameLoop(delta) {
  state(delta)
}

function play(delta) {
  animals.x += animals.vx
  animals.y += animals.vy
  if (hitTestRectangle(animals, rectangle)) {
    rectangle.tint = 0xff0000
  } else {
    rectangle.tint = 0xffffff
  }
}