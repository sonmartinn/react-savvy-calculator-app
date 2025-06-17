import { StagewiseToolbar } from "@stagewise/toolbar-react";
import { ReactPlugin } from "@stagewise-plugins/react";

export const stagewiseToolbar = (
  <StagewiseToolbar config={{ plugins: [ReactPlugin()] }} />
);
