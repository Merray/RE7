const analyserTagsRecette = (ingredients = []) => {

    const vegetarien = ingredients.every(
        ingredient => ingredient.vegetarien === true
    );

    const vegan = ingredients.every(ingredient => {

        if (
            ingredient.category === 'produits_laitiers'
        ) {
            return false;
        }

        if (
            ingredient.category === 'proteines' &&
            ingredient.subcategory === 'animale'
        ) {
            return false;
        }

        if (
            ingredient.category === 'chocolat' &&
            ingredient.subcategory !== 'noir'
        ) {
            return false;
        }

        return true;

    });

    let proteinesTotales = 0;

    ingredients.forEach(ingredient => {

        const quantite = parseFloat(ingredient.quantite) || 0;

        const proteinesPour100g =
            ingredient.proteinesPour100g || 0;

        proteinesTotales +=
            (quantite / 100) * proteinesPour100g;

    });


    // Par défaut, 30g = protMaxing
    const protMaxing =
        proteinesTotales >= 30;


    return {
        vegetarien,
        vegan,
        protMaxing,
        proteinesTotales,
    };

};

export default analyserTagsRecette;