/**
 * Centralized error handler for API and application errors.
 * @param {Error} error - The error object to process.
 * @returns {Object} - A standardized error response object.
 */
export const errorHandler = (error) => {
  let message = 'Something went wrong. Please try again later.';
  let statusCode = 500;

  if (error.response) {
    // server-side error
    statusCode = error.response.status;
    message = error.response.data?.message || `Server Error: ${statusCode}`;
  } else if (error.request) {
    // client-side request error (no response)
    message = 'No response from server. Check your internet connection.';
    statusCode = 0;
  } else {
    // logic error
    message = error.message;
  }

  console.error('[Error Handler]:', { statusCode, message, error });

  return {
    success: false,
    message,
    statusCode,
  };
};
