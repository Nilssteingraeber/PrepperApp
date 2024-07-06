import ListItemParams from "./ListEntriesParams";
import { Item, ItemModel } from "../../../../schemas/Item";
import { CreateRecipesParams } from "../recipes/RecipesCreateParameters";
import { Recipe, RecipeModel } from "../../../../schemas/Recipe";
import { DataEntryModel } from "../../../../schemas/data_entries/DataEntry";
import { eachDayOfInterval, parseISO } from 'date-fns';

export const listEntries = async (searchParams: ListItemParams) => {
  if (searchParams.validate() === false) {
    return { status: 422, ok: false };
  }

  let result;

  const allDaysBetween = eachDayOfInterval({start: searchParams.dateRange.startDate, end: searchParams.dateRange.endDate})

  result = await Promise.all(
    allDaysBetween.map(async (date: Date) => {
      return listEntriesOnDay(date);
    })
  );

  return { status: 200, ok: true, data: result };
};

export const listEntriesOnDay = async (date: Date) => {
  const startOfDayDate = new Date(date);
  startOfDayDate.setHours(0, 0, 0, 0);

  const endOfDayDate = new Date(date);
  endOfDayDate.setHours(23, 59, 59, 999);

  const startOfDay = startOfDayDate.getTime()
  const endOfDay = endOfDayDate.getTime()

  try {
    const results = await DataEntryModel.find({
      validDates: {
        $elemMatch: {
          $or: [
            { startDate: { $lte: endOfDay }, endDate: { $gte: startOfDay } },
            { startDate: { $gte: startOfDay, $lte: endOfDay } },
            { endDate: { $gte: startOfDay, $lte: endOfDay } },
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
  
  
};
