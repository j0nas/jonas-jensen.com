import { storiesOf } from "@storybook/html";
import "./styles/window.css";
import "./styles/startmenu.css";
import win from "./img/win.ico";

{
  storiesOf("Window", module)
    .add("Basic", () => '<div class="window"></div>')
    .add(
      "Title",
      () =>
        '<div class="window">' +
        ' <div class="window-title">Document - WordPad</div>' +
        "</div>"
    )
    .add(
      "Title with action buttons",
      () =>
        '<div class="window">' +
        ' <div class="window-title">' +
        "   Document - WordPad" +
        '   <div class="window-title-buttons">' +
        '     <button class="window-title-button">_</button>' +
        '     <button class="window-title-button">□</button>' +
        '     <button class="window-title-button">×</button></div>' +
        "   </div>" +
        "</div>"
    )
    .add(
      "Main menu",
      () =>
        '<div class="window">' +
        ' <div class="window-menu">' +
        '   <button class="window-menu-item">File</button>' +
        '   <button class="window-menu-item">Edit</button>' +
        " </div>" +
        "</div>"
    )
    .add(
      "Title and main menu",
      () =>
        '<div class="window">' +
        ' <div class="window-title">Document - WordPad</div>' +
        ' <div class="window-menu">' +
        '   <button class="window-menu-item">File</button>' +
        '   <button class="window-menu-item">Edit</button>' +
        " </div>" +
        "</div>"
    )
    .add(
      "Title with action buttons and main menu",
      () =>
        '<div class="window">' +
        ' <div class="window-title">' +
        "   Document - WordPad" +
        '   <div class="window-title-buttons">' +
        '     <button class="window-title-button">_</button>' +
        '     <button class="window-title-button">□</button>' +
        '     <button class="window-title-button">×</button></div>' +
        "   </div>" +
        '   <div class="window-menu">' +
        '     <button class="window-menu-item">File</button>' +
        '     <button class="window-menu-item">Edit</button>' +
        "   </div>" +
        "</div>"
    );
}

{
  storiesOf("Start menu", module).add(
    "Basic",
    () => `
    <div class="startmenu"> 
      <button class="startmenu-startbutton">   
        <img class="startmenu-startbutton-icon" src="${win}">   
        <span class="startmenu-startbutton-label">Start</span> 
      </button>
    </div>`
  );
}
