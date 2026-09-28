// Extended food database with comprehensive nutrition data
export const FOOD_DATABASE = [
  // Proteins
  { name: 'Poulet Grillé (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Steak Saignant (100g)', calories: 250, protein: 26, carbs: 0, fat: 15 },
  { name: 'Poisson Blanc (100g)', calories: 82, protein: 18, carbs: 0, fat: 0.8 },
  { name: 'Saumon (100g)', calories: 206, protein: 22, carbs: 0, fat: 13 },
  { name: 'Thon en Boîte (100g)', calories: 132, protein: 29, carbs: 0, fat: 0.5 },
  { name: 'Oeuf Entier (1 gros)', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: 'Blanc de Poulet (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Tofu (100g)', calories: 76, protein: 8, carbs: 1.9, fat: 4.8 },
  { name: 'Yaourt Grec (100g)', calories: 100, protein: 10, carbs: 3, fat: 5 },

  // Grains
  { name: 'Riz Blanc Cuit (100g)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: 'Riz Complet Cuit (100g)', calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
  { name: 'Pâtes Cuites (100g)', calories: 131, protein: 5, carbs: 25, fat: 1.1 },
  { name: 'Pain Blanc (1 tranche)', calories: 79, protein: 2.7, carbs: 14, fat: 1.1 },
  { name: 'Pain Complet (1 tranche)', calories: 100, protein: 3.6, carbs: 17.6, fat: 1.4 },
  { name: 'Avoine Crue (100g)', calories: 389, protein: 17, carbs: 66, fat: 7 },
  { name: 'Muesli (30g)', calories: 115, protein: 3, carbs: 21, fat: 2 },
  { name: 'Pâtes Complètes Cuites (100g)', calories: 124, protein: 5.3, carbs: 24, fat: 1 },

  // Fruits
  { name: 'Pomme (1 moyenne)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: 'Banane (1 moyenne)', calories: 107, protein: 1.3, carbs: 27, fat: 0.3 },
  { name: 'Orange (1 moyenne)', calories: 62, protein: 1.2, carbs: 15.4, fat: 0.3 },
  { name: 'Raisin (100g)', calories: 67, protein: 0.6, carbs: 17, fat: 0.4 },
  { name: 'Fraise (100g)', calories: 32, protein: 0.8, carbs: 7.7, fat: 0.3 },
  { name: 'Cerise (100g)', calories: 63, protein: 1.1, carbs: 16, fat: 0.2 },
  { name: 'Kiwi (1 moyen)', calories: 61, protein: 1.1, carbs: 14.7, fat: 0.5 },
  { name: 'Mangue (100g)', calories: 60, protein: 0.8, carbs: 15, fat: 0.4 },
  { name: 'Avocad (100g)', calories: 160, protein: 2, carbs: 9, fat: 15 },

  // Légumes
  { name: 'Brocoli Cuit (100g)', calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  { name: 'Carotte Cuite (100g)', calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
  { name: 'Epinard Cru (100g)', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { name: 'Tomate (1 moyenne)', calories: 22, protein: 1.1, carbs: 4.8, fat: 0.2 },
  { name: 'Concombre (100g)', calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1 },
  { name: 'Salade Verte (100g)', calories: 15, protein: 1.2, carbs: 2.9, fat: 0.2 },
  { name: 'Poivron Rouge (100g)', calories: 31, protein: 1, carbs: 6, fat: 0.3 },
  { name: 'Oignon Cuit (100g)', calories: 44, protein: 1.5, carbs: 10, fat: 0.2 },

  // Dairy
  { name: 'Fromage Cheddar (30g)', calories: 120, protein: 7, carbs: 0.4, fat: 9.7 },
  { name: 'Yaourt Nature (100g)', calories: 61, protein: 3.5, carbs: 4.7, fat: 0.4 },
  { name: 'Lait Entier (200ml)', calories: 128, protein: 6.4, carbs: 9.6, fat: 7.4 },
  { name: 'Lait Écrémé (200ml)', calories: 68, protein: 6.8, carbs: 9.6, fat: 0.2 },
  { name: 'Mozzarella (30g)', calories: 85, protein: 6, carbs: 1, fat: 6.5 },
  { name: 'Ricotta (100g)', calories: 174, protein: 11, carbs: 3, fat: 13 },

  // Nuts & Seeds
  { name: 'Amandes (30g)', calories: 164, protein: 6, carbs: 6, fat: 14 },
  { name: 'Arachides (30g)', calories: 161, protein: 7, carbs: 6, fat: 14 },
  { name: 'Noix (30g)', calories: 196, protein: 4.3, carbs: 4.4, fat: 19.5 },
  { name: 'Graines de Courge (30g)', calories: 180, protein: 9, carbs: 3, fat: 16 },
  { name: 'Beurre d\'Arachide (30g)', calories: 188, protein: 8, carbs: 7, fat: 16 },

  // Snacks
  { name: 'Biscuit Sec (20g)', calories: 79, protein: 1.5, carbs: 14, fat: 2.5 },
  { name: 'Chips (30g)', calories: 152, protein: 2, carbs: 15, fat: 9.5 },
  { name: 'Chocolat Noir (30g)', calories: 155, protein: 3, carbs: 13, fat: 11 },
  { name: 'Barre Protéinée (40g)', calories: 180, protein: 15, carbs: 20, fat: 5 },

  // Beverages
  { name: 'Jus Orange (250ml)', calories: 110, protein: 1.7, carbs: 26, fat: 0.5 },
  { name: 'Coca-Cola (250ml)', calories: 105, protein: 0, carbs: 29, fat: 0 },
  { name: 'Café Noir (1 tasse)', calories: 2, protein: 0.3, carbs: 0, fat: 0 },
  { name: 'Thé (1 tasse)', calories: 2, protein: 0.3, carbs: 0, fat: 0 },
  { name: 'Vin Rouge (150ml)', calories: 120, protein: 0.1, carbs: 2.5, fat: 0 },
]

export const searchFood = async (query) => {
  if (!query.trim()) return []

  const searchTerm = query.toLowerCase()

  // Chercher dans la base de données locale
  const results = FOOD_DATABASE.filter(food =>
    food.name.toLowerCase().includes(searchTerm)
  )

  // Si on a des résultats, les retourner
  if (results.length > 0) {
    return results.map((food, i) => ({ id: `local-${i}`, ...food }))
  }

  // Si aucun résultat, montrer des suggestions similaires
  return []
}

// Aliments courants (subset pour l'affichage initial)
export const COMMON_FOODS = [
  { name: 'Poulet Grillé (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Riz Blanc Cuit (100g)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: 'Pomme (1 moyenne)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: 'Banane (1 moyenne)', calories: 107, protein: 1.3, carbs: 27, fat: 0.3 },
  { name: 'Oeuf Entier (1 gros)', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: 'Pain Blanc (1 tranche)', calories: 79, protein: 2.7, carbs: 14, fat: 1.1 },
  { name: 'Yaourt Nature (100g)', calories: 61, protein: 3.5, carbs: 4.7, fat: 0.4 },
  { name: 'Fromage Cheddar (30g)', calories: 120, protein: 7, carbs: 0.4, fat: 9.7 },
  { name: 'Poisson Blanc (100g)', calories: 82, protein: 18, carbs: 0, fat: 0.8 },
  { name: 'Brocoli Cuit (100g)', calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  { name: 'Steak Saignant (100g)', calories: 250, protein: 26, carbs: 0, fat: 15 },
  { name: 'Carotte Cuite (100g)', calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
]

export const calculateMacros = (quantity, food) => {
  const factor = quantity / 100
  return {
    calories: Math.round(food.calories * factor),
    protein: Math.round(food.protein * factor * 10) / 10,
    carbs: Math.round(food.carbs * factor * 10) / 10,
    fat: Math.round(food.fat * factor * 10) / 10
  }
}

export const getMacroSplitPercentages = (macros) => {
  const totalCalories = (macros.protein * 4) + (macros.carbs * 4) + (macros.fat * 9)
  if (totalCalories === 0) return { protein: 0, carbs: 0, fat: 0 }

  return {
    protein: Math.round((macros.protein * 4) / totalCalories * 100),
    carbs: Math.round((macros.carbs * 4) / totalCalories * 100),
    fat: Math.round((macros.fat * 9) / totalCalories * 100)
  }
}
