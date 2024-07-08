import { createStore } from 'vuex'
import { Cycle } from './code/cycle/Cycle';
import Recipe from './code/recipe/Recipe';

// Create a new store instance.

const store = createStore({
    state (): {} {
      return {
        cycleObjectRefresh: false,
        cycleObject: new Cycle(),
        cycleInputAni: false,
        showCycleSelectAni: false,
        selectedShoppingList: "today-week",
        latestSearchResults: "",
        searchbarFocused: true,
        doFocusSearchbar: false,
        searchbarClickedAddItem: {},
        clickedSearchResult: {},
        isRecipeItemSelectModeActive: false,
        itemAddedSelectMode: {},
        currentlyCreatingRecipe: new Recipe([], "", 0, [], {}, "https://upload.wikimedia.org/wikipedia/commons/b/b9/Spaghetti_Bolognese_-_Pizzeria_Bella_Italia_%28Cr%C3%A9pieux-la-Pape%29_en_f%C3%A9vrier_2022.jpg"),
        currentlyViewingItemCode: "",
        shoppingListActionsPressed: -1,
      }
    },
    getters: {
        getCycle (state: any) {
            return state.cycleObject
        }
    },
    mutations: {
    nextCycle (state: any) {
        state.cycleObject = state.cycleObject.nextCycle()
      },
      previousCycle (state: any) {
        state.cycleObject = state.cycleObject.previousCycle()
      },
      setSelectedCycleIndex (state: any, index: number) {
        state.cycleObject.selectedIndex = index
      },
      showCycleSelectAni (state: any) {
        state.showCycleSelectAni = true
      },
      setSelectedShoppingList (state: any, name: string) {
        state.selectedShoppingList = name
      },
      setLastSearch (state: any, searchResult: "") {
        state.latestSearchResults = searchResult
      },
      setSearchbarFocused (state: any, focusState: boolean) {
        state.searchbarFocused = focusState;
      },
      setDoFocusSearchbar (state: any) {
        state.doFocusSearchbar = true;
      },
      setClickedSearchResult (state: any, result: {}) {
        state.searchbarFocused = result;
      },
      setSearchResultAddToRecipe (state: any, result: {}) {
        state.searchbarClickedAddItem = result;
      },
      refreshCycleObject (state: any) {
        state.cycleObjectRefresh = !state.cycleObjectRefresh;
      },
      addItemInSelectionMode (state: any, data: {}) {
        state.itemAddedSelectMode = data
      },
      toggleRecipeItemSelectModeActive (state: any) {
        state.isRecipeItemSelectModeActive = !state.isRecipeItemSelectModeActive
      },
      setCurrentlyViewingItemCode(state: any, code: string) {
        state.currentlyViewingItemCode = code
      },
      setCurrentlyCreatingRecipe(state: any, data: any) {
        state.currentlyCreatingRecipe = data
      },
      playInputAni(state: any) {
        state.cycleInputAni = !state.cycleInputAni
      },
      setShoppingListClicked(state: any, button: number) {
        state.shoppingListActionsPressed = button;
      }
    }
  })
  
export default store;