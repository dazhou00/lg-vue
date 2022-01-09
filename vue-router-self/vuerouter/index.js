let _Vue = null;
export default class VueRouter {
  static install(Vue) {
    // 1. 判断当前插件是否已经被按照
    if (VueRouter.install.installed) return;
    VueRouter.install.installed = true;

    // 2. 把 Vue 构造函数记录到全局变量
    _Vue = Vue;

    // 把构造创建 Vue 实例时候传入的router 对象注入到 Vue 实例上

    // 混入
    _Vue.mixin({
      beforeCreate() {
        // 判断一下是否是组件
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;

          this.$options.router.init();
        }
      },
    });
  }

  constructor(options) {
    this.options = options;
    this.routeMap = {};
    this.data = _Vue.observable({
      current: "/",
    });
  }

  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent();
  }

  createRouteMap() {
    // 遍历所有的路由规则，解析成键值对的形式，存储到 routeMap 中
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component;
    });
  }

  initComponents(Vue) {
    // 创建router-link 组件
    Vue.component("router-link", {
      props: {
        to: String,
      },
      // template: '<a :href="to"><slot></slot></a>',
      render(h) {
        return h(
          "a",
          {
            attrs: { href: this.to },
            on: { click: this.clickHandler },
          },
          [this.$slots.default]
        );
      },
      methods: {
        clickHandler(e) {
          e.preventDefault();
          history.pushState({}, "", this.to);
          this.$router.data.current = this.to;
        },
      },
    });

    const _this = this;
    Vue.component("router-view", {
      render(h) {
        const component = _this.routeMap[_this.data.current];
        return h(component);
      },
    });
  }

  initEvent() {
    window.addEventListener("popstate", () => {
      this.data.current = window.location.pathname;
    });
  }
}
