const param = [1, 2, 3];

const delay = () => new window.Promise(res => setTimeout(res, ~~([5, ...param].join(''))));

export const greeting = () => {
  console.log('HelloWorld!');
};

export const testAwait = async () => {
  await delay();
  console.log(666);
};

export default function () {
  console.log('export default');
};
