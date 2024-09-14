const createFiber = (element, parentFiber) => {
  return {
    type: element.type,
    props: element.props,

    // fiber tree에서의 위치
    return: parentFiber, // 부모 fiber
    sibling: null, // 형제 fiber
    child: null, // 자식 fiber
  };
};

const createFiberTree = (element, parentFiber) => {
  const fiber = createFiber(element, parentFiber);

  if (element.props.children) {
    let prevChildFiber = null;
    element.props.children.forEach((child) => {
      const childFiber = createFiberTree(child, fiber);
      if (!fiber.child) {
        fiber.child = childFiber;
      } else {
        prevChildFiber.sibling = childFiber;
      }
      prevChildFiber = childFiber;
    });
  }

  return fiber;
};
