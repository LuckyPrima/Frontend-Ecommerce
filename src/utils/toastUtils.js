import { toast } from "react-hot-toast";

let lastUnauthorizedToastTime = 0;
const TOAST_DEBOUNCE_TIME = 2000;

/**
 * @param {string} message
 */
export const showUnauthorizedToast = (message) => {
  const currentTime = Date.now();
  if (currentTime - lastUnauthorizedToastTime > TOAST_DEBOUNCE_TIME) {
    toast.error(message);
    lastUnauthorizedToastTime = currentTime;
  }
};

/**
 * @param {object} error
 * @param {string} defaultMessage
 * @param {boolean} isUnauthorizedError
 */
export const handleErrorToast = (
  error,
  defaultMessage,
  isUnauthorizedError = false
) => {
  const errorMessage = error.response?.data?.message || defaultMessage;

  if (
    isUnauthorizedError &&
    error.response?.status === 401 &&
    errorMessage === "Unauthorized - No access token provided"
  ) {
    showUnauthorizedToast(errorMessage);
  } else {
    toast.error(errorMessage);
  }
  console.error("API call failed:", error);
};
