"""from pymongo import MongoClient
from bson import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['Prepper2']

# Define collections
users = db['users']
planners = db['planners']
entries = db['entries']
meals = db['meals']
recipes = db['recipes']

# Insert sample data
user_id = users.insert_one({
  "username": "john_doe",
  "password": "hashed_password",
  "friends": [],
  "planners": []
}).inserted_id

planner_id = planners.insert_one({
  "name": "Weekly Planner",
  "entries": []
}).inserted_id

entry_id = entries.insert_one({
  "name": "Monday Plan",
  "timeframe": ["2024-05-01T08:00:00Z", "2024-05-01T09:00:00Z"],
  "meals": [],
  "additionalIngredients": [
    {
      "name": "Salt",
      "amount": 1.0,
      "price": 1.5,
      "calories": 0,
      "nutrients": [0, 0, 0, 0]
    }
  ]
}).inserted_id

meal_id = meals.insert_one({
  "name": "Lunch",
  "recipes": []
}).inserted_id

recipe_id = recipes.insert_one({
  "description": "Spaghetti Bolognese",
  "ingredients": [
    {
      "name": "Spaghetti",
      "amount": 200,
      "price": 1.0,
      "calories": 300,
      "nutrients": [10, 50, 5, 1]
    },
    {
      "name": "Tomato Sauce",
      "amount": 100,
      "price": 0.8,
      "calories": 80,
      "nutrients": [2, 10, 0, 0]
    }
  ],
  "amountPeople": 4,
  "prepDuration": "30 minutes"
}).inserted_id

# Update relationships
users.update_one({"_id": user_id}, {"$push": {"planners": planner_id}})
planners.update_one({"_id": planner_id}, {"$push": {"entries": entry_id}})
entries.update_one({"_id": entry_id}, {"$push": {"meals": meal_id}})
meals.update_one({"_id": meal_id}, {"$push": {"recipes": recipe_id}})


"""