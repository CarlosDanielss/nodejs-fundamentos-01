export class UserSchema {
  static name(name) {
    const regex = /^([a-zA-Zç~^`´]+(?:\s[a-zA-Zç~^`´]+)*)$/;
    const removeSpacesInName = name.trim();

    return {
      name: removeSpacesInName,
      isValid: regex.test(removeSpacesInName),
    };
  }

  static email(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;
    const removeSpacesInEmail = email.trim();

    return {
      email: removeSpacesInEmail,
      isValid: regex.test(removeSpacesInEmail),
    };
  }

  static password(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*.:;?])[a-zA-Z\d!@#$%*.:;?]{8,20}$/;
    const removeSpacesInPassword = password.trim();

    return {
      password: removeSpacesInPassword,
      isValid: regex.test(removeSpacesInPassword),
    };
  }
}
