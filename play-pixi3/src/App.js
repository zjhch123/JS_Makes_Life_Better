import '@css/base.css';
import '@css/style.scss';
import '@assets/images/marisa.png';
import * as PIXI from 'pixi.js';
// 这是为了更新html之后页面能自动刷新而写的。不要删
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}
// 如果需要的话可以开启模块热替换, 开启之后html页面不会自动刷新
// if (module.hot) {
//   module.hot.accept()
// }

// 从这里开始写正式代码

let app = new PIXI.Application({width: 512, height: 512})
document.body.appendChild(app.view)
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
PIXI.loader.add([
  require('./assets/images/marisa.json')
]).load(setup)

let marisa = new PIXI.Container()
let objects = []

function contain(sprite, container) {

  let collision = undefined;

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

let left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40),
      z = keyboard(90)

const Status = {
  'Stand': Symbol(),
  'Move': Symbol(),
}

const Direction = {
  'Up': Symbol(),
  'Down': Symbol(),
  'Left': Symbol(),
  'Right': Symbol(),
}

function setup() {
  const id = PIXI.loader.resources[require('./assets/images/marisa.json')].textures
  marisa.status = Status.Stand
  marisa.direction = Direction.Down
  marisa.vx = 0
  marisa.vy = 0

  const moveDownFrames = [PIXI.Texture.fromFrame('movedown1.png'), PIXI.Texture.fromFrame('movedown2.png')]
  const moveDownAnim = new PIXI.extras.AnimatedSprite(moveDownFrames)
  const moveUpFrames = [PIXI.Texture.fromFrame('moveup1.png'), PIXI.Texture.fromFrame('moveup2.png')]
  const moveUpAnim = new PIXI.extras.AnimatedSprite(moveUpFrames)
  const moveLeftFrames = [PIXI.Texture.fromFrame('moveleft1.png'), PIXI.Texture.fromFrame('moveleft2.png')]
  const moveLeftAnim = new PIXI.extras.AnimatedSprite(moveLeftFrames)
  const moveRightFrames = [PIXI.Texture.fromFrame('moveright1.png'), PIXI.Texture.fromFrame('moveright2.png')]
  const moveRightAnim = new PIXI.extras.AnimatedSprite(moveRightFrames)

  moveDownAnim.animationSpeed = 0.08
  moveUpAnim.animationSpeed = 0.08
  moveLeftAnim.animationSpeed = 0.08
  moveRightAnim.animationSpeed = 0.08

  const standDown = new PIXI.Sprite(id['standdown.png'])
  const standUp = new PIXI.Sprite(id['standup.png'])
  const standLeft = new PIXI.Sprite(id['standleft.png'])
  const standRight = new PIXI.Sprite(id['standright.png'])


  marisa['standdown'] = standDown
  marisa['standup'] = standUp
  marisa['standleft'] = standLeft
  marisa['standright'] = standRight

  marisa['movedown'] = moveDownAnim
  marisa['moveup'] = moveUpAnim
  marisa['moveleft'] = moveLeftAnim
  marisa['moveright'] = moveRightAnim

  marisa.addChild(standDown)
  marisa.addChild(standUp)
  marisa.addChild(standLeft)
  marisa.addChild(standRight)
  marisa.addChild(moveDownAnim)
  marisa.addChild(moveUpAnim)
  marisa.addChild(moveLeftAnim)
  marisa.addChild(moveRightAnim)

  marisa.children.forEach(child => child.visible = false)

  app.stage.addChild(marisa)
  marisa.x = 240
  marisa.scale.x = 1.3
  marisa.scale.y = 1.3
  app.ticker.add(delta => gameLoop(delta))
}

function bind() {
  left.press = () => {
    marisa.vx = -2;
    marisa.vy = 0;
    marisa.status = Status.Move
    marisa.direction = Direction.Left
  };

  left.release = () => {
    if (!right.isDown && marisa.vy === 0) {
      marisa.vx = 0;
      marisa.status = Status.Stand
    }
  };

  up.press = () => {
    marisa.vy = -2;
    marisa.vx = 0;
    marisa.status = Status.Move
    marisa.direction = Direction.Up
  };
  up.release = () => {
    if (!down.isDown && marisa.vx === 0) {
      marisa.vy = 0;
      marisa.status = Status.Stand
    }
  };

  right.press = () => {
    marisa.vx = 2;
    marisa.vy = 0;
    marisa.status = Status.Move
    marisa.direction = Direction.Right
  };
  right.release = () => {
    if (!left.isDown && marisa.vy === 0) {
      marisa.vx = 0;
      marisa.status = Status.Stand
    }
  };

  down.press = () => {
    marisa.vy = 2;
    marisa.vx = 0;
    marisa.status = Status.Move
    marisa.direction = Direction.Down
  };
  down.release = () => {
    if (!up.isDown && marisa.vx === 0) {
      marisa.vy = 0;
      marisa.status = Status.Stand
    }
  };

  z.press = () => {
    const boom = new PIXI.Graphics()
    boom.beginFill(0xffffff)
    boom.drawCircle(0, 0, 3)
    boom.endFill()
    boom.x = marisa.x
    boom.y = marisa.y + marisa.height * 0.7
    boom.vx = 0
    boom.vy = 0
    switch (marisa.direction) {
      case Direction.Up:
      boom.vy = -4
      break
      case Direction.Down:
      boom.vy = 4
      break
      case Direction.Left:
      boom.vx = -4
      break
      case Direction.Right:
      boom.vx = 4
      break
    }
    objects.push(boom)
    app.stage.addChild(boom)
  }
}

function gameLoop() {
  marisa.x += marisa.vx
  marisa.y += marisa.vy
  let status = ''
  switch (marisa.status) {
    case Status.Move:
      status += 'move'
      break
    case Status.Stand:
      status += 'stand'
  }
  switch (marisa.direction) {
    case Direction.Left:
      status += 'left'
      break
    case Direction.Right:
      status += 'right'
      break
    case Direction.Up:
      status += 'up'
      break
    case Direction.Down:
      status += 'down'
      break
  }
  marisa.children.forEach(child => child.visible = false)
  marisa[status].visible = true
  if (marisa.status === Status.Move) {
    marisa[status].play()
  }
  objects = objects.filter(obj => {
    obj.x += obj.vx
    obj.y += obj.vy
    if (obj.x > 512 || obj.y > 512 || obj.x <= 0 || obj.y <= 0) {
      app.stage.removeChild(obj)
      obj = null
      return false
    }
    return true
  })
}


bind()