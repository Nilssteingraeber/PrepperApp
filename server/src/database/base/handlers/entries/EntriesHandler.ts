import ListItemParams from "./ListEntriesParams";
import { Item, ItemModel } from "../../../../schemas/Item";
import { CreateRecipesParams } from "../recipes/RecipesCreateParameters";
import { Recipe, RecipeModel } from "../../../../schemas/Recipe";
import { EntryModel } from "../../../../schemas/Entry";
import { DataEntryModel } from "../../../../schemas/data_entries/DataEntry";

export const listEntries = async (searchParams: ListItemParams) => {
  if (searchParams.validate() === false) {
    return { status: 422, ok: false };
  }

  const result: Promise<void>[] = [];

  await Promise.all(
    searchParams.validDates.map(async (date) => {
      await listEntriesOnDay(date);
    })
  );

  // console.log(await DataEntryModel.aggregate([{ $sample: { size: 1 } }]).then((result) => {
  //   return result
  // }))

  console.log(result);
  return { status: 200, ok: true, data: [] };

  // return await ItemModel.find().limit(searchParams.maxAmount).then((result) => {
  //    return { "status": 200, "ok": true, "data": result }
  // })
};

export const listEntriesOnDay = async (date: Date) => {
  const startOfDayDate = new Date(date);
  startOfDayDate.setHours(0, 0, 0, 0);

  const endOfDayDate = new Date(date);
  endOfDayDate.setHours(23, 59, 59, 999);

  const startOfDay = startOfDayDate.getTime()
  const endOfDay = endOfDayDate.getTime()
  console.log("Trying to find between " + Number(startOfDay) + " and " + Number(endOfDay));

  try {
    const results = await DataEntryModel.find({
      validDates: {
        $elemMatch: {
          $or: [
            { startDate: { $lte: endOfDay }, endDate: { $gte: startOfDay } },
            { startDate: { $gte: startOfDay, $lte: endOfDay } },
            { endDate: { $gte: startOfDay, $lte: endOfDay } },
            { startDate: "1719439200000"}
          ],
        },
      },
    });

    return results;
  } catch (error) {
    console.error(error);
  }
};

export const createRecipe = async (params: CreateRecipesParams) => {
  const data = new Recipe(
    params.description,
    params.ingredients,
    params.amountPeople,
    params.prepDuration
  );
  const recipe = new RecipeModel(data);
  const savedUser = await recipe.save();
  return savedUser;
};
