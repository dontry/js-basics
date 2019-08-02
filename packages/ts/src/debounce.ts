function debounce(func: Function, delay: number): Function {
  let inDebounce: any;
  return function(): void {
    const context = this;
    const execute = func.bind(context, arguments);
    clearTimeout(inDebounce);
    inDebounce = setTimeout(execute, delay);
  };
}

export default debounce;
