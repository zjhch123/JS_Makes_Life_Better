
const React = {
  createElement (component, props, ...children){
    return {
      tag: component,
      props,
      children
    }
  }
}


const a = (
  <div>
    <i className="logo"></i>
    <img src="./assets/images/emiya.png"/>
    <h3>Emiya</h3>
    <h5>Create JS App with no build configuration. <br/>精简, 小巧的JS项目脚手架。 </h5>
    <p>
      <a href="https://github.com/zjhch123/emiya" target="_blank">首页</a>
    </p>
    <p>
      <a href="https://github.com/zjhch123/emiya-node-template" target="_blank">emiya-node</a>&nbsp;
      <a href="https://github.com/zjhch123/emiya-spa-template" target="_blank">emiya-web</a>&nbsp;
      <a href="https://github.com/zjhch123/emiya-vue-template" target="_blank">emiya-vue</a>
    </p>
  </div>
)

console.log(a)

export default () => {}