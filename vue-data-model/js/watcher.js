class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    // data 中的属性名称
    this.key = key;
    // 回调函数负责更新视图
    this.cb = cb;

    // 把 watcher 对象记录到 Dep 类的静态属性 target
    Dep.target = this;
    // 触发get 方法，在 get 方法中会调用 addsub

    this.oldValue = vm[key];

    // 重置
    Dep.target = null;
  }
  // 当数据发生变化的时候更新视图
  update() {
    let newValue = this.vm[this.key];

    if (this.newValue === this.oldValue) return;

    this.cb(newValue);
  }
}
