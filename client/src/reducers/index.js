import { DELETE_DATE, SET_DATE } from '../actions/index'

/**
 * ${1:initialState}
 *
 * @type {{ day: any; }\}
 */
const initialState = {
	day: null,
}

/**
 * ${1:dayReducer}
 *
 * @param {{ day: any; }} [state=initialState]
 * @param {${2:*}} action
 * @returns {{ day: any; \}\}
 */
const dayReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DATE:
			return {
				...state,
				day: new Date(action.payload),
			}
		case DELETE_DATE:
			return {
				...state,
				day: null,
			}
		default:
			return state
	}
}

export default dayReducer
