import mongoose from "mongoose";
import { UserModel, User } from "../schemas/User";
import { PlannerModel, Planner } from "../schemas/Planner";
import { MealModel, Meal } from "../schemas/Meal";
import { RecipeModel, Recipe } from "../schemas/Recipe";

// function to handle the connection to the db and insertion of data
export const databaseHandler = async () => {
  console.log("Connecting to Database at " + process.env.MONGO_DB_URL + "..");

  await mongoose.connect(process.env.MONGO_DB_URL as string);
  console.log("Connected to Database.");

  // creation of a new user document 
  const user = new UserModel({
    username: "john_doe",
    password: "hashed_password",
    friends: [],
    planners: []
  });

  // save that document 
  const savedUser = await user.save();

  // repeat for all the documents
  const planner = new PlannerModel({
    name: "Weekly Planner",
    entries: []
  });

  const savedPlanner = await planner.save();

  // const entry = new EntryModel({
  //   name: "Monday Plan",
  //   timeframe: [new Date("2024-05-01T08:00:00Z"), new Date("2024-05-01T09:00:00Z")],
  //   meals: [],
  //   additionalIngredients: [
  //     {
  //       name: "Salt",
  //       amount: 1.0,
  //       price: 1.5,
  //       calories: 0,
  //       nutrients: [0, 0, 0, 0]
  //     }
  //   ]
  // });

  // const savedEntry = await entry.save();

  const meal = new MealModel({
    name: "Lunch Monday",
    recipes: []
  });
  const savedMeal = await meal.save();

  const recipe = new RecipeModel({
    description: "Spaghetti Bolognese",
    ingredients: [
      {
        name: "Spaghetti",
        amount: 200,
        price: 1.0,
        calories: 300,
        nutrients: [10, 50, 5, 1]
      },
      {
        name: "Tomato Sauce",
        amount: 100,
        price: 0.8,
        calories: 80,
        nutrients: [2, 10, 0, 0]
      }
    ],
    amountPeople: 4,
    prepDuration: "30 minutes"
  });

  const savedRecipe = await recipe.save();

  // Updating the documents
  // await UserModel.findByIdAndUpdate(savedUser._id, { $push: { planners: savedPlanner._id } });
  // await PlannerModel.findByIdAndUpdate(savedPlanner._id, { $push: { entries: savedEntry._id } });
  // await EntryModel.findByIdAndUpdate(savedEntry._id, { $push: { meals: savedMeal._id } });
  // await MealModel.findByIdAndUpdate(savedMeal._id, { $push: { recipes: savedRecipe._id } });

  console.log("Data inserted successfully");
};

// Exporting the databaseHandler function as the default export
export default databaseHandler;
