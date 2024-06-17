(() => {
  const menu = document.createElement("div");
  menu.classList = "rounded p-3 d-flex menu bg-warning bg-gradient";
  document.getElementsByClassName("header")[0].appendChild(menu);
  const i_array = [
    mk_i({
      icon_name: "bi-person-fill",
      classList: [
        "rounded-top",
        "border-1",
        "border-primary",
        "border-solid",
        "fs-3rem",
        "text-info",
        "bg-focus",
        "bg-wheat",
        "shadow",
      ],
    }),
  ];
  menu.append(...i_array);
  menu.append(
    ...[mk_btn_toggle_collapse({ target: "#test", ariaControls: "test" })]
  );
})();

