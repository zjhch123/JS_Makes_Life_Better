import '@css/base.css';
import '@css/style.scss';

const 地球周长 = 40076 * 1000;
const 地月距离 = 384400 * 1000;
const 太阳直径 = 1.392 * 10e6 * 1000;
const 泄洪速度 = 7800 * 1000 * 1000; // 速度是7800立方米/秒
// console.log(地球周长, '地球周长(m)');

const 开始时间 = new Date(2020, 6, 8, 9, 0, 0).getTime(); // 2020年7月8日09:00:00

const 获取实时瓶数 = () => {
  const 现在 = Date.now();

  const 持续秒数 = (现在 - 开始时间) / 1000;

  const 泄洪总量 = 泄洪速度 * 持续秒数;
  // console.log(泄洪总量)

  const 瓶数 = 泄洪总量 / 550; // 一瓶农夫山泉550ml

  return 瓶数;
};

const 设置分享 = () => {
  const 瓶数 = 获取实时瓶数();
  window.wxShare.setShareData({
    title: '泄洪水量实时对比',
    desc: `没想到, 竟然已经泄了${Math.floor(瓶数 / 100000000)}亿瓶农夫山泉了!`,
    link: window.location.href,
  });
};

setInterval(() => {
  const 瓶数 = 获取实时瓶数();
  // console.log(瓶数, '瓶数')

  const 总瓶宽 = 瓶数 * 52 / 1000; // 瓶底直径52mm
  // console.log(总瓶宽, '宽(m)')

  const 圈数 = 总瓶宽 / 地球周长;
  // console.log(圈数, '圈')

  const 地月次数 = 总瓶宽 / 地月距离;
  // console.log(地月次数);

  const 太阳个数 = 总瓶宽 / 太阳直径;
  // console.log(太阳个数);

  document.querySelector('#number').innerHTML = 圈数.toFixed(3);
  document.querySelector('#earth').innerHTML = 地月次数.toFixed(4);
  document.querySelector('#sun').innerHTML = 太阳个数.toFixed(5);
}, 16);

setInterval(() => {
  设置分享();
}, 5000);

设置分享();
