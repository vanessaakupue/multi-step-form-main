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
    const stepThreeCheckbox = document.querySelectorAll("#checkboxx");

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


    // STEP 3
    stepThreeCheckbox.forEach(function(addOnChecked) {
        addOnChecked.addEventListener("change", function(){
            const addonOne = addOnChecked.closest(".addon-one");

            if(addOnChecked.checked) {
                addonOne.classList.add('addon-active');
            } else {
                addonOne.classList.remove('addon-active');
            }
        })
    });


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


    



    // function addPlan(){
    //     planPay.forEach(plan => {
    //         plan.addEventListener('click', function() {
    //             if(month.classList.contains('checkbox-active')){
    //                 if(plan.classList.contains('arcade-cont')){
    //                     localStorage.setItem("planSelected", arcadeName.innerHTML + " " + "(" + month.innerHTML + ")");
    //                     localStorage.setItem("planAmt", mArcade.innerHTML);
    //                     showSelected();
    //                    } else if (plan.classList.contains('advanced-cont')){
    //                     localStorage.setItem("planSelected", advancedName.innerHTML + " "  + "(" + month.innerHTML + ")");
    //                     localStorage.setItem("planAmt", mAdvanced.innerHTML);
    //                     showSelected();
    //                    } else {
    //                     localStorage.setItem("planSelected", proName.innerHTML + " "  + "(" + month.innerHTML + ")");
    //                     localStorage.setItem("planAmt", mPro.innerHTML);
    //                     showSelected();
    //                 }

    //             } else {
    //                 if(plan.classList.contains('arcade-cont')){
    //                     localStorage.setItem("planSelected", arcadeName.innerHTML + " " + "(" + year.innerHTML + ")");
    //                     localStorage.setItem("planAmt", yArcade.innerHTML);
    //                     showSelected();
    //                    } else if (plan.classList.contains('advanced-cont')){
    //                     localStorage.setItem("planSelected", advancedName.innerHTML + " "  + "(" + year.innerHTML + ")");
    //                     localStorage.setItem("planAmt", yAdvanced.innerHTML);
    //                     showSelected();
    //                    } else {
    //                     localStorage.setItem("planSelected", proName.innerHTML + " "  + "(" + year.innerHTML + ")");
    //                     localStorage.setItem("planAmt", yPro.innerHTML);
    //                     showSelected();
    //                 }
    //             }

    //         //    showSelected();
    //         })
    //     })
    // };





    // function showSelected() {
    //     planpayName.innerHTML = localStorage.getItem("planSelected");
    //     planpayAmt.innerHTML = localStorage.getItem("planAmt");
    // };

    // addPlan();

    // showSelected();



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

