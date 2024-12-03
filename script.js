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
  let currentStep = 2;
  const steps = document.querySelectorAll('.step');

  function showStep(index) {
    // Hide all steps
    steps.forEach(step => step.style.display = 'none');

    // Show the current step
    steps[index].style.display = 'block';
  }

  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
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
});

document.addEventListener("DOMContentLoaded", function () {
    const otpInputs = document.querySelectorAll("#otp_container .form-control");

    // Handle paste event on the first input
    otpInputs[0].addEventListener("paste", function (event) {
        event.preventDefault();

        // Get the pasted data
        const pasteData = (event.clipboardData || window.clipboardData).getData("text");
        
        if (!/^\d{6}$/.test(pasteData)) {
            alert("Please paste a valid 6-digit OTP.");
            return;
        }

        // Fill the inputs with the pasted data
        otpInputs.forEach((input, index) => {
            input.value = pasteData[index] || "";
        });
    });

    // Automatically move to the next input when a digit is entered
    otpInputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            if (input.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        // Move to the previous input on backspace
        input.addEventListener("keydown", function (event) {
            if (event.key === "Backspace" && input.value === "" && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
});
