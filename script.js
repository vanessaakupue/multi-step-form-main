document.addEventListener("DOMContentLoaded", function () {
    const totalTabs = 4;
    let currentTab = 0;

    const numberElements = document.querySelectorAll(".number");
    const tabElements = document.querySelectorAll(".tab");
    const thankYouPage = document.querySelector(".thank-you-cont");
    const btnDiv = document.querySelector(".btn-div");
    const prevButton = document.querySelector(".prev-one");
    const nextButton = document.querySelector(".next-one");

    // STEP 1
   

    // STEP 2
    const monthlyCheckbox = document.querySelector('input[type="checkbox"]');
    const MpriceElements = document.querySelectorAll('.Mprice');
    const YpriceElements = document.querySelectorAll('.Yprice');
    const yearTextElements = document.querySelectorAll('.year-text');
    const month = document.querySelector('.monthly');
    const year = document.querySelector('.yearly');




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


    // // STEP ONE
    // const bodyContOne = document.querySelector('.body-cont-one');
    // bodyContOne.addEventListener('submit', function(event) {
    //     let valid = true;

    //     // name
    //     const nameOne = document.getElementById('name-one').value;
    //     if (nameOne.trim() === '') {

    //     }


    // })




    // STEP TWO
    function updateBillingCycle() {
        if (monthlyCheckbox.checked) {
            MpriceElements.forEach(element => element.style.display = 'none');
            YpriceElements.forEach(element => element.style.display = 'block');
            yearTextElements.forEach(element => element.style.display = 'block');
            month.classList.remove('checkbox-active');
            year.classList.add('checkbox-active');
            
        } else {
            MpriceElements.forEach(element => element.style.display = 'block');
            YpriceElements.forEach(element => element.style.display = 'none');
            yearTextElements.forEach(element => element.style.display = 'none');
            month.classList.add('checkbox-active');
            year.classList.remove('checkbox-active');
        }
    }

    function handlePlanClick() {
        const planPayElements = document.querySelectorAll('.plan-pay');

        planPayElements.forEach(plan => {
            plan.addEventListener('click', function () {
                planPayElements.forEach(pay => pay.classList.remove('plan-pay-active'));
                this.classList.add('plan-pay-active');
            });
        });
    }

    




   

    monthlyCheckbox.addEventListener('change', updateBillingCycle);


    nextButton.addEventListener("click", function () {
        // validatePersonalInfo();
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

});



