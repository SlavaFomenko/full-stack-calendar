import React, { createContext, useEffect, useState } from 'react'

/**
 * ${1:EventsContext}
 *
 * @type {${2:*}}
 */
const EventsContext = createContext({})

/**
 * ${1:EventsContextProvider}
 *
 * @param {{ children: any; }} param0
 * @param {${2:*}} param0.children
 * @returns {${3:*}\}
 */
const EventsContextProvider = ({ children }) => {
	const [events, setEvents] = useState(() => {
		const storedEvents = localStorage.getItem('events')
		return storedEvents ? JSON.parse(storedEvents) : {}
	})

	useEffect(() => {
		console.log(events)
		localStorage.setItem('events', JSON.stringify(events))
	}, [events])

	return (
		<EventsContext.Provider value={{ events, setEvents }}>
			{children}
		</EventsContext.Provider>
	)
}

export { EventsContext, EventsContextProvider }
