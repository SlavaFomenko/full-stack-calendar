import React, { useState, useEffect } from 'react';
import styles from './gdpr_popup.module.scss';

/**
 * ${1:GDPRPopup}
 *
 * @param {{ onAccept: any; onDecline: any; }} param0
 * @param {${2:*}} param0.onAccept
 * @param {${3:*}} param0.onDecline
 * @returns {${4:*}\}
 */
const GDPRPopup = ({ onAccept, onDecline }) => {
    const [visible, setVisible] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('gdprAccepted');
        if (consent === null) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('gdprAccepted', 'true');
        onAccept();
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('gdprAccepted', 'false');
        onDecline();
        setVisible(false);
    };

    const togglePrivacyPolicy = () => {
        setShowPrivacyPolicy(!showPrivacyPolicy);
    };

    if (!visible) return null;

    return (
        <div className={styles.gdprPopup}>
            <h3>We Use Your Data</h3>
            <p>We collect and store your calendar notes for synchronization and improving the service.
                Learn more in the <a href="#" onClick={togglePrivacyPolicy}>privacy policy</a>.</p>
            <div className={styles.buttons}>
                <button className={styles.accept} onClick={handleAccept}>Accept</button>
                <button className={styles.decline} onClick={handleDecline}>Decline</button>
            </div>

            {showPrivacyPolicy && (
                <div className={styles.privacyPolicy}>
                    <h4>Privacy Policy</h4>
                    <p>We value your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, and protect the data you provide when using our app.</p>
                    <p>We collect only the data necessary for the proper functioning of our app. This includes information such as: events you add to the calendar (event titles, descriptions, dates, and times).</p>
                    <p>This data is stored on our servers to ensure its availability and proper operation of the app.</p>
                    <p>The collected data is used for the following purposes: storing your calendar events, enabling the editing, deletion, and viewing of events.</p>
                    <p>We do not share your data with third parties, except when required by law.</p>
                    <p>All data is stored on our servers. We implement security measures to protect the data from unauthorized access.</p>
                    <p>If you have any questions about our privacy policy or how we process your data, please contact us at: viacheslav.fomenko@gmail.com.</p>
                    <button onClick={togglePrivacyPolicy}>Close</button>
                </div>
            )}
        </div>
    );
};

export default GDPRPopup;
