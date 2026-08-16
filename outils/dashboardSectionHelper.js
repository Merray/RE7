import { DASHBOARD_SECTIONS } from './dashboardSections';

const INGREDIENTS_NON_VEGETARIENS = [
  'Poulet',
  'Boeuf',
  'Porc',
  'Agneau',
  'Dinde',
  'Saumon',
  'Thon',
  'Poisson blanc',
  'Crevettes',
];

export const filtrerRecettesPourSection = (recettes, section) => {

  if (!section) {
    return [];
  }

  // Section basée sur un ingrédient
  if (section.type === 'ingredient') {

    return recettes.filter(recette =>
      recette.ingredients?.some(
        ingredient =>
          ingredient.label === section.ingredient
      )
    );

  }

  // Section végétarienne
  if (section.type === 'vegetarien') {

    return recettes.filter(recette =>
      recette.ingredients?.every(
        ingredient =>
          !INGREDIENTS_NON_VEGETARIENS.includes(
            ingredient.label
          )
      )
    );

  }

  return [];
};


export const getSectionDuJour = () => {

  if (DASHBOARD_SECTIONS.length === 0) {
    return null;
  }

  const maintenant = new Date();

  const debut = new Date(2026, 0, 1);

  const difference =
    maintenant.getTime() - debut.getTime();

  const nombreDeJours = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const index =
    nombreDeJours % DASHBOARD_SECTIONS.length;

  return DASHBOARD_SECTIONS[index];
};