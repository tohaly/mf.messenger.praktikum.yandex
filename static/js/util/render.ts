import { IBlock } from "./Block/Block.js";

const render = (query: string, block: IBlock): Element => {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
};

export { render };
