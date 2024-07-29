export const handleApiError = (error: any): void => {
  console.error('API call failed:', error);
  throw error;
};
