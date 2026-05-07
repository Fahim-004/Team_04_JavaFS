export const handleApiError = (error) => {
  if (!error) {
    return "An unexpected error occurred. Please try again.";
  }

  if (typeof error === "string") {
    return error;
  }

  const responseData = error?.response?.data || error?.raw?.response?.data || error?.data;

  if (typeof responseData === "string") {
    return responseData;
  }

  if (responseData?.error) {
    return responseData.error;
  }

  if (responseData?.message) {
    return responseData.message;
  }

  if (typeof error === "object" && error.message) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
};
