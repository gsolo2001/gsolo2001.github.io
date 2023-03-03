'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("button[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// service item variables
const serviceItems = document.querySelectorAll("li[data-filter-btn]");

// add click event to service items
for (let i = 0; i < serviceItems.length; i++) {
	serviceItems[i].addEventListener('click', () => {
		
		let selectedValue = serviceItems[i].querySelector(".service-item-title").innerText;
		
		goToPortfolioFilter(selectedValue);
		
	});
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
				removeActivePages();
				
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      }
    }

  });
}

// slider image variables
const sliderImages = document.querySelectorAll(".article-img-slider");
const imageSliders = document.querySelectorAll("input[type='range'].slider");
const sliderButtons = document.querySelectorAll(".slider-button");

// add event on image hover
for (let i = 0; i < imageSliders.length; i++) {
	 sliderImages[i].addEventListener("mouseover", function () {
		 sliderButtons[i].style.transform = "scale(1.2)";
	 });
	
	sliderImages[i].addEventListener("mouseout", function () {
		 sliderButtons[i].style.transform = "scale(1.0)";
	 });
}

// add movement to sliders
for (let i = 0; i < imageSliders.length; i++) {
	imageSliders[i].addEventListener("input", function () {
		const sliderPos = imageSliders[i].value;
		const foregroundImage = imageSliders[i].parentElement.querySelector(".foreground-img");
		
		
		foregroundImage.style.width = sliderPos - 0.5 + "%";
		sliderButtons[i].style.left = "calc("+sliderPos + "% - 19px)";
	});
}


// helper functions
function getElementByText (filter, str) {
	
	for (const element of document.querySelectorAll(filter))
		if (element.innerText.toLowerCase().includes(str.toLowerCase()))
			return element;
	
}

function goToPortfolioFilter(filter) {
	
	let filterBtn = getElementByText ("button[data-filter-btn]", filter);
	filterBtn.click();

	let pageBtn = getElementByText ("button[data-nav-link]", "portfolio");
	pageBtn.click();
	
}

function goToPage(page) {
	
	for (let i = 0; i < pages.length; i++) {
		if (pages[i].dataset.page == page) {
			removeActivePages();
			
			pages[i].classList.add("active");
			window.scrollTo(0, 0);
		}
	}
	
}

function removeActivePages() {
	for (let i = 0; i < pages.length; i++) {
		pages[i].classList.remove("active");
	}
	
	for (let i = 0; i < navigationLinks.length; i++) {
		navigationLinks[i].classList.remove("active");
	}
}