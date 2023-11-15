let timeoutId: NodeJS.Timeout;

export const startUserActivityTimer = (timeout: number, onTimeout: () => void): void => {
    const resetTimer = (): void => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(onTimeout, timeout);
    };

    resetTimer();

    // Add event listeners to reset the timer on user activity
    ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'].forEach((event: string): void => {
        console.log('hehe')
        document.addEventListener(event, resetTimer);
    });
};

export const stopUserActivityTimer = (): void => {
    clearTimeout(timeoutId);
};
