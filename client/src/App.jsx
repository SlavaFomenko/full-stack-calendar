import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './App.module.scss';
import Calendar from './calendar';
import DayInfo from './components/day_info/day_info';
import GDPRPopup from './components/gdpr_popup/gdpr_popup';

/**
 * ${1:App}
 *
 * @returns {${2:*}}
 */
function App() {
	const day = useSelector(state => state.date.day);
	const [gdprAccepted, setGdprAccepted] = useState(null);

	useEffect(() => {
		const consent = localStorage.getItem('gdprAccepted');
		setGdprAccepted(consent === 'true');
	}, []);

	return (
		<div className={styles.app}>
			<GDPRPopup onAccept={() => setGdprAccepted(true)} onDecline={() => setGdprAccepted(false)} />
			<Calendar visible={gdprAccepted} />
			{day && gdprAccepted !== false && <DayInfo />}
		</div>
	);
}

export default App;
