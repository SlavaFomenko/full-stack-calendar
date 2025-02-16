/**
 * SET_DATE
 *
 * @type {"SET"}
 */
export const SET_DATE = 'SET'
/**
 * DELETE_DATE
 *
 * @type {"DELETE"}
 */
export const DELETE_DATE = 'DELETE'

/**
 * setDate
 *
 * @param {*} date
 * @returns {{ type: string; payload: any; }}
 */
export const setDate = (date) => ({
	type: SET_DATE,
	payload:date
})

/**
 * deleteDate
 *
 * @returns {{ type: string; }}
 */
export const deleteDate = () => ({
	type: DELETE_DATE,
})
