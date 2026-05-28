const activityForm = document.getElementById("activityForm");
const activitiesContainer = document.getElementById("activitiesContainer");

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

console.log("dashboard.js loaded");

if (!token) {
    window.location.href = "login.html";
}

window.onload = function () {
    loadActivities();
};

activityForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = {
        userId: userId,
        type: document.getElementById("activityType").value,
        duration: parseInt(document.getElementById("duration").value),
        caloriesBurned: parseInt(document.getElementById("calories").value),
        startTime: new Date().toISOString(),
        additionalMetrics: {
            mood: "Good"
        }
    };

    try {

        const response = await fetch(`${BASE_URL}/api/activities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {

            document.getElementById("activityMessage").innerText =
                "Activity Saved";

            loadActivities();

            activityForm.reset();
        }

    } catch (error) {
        console.log(error);
    }
});

async function loadActivities() {

    console.log("Fetching activities");

    try {

        const response = await fetch(`${BASE_URL}/api/activities`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-User-ID": userId
            }
        });

        const activities = await response.json();

        console.log(activities);

        activitiesContainer.innerHTML = "";

        activities.forEach(function(activity) {

            activitiesContainer.innerHTML += `
                <div class="activity-item">
                    <h4>${activity.type}</h4>
                    <p>Duration: ${activity.duration} Minutes</p>
                    <p>Calories: ${activity.caloriesBurned}</p>
                </div>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}