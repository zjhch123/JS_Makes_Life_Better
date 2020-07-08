import '@css/base.css';
import '@css/style.scss';

const 地球周长 = 40076 * 1000;
const 泄洪速度 = 7800 * 1000 * 1000; // 速度是7800立方米/秒
// console.log(地球周长, '地球周长(m)');

const 开始时间 = new Date(2020, 6, 8, 9, 0, 0).getTime(); // 2020年7月8日09:00:00

const 设置分享 = () => {
  const 现在 = Date.now();

  const 持续秒数 = (现在 - 开始时间) / 1000;

  const 泄洪总量 = 泄洪速度 * 持续秒数;
  // console.log(泄洪总量)

  const 瓶数 = 泄洪总量 / 550; // 一瓶农夫山泉550ml
  window.wxShare.setShareData({
    title: '泄洪水量实时对比',
    desc: `没想到, 竟然已经泄了${Math.floor(瓶数 / 100000000)}亿瓶农夫山泉了!`,
    link: window.location.href,
  });
};

设置分享();

setInterval(() => {
  const 现在 = Date.now();

  const 持续秒数 = (现在 - 开始时间) / 1000;

  const 泄洪总量 = 泄洪速度 * 持续秒数;
  // console.log(泄洪总量)

  const 瓶数 = 泄洪总量 / 550; // 一瓶农夫山泉550ml
  // console.log(瓶数, '瓶数')

  const 总瓶宽 = 瓶数 * 52 / 1000; // 瓶底直径52mm
  // console.log(总瓶宽, '宽(m)')

  const 圈数 = 总瓶宽 / 地球周长;
  // console.log(圈数, '圈')

  document.querySelector('#number').innerHTML = 圈数.toFixed(3);
}, 16);

setInterval(() => {
  设置分享();
}, 5000);
