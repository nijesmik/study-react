import { PLACEMENT } from "./constants.js";

export const commitFiberTree = (fiberRoot) => {
  commitWork(fiberRoot.current);
};

const commitWork = (fiber) => {
  if (!fiber) {
    return;
  }

  if (fiber.flags & PLACEMENT) {
    commitPlacement(fiber);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
};

const commitPlacement = (fiber) => {
  const { stateNode } = fiber;
  const parent = fiber.return.stateNode;
  parent.appendChild(stateNode);
};
