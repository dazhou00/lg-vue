import { init, h } from "snabbdom";

const patch = init([]);

// 第一个参数：标签+选择器
// 第二个参数：如果是字符串就是标签中的文本内容

let vnode = h("div#container.cls", "Hello Wrold");

const app = document.querySelector("#app");

// 第一个参数：旧的VNode,h或 DOM 元素
// 第二个参数：新的 VNode
// 返回新的 VNode
const oblVnode = patch(app, vnode);

vnode = h("div#container.xxx", "Hello Snabbdom");

patch(oblVnode, vnode);
