import React from "react";
import { SvgXml } from "react-native-svg";

const xml = (color) =>
  `<?xml version="1.0" encoding="UTF-8" standalone="no"?> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18 18v2H6v-2h12zm3-7v2H3v-2h18zm-3-7v2H6V4h12z" fill="${color}"/></svg>`;

export default ({ color, width, height }) => (
  <SvgXml xml={xml(color)} width={width} height={height} />
);
