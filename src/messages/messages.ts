
export const successMessage = (message: string) => {
    return {
      type: 'success',
      text: message,
    };
  };
  
  export const errorMessage = (message: string) => {
    return {
      type: 'error',
      text: message,
    };
  };
  
  export const infoMessage = (message: string) => {
    return {
      type: 'info',
      text: message,
    };
  };
  