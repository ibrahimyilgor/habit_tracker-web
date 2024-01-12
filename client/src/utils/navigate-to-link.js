export const getLinkOfMenu = (id) => {
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}${port ? `:${port}` : ""}/branchmenu?id=${id}`;
};

export const navigateToLink = (id) => {
  window.open(getLinkOfMenu(id), "_blank");
};
