function useState(initialValue) {
  let _val = initialValue;
  function state() {
    return _val;
  }

  function setState(newVal) {
    _val = newVal;
  }

  return [_val, newVal];
}

// modulized hook
const React = (function() {
  let _val, _deps;
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState(initialValue) {
      _val = _val || initialValue;

      function setState(newVal) {
        _val = newVal;
      }

      return [_val, setState];
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const hasChangedDeps = _deps
        ? depArray.some((el, idx) => el !== _deps[idx])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        _deps = depArray;
      }
    }
  };
})();

function Counter() {
  const [count, setCount] = React.useState(0);
  return {
    click: () => setCount(count + 1),
    render: () => console.log("render: " + count)
  };
}

let App;
App = React.render(Counter);
App.click();
App = React.render(Counter);

// modularized array-like hooks
const MyReact = (function() {
  let hooks = [],
    currentHookIndex = 0;
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      currentHookIndex = 0; // the hook index is reset after rendering. It's important to preserve the hooks order.
      return Comp;
    },
    useState(initialValue) {
      hooks[currentHookIndex] = hooks[currentHookIndex];
      const setStateHookIndex = currentHookIndex; // make sure the currentHookIndex is not passed in the setState closure
      function setState(newState) {
        hooks[setStateHookIndex] = newState;
      }

      return [hooks[currentHookIndex++], setState];
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const deps = hooks[currentHookIndex];
      const hasChangedDeps = deps
        ? depArray.some((el, idx) => el !== deps[idx])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        hooks[currentHookIndex] = depArray;
      }
      currentHookIndex++;
    }
  };
})();
