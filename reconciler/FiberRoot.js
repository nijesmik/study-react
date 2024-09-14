import { NO_FLAGS } from "./constants.js";

export const createFiberRoot = (container) => {
  return new FiberRootNode(container);
};

class FiberRootNode {
  constructor(container) {
    this.current = createHostRootFiber();
    this.current.stateNode = container;
  }
}

const createHostRootFiber = () => {
  return {
    tag: "HostRoot",
    stateNode: null,
    return: null,
    sibling: null,
    child: null,
    flags: NO_FLAGS,
  };
};
