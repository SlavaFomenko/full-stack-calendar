import { configureStore } from '@reduxjs/toolkit'
import dayReducer from '../reducers/index'

/**
 * ${1:store}
 *
 * @type {${2:*}}
 */
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
