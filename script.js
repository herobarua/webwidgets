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

  function updateProgressBar() {
    const progress = ((currentStep + 1) / totalSteps) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress.toFixed(0));
  }

  function showStep(index) {
    steps.forEach(step => step.style.display = 'none');
    steps[index].style.display = 'block';
    updateProgressBar();
  }

  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      localStorage.setItem('currentStep', currentStep); // Save current step to localStorage
      showStep(currentStep);
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      localStorage.setItem('currentStep', currentStep); // Save current step to localStorage
      showStep(currentStep);
    }
  }

  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', nextStep);
  });

  document.querySelectorAll('.prev-btn').forEach(btn => {
    btn.addEventListener('click', prevStep);
  });

  showStep(currentStep);
  updateProgressBar();
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

