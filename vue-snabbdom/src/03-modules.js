import { init, h } from "snabbdom";

// 1. 导入模块
import { styleModule, eventListenersModule } from "snabbdom";

// 2. 注册模块
const patch = init([styleModule, eventListenersModule]);

// 3. 使用 h() 函数的第二个参数传入模块中使用的数据（对象）

let vnode = h("div", [
  h("h1", { style: { backgroundColor: "red" } }, "Hello Wrold"),
  h("p", { on: { click: eventHandler } }, "Hello p"),
]);

function eventHandler() {
  console.log("点击");
}

const app = document.querySelector("#app");

patch(app, vnode);
