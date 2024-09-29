const eventSource = new EventSource('http://localhost:8080/updates');

eventSource.onmessage = function(event) {
    console.log("Update:", event.data);
    // Update your UI with the new data here
    // For example, you could append the data to an element:
    const updatesContainer = document.getElementById('updates-container');
    if (updatesContainer) {
        const newUpdate = document.createElement('div');
        newUpdate.textContent = `New update: ${event.data}`;
        updatesContainer.appendChild(newUpdate);
    }
};

// Optional: Handle errors
eventSource.onerror = function(err) {
    console.error("EventSource failed:", err);
};