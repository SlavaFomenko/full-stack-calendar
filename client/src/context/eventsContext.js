import React, { createContext, useEffect, useState } from 'react'

const EventsContext = createContext({})

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
