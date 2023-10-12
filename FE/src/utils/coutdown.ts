export const countdown = (seconds: number, callback: (seconds: number) => void) => {
    const updateCountdown = () => {
        callback(seconds);
        if (seconds > 0) {
            seconds -= 1;
            setTimeout(updateCountdown, 1000);
        }
    };

    updateCountdown();
};