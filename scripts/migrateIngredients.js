const { INGREDIENTS } =
    require('../outils/ingredientsData');

const analyserTagsRecette =
    require('../outils/tagsRecette').default;

const { initializeApp, cert } =
    require('firebase-admin/app');

const { getFirestore } =
    require('firebase-admin/firestore');


const serviceAccount =
    require('./serviceAccountKey.json');


initializeApp({
    credential: cert(serviceAccount),
});


const db = getFirestore();


const migrerRecettes = async () => {

    try {

        console.log('🔄 Connexion à Firestore...');


        const recettesSnapshot =
            await db
                .collection('recettes')
                .get();


        console.log(
            `✅ ${recettesSnapshot.size} recette(s) trouvée(s)`
        );


        for (const doc of recettesSnapshot.docs) {

            const recette = doc.data();

            console.log('\n================================');
            console.log('🍽️ Recette :', recette.nom);
            console.log('================================');


            const nouveauxIngredients =
                (recette.ingredients || []).map(ancienIngredient => {

                    const ingredientReference =
                        INGREDIENTS.find(
                            ingredient =>
                                ingredient.label === ancienIngredient.label
                        );


                    if (!ingredientReference) {

                        console.log(
                            '⚠️ INGRÉDIENT INTROUVABLE :',
                            ancienIngredient.label
                        );

                        return ancienIngredient;
                    }


                    const nouvelIngredient = {

                        ...ingredientReference,

                        // On conserve les données propres
                        // à cette recette
                        quantite:
                            ancienIngredient.quantite || '',

                        unite:
                            ancienIngredient.unite || '',

                    };


                    console.log('\n🥕', ancienIngredient.label);

                    console.log('   AVANT :');
                    console.log(ancienIngredient);

                    console.log('   APRÈS :');
                    console.log(nouvelIngredient);


                    return nouvelIngredient;

                });


            const tags =
                analyserTagsRecette(nouveauxIngredients);


            console.log('\n🏷️ TAGS CALCULÉS :');

            console.log(
                '🥬 Végétarien :',
                tags.vegetarien
            );

            console.log(
                '🌱 Vegan :',
                tags.vegan
            );

            console.log(
                '💪 ProtMaxing :',
                tags.protMaxing
            );

            console.log(
                '🥩 Protéines totales :',
                tags.proteinesTotales
            );


            // 💾 MISE À JOUR FIRESTORE

            console.log(
                '\n💾 Mise à jour de la recette...'
            );


            await db
                .collection('recettes')
                .doc(doc.id)
                .update({

                    ingredients:
                        nouveauxIngredients,

                    vegetarien:
                        tags.vegetarien,

                    vegan:
                        tags.vegan,

                    protMaxing:
                        tags.protMaxing,

                    proteinesTotales:
                        tags.proteinesTotales,

                });


            console.log(
                '✅ Recette mise à jour avec succès !'
            );

        }


        console.log('\n🎉 Migration terminée !');


    } catch (error) {

        console.error(
            '❌ Erreur pendant la migration :',
            error
        );

    }

};


migrerRecettes();