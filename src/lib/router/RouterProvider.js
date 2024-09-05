export const RouterProvider = ({ router }) => {
  const { element } = router.find(
    (route) => route.path === window.location.pathname,
  );

  return element;
};
