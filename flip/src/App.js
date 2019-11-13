import '@css/base.css';
import '@css/style.scss';
// 这是为了更新html之后页面能自动刷新而写的。不要删
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}

const flip = {
  read(className) {
    const prev = []

    document.querySelectorAll(className).forEach(element => {
      const status = element.getBoundingClientRect()
      prev.push({ ele: element, left: status.left, top: status.top })
    })

    return prev
  }
}

document.querySelector('.J_add').addEventListener('click', () => {
  // First 读取当前状态
  const prev = flip.read('.card')

  // 创建dom
  const card = document.createElement('div')
  card.classList.add('card')
  card.innerHTML = `<a href="javascript:;" class="delete">delete</a>`

  // Last 插入DOM
  const first = document.querySelector('.J_list').firstElementChild
  document.querySelector('.J_list').insertBefore(card, first)

  prev.forEach(({ ele: element, left: prevLeft, top: prevTop }) => {
    const { left, top } = element.getBoundingClientRect()

    // Invert 倒回初始状态
    element.style.transform = `translate(${prevLeft - left}px, ${prevTop - top}px)`

    setTimeout(() => {
      // Play 开启动画
      element.classList.add('active')
      element.style.transform = `translate(0, 0)`
      setTimeout(() => {
        element.classList.remove('active')
      }, 400)
    }, 0)
  })
})

function doDelete(e) {
  const deleted = e.target.parentNode

  const moved = (() => {
    const a = []
    let t = deleted
    while (t.nextElementSibling !== null) {
      const ele = t.nextElementSibling
      const pos = ele.getBoundingClientRect()
      a.push({ ele, left: pos.left, top: pos.top })
      t = t.nextElementSibling
    }
    return a
  })()

  document.querySelector('.J_list').removeChild(deleted)

  moved.forEach(({ ele, left: preLeft, top: preTop }) => {
    const { left, top } = ele.getBoundingClientRect()
    ele.style.transform = `translate(${preLeft - left}px, ${preTop - top}px)`
    setTimeout(() => {
      ele.classList.add('active')
      ele.style.transform = `translate(0, 0)`
      setTimeout(() => {
        ele.classList.remove('active')
      }, 400)
    })
  })
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    doDelete(e)
  }
})

const shuffle = (a) => {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

document.querySelector('.J_reorder').addEventListener('click', () => {
  const prev = (() => {
    const moved = {}
    document.querySelectorAll('.item').forEach(element => {
      const id = element.getAttribute('data-id')
      const { left, top } = element.getBoundingClientRect()
      moved[id] = { left, top }
    })
    return moved
  })()

  const last = shuffle([0,1,2,3,4,5,6])

  document.querySelector('.J_shuffle').innerHTML = last.map(i => `<div class="item item${i}" data-id="${i}"></div>`).join('')

  document.querySelectorAll('.item').forEach(element => {
    const id = element.getAttribute('data-id')
    const { top } = element.getBoundingClientRect()
    const { top: prevTop } = prev[id]

    element.style.transform = `translateY(${prevTop - top}px)`

    element.addEventListener('transitionend', () => {
      element.classList.remove('active')
    })

    setTimeout(() => {
      element.classList.add('active')
      element.style.transform = `translateY(0)`
    })
  })
})
