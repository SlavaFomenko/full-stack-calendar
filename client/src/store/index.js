import { configureStore } from '@reduxjs/toolkit'
import dayReducer from '../reducers/index'

const store = configureStore({
	reducer: {
		date: dayReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export default store
