import { createFiberRoot } from "../reconciler/FiberRoot.js";
import { createFiberTree } from "../reconciler/Fiber.js";
import { commitFiberTree } from "../reconciler/FiberCommit.js";

export const createRoot = (container) => {
  const fiberRoot = createFiberRoot(container);
  return {
    render: (element) => {
      fiberRoot.current.child = createFiberTree(element, fiberRoot.current);
      commitFiberTree(fiberRoot);
    },
  };
};
