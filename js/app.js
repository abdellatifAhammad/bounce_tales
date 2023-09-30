const engine = Matter.Engine.create()
const cw = document.body.clientWidth
const ch = document.body.clientHeight
var isPressed = false

const render = Matter.Render.create({
  element: document.querySelector('#gameCanvas'),
  engine: engine,
  options: {
    width: cw,
    height: ch,
    wireframes: false,
    background: 'transparent'
  }
})

Matter.World.add(engine.world, [
  Matter.Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
  Matter.Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
  Matter.Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
  Matter.Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
])

Matter.Engine.run(engine)
Matter.Render.run(render)


document.body.addEventListener('mousedown', e => {
  isPressed = true
})
document.body.addEventListener('mouseup', e => {
  isPressed = false
})
document.body.addEventListener('mousemove', e => {
  if(isPressed){
    const ball = Matter.Bodies.circle(
      e.clientX,
      e.clientY,
      10 + Math.random() * 30,
      {
        mass: 10,
        restitution: 0.9,
        friction: 0.005,
        render: {
          fillStyle: '#0000ff'
        }
      })
    Matter.World.add(engine.world, [ball])
  }
})
