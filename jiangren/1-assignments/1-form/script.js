// 获取DOM元素
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');
const passwordStrength = document.getElementById('password-strength');
const submitBtn = document.getElementById('btn');

// Email验证函数
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password强度验证函数
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  let strength = 0;
  let feedback = [];

  if (password.length >= minLength) strength++;
  else feedback.push(`至少${minLength}个字符`);

  if (hasUpperCase) strength++;
  else feedback.push('包含大写字母');

  if (hasLowerCase) strength++;
  else feedback.push('包含小写字母');

  if (hasNumbers) strength++;
  else feedback.push('包含数字');

  if (hasSpecialChar) strength++;
  else feedback.push('包含特殊字符');

  return { strength, feedback, isValid: strength >= 3 };
}

// 显示错误信息
function showError(element, message) {
  element.textContent = message;
  element.style.display = 'block';
}

// 隐藏错误信息
function hideError(element) {
  element.textContent = '';
  element.style.display = 'none';
}

// 添加输入框错误状态
function addErrorState(input) {
  input.classList.remove('success');
  input.classList.add('error');
}

// 添加输入框成功状态
function addSuccessState(input) {
  input.classList.remove('error');
  input.classList.add('success');
}

// 移除输入框状态
function removeState(input) {
  input.classList.remove('error', 'success');
}

// Email实时验证
emailInput.addEventListener('input', function () {
  const email = this.value.trim();

  if (email === '') {
    hideError(emailError);
    removeState(this);
  } else if (!validateEmail(email)) {
    showError(emailError, '请输入有效的邮箱地址');
    addErrorState(this);
  } else {
    hideError(emailError);
    addSuccessState(this);
  }
});

// Password实时验证
passwordInput.addEventListener('input', function () {
  const password = this.value;

  if (password === '') {
    hideError(passwordError);
    passwordStrength.style.display = 'none';
    removeState(this);
  } else {
    const validation = validatePassword(password);

    if (validation.isValid) {
      hideError(passwordError);
      addSuccessState(this);
    } else {
      showError(passwordError, validation.feedback.join(', '));
      addErrorState(this);
    }

    // 显示密码强度
    passwordStrength.style.display = 'block';
    const strengthText = ['很弱', '弱', '中等', '强', '很强'];
    const strengthColor = [
      '#ff4444',
      '#ff8800',
      '#ffaa00',
      '#00aa00',
      '#008800',
    ];

    passwordStrength.textContent = `密码强度: ${strengthText[validation.strength - 1]}`;
    passwordStrength.style.color = strengthColor[validation.strength - 1];
  }

  // 如果确认密码已输入，重新验证
  if (confirmPasswordInput.value) {
    validateConfirmPassword();
  }
});

// 确认密码验证
function validateConfirmPassword() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (confirmPassword === '') {
    hideError(confirmPasswordError);
  } else if (password !== confirmPassword) {
    showError(confirmPasswordError, '密码不匹配');
  } else {
    hideError(confirmPasswordError);
  }
}

confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// 表单提交验证
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  let hasErrors = false;

  // 验证Email
  if (email === '') {
    showError(emailError, '请输入邮箱地址');
    hasErrors = true;
  } else if (!validateEmail(email)) {
    showError(emailError, '请输入有效的邮箱地址');
    hasErrors = true;
  }

  // 验证Password
  if (password === '') {
    showError(passwordError, '请输入密码');
    hasErrors = true;
  } else if (!validatePassword(password).isValid) {
    showError(passwordError, '密码不符合要求');
    hasErrors = true;
  }

  // 验证确认密码
  if (confirmPassword === '') {
    showError(confirmPasswordError, '请确认密码');
    hasErrors = true;
  } else if (password !== confirmPassword) {
    showError(confirmPasswordError, '密码不匹配');
    hasErrors = true;
  }

  // 如果没有错误，可以提交表单
  if (!hasErrors) {
    alert('验证通过！表单可以提交了。');
    // 这里可以添加实际的表单提交逻辑
  }
});
