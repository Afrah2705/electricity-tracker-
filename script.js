// ============================================
// HOME ENERGY CONSUMPTION TRACKER - JAVASCRIPT
// ============================================

// This is the main JavaScript file that handles:
// 1. Adding and removing appliances
// 2. Calculating energy consumption
// 3. Updating the table and summary cards
// 4. Creating charts
// 5. Displaying analysis

// Global array to store all appliances
let appliances = [];

// Chart objects to store references to chart.js instances
let pieChartInstance = null;
let barChartInstance = null;

// ============================================
// INITIALIZATION
// ============================================

// Run this code when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Listen for form submission (when user clicks "Add Appliance" button)
    document.getElementById('applianceForm').addEventListener('submit', handleAddAppliance);
    
    // Listen for tariff input changes to recalculate everything
    document.getElementById('tariff').addEventListener('change', updateAllCalculations);
});

// ============================================
// HANDLE ADDING AN APPLIANCE
// ============================================

function handleAddAppliance(event) {
    // Prevent the form from submitting and reloading the page
    event.preventDefault();
    
    // Get values from the form inputs
    const applianceName = document.getElementById('applianceName').value.trim();
    const powerRating = parseFloat(document.getElementById('powerRating').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const hoursPerDay = parseFloat(document.getElementById('hoursPerDay').value);
    const daysPerMonth = parseInt(document.getElementById('daysPerMonth').value);
    
    // Validate that all inputs have values
    if (!applianceName || !powerRating || !quantity || !hoursPerDay || !daysPerMonth) {
        alert('Please fill in all fields');
        return;
    }
    
    // Validate that values make sense
    if (powerRating <= 0) {
        alert('Power rating must be greater than 0');
        return;
    }
    
    if (hoursPerDay < 0 || hoursPerDay > 24) {
        alert('Hours per day must be between 0 and 24');
        return;
    }
    
    // Create a new appliance object with all the data
    const newAppliance = {
        id: Date.now(), // Use current timestamp as unique ID
        name: applianceName,
        watts: powerRating,
        quantity: quantity,
        hoursPerDay: hoursPerDay,
        daysPerMonth: daysPerMonth
    };
    
    // Add the new appliance to our array
    appliances.push(newAppliance);
    
    // Clear the form inputs so user can add another appliance
    document.getElementById('applianceForm').reset();
    
    // Update everything: table, cards, charts, and analysis
    updateAllCalculations();
}

// ============================================
// DELETE AN APPLIANCE
// ============================================

function deleteAppliance(id) {
    // Confirm before deleting
    if (confirm('Are you sure you want to delete this appliance?')) {
        // Filter out the appliance with the matching ID
        appliances = appliances.filter(app => app.id !== id);
        
        // Update everything after deletion
        updateAllCalculations();
    }
}

// ============================================
// CALCULATE ENERGY FOR ONE APPLIANCE
// ============================================

// Formula: Energy (kWh) = (Watts × Quantity × Hours per day × Days per month) / 1000
function calculateMonthlyEnergy(appliance) {
    return (appliance.watts * appliance.quantity * appliance.hoursPerDay * appliance.daysPerMonth) / 1000;
}

// ============================================
// UPDATE ALL CALCULATIONS
// ============================================

function updateAllCalculations() {
    // Step 1: Update the appliances table
    updateTable();
    
    // Step 2: Update summary cards
    updateSummaryCards();
    
    // Step 3: Show/update charts if we have 2+ appliances
    if (appliances.length >= 2) {
        updateCharts();
        document.getElementById('chartsSection').style.display = 'block';
    } else {
        document.getElementById('chartsSection').style.display = 'none';
    }
    
    // Step 4: Show/update analysis section
    if (appliances.length > 0) {
        updateAnalysis();
        document.getElementById('analysisSection').style.display = 'block';
    } else {
        document.getElementById('analysisSection').style.display = 'none';
    }
}

// ============================================
// UPDATE THE TABLE
// ============================================

function updateTable() {
    const tableBody = document.getElementById('appliancesBody');
    const emptyMessage = document.getElementById('emptyMessage');
    const tariff = parseFloat(document.getElementById('tariff').value) || 0;
    
    // If no appliances, show empty message
    if (appliances.length === 0) {
        tableBody.innerHTML = '';
        emptyMessage.style.display = 'block';
        return;
    }
    
    // Hide empty message
    emptyMessage.style.display = 'none';
    
    // Calculate total energy for percentage calculation
    const totalEnergy = appliances.reduce((sum, app) => sum + calculateMonthlyEnergy(app), 0);
    
    // Clear the table
    tableBody.innerHTML = '';
    
    // Add a row for each appliance
    appliances.forEach(appliance => {
        // Calculate monthly energy for this appliance
        const monthlyEnergy = calculateMonthlyEnergy(appliance);
        
        // Calculate monthly cost (energy × tariff)
        const monthlyCost = monthlyEnergy * tariff;
        
        // Calculate percentage of total consumption
        const percentage = totalEnergy > 0 ? ((monthlyEnergy / totalEnergy) * 100).toFixed(1) : 0;
        
        // Create a table row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${appliance.name}</strong></td>
            <td>${appliance.watts}</td>
            <td>${appliance.quantity}</td>
            <td>${appliance.hoursPerDay}</td>
            <td>${appliance.daysPerMonth}</td>
            <td>${monthlyEnergy.toFixed(2)}</td>
            <td>₹${monthlyCost.toFixed(2)}</td>
            <td>${percentage}%</td>
            <td>
                <button class="btn btn-danger" onclick="deleteAppliance(${appliance.id})">
                    Delete
                </button>
            </td>
        `;
        
        // Add the row to the table
        tableBody.appendChild(row);
    });
}

// ============================================
// UPDATE SUMMARY CARDS
// ============================================

function updateSummaryCards() {
    const tariff = parseFloat(document.getElementById('tariff').value) || 0;
    
    // Calculate total appliances
    const totalCount = appliances.length;
    document.getElementById('totalAppliances').textContent = totalCount;
    
    // Calculate total monthly energy consumption
    const totalEnergy = appliances.reduce((sum, app) => sum + calculateMonthlyEnergy(app), 0);
    document.getElementById('totalConsumption').textContent = totalEnergy.toFixed(2) + ' kWh';
    
    // Calculate estimated monthly bill
    const totalBill = totalEnergy * tariff;
    document.getElementById('estimatedBill').textContent = '₹' + totalBill.toFixed(2);
    
    // Find the highest consuming appliance
    if (appliances.length > 0) {
        let maxAppliance = appliances[0];
        let maxEnergy = calculateMonthlyEnergy(maxAppliance);
        
        appliances.forEach(app => {
            const energy = calculateMonthlyEnergy(app);
            if (energy > maxEnergy) {
                maxEnergy = energy;
                maxAppliance = app;
            }
        });
        
        document.getElementById('highestConsumer').textContent = maxAppliance.name + ' (' + maxEnergy.toFixed(2) + ' kWh)';
    } else {
        document.getElementById('highestConsumer').textContent = '-';
    }
}

// ============================================
// UPDATE CHARTS
// ============================================

function updateCharts() {
    // Prepare data for charts
    const chartLabels = appliances.map(app => app.name);
    const chartData = appliances.map(app => calculateMonthlyEnergy(app));
    
    // Update or create pie chart
    updatePieChart(chartLabels, chartData);
    
    // Update or create bar chart
    updateBarChart(chartLabels, chartData);
}

// ============================================
// UPDATE PIE CHART
// ============================================

function updatePieChart(labels, data) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    // Define colors for the chart
    const colors = [
        '#667eea',
        '#764ba2',
        '#f093fb',
        '#4facfe',
        '#00f2fe',
        '#43e97b',
        '#fa709a',
        '#fee140'
    ];
    
    // If chart already exists, destroy it to avoid conflicts
    if (pieChartInstance) {
        pieChartInstance.destroy();
    }
    
    // Create new pie chart
    pieChartInstance = new Chart(ctx, {
        type: 'doughnut', // doughnut = donut chart
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, data.length),
                borderColor: white,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// ============================================
// UPDATE BAR CHART
// ============================================

function updateBarChart(labels, data) {
    const ctx = document.getElementById('barChart').getContext('2d');
    
    // If chart already exists, destroy it to avoid conflicts
    if (barChartInstance) {
        barChartInstance.destroy();
    }
    
    // Create new bar chart
    barChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly Energy Consumption (kWh)',
                data: data,
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#4facfe',
                    '#00f2fe',
                    '#43e97b',
                    '#fa709a',
                    '#fee140'
                ].slice(0, data.length),
                borderRadius: 5,
                borderSkipped: false
            }]
        },
        options: {
            indexAxis: 'y', // Horizontal bar chart
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Monthly Energy (kWh)'
                    }
                }
            }
        }
    });
}

// ============================================
// UPDATE ANALYSIS SECTION
// ============================================

function updateAnalysis() {
    const tariff = parseFloat(document.getElementById('tariff').value) || 0;
    const analysisContent = document.getElementById('analysisContent');
    
    // Calculate total energy
    const totalEnergy = appliances.reduce((sum, app) => sum + calculateMonthlyEnergy(app), 0);
    const totalBill = totalEnergy * tariff;
    
    // Find the highest and lowest consuming appliances
    let highestAppliance = appliances[0];
    let lowestAppliance = appliances[0];
    let highestEnergy = calculateMonthlyEnergy(highestAppliance);
    let lowestEnergy = calculateMonthlyEnergy(lowestAppliance);
    
    appliances.forEach(app => {
        const energy = calculateMonthlyEnergy(app);
        if (energy > highestEnergy) {
            highestEnergy = energy;
            highestAppliance = app;
        }
        if (energy < lowestEnergy) {
            lowestEnergy = energy;
            lowestAppliance = app;
        }
    });
    
    // Build the analysis HTML
    let analysisHTML = '';
    
    // Analysis 1: Highest consumer
    const highestPercentage = ((highestEnergy / totalEnergy) * 100).toFixed(1);
    const highestCost = highestEnergy * tariff;
    analysisHTML += `
        <div class="analysis-card">
            <h4>🔴 Highest Energy Consumer</h4>
            <p><strong>${highestAppliance.name}</strong> is your highest energy consumer.</p>
            <p>Monthly consumption: <strong>${highestEnergy.toFixed(2)} kWh</strong></p>
            <p>Percentage of total: <strong>${highestPercentage}%</strong></p>
            <p>Estimated monthly cost: <strong>₹${highestCost.toFixed(2)}</strong></p>
        </div>
    `;
    
    // Analysis 2: Lowest consumer
    const lowestPercentage = ((lowestEnergy / totalEnergy) * 100).toFixed(1);
    const lowestCost = lowestEnergy * tariff;
    analysisHTML += `
        <div class="analysis-card">
            <h4>🟢 Lowest Energy Consumer</h4>
            <p><strong>${lowestAppliance.name}</strong> is your lowest energy consumer.</p>
            <p>Monthly consumption: <strong>${lowestEnergy.toFixed(2)} kWh</strong></p>
            <p>Percentage of total: <strong>${lowestPercentage}%</strong></p>
            <p>Estimated monthly cost: <strong>₹${lowestCost.toFixed(2)}</strong></p>
        </div>
    `;
    
    // Analysis 3: Summary and suggestions
    analysisHTML += `
        <div class="analysis-card">
            <h4>💡 Summary & Tips</h4>
            <p><strong>Total Monthly Cost:</strong> ₹${totalBill.toFixed(2)}</p>
            <p><strong>Daily Cost:</strong> ₹${(totalBill / 30).toFixed(2)}</p>
            <p><strong>Ways to reduce consumption:</strong></p>
            <ul style="margin-left: 20px; margin-top: 10px;">
                <li>Use appliances during off-peak hours</li>
                <li>Maintain regular servicing</li>
                <li>Replace old appliances with energy-efficient models</li>
                <li>Reduce usage hours where possible</li>
            </ul>
        </div>
    `;
    
    // Update the analysis section with the HTML
    analysisContent.innerHTML = analysisHTML;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Function to format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ============================================
// END OF SCRIPT
// ============================================
