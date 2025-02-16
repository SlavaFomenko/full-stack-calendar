import classNames from 'classnames'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uniqid from 'uniqid'
import Event from '../event/event'

import { deleteDate } from '../../actions'
import styles from './day_info.module.scss'

/**
 * ${1:DayInfo}
 *
 * @returns {${2:*}}
 */
const DayInfo = () => {
	const date = useSelector(state => state.date.day)
	const [disableButton, setDisableButton] = useState(false)
	const [isAddEvent, setAddEvent] = useState(false)
	const [events, setEvents] = useState([])  // Состояние для хранения событий
	const dispatch = useDispatch()

	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()

	const dayKey = useMemo(() => `${day}-${month}-${year}`, [day, month, year])

	const fetchEventsForDay = useCallback(async () => {
		try {
			const response = await fetch(`http://localhost:3001/api/events/date?date=${dayKey}`)
			if (!response.ok) {
				console.error(`Error: ${response.statusText}`)
				return
			}
			const data = await response.json()
			if (data) {
				setEvents(data)  // Обновляем состояние с полученными событиями
			}
		} catch (error) {
			console.error('Error fetching events:', error)
		}
	}, [dayKey])

	useEffect(() => {
		fetchEventsForDay()
	}, [fetchEventsForDay])

	useEffect(() => {
		if (isAddEvent) {
			const id = uniqid()
			const newEvent = {
				id,
				name: '',
				event: '',
				isEdit: true,
			}

			// Добавляем новую подию через API
			const addEvent = async () => {
				try {
					await fetch('http://localhost:3001/api/events', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							...newEvent,
							date: dayKey,
						}),
					})

					// Обновляем список событий после добавления нового
					setEvents(prevEvents => [newEvent, ...prevEvents])
				} catch (error) {
					console.error('Error adding event:', error)
				}
			}

			addEvent()
			setAddEvent(false)
		}
	}, [isAddEvent, dayKey])


	const handleDeleteEvent = async (eventId) => {
		try {
			const response = await fetch(`http://localhost:3001/api/events/${eventId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				console.log('Event deleted successfully');
				fetchEventsForDay();
			} else {
				console.error('Failed to delete event');
			}
		} catch (error) {
			console.error('Error deleting event:', error);
		}
	};

	return (
		<div className={classNames(styles.wrapper, styles.visible)}>
			<header>
        <span>
          {day} {month} {year}
        </span>

				<div className={classNames(styles.buttons)}>
					<button
						disabled={disableButton}
						onClick={() => {
							setAddEvent(true)
							setDisableButton(true)
						}}
					>
						add event
					</button>
					<button
						disabled={disableButton}
						onClick={() => {
							dispatch(deleteDate())
						}}
					>
						close
					</button>
				</div>
			</header>
			<main>
				<ul>
					{events.length > 0 ? (
						events.map(event => (
							<Event
								key={event.id}
								data={{
									...event,
									date: dayKey,
								}}
								setDisableButton={setDisableButton}
								handleDeleteEvent={handleDeleteEvent}  // Передаем функцию удаления
							/>
						))
					) : (
						'No events'
					)}
				</ul>
			</main>
		</div>
	)
}

export default DayInfo
