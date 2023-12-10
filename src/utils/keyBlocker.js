export const keyBlocker = () => {
  return (
    document.addEventListener("contextmenu", (event) => event.preventDefault()),
    document.addEventListener(
      "keydown",
      function (e) {
        if (e.which === 38 || e.which === 40) {
         e.preventDefault();
     }
      },
      false
    )
  );
};

export const removeKeyBlocker = () => {
  return (
    document.removeEventListener(
      "keydown",
      function (e) {
        if (
          e.key === "s" &&
          (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
        ) {
          e.preventDefault();
        }
      },
      false
    ),
    document.removeEventListener("contextmenu", (event) =>
      event.preventDefault()
    )
  );
};
