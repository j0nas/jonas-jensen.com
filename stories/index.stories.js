import { storiesOf } from "@storybook/html";
import "./styles/window.css";

storiesOf("Basic blocks", module).add(
  "Button",
  () => '<button class="button">Start</button>'
);

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
      '     <button class="window-title-button" id="button-minimize">_</button>' +
      '     <button class="window-title-button" id="button-maximize">□</button>' +
      '     <button class="window-title-button" id="button-close">×</button></div>' +
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
  );
