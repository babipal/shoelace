import {
  SlIcon
} from "./chunk.M4HIRIJ5.js";

// src/react/icon/index.ts
import * as React from "react";
import { createComponent } from "@lit-labs/react";
import "@lit-labs/react";
var tagName = "sl-icon";
SlIcon.define("sl-icon");
var reactWrapper = createComponent({
  tagName,
  elementClass: SlIcon,
  react: React,
  events: {
    onSlLoad: "sl-load",
    onSlError: "sl-error"
  },
  displayName: "SlIcon"
});
var icon_default = reactWrapper;

export {
  icon_default
};