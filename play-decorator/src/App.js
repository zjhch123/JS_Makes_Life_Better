import '@css/base.css';
import '@css/style.scss';
import greeting from '@js/index.js';

// 这是为了更新html之后页面能自动刷新而写的。不要删
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}

// 从这里开始写正式代码
greeting();
