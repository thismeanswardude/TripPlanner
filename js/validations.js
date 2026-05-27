export function validateActivity(
    start,
    end
) {
    if (!start || !end) {
        return "Please select start and end date.";
    }

    const startDate =
        new Date(start);

    const endDate =
        new Date(end);

    const diffHours =
        (endDate - startDate)
        / (1000 * 60 * 60);

    if (diffHours <= 0) {
        return "End time must be after start.";
    }

    if (diffHours > 7) {
        return "Maximum duration is 7 hours.";
    }

    return null;
}