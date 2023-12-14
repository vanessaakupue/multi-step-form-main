document.addEventListener("DOMContentLoaded", function () {
    const totalTabs = 4;
    let currentTab = 0;

    const numberElements = document.querySelectorAll(".number");
    const tabElements = document.querySelectorAll(".tab");
    const thankYouPage = document.querySelector(".thank-you-cont");
    const btnDiv = document.querySelector(".btn-div");
    const prevButton = document.querySelector(".prev-one");
    const nextButton = document.querySelector(".next-one");

    // STEP 2
    const monthlyCheckbox = document.querySelector('input[type="checkbox"]');
    const MpriceElements = document.querySelectorAll('.Mprice');
    const YpriceElements = document.querySelectorAll('.Yprice');
    const yearTextElements = document.querySelectorAll('.year-text');
    const month = document.querySelector('.monthly');
    const year = document.querySelector('.yearly');

    // STEP 3
    const stepThreeMonth = document.querySelectorAll(".three-month");
    const stepThreeYear = document.querySelectorAll(".three-year");
    const stepThreeCheckbox = document.querySelectorAll(".checkboxx");

    // STEP 4

    prevButton.style.display = "none";

    function showTab(tabIndex) {
        tabElements.forEach((tab, index) => {
            if (index === tabIndex) {
                tab.style.display = "block";
            } else {
                tab.style.display = "none";
            }
        });
    }

    function updateActiveNumber() {
        numberElements.forEach((number, index) => {
            if (index === currentTab) {
                number.classList.add("number-active");
            } else {
                number.classList.remove("number-active");
            }
        });
    }

    function handleNext() {

        // STEP ONE FORM VALIDATION

        const nameOne = document.querySelector("#name-one").value;
        const emailOne = document.querySelector("#email-one").value;
        const numOne = document.querySelector("#num-one").value;

        if(nameOne==='') {
            document.querySelector('.name-error-message').style.display = 'block';
            document.querySelector('#name-one').classList.add('error-outline');
        } else {
            document.querySelector('.name-error-message').style.display = 'none';
            document.querySelector('#name-one').classList.remove('error-outline');
        } if (emailOne==='') {
            document.querySelector('.email-error-message').style.display = 'block';
            document.querySelector('#email-one').classList.add('error-outline');
        } else {
            document.querySelector('.email-error-message').style.display = 'none';
            document.querySelector('#email-one').classList.remove('error-outline');
        } if (numOne==='') {
            document.querySelector('.num-error-message').style.display = 'block';
            document.querySelector('#num-one').classList.add('error-outline');
        } else {
            document.querySelector('.num-error-message').style.display = 'none';
            document.querySelector('#num-one').classList.remove('error-outline');
        } if (nameOne !== '' && emailOne !== '' && numOne !== '') {

            // NEXT BUTTON

            if (currentTab < totalTabs) {
                currentTab++;
                showTab(currentTab);
                updateActiveNumber();

                if (currentTab === totalTabs - 1) {
                    nextButton.textContent = "Confirm";
                }

                if (currentTab > 0) {
                    prevButton.style.display = "block";
                }
            }
        }

    }

    function handlePrev() {
        if (currentTab > 0) {
            currentTab--;
            showTab(currentTab);
            updateActiveNumber();

            if (currentTab === 0) {
                prevButton.style.display = "none";
            }

            if (currentTab < totalTabs) {
                nextButton.textContent = "Next Step";
            }
        }
    }


    // STEP TWO
    function updateBillingCycle() {
        if (monthlyCheckbox.checked) {
            MpriceElements.forEach(element => element.style.display = 'none');
            YpriceElements.forEach(element => element.style.display = 'block');
            yearTextElements.forEach(element => element.style.display = 'block');
            month.classList.remove('checkbox-active');
            year.classList.add('checkbox-active');
            stepThreeMonth.forEach(threeMonth => threeMonth.style.display = 'none');
            stepThreeYear.forEach(threeYear => threeYear.style.display = 'block');

        } else {
            MpriceElements.forEach(element => element.style.display = 'block');
            YpriceElements.forEach(element => element.style.display = 'none');
            yearTextElements.forEach(element => element.style.display = 'none');
            month.classList.add('checkbox-active');
            year.classList.remove('checkbox-active');
            stepThreeMonth.forEach(threeMonth => threeMonth.style.display = 'block');
            stepThreeYear.forEach(threeYear => threeYear.style.display = 'none');
        }

    }

    function handlePlanClick() {
        let planPayElements = document.querySelectorAll('.plan-pay');

        planPayElements.forEach(plan => {
            plan.addEventListener('click', function () {
                planPayElements.forEach(pay => pay.classList.remove('plan-pay-active'));
                this.classList.add('plan-pay-active');
            });
        });
    }

    monthlyCheckbox.addEventListener('change', updateBillingCycle);



      // STEP 4
      let planPay = document.querySelectorAll(".plan-pay");
      const arcadeName = document.querySelector(".arcade-name");
      const advancedName = document.querySelector(".advanced-name");
      const proName = document.querySelector(".pro-name");
      const mArcade = document.querySelector(".m-arcade");
      const mAdvanced = document.querySelector(".m-advanced");
      const mPro = document.querySelector(".m-pro");
      const yArcade = document.querySelector(".y-arcade");
      const yAdvanced = document.querySelector(".y-advanced");
      const yPro = document.querySelector(".y-pro");
      let planpayName = document.querySelector(".plan-pay-name");
      let planpayAmt = document.querySelector(".plan-pay-amt");
  
  
      function addPlan() {
          const getPlanInfo = (name, amount, timeUnit) => {
              const planName = `${name.innerHTML} (${timeUnit.innerHTML})`;
              const planAmt = amount.innerHTML;
              localStorage.setItem("planSelected", planName);
              localStorage.setItem("planAmt", planAmt);
              showSelected();
          };
  
          planPay.forEach(plan => {
              plan.addEventListener('click', function() {
                  if (month.classList.contains('checkbox-active')) {
                      if (plan.classList.contains('arcade-cont')) {
                          getPlanInfo(arcadeName, mArcade, month);
                      } else if (plan.classList.contains('advanced-cont')) {
                          getPlanInfo(advancedName, mAdvanced, month);
                      } else {
                          getPlanInfo(proName, mPro, month);
                      }
                  } else {
                      if (plan.classList.contains('arcade-cont')) {
                          getPlanInfo(arcadeName, yArcade, year);
                      } else if (plan.classList.contains('advanced-cont')) {
                          getPlanInfo(advancedName, yAdvanced, year);
                      } else {
                          getPlanInfo(proName, yPro, year);
                      }
                  }
              });
          });
      }

      function showSelected() {
          planpayName.innerHTML = localStorage.getItem("planSelected");
          planpayAmt.innerHTML = localStorage.getItem("planAmt");
      }

      addPlan();



    function calculateTotal() {
        // Get selected plan details
        const selectedPlanName = localStorage.getItem("planSelected");
        const selectedPlanAmt = parseFloat(localStorage.getItem("planAmt"));

        // Get billing cycle (monthly or yearly)
        const isMonthly = document.querySelector('.monthly').classList.contains('checkbox-active');

        // Calculate total based on selected plan and billing cycle
        let total = isMonthly ? selectedPlanAmt : selectedPlanAmt * 12;

        // Get selected add-ons
        const addOnSelectedContainer = document.querySelector(".addon-sel");
        const selectedAddons = addOnSelectedContainer.querySelectorAll("p");

        // Calculate total for selected add-ons
        selectedAddons.forEach((addon) => {
            const addonText = addon.textContent;
            const addonPrice = parseFloat(isMonthly ? addon.querySelector(".three-month") : addon.querySelector(".three-year"));

            // Add addon price to total
            total += addonPrice;
        });

        // Display the total amount
        const finalTotalText = document.querySelector(".final-total-text");
        const totalAmtElement = document.querySelector(".total-amt");

        // Update the text based on billing cycle
        finalTotalText.textContent = `Total (Per ${isMonthly ? 'Month' : 'Year'})`;

        const numericTotal = total.toFixed(2).replace(/[^\d.]/g, '');

        totalAmtElement.textContent = `$${numericTotal} ${isMonthly ? '/mo' : '/yr'}`;

        console.log(numericTotal);
    }

    // Call the calculateTotal function whenever user makes a selection or changes a value
    document.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.addEventListener("change", calculateTotal);
    });

    document.querySelectorAll('.plan-pay').forEach(function (plan) {
        plan.addEventListener("click", calculateTotal);
    });

    calculateTotal();
    showSelected();

    let arrayPrice = [];


    stepThreeCheckbox.forEach(function (addOnChecked) {
        addOnChecked.addEventListener("change", function () {
            const addonOne = addOnChecked.closest(".addon-one");
            const addOnSelectedContainer = document.querySelector(".addon-sel");
            if (addOnChecked.checked) {
                addonOne.classList.add('addon-active');

                const showText = addonOne.querySelector(".add-text").innerHTML;
                const showMn = addonOne.querySelector(".three-month").innerHTML;
                const show = addonOne.querySelector(".three-year").innerHTML;

                arrayPrice.push([showText, showMn, show]);

                addOnSelectedContainer.innerHTML = "";

                arrayPrice.forEach(function (item) {
                    const createP = document.createElement('p');
                    createP.textContent = `${item[0]}`;
                    addOnSelectedContainer.appendChild(createP);

                    if (month.classList.contains('checkbox-active')) {
                        const createMn = document.createElement('span');
                        createMn.textContent = `${item[1]}`;
                        createP.appendChild(createMn);
                    } else {
                        const createYear = document.createElement('span');
                        createYear.textContent = `${item[2]}`;
                        createP.appendChild(createYear);
                    }
                });

            } else {
                addonOne.classList.remove('addon-active');

                const indexToRemove = arrayPrice.findIndex(item =>
                    item[0] === addonOne.querySelector(".add-text").innerHTML &&
                    item[1] === addonOne.querySelector(".three-month").innerHTML &&
                    item[2] === addonOne.querySelector(".three-year").innerHTML
                );

                if (indexToRemove !== -1) {
                    arrayPrice.splice(indexToRemove, 1);
                }

                addOnSelectedContainer.innerHTML = "";

                arrayPrice.forEach(function (item) {
                    const createP = document.createElement('p');
                    createP.textContent = `${item[0]}`;
                    addOnSelectedContainer.appendChild(createP);

                    if (month.classList.contains('checkbox-active')) {
                        const createMn = document.createElement('span');
                        createMn.textContent = `${item[1]}`;
                        createP.appendChild(createMn);
                    } else {
                        const createYear = document.createElement('span');
                        createYear.textContent = `${item[2]}`;
                        createP.appendChild(createYear);
                    }
                });

            }

        });
    });




    nextButton.addEventListener("click", function () {
        handleNext();
    });

    prevButton.addEventListener("click", function () {
        handlePrev();
    });

    nextButton.addEventListener("click", function () {
        if (currentTab === totalTabs) {
            btnDiv.style.display = "none";
            thankYouPage.style.display = "block";
        }
    });


    handlePlanClick();
    showSelected();

});

