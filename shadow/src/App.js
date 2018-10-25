import '@css/base.css';
import '@css/style.scss';
import listDiff from './v-dom/list-diff'
import el from './v-dom/element'

// 这是为了更新html之后页面能自动刷新而写的。不要删
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}

const tree = el('div', {}, [
  el('h1', { style: 'color: #45b97c' }, 'zjhch123!!!'),
  el('h2', { style: 'color: #c7a252' }, 'zjhch456!!!'),
  el('div', { style: 'color: #c7a252' }, [
    el('span', { style: 'color: #009ad6' }, 'haha, '),
    el('span', { style: 'color: #7bbfea' }, 'good boy!')
  ]),
])

document.querySelector('.container').appendChild(tree.render())
