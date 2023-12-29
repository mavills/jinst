import "@htmx.org";
import "@tauri-plugin-htmx";
import '@interactjs/auto-start'
import '@interactjs/actions/drag'
import '@interactjs/actions/resize'
import '@interactjs/modifiers'
import '@interactjs/dev-tools'
import interact from '@interactjs/interact'
import { EditorView, minimalSetup, basicSetup } from "codemirror"
import { vim } from "@replit/codemirror-vim"
// import {javascript} from "@codemirror/lang-javascript"
let myBaseTheme = EditorView.theme({
  "&.cm-editor": {
    // background: "#125690",
    borderRadius: "0.5rem",
    borderWidth: "1px",
    // borderColor: "#777",
    outlineWidth: "0px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    flexGrow: 1,
    width: 0,
    // "--tw-border-opacity": 1,
    // "border-color": "rgb(209 213 219 / var(--tw-border-opacity))"
  },
  ".cm-scroller": {
    overflow: "scroll",
  },
  ".cm-gutters": {
    backgroundColor: "#FFFFFF",
  },
  ".cm-gutterElement": {
    backgroundColor: "#FFFFFF",
  },
  ".cm-line": { background: "#00000000" },
})

let editor = new EditorView({
  extensions: [vim(), myBaseTheme, minimalSetup],
  parent: document.getElementById("path-editor")
})
new EditorView({
  extensions: [vim(), myBaseTheme, basicSetup],
  parent: document.getElementById("path-editor-2")
})
// vim.
// let cm = getCM(view)
// // use cm to access the old cm5 api
// Vim.exitInsertMode(cm)
// Vim.handleKey(cm, "<Esc>")

const { invoke } = window.__TAURI__.tauri;

let greetInputEl;
let greetMsgEl;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

window.addEventListener("DOMContentLoaded", () => {
  // greetInputEl = document.querySelector("#greet-input");
  // greetMsgEl = document.querySelector("#greet-msg");
  // document.querySelector("#greet-form").addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   greet();
  // });
});

interact('.resize-drag')
  .resizable({
    // resize from all edges and corners
    edges: { left: false, right: true, bottom: false, top: false },

    listeners: {
      move(event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      // interact.modifiers.restrictEdges({
      //   outer: 'parent'
      // }),

      // minimum size
      // interact.modifiers.restrictSize({
      //   min: { width: 100, height: 50 }
      // })
    ],

    inertia: true
  })