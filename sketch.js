let voltageSlider, speedSlider, motorTypeSelector;
let motorType = 'DC', voltage = 10, speed = 1000;
let isRunning = false, current = 2;
let motorAngle = 0; // For visualizing motor rotation
let showGraph = false; // New flag for showing the graph
let graphData = []; // To store the graph points

function setup() {
    const canvas = createCanvas(600, 450);
    canvas.parent('container');

    // Get HTML elements
    voltageSlider = select('#voltageSlider');
    speedSlider = select('#speedSlider');
    motorTypeSelector = select('#motorType');
    select('#showGraphButton').mousePressed(toggleGraph);  // Link Show Graph button

    // Button event handlers
    select('#startButton').mousePressed(startMotor);
    select('#stopButton').mousePressed(stopMotor);

    frameRate(30);
    setupTooltips();
}

function draw() {
    background(30);

    // Check if motor is running before updating values
    if (isRunning) {
        updateMotor();
    }

    drawMotor();
    displayCalculations();

    // If showGraph is enabled, draw the graph
    if (showGraph) {
        drawGraph();
    }
}

function drawMotor() {
    // Draw motor visualization
    fill(100, 150, 200);
    rect(width / 2 - 100, height / 2 - 50, 200, 100);

    // Simulate rotation based on speed
    push();
    translate(width / 2, height / 2);
    rotate(radians(motorAngle));
    line(0, 0, 50, 0);  // Represents the shaft rotating
    pop();

    // Adjust motor angle based on speed (for visualization)
    motorAngle += speed / 100;  // Adjusting speed factor to match visual rotation
    if (motorAngle > 360) motorAngle = 0;

    textAlign(CENTER, CENTER);
    fill(255);
    textSize(24);
    text(motorType + " Motor", width / 2, height / 2 + 100);  // Display motor type
}

function updateMotor() {
    // Update motor type, voltage, and speed based on user input
    motorType = motorTypeSelector.value();
    voltage = voltageSlider.value();

    // Speed control logic: For DC Motor, speed is directly tied to voltage
    if (motorType === 'DC') {
        speed = voltage * 10;  // Arbitrary multiplier to scale voltage to speed
    } else {
        speed = speedSlider.value();  // For AC motor, the speed is manually controlled
    }

    // Store graph data
    graphData.push({ voltage: voltage, speed: speed });
    if (graphData.length > 100) graphData.shift();  // Limit graph data to the last 100 points
}

function displayCalculations() {
    // Update current based on motor type (simple physics)
    current = (motorType === 'DC') ? voltage / speed : voltage / (speed * 1.5);
    // Update HTML outputs
    select('#voltageOutput').html(voltage);
    select('#speedOutput').html(speed.toFixed(0));  // Show speed value in integer form
    select('#currentOutput').html(current.toFixed(2));
}

function startMotor() {
    isRunning = true;
}

function stopMotor() {
    isRunning = false;
}

function setupTooltips() {
    // Tooltip interaction setup
    voltageSlider.mouseOver(() => showTooltip('#voltageTooltip'));
    voltageSlider.mouseOut(() => hideTooltip('#voltageTooltip'));

    speedSlider.mouseOver(() => showTooltip('#speedTooltip'));
    speedSlider.mouseOut(() => hideTooltip('#speedTooltip'));
}

function showTooltip(selector) {
    select(selector).addClass('show');
}

function hideTooltip(selector) {
    select(selector).removeClass('show');
}

// New function to toggle the graph display
function toggleGraph() {
    showGraph = !showGraph;  // Toggle the flag
}

// Enhanced function to draw the graph with axes, labels, and ticks
function drawGraph() {
    const graphCanvas = select('#graphCanvas');
    if (!graphCanvas) return;

    // Clear the background with a light color
    background(220);

    // Draw axes
    stroke(0);
    fill(0);
    line(50, height - 50, width - 50, height - 50);  // X-axis
    line(50, 50, 50, height - 50);  // Y-axis

    // Labels
    textSize(16);
    textAlign(CENTER);
    text("Voltage (V)", width / 2, height - 10);  // X-axis label
    textAlign(RIGHT);
    text("Speed (RPM)", 40, height / 2);  // Y-axis label

    // X-axis ticks and numbers
    let maxVoltage = 240;  // Max voltage
    for (let i = 0; i <= maxVoltage; i += 40) {
        let x = map(i, 0, maxVoltage, 50, width - 50);
        line(x, height - 50, x, height - 45);  // Draw tick
        textAlign(CENTER);
        text(i, x, height - 30);  // Draw number
    }

    // Y-axis ticks and numbers
    let maxSpeed = 3000;  // Max speed
    for (let i = 0; i <= maxSpeed; i += 500) {
        let y = map(i, 0, maxSpeed, height - 50, 50);
        line(50, y, 55, y);  // Draw tick
        textAlign(RIGHT);
        text(i, 40, y + 5);  // Draw number
    }

    // Draw the actual graph line
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < graphData.length; i++) {
        const x = map(graphData[i].voltage, 0, maxVoltage, 50, width - 50);
        const y = map(graphData[i].speed, 0, maxSpeed, height - 50, 50);
        vertex(x, y);
    }
    endShape();
}
