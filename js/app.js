import { renderActivities }
from "./ui.js";

import { addActivityToTrip, removeActivity }
from "./planner.js";

import {
    saveTrip,
    loadTrip,
    saveTheme,
    loadTheme
} from "./storage.js";

let activities = [];
let trip = loadTrip();
let theme = loadTheme();

if (theme === "dark") {
    document.body.classList.add("dark");
}

const activitiesContainer =
    document.getElementById("activitiesContainer");

const searchInput =
    document.getElementById("searchInput");

const maxPriceInput =
    document.getElementById("maxPrice");

const sortSelect =
    document.getElementById("sortSelect");

const themeBtn =
    document.getElementById("themeToggle");

// Apply theme
document.body.className = theme;

// Fetch data from json
fetch("./possibleActivities.json")
    .then(res => res.json())
    .then(data => {
        activities = data;
        render();
    });

// Main render
function render() {
    let filtered = [...activities];

    // Search activity
    const search = searchInput.value.toLowerCase();

    if (search) {
        filtered = filtered.filter(a =>
            a.title.toLowerCase().includes(search)
        );
    }

    // Price filtering
    if (maxPriceInput.value) {
        filtered = filtered.filter(a =>
            a.price <= Number(maxPriceInput.value)
        );
    }

    // Sorting activities
    if (sortSelect.value === "title") {
        filtered.sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    }

    if (sortSelect.value === "priceLow") {
        filtered.sort((a, b) =>
            a.price - b.price
        );
    }

    if (sortSelect.value === "priceHigh") {
        filtered.sort((a, b) =>
            b.price - a.price
        );
    }

    const selectedIds =
        Object.values(trip)
            .flat()
            .map(a => a.id);

    renderActivities(
        activitiesContainer,
        filtered,
        handleAddActivity,
        selectedIds
    );

    renderTrip();
}

// Add handle
function handleAddActivity(
    activity,
    day,
    start,
    end,
    errorBox
) {
    if (!day) {
        errorBox.textContent =
            "Please select a day.";
        return;
    }

    const result =
        addActivityToTrip(
            trip,
            activity,
            day,
            start,
            end
        );

    if (!result.success) {
        errorBox.textContent =
            result.message;
        return result;
    }

    errorBox.textContent = "";

    saveTrip(trip);

    render();

    return result;
}

// Render trip side
function renderTrip() {
    ["day1", "day2", "day3"].forEach(day => {
        const container =
            document.getElementById(day + "Activities");

        const totalEl =
            document.getElementById(day + "Total");

        container.innerHTML = "";

        let total = 0;

        trip[day].forEach(item => {
            total += item.price;

            const div = document.createElement("div");
            div.className = "planned-activity";

            div.innerHTML = `
                <strong>${item.title}</strong>
                <p>${item.start} → ${item.end}</p>
                <p>€${item.price}</p>

                <button class="remove-btn">
                    Remove
                </button>
            `;

            div.querySelector(".remove-btn")
                .addEventListener("click", () => {
                    removeActivity(trip, day, item.id);
                    saveTrip(trip);
                    render();
                });

            container.appendChild(div);
        });

        totalEl.textContent = `€${total}`;
    });
}

// Listeners
searchInput.addEventListener("input", render);
maxPriceInput.addEventListener("input", render);
sortSelect.addEventListener("change", render);

// Theme toggle

    themeBtn.addEventListener("click", () => {

    const isDark =
        document.body.classList.toggle("dark");

    const currentTheme =
        isDark ? "dark" : "light";

    saveTheme(currentTheme);
});