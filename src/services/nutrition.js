const OPENFOODFACTS_API = 'https://world.openfoodfacts.org/cgi/search.pl'

export const searchFood = async (query) => {
  try {
    const params = new URLSearchParams({
      search_terms: query,
      action: 'process',
      json: 1,
      page_size: 10,
      fields: 'code,product_name,nutrition_grade_fr,energy_kcal_100g,proteins_100g,carbohydrates_100g,fat_100g,image_small_url'
    })

    const response = await fetch(`${OPENFOODFACTS_API}?${params}`)
    const data = await response.json()

    if (data.products && Array.isArray(data.products)) {
      return data.products
        .filter(p => p.product_name && p.energy_kcal_100g)
        .map(p => ({
          id: p.code || Math.random().toString(),
          name: p.product_name,
          calories: p.energy_kcal_100g || 0,
          protein: p.proteins_100g || 0,
          carbs: p.carbohydrates_100g || 0,
          fat: p.fat_100g || 0,
          grade: p.nutrition_grade_fr || 'N/A',
          image: p.image_small_url || null
        }))
    }
    return []
  } catch (error) {
    console.error('Failed to search food:', error)
    return []
  }
}

// Common foods with estimated nutrition (when API is slow)
export const COMMON_FOODS = [
  { name: 'Poulet Grillé (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Riz Blanc Cuit (100g)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: 'Pomme (1 moyenne)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: 'Banane (1 moyenne)', calories: 107, protein: 1.3, carbs: 27, fat: 0.3 },
  { name: 'Oeuf (1 gros)', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: 'Pain Blanc (1 tranche)', calories: 79, protein: 2.7, carbs: 14, fat: 1.1 },
  { name: 'Yaourt Nature (100g)', calories: 61, protein: 3.5, carbs: 4.7, fat: 0.4 },
  { name: 'Fromage Cheddar (30g)', calories: 120, protein: 7, carbs: 0.4, fat: 9.7 },
  { name: 'Poisson Maigre (100g)', calories: 82, protein: 18, carbs: 0, fat: 0.8 },
  { name: 'Brocoli Cuit (100g)', calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
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
