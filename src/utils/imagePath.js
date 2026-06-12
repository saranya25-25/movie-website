export const getImage = (name) => {
  return import.meta.env.BASE_URL + "images/" + name;
};