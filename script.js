document.addEventListener("DOMContentLoaded", function() {
    const taxForm = document.getElementById("taxForm");
    const calculateBtn = document.getElementById("calculateBtn");
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    
    calculateBtn.addEventListener("click", function() {
      if (validateForm()) {
        calculateTax();
        modal.style.display = "block";
      }
    });
  
    span.onclick = function() {
      modal.style.display = "none";
    };
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  
    function validateForm() {
      let isValid = true;
      const inputs = taxForm.querySelectorAll("input, select");
      inputs.forEach(input => {
        const errorIcon = input.parentElement.querySelector(".error-icon"); // Select the error icon within the same form group
        if (!input.value.trim()) { // Check if input value is empty
          showError(errorIcon, "This field is required.");
          isValid = false;
        } else if (input.type === "text" && isNaN(Number(input.value))) { // Check if input is not a valid number
          showError(errorIcon, "Invalid input! Must be a number.");
          isValid = false;
        } else {
          hideError(errorIcon);
        }
      });
      return isValid;
    }
    
    
  
    function showError(errorIcon, errorMessage) {
      errorIcon.style.display = "block";
      errorIcon.setAttribute("title", errorMessage);
    }
  
    function hideError(errorIcon) {
      errorIcon.style.display = "none";
    }
  
    function calculateTax() {
      const grossIncome = parseFloat(document.getElementById("grossIncome").value);
      const extraIncome = parseFloat(document.getElementById("extraIncome").value);
      const deductions = parseFloat(document.getElementById("deductions").value);
      const age = document.getElementById("age").value;
  
      let taxableIncome = (grossIncome + extraIncome - deductions)-8 ;
      if (taxableIncome <= 0) {
        taxableIncome = 0;
      }
  
      let taxRate = 0;
      switch (age) {
        case "<40":
          taxRate = 0.3;
          break;
        case "40-60":
          taxRate = 0.4;
          break;
        case ">=60":
          taxRate = 0.1;
          break;
        default:
          break;
      }
  
      const taxAmount = taxRate * taxableIncome;
      const incomeAfterTaxDeductions = taxableIncome - taxAmount;

      const result = document.getElementById("taxResult");
      result.innerHTML = `
        <p>Taxable Income: ${taxableIncome} Lakhs</p>
        <p>Tax Rate: ${taxRate * 100}%</p>
        <p>Tax Amount: ${taxAmount.toFixed(2)} Lakhs</p>
        <p><strong>Income after tax deductions: ${incomeAfterTaxDeductions.toFixed(2)} Lakhs</strong></p>
      `;
    }
  });