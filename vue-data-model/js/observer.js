class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    // 1. 判断data 是否是对象
    if (!data || typeof data !== "object") return;
    // 2. 遍历 data 对象的所有属性
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }

  defineReactive(obj, key, val) {
    const _this = this;

    // 负责收集依赖
    let dep = new Dep();
    // 如果 val 是对象，把 val 内部的属性转换成响应式数据
    this.walk(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newValue) {
        if (newValue === val) return;

        val = newValue;
        _this.walk(newValue);

        // 发送通知
        dep.notify();
      },
    });
  }
}
