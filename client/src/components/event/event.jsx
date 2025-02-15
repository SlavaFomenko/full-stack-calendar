import React, { useState } from 'react'
import styles from './event.module.scss'

const Event = ({ data, setDisableButton, handleDeleteEvent }) => {
	const [isEditing, setIsEditing] = useState(data.isEdit);
	const [eventName, setName] = useState(data.name);
	const [eventEvent, setEvent] = useState(data.event);

	const handleSave = async () => {
		try {
			const response = await fetch(`http://localhost:3001/api/events/${data.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: eventName,
					event: eventEvent,
					isEdit: false,
					date: data.date,
				}),
			});

			if (response.ok) {
				console.log('Event updated successfully');
			} else {
				console.error('Failed to update event');
			}
		} catch (error) {
			console.error('Error updating event:', error);
		}

		setIsEditing(false);
		setDisableButton(false);
	};

	const handleEdit = () => {
		setIsEditing(true);
		setDisableButton(true);
	};

	const handleDelete = () => {
		handleDeleteEvent(data.id, data.date);  // Используйте переданную функцию для удаления
	};

	const handleChangeName = e => {
		setName(e.target.value);
	};

	const handleChangeEvent = e => {
		setEvent(e.target.value);
	};

	if (isEditing) {
		return (
			<li className={styles.form}>
				<input type="text" value={eventName} onChange={handleChangeName} />
				<textarea value={eventEvent} onChange={handleChangeEvent} />
				<button onClick={handleSave}>Save</button>
			</li>
		);
	} else {
		return (
			<li className={styles.event}>
				<span>{eventName}</span>
				<p>{eventEvent}</p>
				<button onClick={handleEdit}>Edit</button>
				<button onClick={handleDelete}>Delete</button>
			</li>
		);
	}
};

export default Event;