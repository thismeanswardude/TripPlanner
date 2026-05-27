import { validateActivity }
from "./validations.js";

export function addActivityToTrip(
    trip,
    activity,
    day,
    start,
    end
) {
    const validation =
        validateActivity(
            start,
            end
        );

    if (validation) {
        return {
            success: false,
            message: validation
        };
    }

    const alreadyExists =
        Object.values(trip)
            .flat()
            .some(item =>
                item.id === activity.id
            );

    if (alreadyExists) {
        return {
            success: false,
            message:
                "Activity already selected."
        };
    }

    trip[day].push({
        ...activity,
        start,
        end
    });

    return {
        success: true
    };
}

export function removeActivity(
    trip,
    day,
    activityId
) {
    trip[day] =
        trip[day].filter(
            activity =>
                activity.id !== activityId
        );

    return trip;
}