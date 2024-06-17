(() => {
  const menu = document.createElement("div");
  menu.classList =
    "rounded ps-5 pe-5 pt-3 pb-3 d-flex menu bg-warning bg-gradient";
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
  const table = mk_accordionTable({
    id: "test_accordion",
    items: [
      {
        writer: "하하",
        title: "테스트중dddddddddddddddddddddddddd",
        views: "0",
        recommend: "3",
        createdAt: Date.now(),
        bodyNode: mk_elem({ tag: "div", innerText: "시험중입니다" }),
      },
    ],
  });
  menu.append(...i_array);
  menu.appendChild(table);
})();

// writer: string, title: string, views: number, recommend: number, createdAt: Date, bodyNode: HTMLElement
