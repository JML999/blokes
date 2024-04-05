export function convertUTCToEST(utcDate) {
    // Create a new Date object from the UTC date string
    const date = new Date(utcDate);

    // Convert UTC time to Eastern Standard Time (EST)
    const estOffset = -5 * 60 * 60 * 1000; // EST is UTC-5
    const estTime = new Date(date.getTime() + estOffset);

    // Format the date and time as desired
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'America/New_York' // Set timezone to EST
    };

    // Return the formatted EST date and time
    return estTime.toLocaleString('en-US', options);
}