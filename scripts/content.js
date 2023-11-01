var found = false;

function getTodayAsPercentageOfQuarter() {
    const now = new Date();
    const quarterStartMonth = Math.floor((now.getMonth() + 3) / 3) * 3; // Start of the current quarter
    const quarterStartDate = new Date(now.getFullYear(), quarterStartMonth - 3, 1);
    const quarterEndDate = new Date(now.getFullYear(), quarterStartMonth, 0);

    if (now.getMonth() > 8) {
        quarterEndDate.setDate(15); // December is always a wash
    }

    const totalQuarterDays = (quarterEndDate - quarterStartDate) / (1000 * 60 * 60 * 24); // Total days in the current quarter
    const daysPassedInQuarter = (now - quarterStartDate) / (1000 * 60 * 60 * 24); // Days passed in the current quarter

    const percentage = (daysPassedInQuarter / totalQuarterDays) * 100;

    return percentage.toFixed(2); // Return the percentage with two decimal places
}

function addQBar(goals) {
    const qBar = document.createElement("div");
    qBar.style.width = `${getTodayAsPercentageOfQuarter()}%`;
    qBar.style.height = "16px";
    qBar.style.background = "blue";
    const wrapper = document.createElement("div");
    wrapper.style.width = "100%";
    wrapper.style.border = "1px solid black";
    wrapper.append(qBar);
    goals[0].parentNode.parentNode.prepend(wrapper);
}

function calculateAveragePercentage(percentages) {
    // Ensure there are percentages to calculate the average for
    if (percentages.length === 0) {
        return 0;
    }

    // Use map to transform the elements to their numerical values
    const numericPercentages = percentages.map(percentage => {
        let textContent = percentage.textContent;
        const percentageValue = parseFloat(textContent.replace('%', ''));
        return !isNaN(percentageValue) ? percentageValue : 0;
    });

    // Use reduce to calculate the sum of numeric percentages
    const totalPercentage = numericPercentages.reduce((accumulator, currentValue) => accumulator + currentValue);

    // Calculate the average percentage
    const averagePercentage = totalPercentage / numericPercentages.length;

    return averagePercentage.toFixed(2); // Return the average percentage with two decimal places
}

function addGBar(goals) {
    const percentages = Array.from(goals).map(v => v.querySelector('div.css-0').querySelector('div.css-0:nth-child(1)'));
    const percentage = calculateAveragePercentage(percentages);
    const qBar = document.createElement("div");
    qBar.style.width = `${percentage}%`;
    qBar.style.height = "16px";
    qBar.style.background = "green";

    const wrapper = document.createElement("div");
    wrapper.style.width = "100%";
    wrapper.style.border = "1px solid black";
    wrapper.append(qBar);
    goals[0].parentNode.parentNode.prepend(wrapper);
}

setInterval(() => {
    if (found) {
        return;
    }
    let goals = document.querySelectorAll(
        "li[data-cy='goal-entry']"
    );
    found = goals.length > 0;
    setTimeout(() => {
        addQBar(goals);
        addGBar(goals);
    })
}, 1000);
