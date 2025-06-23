const leakedDatabase = [
  { username: "john@example.com", password: "123456" },
  { username: "jane@example.com", password: "password" },
  { username: "testuser", password: "qwerty123" },
  { username: "admin", password: "letmein" },
  { username: "user@example.com", password: "12345678" },
  { username: "foo@bar.com", password: "iloveyou" }
];

const leakedPasswords = leakedDatabase.map(entry => entry.password.toLowerCase());

function checkPasswordStrength(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) return "Password must be at least 8 characters long.";
  if (!hasUppercase) return "Password should contain at least one uppercase letter.";
  if (!hasLowercase) return "Password should contain at least one lowercase letter.";
  if (!hasDigit) return "Password should contain at least one digit.";
  if (!hasSpecialChar) return "Password should contain at least one special character.";

  return null; // Strong enough
}

function checkCredentials(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username").value.trim().toLowerCase();
  const passwordInput = document.getElementById("password").value.trim();

  const resultDiv = document.getElementById("result");

  // Check password strength first
  const passwordWarning = checkPasswordStrength(passwordInput);
  if (passwordWarning) {
    resultDiv.innerHTML = `<span class="warn">⚠️ ${passwordWarning}</span>`;
    return;
  }

  // Check for exact match (high risk)
  const fullMatch = leakedDatabase.find(
    (entry) =>
      entry.username.toLowerCase() === usernameInput &&
      entry.password === passwordInput
  );

  // Check for password-only match (medium risk)
  const passwordMatch = leakedPasswords.includes(passwordInput.toLowerCase());

  if (fullMatch) {
    resultDiv.innerHTML = `
      <span class="alert">
        🔴 HIGH RISK: Your exact username and password were found in a known breach.<br>
        <strong>Immediately change your password and use a password manager.</strong>
      </span>
    `;
  } else if (passwordMatch) {
    resultDiv.innerHTML = `
      <span class="warn">
        🟠 MEDIUM RISK: This password appears in a known breach, even if the username doesn’t.<br>
        <strong>Stop reusing compromised passwords.</strong>
      </span>
    `;
  } else {
    resultDiv.innerHTML = `
      <span class="safe">
        🟢 LOW RISK: Your credentials were not found in our simulated breach data.<br>
        Continue using strong, unique passwords for every site.
      </span>
    `;
  }
}


