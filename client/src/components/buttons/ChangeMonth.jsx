import React from 'react'
import styles from './ChangeMonth.module.scss'

/**
 * ${1:ChangeMonth}
 *
 * @param {{ children: any; events: any; }} param0
 * @param {${2:*}} param0.children
 * @param {${3:*}} param0.events
 * @returns {${4:*}\}
 */
const ChangeMonth = ({ children, events }) => {
	return (
		<div className={styles.wrapper}>
			<button className={styles.prev} onClick={events.decrementMonth}>
				prev
			</button>
			{children}
			<button className={styles.next} onClick={events.incrementMonth}>
				next
			</button>
		</div>
	)
}

export default ChangeMonth
