/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/Modules/Calculator.js":
/*!**********************************!*\
  !*** ./js/Modules/Calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Calculator = () => {
    const result = document.querySelector('.calculating__result span');
let sex, height, weight, age, ratio;

if(localStorage.getItem('sex')){
    sex = localStorage.getItem('sex');
}else{
    sex = 'female';
    localStorage.setItem('sex', 'female')
}
if(localStorage.getItem('ratio')){
    ratio = localStorage.getItem('ratio');
}else{
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375)
}




function calcTotal() {
    if(!sex || !height || !weight || !age || !ratio){
        result.textContent = "";
        return;
    }
    if(sex === 'female'){
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    }else{
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        
    }
}

calcTotal();

function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });
}

initLocalSettings('#gender div', 'calculating__choose-item_active')
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')



function getStaticInformatio(selector, activeClass){
    const element = document.querySelectorAll(selector);

    element.forEach(elem =>{
        elem.addEventListener('click', (e)=>{
            if (e.target.getAttribute('data-ratio')){
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
            }else{
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id') )
            }
    
            
    
            element.forEach(elem =>{
                elem.classList.remove(activeClass);
            });
    
            e.target.classList.add(activeClass);
    
            calcTotal()


            })
        })
    }


       


getStaticInformatio('#gender div', 'calculating__choose-item_active')
getStaticInformatio('.calculating__choose_big div', 'calculating__choose-item_active')


function getDinamicInformatio (selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () =>{

        if(input.value.match(/\D/g)){
            // input.style.border = '1px solid red'
            input.style.backgroundColor = '#fea2a2'
        }else{
            input.style.border = ' none';
            input.style.backgroundColor = '#fff'
        }

        switch(input.getAttribute('id')){
            case 'height' :
                height = +input.value;
                break;
            case 'weight' :
                weight = +input.value;
                break;
            case 'age' :
                age = +input.value;
                break;
        }
        
        calcTotal()
    })

    
}

getDinamicInformatio('#height')
getDinamicInformatio('#weight')
getDinamicInformatio('#age')
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Calculator);

/***/ }),

/***/ "./js/Modules/Cards.js":
/*!*****************************!*\
  !*** ./js/Modules/Cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Services_Services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Services/Services */ "./js/Services/Services.js");


const Cards = () => {
    
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');
            if(this.classes.length ===0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else{
            this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`

        this.parent.append(element);
        }
  
      }

    axios.get('http://localhost:3000/menu')
        .then(data =>  data.data.forEach(({img, altimg, title, descr, price})=>{
                        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                     }))

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cards);

/***/ }),

/***/ "./js/Modules/Form.js":
/*!****************************!*\
  !*** ./js/Modules/Form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal */ "./js/Modules/Modal.js");
/* harmony import */ var _Services_Services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Services/Services */ "./js/Services/Services.js");




const Form = (modalTimeId) =>{
    const forms = document.querySelectorAll('form');

const message = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
}

forms.forEach(item=>{
    bindPostData(item);
});


function bindPostData(form){
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display : block;
        margin: 0 auto;`
        form.insertAdjacentElement('afterend', statusMessage)


        const formData = new FormData(form);
        

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         
        (0,_Services_Services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests',json)
        .then(data =>{    
                     console.log(data);
                     showThanksModal(message.success);
                     statusMessage.remove();
        }).catch(()=>{
            showThanksModal(message.failure);
        }).finally(()=>{
            form.reset();
        })


    })
}

function showThanksModal(message){
    const prevModalDialog = document.querySelector('.modal__dialog')

    prevModalDialog.classList.add('hide');
    (0,_Modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal',modalTimeId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog')
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div className="modal__title">${message}</div>
    </div>
    `;
    document.querySelector('.modal').append(thanksModal);

    setTimeout(()=>{
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        (0,_Modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    },4000);
}

fetch('  http://localhost:3000/menu ').then(data => data.json())
                .then(res => console.log(res));


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);

/***/ }),

/***/ "./js/Modules/Modal.js":
/*!*****************************!*\
  !*** ./js/Modules/Modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector){
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = ''
}

function openModal(modalSelector, modalTimeId){
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide')
  document.body.style.overflow = 'hidden';
  console.log(modalTimeId)
  if (modalTimeId){
    clearInterval(modalTimeId);
  }
  
}


const Modal = (triggerSelector, modalSelector, modalTimeId)=>{

    const modalTrigger =  document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector);


      modalTrigger.forEach((i)=>{
        i.addEventListener('click',() => openModal(modalSelector,modalTimeId))
      })

 

      modal.addEventListener('click',(e)=>{
        if (e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal(modalSelector)
        }
      });

      document.addEventListener('keydown',(e)=>{
        if(e.code == 'Escape' && modal.style.display == 'block'){
        closeModal(modalSelector)
        
        }
      })


       function showModalByScroll(){
         if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
             openModal(modalSelector, modalTimeId);
             window.removeEventListener('scroll', showModalByScroll)
         }
       }
       window.addEventListener('scroll', showModalByScroll )
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);




/***/ }),

/***/ "./js/Modules/Slider.js":
/*!******************************!*\
  !*** ./js/Modules/Slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Slider = ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) =>{

    const slides = document.querySelectorAll(slide),
      slider = document.querySelector(container),
      prev = document.querySelector(prevArrow),
      next = document.querySelector(nextArrow),
      current = document.querySelector(currentCounter),
      total = document.querySelector(totalCounter),
      slidesWrapper = document.querySelector(wrapper),
      slidesField = document.querySelector(field),
      width = window.getComputedStyle(slidesWrapper).width;
     


let slideIndex = 1;
let offset = 0;

if(slides.length < 10){
    total.textContent = `0${slides.length}`
    current.textContent = `0${slideIndex}`
}else{
    total.textContent = slides.length;
    current.textContent = slideIndex;
}
 

slidesField.style.width = 100 * slides.length + '%';

slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all'

slidesWrapper.style.overflow = 'hidden'

slides.forEach(slide=>{
    slide.style.width = width;
})

slider.style.position = 'relative';

const indicetors = document.createElement('ol'),
      dots = [];
      
indicetors.classList.add('carousel-indicators');
indicetors.style.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;`;

slider.append(indicetors);

for (let i = 0; i < slides.length; i++){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i+1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;
    if(i == 0){
        dot.style.opacity = 0.9;
    }
    indicetors.append(dot);
    dots.push(dot);
}

function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
}

next.addEventListener('click', ()=>{
    if(offset == deleteNotDigits(width) * (slides.length -1)){
        offset = 0;
    }else{
        offset += deleteNotDigits(width)
    }

    slidesField.style.transform = `translateX(-${offset}px)`

    if(slideIndex == slides.length){
        slideIndex = 1;

    }else{
        slideIndex++;
    }

    if(slides.length <10){
        current.textContent = `0${slideIndex}`;
    }else{
        current.textContent = slideIndex;
    }
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex -1].style.opacity = 0.9;
})
prev.addEventListener('click', ()=>{
    if(offset == 0){
        offset = deleteNotDigits(width) * (slides.length -1);
    }else{
        offset -= deleteNotDigits(width)
    }

    slidesField.style.transform = `translateX(-${offset}px)`

    if(slideIndex == 1){
        slideIndex = slides.length;

    }else{
        slideIndex--;
    }

    if(slides.length <10){
        current.textContent = `0${slideIndex}`;
    }else{
        current.textContent = slideIndex;
    }
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex -1].style.opacity = 0.9;

})

dots.forEach(dot =>{
    dot.addEventListener('click',(e)=>{
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo -1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slides.length <10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex -1].style.opacity = 0.9;

        
    })
})
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slider);

/***/ }),

/***/ "./js/Modules/Tabs.js":
/*!****************************!*\
  !*** ./js/Modules/Tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Tabs = (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass)=>{

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);
    

function hideTabContent(){
        tabsContent.forEach(item=>{
             item.classList.add('hide');
             item.classList.remove('show','fade');
    });

    tabs.forEach(item => {
        item.classList.remove(activeClass);
    });
}

function showTabContent(i=0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');

}

hideTabContent();

showTabContent();

tabsParent.addEventListener('click', (event)=>{
    const target = event.target;

    if(target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((item, i)=>{
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            })
    }
});
    

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tabs);

/***/ }),

/***/ "./js/Modules/Timer.js":
/*!*****************************!*\
  !*** ./js/Modules/Timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Timer = (id, deadLine)=>{
    //const deadLine = '2022-10-25';

function getTimeRemaining(endtime){
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 *24)),
          hours = Math.floor((t /( 1000 * 60 * 60) % 24)),
          minutes = Math.floor((t / 1000 / 60) % 60),
          seconds = Math.floor((t / 1000) % 60);
          
    return {
        'total' : t,
        'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
    }
}

function getZero(num){
    if(num >= 0 && num < 10) {
        return `0${num}`;
    }else{
        return num;
    }
};

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          minutes = timer.querySelector('#minutes'),
          hours = timer.querySelector('#hours'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    
        updateClock()

        function updateClock(){
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        minutes.innerHTML = getZero(t.minutes);
        hours.innerHTML = getZero(t.hours);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <=0) {
            clearInterval(timeInterval);
        }
    }
}

    setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timer);

/***/ }),

/***/ "./js/Services/Services.js":
/*!*********************************!*\
  !*** ./js/Services/Services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResurce": () => (/* binding */ getResurce),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
             'Content-type': "application/json"
         },
        body: data
    });
    return await res.json();
};

const getResurce = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modules_Calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modules/Calculator */ "./js/Modules/Calculator.js");
/* harmony import */ var _Modules_Cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modules/Cards */ "./js/Modules/Cards.js");
/* harmony import */ var _Modules_Form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modules/Form */ "./js/Modules/Form.js");
/* harmony import */ var _Modules_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Modules/Modal */ "./js/Modules/Modal.js");
/* harmony import */ var _Modules_Slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Modules/Slider */ "./js/Modules/Slider.js");
/* harmony import */ var _Modules_Tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Modules/Tabs */ "./js/Modules/Tabs.js");
/* harmony import */ var _Modules_Timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Modules/Timer */ "./js/Modules/Timer.js");









window.addEventListener('DOMContentLoaded', ()=> {

    const modalTimeId = setTimeout(() => (0,_Modules_Modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal',modalTimeId), 50000);

(0,_Modules_Calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_Modules_Cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_Modules_Form__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimeId);
(0,_Modules_Modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]','.modal',modalTimeId);
(0,_Modules_Slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    slide: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    currentCounter: '#current',
    totalCounter: '#total',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slide__inner'

});
(0,_Modules_Tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
(0,_Modules_Timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer','2022-10-25');

})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map