export const getErrorMessage = (error: any): string => {
  if (error?.data?.message) {
    return error.data.message;
  }
  if (error?.error) {
    return error.error;
  }
  return 'An unknown error occurred';
};
