const prompt = require('prompt-sync')(); // Require the prompt-sync module for user input

// Function to take input for execution time of each process
function getProcessInfo(numberOfProcesses) {
    let processInfoArray = [];
    for (let i = 0; i < numberOfProcesses; i++) {
        let executionTime = parseInt(prompt(`Enter execution time for process ${i + 1} (1-10): `));

        while (isNaN(executionTime) || executionTime < 1 || executionTime > 10) {
            console.log("Invalid input. Execution time must be a number between 1 and 10.");
            executionTime = parseInt(prompt(`Enter execution time for process ${i + 1} (1-10): `));
        }

        processInfoArray.push({
            processID: `P${i + 1}`,
            executionTime: executionTime,
            arrivalTime: i,  // Set arrival time based on process index
            startTime: -1,
            waitTime: 0,
            finishTime: -1,
            turnAroundTime: 0,
            utilization: 0
        });
    }
    return processInfoArray;
}

// Function to apply First-Come, First-Served scheduling
function firstComeFirstServed(processInfoArray) {
    let currentTime = 0;

    // Print process execution order in one line
    console.log("\nProcess Execution Order (FCFS):");
    console.log(processInfoArray.map(process => process.processID).join(" "));

    // Iterate over each process to calculate timings
    for (let processInfo of processInfoArray) {
        // Set start time and wait time for each process
        if (processInfo.startTime === -1) {
            processInfo.startTime = currentTime;
            processInfo.waitTime = processInfo.startTime - processInfo.arrivalTime;
        }

        // Update current time to account for process execution
        currentTime += processInfo.executionTime;

        // Calculate finish time and turnaround time
        processInfo.finishTime = currentTime;
        processInfo.turnAroundTime = processInfo.finishTime - processInfo.arrivalTime;
        processInfo.utilization = ((processInfo.executionTime / processInfo.turnAroundTime) * 100).toFixed(2);
    }
}

// Main code execution
(function main() {
    // Input number of processes
    let numberOfProcesses = parseInt(prompt("Enter number of processes (1-5): "));

    while (isNaN(numberOfProcesses) || numberOfProcesses < 1 || numberOfProcesses > 5) {
        console.log("Invalid input. Number of processes must be between 1 and 5.");
        numberOfProcesses = parseInt(prompt("Enter number of processes (1-5): "));
    }

    // Get process information from the user
    let processInfoArray = getProcessInfo(numberOfProcesses);

    // Apply FCFS scheduling
    firstComeFirstServed(processInfoArray);

    // Print final process information
    console.log("\n========================================");
    console.log("Final Process Information:");
    console.log("-----------------------------------------------------------");
    console.log("Process\tArrival\tStart\tWait\tFinish\tTurnaround\tUtilization");
    console.log("ID\tTime\tTime\tTime\tTime\tTime\t\t%");
    console.log("-----------------------------------------------------------");

    processInfoArray.forEach(processInfo => {
        console.log(`${processInfo.processID}\t${processInfo.arrivalTime}\t${processInfo.startTime}\t${processInfo.waitTime}\t${processInfo.finishTime}\t${processInfo.turnAroundTime}\t\t${processInfo.utilization}%`);
    });
})();
