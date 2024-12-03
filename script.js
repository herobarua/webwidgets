$('#step_reservation').css('display', 'none');

function formatPhoneNumber(value) {
    let cleaned = value.replace(/\D/g, '');

    if (cleaned.length > 10) {
        cleaned = cleaned.slice(0, 10);
    }

    let formatted;
    if (cleaned.length <= 3) {
        formatted = cleaned;
    } else if (cleaned.length <= 6) {
        formatted = '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3);
    } else {
        formatted = '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6);
    }

    return formatted;
}
document.addEventListener('input', function (event) {
    if (event.target.matches('.telephone-input')) {
        event.target.value = formatPhoneNumber(event.target.value);
    }
});

$(document).ready(function () {
    $('.timeline__toggle_btn').click(function () {
        $(this).next('.timeline__toggle').slideToggle();
        $(this).toggleClass('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
  flatpickr("#inline-calendar", {
    inline: true,
    dateFormat: "Y-m-d",
  });
});

const actionSheetModal = document.getElementById('ionicActionSheet');
actionSheetModal.addEventListener('hide.bs.modal', (event) => {
  actionSheetModal.classList.add('slide-down');
});
actionSheetModal.addEventListener('hidden.bs.modal', (event) => {
  actionSheetModal.classList.remove('slide-down');
});

document.addEventListener('DOMContentLoaded', function () {
  let currentStep = localStorage.getItem('currentStep') ? parseInt(localStorage.getItem('currentStep')) : 0;
  const steps = document.querySelectorAll('.step');
  const progressBar = document.querySelector('.progress-bar');
  const totalSteps = steps.length;

  // Save form data to localStorage
  function saveFormData() {
    const formData = {};

    // Save checkbox values
    const checkboxes = document.querySelectorAll('.step input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      formData[checkbox.id] = checkbox.checked;
    });

    // Save text input (phone number) values
    const textInputs = document.querySelectorAll('.step input[type="tel"], .step input[type="text"], .step input[type="email"]');
    textInputs.forEach(input => {
      formData[input.id] = input.value;
    });

    // Save select values
    const select = document.querySelectorAll('.step select');
    select.forEach(selectElement => {
      formData[selectElement.id] = selectElement.value;
    });

    // Save textarea values
    const textareas = document.querySelectorAll('.step textarea');
    textareas.forEach(textarea => {
      formData[textarea.id] = textarea.value;
    });

    // Store form data in localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
  }

  // Load form data from localStorage
  function loadFormData() {
    const formData = JSON.parse(localStorage.getItem('formData')) || {};

    // Load checkbox values
    const checkboxes = document.querySelectorAll('.step input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = formData[checkbox.id] || false;
    });

    // Load text input (phone number) values
    const textInputs = document.querySelectorAll('.step input[type="tel"], .step input[type="text"], .step input[type="email"]');
    textInputs.forEach(input => {
      input.value = formData[input.id] || '';
    });

    // Load select values
    const select = document.querySelectorAll('.step select');
    select.forEach(selectElement => {
      selectElement.value = formData[selectElement.id] || '';
    });

    // Load textarea values
    const textareas = document.querySelectorAll('.step textarea');
    textareas.forEach(textarea => {
      textarea.value = formData[textarea.id] || '';
    });
  }

  // Update progress bar based on the current step
  function updateProgressBar() {
    const progress = ((currentStep + 1) / totalSteps) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress.toFixed(0));
  }

  // Show the current step
  function showStep(index) {
    steps.forEach(step => step.style.display = 'none');
    steps[index].style.display = 'block';
    updateProgressBar();
  }

  // Move to the next step
  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      localStorage.setItem('currentStep', currentStep); // Save current step
      saveFormData(); // Save form data
      showStep(currentStep);
    }
  }

  // Move to the previous step
  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      localStorage.setItem('currentStep', currentStep); // Save current step
      saveFormData(); // Save form data
      showStep(currentStep);
    }
  }

  // Event listeners for next and previous buttons
  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', nextStep);
  });

  document.querySelectorAll('.prev-btn').forEach(btn => {
    btn.addEventListener('click', prevStep);
  });

  // Load saved form data and show the correct step
  loadFormData();
  showStep(currentStep);
});

document.addEventListener("DOMContentLoaded", function () {
    const otpInputs = document.querySelectorAll("#otp_container .form-control");

    otpInputs[0].addEventListener("paste", function (event) {
        event.preventDefault();

        const pasteData = (event.clipboardData || window.clipboardData).getData("text");
        
        if (!/^\d{6}$/.test(pasteData)) {
            alert("Please paste a valid 6-digit OTP.");
            return;
        }

        otpInputs.forEach((input, index) => {
            input.value = pasteData[index] || "";
        });
    });

    otpInputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            if (!/^\d$/.test(input.value)) {
                input.value = "";
                return;
            }

            if (index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener("keydown", function (event) {
            if (event.key === "Backspace" && input.value === "" && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
});

