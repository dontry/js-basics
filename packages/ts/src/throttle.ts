function throttle(func: Function, limit: number): Function {
  let inThrottle = false;
  return function(): void {
    const context = this;
    const execute = func.bind(context, arguments);

    if (!inThrottle) {
      execute();
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
