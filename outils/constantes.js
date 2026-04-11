export const COULEURS = {
    main: '#05a565ff',
    secondary: '#2bd18eff',
    blanc: '#ffffffff',
    noir: '#000',
    iconColor: '#eaebef'
};

export const TEXT_SIZE = {
    title: 22,
    secondary: 14
};

export const PADDING = {
    horizontal: 15,
    vertical: 15
};

export const INGREDIENT_CATEGORIES = {
  proteines: ['Poulet', 'Boeuf', 'Porc', 'Agneau', 'Poisson','Saumon', 'Tofu'],
  feculents: ['Patate', 'pommes de terre', 'Frites', 'Riz', 'Pâtes', 'Semoule'],
  legumes: ['Tomate', 'Poivron', 'Oignon', 'Brocoli', 'Carotte', 'Courgette'],
  epices: ['Citron','Sel', 'Poivre', 'Paprika', 'Curry', 'Herbes', 'Épices', 'Olive', 'Huile'], // tu peux compléter
};

export const CATEGORY_COLORS = {
  proteines: '#ea680bd0', // orange
  feculents: '#f1c40f',   // jaune
  legumes: '#27ae60',     // vert
  epices: '#04c0f4ff',      // violet
};

export const getIngredientColor = (ingredient) => {
  const ingLower = ingredient.toLowerCase();

  // Vérifie si l'ingrédient contient une des valeurs dans chaque catégorie
  if (INGREDIENT_CATEGORIES.proteines.some(p => ingLower.includes(p.toLowerCase()))) return CATEGORY_COLORS.proteines;
  if (INGREDIENT_CATEGORIES.feculents.some(f => ingLower.includes(f.toLowerCase()))) return CATEGORY_COLORS.feculents;
  if (INGREDIENT_CATEGORIES.legumes.some(l => ingLower.includes(l.toLowerCase()))) return CATEGORY_COLORS.legumes;
  if (INGREDIENT_CATEGORIES.epices.some(e => ingLower.includes(e.toLowerCase()))) return CATEGORY_COLORS.epices;

  return '#999'; // fallback gris si aucune catégorie ne correspond
};
