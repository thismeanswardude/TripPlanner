const TRIP_KEY = "tripPlannerData";
const THEME_KEY = "tripTheme";

export function saveTrip(trip) {
    localStorage.setItem(
        TRIP_KEY,
        JSON.stringify(trip)
    );
}

export function loadTrip() {
    const stored =
        localStorage.getItem(TRIP_KEY);

    return stored
        ? JSON.parse(stored)
        : {
            day1: [],
            day2: [],
            day3: []
        };
}

//theme handler
export function saveTheme(theme) {
    localStorage.setItem(
        THEME_KEY,
        theme
    );
}

export function loadTheme() {
    return (
        localStorage.getItem(THEME_KEY)
        || "light"
    );
}