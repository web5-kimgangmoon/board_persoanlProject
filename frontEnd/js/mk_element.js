function add_classList_Id({ node, classList, id }) {
  if (!node || !classList) {
    return node;
  }
  if (!Array.isArray(classList)) {
    console.error("classList is not Array");
    return node;
  }
  if (id) {
    node.id = id;
  }
  let temp = "";
  for (const list of classList) {
    temp += " ".concat(list);
  }
  temp = temp.trim();
  node.classList = temp;
  return node;
}
function add_onEvent({ node, events }) {
  if (!events) {
    return node;
  }
  if (!Array.isArray(events)) {
    console.error("please insert prameter Array that has Object");
  } else {
    for (const list of events) {
      if (!list.ev_name || !list.ev_function) {
        console.error(
          "please add object that has property 'ev_name' and 'ev_function'"
        );
        break;
      }
      node[list.ev_name] = (e) => list.ev_function(e);
    }
  }
  return node;
}
function mk_elem(
  { classList = undefined, id = undefined, innerText = undefined, tag },
  events = undefined
) {
  const elem = document.createElement(tag);
  if (innerText) {
    elem.innerText = innerText;
  }
  add_classList_Id({ node: elem, classList, id });
  add_onEvent({ node: elem, events });
  return elem;
}

function mk_i(
  { icon_name, classList = [], id = undefined },
  events = undefined
) {
  if (!Array.isArray(classList)) {
    console.error("classList is not Array");
    classList = ["bi", icon_name];
  } else {
    classList.push("bi");
    classList.push(icon_name);
  }
  return mk_elem({ tag: "i", classList, id }, events);
}

function mk_btn(
  {
    title = undefined,
    icon = undefined,
    type = undefined,
    classList = undefined,
    id = undefined,
  },
  events = undefined
) {
  const button = mk_elem({ tag: "button", classList, id }, events);
  button.type = "button";
  if (title) {
    button.appendChild(mk_elem({ tag: "span", innerText: title }));
  }
  if (icon) {
    button.appendChild(icon);
  }
  if (type) {
    button.type = type;
  }

  return button;
}

function mk_btn_toggle(
  {
    title = undefined,
    icon = undefined,
    type = undefined,
    classList = undefined,
    id = undefined,
    target = undefined,
    toggle = undefined,
  },
  events = undefined
) {
  if (!target) {
    console.error("need property 'target' for toggle!");
    return;
  }
  if (!toggle) {
    console.error("need property 'toggle' for toggle!");
  }
  const button = mk_btn({ title, icon, type, icon, classList, id }, events);
  button.setAttribute("data-bs-toggle", toggle);
  button.setAttribute("data-bs-target", target);
  return button;
}

function mk_btn_toggle_modal({
  title = undefined,
  icon = undefined,
  type = undefined,
  classList = undefined,
  id = undefined,
  target = undefined,
}) {
  return mk_btn_toggle({
    title,
    icon,
    type,
    classList,
    id,
    target,
    toggle: "modal",
  });
}

function mk_btn_toggle_collapse({
  title = undefined,
  icon = undefined,
  type = undefined,
  classList = undefined,
  id = undefined,
  target = undefined,
  ariaExpanded = false,
  ariaControls = undefined,
}) {
  const toggle_btn = mk_btn_toggle({
    title,
    icon,
    type,
    classList,
    id,
    target,
    toggle: "collapse",
  });
  if (ariaControls) {
    toggle_btn.setAttribute("aria-controls", ariaControls);
  } else {
    console.warn("aria-controls not exists!");
  }
  if (typeof ariaExpanded == "boolean") {
    toggle_btn.ariaExpanded == ariaExpanded;
  } else {
    toggle_btn.ariaExpanded == false;
  }
  return toggle_btn;
}
function mk_btn_modal_close(
  {
    title = undefined,
    icon = undefined,
    type = undefined,
    classList = undefined,
    id = undefined,
  },
  events = undefined
) {
  const button = mk_btn({ title, icon, type, icon, classList, id }, events);
  button.setAttribute("data-bs-dismiss", "modal");
  return button;
}

function mk_modal({
  title = undefined,
  body_nodes = [],
  footer_btns = [],
  classList = [],
  id = undefined,
}) {
  if (!Array.isArray(classList)) {
    console.error("classList is not Array!");
    classList = ["modal"];
  } else {
    classList.push("modal");
  }
  if (!Array.isArray(footer_btns)) {
    console.error("footer_btns is not Array!");
    footer_btns = [];
  }
  if (!Array.isArray(body_nodes)) {
    console.error("body_nodes is not Array!");
    body_nodes = [];
  }

  const modal = mk_elem({ tag: "div", classList, id });
  modal.tabIndex = "-1";

  const modalDialog = mk_elem({ tag: "div", classList: ["modal-dialog"] });
  const modalContent = mk_elem({ tag: "div", classList: ["modal-content"] });
  const modalHeader = mk_elem({ tag: "div", classList: ["modal-header"] });
  const modalTitle = mk_elem({
    tag: "h5",
    classList: ["modal-title"],
    innerText: title,
  });
  const modalClose_btn = mk_btn_modal_close({
    tag: "div",
    classList: ["btn-close"],
  });
  modalClose_btn.ariaLabel = "Close";
  modalHeader.append(...[modalTitle, modalClose_btn]);

  const modalBody = mk_elem({ tag: "div", classList: ["modal-body"] });
  modalBody.append(...body_nodes);

  const modalFooter = mk_elem({ tag: "div", classList: ["modal-footer"] });
  modalFooter.append(...footer_btns);

  modal.appendChild(modalDialog);
  modalDialog.appendChild(modalContent);
  modalContent.append(...[modalHeader, modalBody, modalFooter]);

  return modal;
}

function wrap_a(
  { href, classList = undefined, id = undefined, node },
  events = undefined
) {
  const a = mk_elem({ tag: "a", classList, id }, events);

  a.href = href;
  a.style.display = "inline-block";
  a.appendChild(node);
  return a;
}
