export const mapRecetteForNavigation = (item) => {
  return {
    id: item.id,
    mainText: item.nom,
    subText: item.description,
    image: item.image,
    ingredients: item.ingredients,
    preparation: item.preparation,
  };
};