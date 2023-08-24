
export const getPasswordStrength = (password: string): "weak" | "medium" | "strong" => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    if (strongRegex.test(password)) {
      return "strong";
    } else if (mediumRegex.test(password)) {
      return "medium";
    } else {
      return "weak";
    }
  };