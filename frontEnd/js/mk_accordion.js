function mk_accordionTable_item_elem(innerText) {
  return mk_elem({
    classList: ["p-3", "border-end", "text-truncate", "w-6rem", "text-center"],
    tag: "div",
    innerText,
  });
}
function mk_accordionTable_item_elem_createdAt(createdAt) {
  let innerText;
  if (~~(Date.now() - (createdAt / 365) * 24 * 60 * 60 * 1000))
    innerText = `${new Date(createdAt).getFullYear()}.${
      new Date(createdAt).getMonth() + 1
    }.${new Date(createdAt).getDate()}`;
  else if ((innerText = ~~(Date.now() - (createdAt / 24) * 60 * 60 * 1000)))
    innerText =
      innerText > 30
        ? `${new Date(createdAt).getFullYear()}.${
            new Date(createdAt).getMonth() + 1
          }.${new Date(createdAt).getDate()}`
        : innerText.toString() + "일전";
  else if ((innerText = ~~(Date.now() - (createdAt / 60) * 60 * 1000)))
    innerText = innerText.toString() + "시간전";
  else if ((innerText = ~~(Date.now() - (createdAt / 60) * 1000)))
    innerText = innerText.toString() + "분전";
  else innerText = ~~(Date.now() - createdAt / 1000).toString() + "초전";
  return mk_accordionTable_item_elem(innerText);
}
function mk_accordionTable_item_elem_title(innerText) {
  const wrapper = mk_elem({
    classList: ["border-end", "flex-grow-1", "position-relative", "mw-10rem"],
    tag: "div",
  });
  const titleElem = mk_elem({
    classList: ["position-absolute", "text-truncate", "p-3", "w-100"],
    tag: "div",
    innerText,
  });
  wrapper.appendChild(titleElem);
  return wrapper;
}

function mk_accordionTable({ id, items }) {
  if (!Array.isArray(items)) {
    console.error("items is not Array!");
    return;
  }
  let count = 0;
  const accordionBox = mk_elem({
    classList: ["accordion", "accordion-flush"],
    tag: "div",
    id,
  });
  for (const item of items) {
    count++;
    if (
      !item["writer"] ||
      !item["title"] ||
      !item["views"] ||
      !item["recommend"] ||
      !item["createdAt"] ||
      !item["bodyNode"]
    ) {
      console.error(
        "need property, {writer: string, title: string, views: number, recommend: number, createdAt: Date, bodyNode: HTMLElement} "
      );
      break;
    }
    const itemBox = mk_elem({
      classList: ["accordion-item"],
      tag: "div",
    });
    const itemH2 = mk_elem({
      classList: ["accordion-header"],
      id: `${id}_accordionTable_heading${count}`,
      tag: "h2",
    });
    const itemToggle = mk_btn_toggle_collapse({
      classList: ["accordion-button", "d-flex", "pe-3", "p-0", "collapsed"],
      target: `#${id}_accordionTable_item${count}`,
      ariaControls: `${id}_accordionTable_item${count}`,
    });
    const itemBoardBox = mk_elem({
      classList: ["d-flex", "w-100", "pe-3"],
      tag: "div",
    });
    // itemToggle 클릭 후 axios로 정보를 가져오는 이벤트 추가가 필요하다

    const itemBodyWrapper = mk_elem({
      classList: ["accordion-collapse", "collapse"],
      id: `${id}_accordionTable_item${count}`,
    });
    itemBodyWrapper.setAttribute(
      "aria-labelledby",
      `${id}_accordionTable_heading${count}`
    );
    itemBodyWrapper.setAttribute("data-bs-parent", `#${id}`);
    itemBoardBox.append(
      ...[
        mk_accordionTable_item_elem(item["writer"]),
        mk_accordionTable_item_elem_title(item["title"]),
        mk_accordionTable_item_elem(item["views"]),
        mk_accordionTable_item_elem(item["recommend"]),
        mk_accordionTable_item_elem_createdAt(item["createAt"]),
      ]
    );
    itemToggle.appendChild(itemBoardBox);
    itemH2.appendChild(itemToggle);
    itemBodyWrapper.appendChild(item["bodyNode"]);
    itemBox.appendChild(itemH2);
    itemBox.appendChild(itemBodyWrapper);
    accordionBox.appendChild(itemBox);
  }
  return accordionBox;
}
