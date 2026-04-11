export const mapRecetteForNavigation = (item) => {
  return {
    id: item.id,
    mainText: item.mainText,
    subText: item.subText,
    img: item.img,
    tempsPreparation: item.tempsPreparation,
    difficulte: item.difficulte,
    note: item.note,
    isVegan: item.isVegan,
    ingredients: item.ingredients,
    preparation: item.preparation,
  };
};
