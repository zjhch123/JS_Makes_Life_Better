import '@css/base.css';
import '@css/style.scss';
import greet from '@js/index';

// 这是为了更新html之后页面能自动刷新而写的。不要删
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}

class Router {
  constructor({
    notFound = () => {}
  }) {
    this.routes = {}
    this.currentUrl = '/'

    this.notFound = notFound
    this.refresh = this.refresh.bind(this)
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }

  route(path, callback) {
    this.routes[path] = callback || function () {}
  }

  refresh() {
    this.currentUrl = window.location.hash.slice(1) || '/';
    if (this.currentUrl in this.routes) {
      this.routes[this.currentUrl]()
      return
    }
    this.notFound()
  }
}

const router = new Router({
  notFound: () => console.log('notFound')
})
router.route('/', () => {
  document.body.style.background = '#cbc547'
})
router.route('p1', () => {
  document.body.style.background = '#1b315e'
})
router.route('p2', () => {
  document.body.style.background = '#ef5b9c'
})

var quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }

  var pivot = arr[0];
  var left = [];
  var right = [];
  var center = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } 
    if (arr[i] === pivot) {
      center.push(arr[i]);
    }
    if (arr[i] > pivot) {
      right.push(arr[i]);
    }
  }
  return [
    ...quickSort(left),
    ...center,
    ...quickSort(right)
  ];
};

console.log(quickSort([4,1,6,8,3,6,5,0,8,7]))

const a = (() => {
  let p = []
  for (let i = 0; i < 10; i++) {
    p.push(Math.floor(Math.random() * 100))
  }
  return p
})()

const q = arr => arr.length <= 1 ? arr : [
  ...q(arr.filter(i => i < arr[0])),
  ...arr.filter(i => i == arr[0]),
  ...q(arr.filter(i => i > arr[0]))
]
console.time('ex')
console.log(q(a))
console.timeEnd('ex')

const qsort = arr => {
  if (arr.length <= 1) {
    return arr
  }
  const less = []
  const large = []
  const eq = []
  const a = arr[0]
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item == a) {
      eq.push(item)
    }
    if (item < a) {
      less.push(item)
    }
    if (item > a) {
      large.push(item)
    }
  }
  return [
    ...qsort(less),
    ...eq,
    ...qsort(large)
  ]
}

console.time('ex2')
console.log(qsort(a))
console.timeEnd('ex2')