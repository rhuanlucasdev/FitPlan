# API Integration Guide

This guide explains how to integrate free APIs for food nutrition and exercise data in your FitPlan application.

## 🍎 Food Nutrition API

### Open Food Facts API

- **Free**: No API key required
- **Coverage**: 2M+ food products worldwide
- **Data**: Nutritional facts, ingredients, allergens, barcodes
- **Rate Limit**: No official limit, but be respectful

### Setup

1. No API key needed
2. The API is automatically enabled
3. Search by food name or barcode

### Features

- Search foods by name
- Search by barcode
- Get nutritional information
- Product images
- Brand information

## 🏋️ Exercise API

### ExerciseDB API (via RapidAPI)

- **Free**: Requires RapidAPI key
- **Coverage**: 1,300+ exercises
- **Data**: Exercise details, muscle groups, equipment, instructions, GIFs
- **Rate Limit**: 500 requests/month (free tier)

### Setup

1. Go to [RapidAPI Hub](https://rapidapi.com/hub)
2. Sign up for a free account
3. Subscribe to the ExerciseDB API
4. Get your API key
5. Create a `.env` file in your project root:

```env
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
VITE_ENABLE_FOOD_API=true
VITE_ENABLE_EXERCISE_API=true
```

### Features

- Search exercises by name
- Filter by body part
- Filter by target muscle
- Filter by equipment
- Get exercise instructions
- View exercise GIFs

## 🚀 Usage

### Food Search

```typescript
import { EnhancedFoodService } from "./services/EnhancedFoodService";

// Search foods (local + API)
const foods = await EnhancedFoodService.searchFoods("banana");

// Search by barcode
const food = await EnhancedFoodService.getFoodByBarcode("123456789");
```

### Exercise Search

```typescript
import { EnhancedExerciseService } from "./services/EnhancedExerciseService";

// Search exercises (local + API)
const exercises = await EnhancedExerciseService.searchExercises("push up");

// Get exercises by body part
const chestExercises = await EnhancedExerciseService.getExercisesByBodyPart(
  "chest"
);

// Get exercises by target muscle
const bicepExercises = await EnhancedExerciseService.getExercisesByTarget(
  "biceps"
);
```

## 🔧 Configuration

### API Settings

Edit `src/config/api.ts` to configure API settings:

```typescript
export const API_CONFIG = {
  RAPIDAPI_KEY: import.meta.env.VITE_RAPIDAPI_KEY || "",
  ENABLE_FOOD_API: import.meta.env.VITE_ENABLE_FOOD_API !== "false",
  ENABLE_EXERCISE_API: import.meta.env.VITE_ENABLE_EXERCISE_API !== "false",
  // ... other settings
};
```

### Environment Variables

Create a `.env` file in your project root:

```env
# Required for ExerciseDB API
VITE_RAPIDAPI_KEY=your_rapidapi_key_here

# Optional: Enable/disable API features
VITE_ENABLE_FOOD_API=true
VITE_ENABLE_EXERCISE_API=true
```

## 📱 Components

### EnhancedFoodSelector

- Automatic food search with API integration
- Barcode scanning support
- Custom food creation
- API toggle button

### EnhancedExerciseSelector

- Exercise search with API integration
- Filter by body part, muscle, equipment
- Exercise GIFs and instructions
- Custom exercise creation

## 🔄 Fallback Strategy

The enhanced services use a fallback strategy:

1. **First**: Search local database
2. **Then**: Search API (if enabled)
3. **Finally**: Combine and deduplicate results

If API is unavailable, the system gracefully falls back to local data.

## 🛠️ Development

### Testing API Integration

1. Set up your API keys
2. Test food search with barcode: `123456789`
3. Test exercise search with: `push up`
4. Check browser console for any errors

### Debugging

- Check browser console for API errors
- Verify API keys are correct
- Check network tab for failed requests
- Use browser dev tools to inspect API responses

## 📊 Data Mapping

### Food Data

- API categories mapped to local categories
- Nutritional values converted to per-unit basis
- Images and brand info preserved

### Exercise Data

- API body parts mapped to local categories
- Target muscles mapped to local muscle groups
- Equipment and instructions preserved

## 🚨 Rate Limiting

### Open Food Facts

- No official rate limit
- Be respectful with requests
- Consider caching results

### ExerciseDB API

- 500 requests/month (free tier)
- Consider upgrading for production use
- Implement request caching

## 🔒 Security

- API keys are stored in environment variables
- Never commit API keys to version control
- Use `.env.example` for documentation
- Rotate API keys regularly

## 📈 Performance

### Optimization Tips

1. Cache API responses locally
2. Implement request debouncing
3. Use pagination for large result sets
4. Show loading states during API calls
5. Handle errors gracefully

### Caching Strategy

- Store API results in localStorage
- Set appropriate cache expiration
- Clear cache when needed
- Fallback to local data if cache fails

## 🐛 Troubleshooting

### Common Issues

1. **API key not working**: Check RapidAPI subscription
2. **No results**: Verify API is enabled in config
3. **Rate limit exceeded**: Wait or upgrade plan
4. **CORS errors**: Use proper API endpoints
5. **Network errors**: Check internet connection

### Error Handling

- All API calls wrapped in try-catch
- Graceful fallback to local data
- User-friendly error messages
- Console logging for debugging

## 📚 API Documentation

### Open Food Facts

- [API Documentation](https://world.openfoodfacts.org/data)
- [Search Examples](https://world.openfoodfacts.org/cgi/search.pl)

### ExerciseDB API

- [RapidAPI Hub](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)
- [API Documentation](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb/details)

## 🎯 Next Steps

1. Set up your API keys
2. Test the integration
3. Customize the UI components
4. Add more API providers if needed
5. Implement advanced features like caching
6. Monitor API usage and costs
