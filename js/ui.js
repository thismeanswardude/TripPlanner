export function renderActivities(
    container,
    activities,
    onAddClick,
    selectedIds = []
) {
    container.innerHTML = "";

    activities.forEach(activity => {
        const isDisabled =
            selectedIds.includes(activity.id);

        const card = document.createElement("div");
        card.className = "activity-card";

        card.innerHTML = `
            <h3>${activity.title}</h3>

            <p>${activity.description}</p>

            <div class="tags">
                ${activity.tags.map(tag =>
                    `<span class="tag">${tag}</span>`
                ).join("")}
            </div>

            <div class="activity-price">
                €${activity.price}
            </div>

            <div class="activity-actions">

                <select class="day-select">
                    <option value="">Select day</option>
                    <option value="day1">Day 1</option>
                    <option value="day2">Day 2</option>
                    <option value="day3">Day 3</option>
                </select>

                <input type="datetime-local" class="start-input">
                <input type="datetime-local" class="end-input">

                <button
                    class="add-btn"
                    ${isDisabled ? "disabled" : ""}
                >
                    Add Activity
                </button>

                <div class="error-message"></div>

            </div>
        `;

        const btn =
            card.querySelector(".add-btn");

        const daySelect =
            card.querySelector(".day-select");

        const startInput =
            card.querySelector(".start-input");

        const endInput =
            card.querySelector(".end-input");

        const errorBox =
            card.querySelector(".error-message");

        btn.addEventListener("click", () => {
            const day = daySelect.value;
            const start = startInput.value;
            const end = endInput.value;

            const result = onAddClick(
                activity,
                day,
                start,
                end,
                errorBox
            );

            if (result?.success) {
                daySelect.value = "";
                startInput.value = "";
                endInput.value = "";
            }
        });

        container.appendChild(card);
    });
}