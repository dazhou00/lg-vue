import { init, h } from "snabbdom";

const patch = init([]);

let vnode = h("div#container", [
  h("h1", "Hellow Snabbdom"),
  h("p", "这是一个p"),
]);

const app = document.querySelector("#app");

const oldVnode = patch(app, vnode);

setTimeout(() => {
  //   vnode = h("div#container", [h("h1", "Hello World"), h("p", "Hello p")]);

  //   patch(oldVnode, vnode);

  // 清除 div 中的内容
  patch(oldVnode, h("!"));
}, 2000);
