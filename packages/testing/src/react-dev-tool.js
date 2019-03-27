//That's a variable that the React developer tool sets onto the page.
//React internally will reference this variable to register components with it.
if (window.Cypress) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ =
    window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;
}
