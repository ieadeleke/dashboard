import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { fleetReducer } from './reducers/fleets/fleet.reducer'


const store = configureStore({
    reducer: combineReducers({
        fleets: fleetReducer
    }),
    middleware: []
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
export default function storeFactory() {
    return { store, persistor }
}
