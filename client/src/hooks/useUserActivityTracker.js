import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConnectionStatus } from '../contextProvider/ConnectionStatusContextProvider'
import { handleInvalidToken } from '../utils/auth';

const INACTIVITY_TIMEOUT =  30* 60 * 1000; 

export const useUserActivityTracker = () => {
    const navigate = useNavigate();
    const {setConnectionAttributes}=useConnectionStatus()
    const [lastActivity, setLastActivity] = useState(Date.now());

  // List of events to track user activity
    const events = ['mousedown', 'keydown', 'scroll', 'mousemove', 'touchstart'];

  // Reset last activity timestamp
    const resetLastActivity = useCallback(() => {
        setLastActivity(Date.now());
    }, []);

  // Logout function
    const handleInactivityLogout = useCallback(() => {
        handleInvalidToken(navigate, setConnectionAttributes)
    }, [navigate, setConnectionAttributes]);

    useEffect(() => {
        // Add event listeners for tracking activity
        events.forEach(event => {
            window.addEventListener(event, resetLastActivity);
        });

        // Check for inactivity periodically
        const intervalId = setInterval(() => {
            const currentTime = Date.now();
            const timeSinceLastActivity = currentTime - lastActivity;

            // Check if inactivity timeout has been reached
            if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
                handleInactivityLogout();
            }
        }, 60000); // Check every minute

        // Cleanup function
        return () => {
        // Remove event listeners
            events.forEach(event => {
                window.removeEventListener(event, resetLastActivity);
            });
        
        // Clear interval
            clearInterval(intervalId);
        };
    }, [lastActivity, handleInactivityLogout, resetLastActivity]);

  // Optional: Expose methods if needed
    return {
        resetLastActivity
    };
};

// Wrapper component to apply activity tracking
export const UserActivityTracker = ({ children }) => {
    useUserActivityTracker();
    return children;
};