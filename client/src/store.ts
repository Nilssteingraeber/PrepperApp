import { createStore } from 'vuex'
import { Cycle } from './code/cycle/Cycle';

// Create a new store instance.

const store = createStore({
    state () {
      return {
        cycleObject: new Cycle(),
        showCycleSelectAni: false
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
      }
    }
  })
  
export default store;