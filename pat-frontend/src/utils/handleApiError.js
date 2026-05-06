export const handleApiError = (error) => {
  if (!error) {
    return "An unexpected error occurred. Please try again.";
  }

  if (typeof error === "string") {
    return error;
  }

  if (typeof error === "object" && error.message) {
    return error.message;
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

  return error?.message || "An unexpected error occurred. Please try again.";
};
