export const mapRecetteForNavigation = (item) => {
  return {
    id: item.id,
    nom: item.nom,
    description: item.description,
    image: item.image,
    ingredients: item.ingredients,
    preparation: item.preparation,
    createdByUid: item.createdByUid,
  };
};