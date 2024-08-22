logger.error('Critical error occurred');
logger.warn('This might be an issue');
logger.info('Application started');
logger.debug('Detailed debug information');

logger.info({
    message: 'User logged in',
    userId: '12345',
    timestamp: new Date().toISOString()
});

// Example function that can throw an error
function divideNumbers(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero!");
    }
    return a / b;
}

function main() {
    try {
        const result = divideNumbers(10, 0); // This will throw an error
        console.log("Result:", result);
    } catch (error) {
        console.error("An error occurred:", error.message);
    } finally {
        console.log("This runs whether there was an error or not.");
    }
}

main();
