import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
  return <Previews palette={<PaletteTree />}></Previews>;
};

export default ComponentPreviews;
