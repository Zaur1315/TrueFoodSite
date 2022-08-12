import Calculator from './Modules/Calculator';
import Cards from './Modules/Cards';
import Form from './Modules/Form';
import Modal from './Modules/Modal';
import Slider from './Modules/Slider';
import Tabs from './Modules/Tabs';
import Timer from './Modules/Timer';
import {openModal} from './Modules/Modal';

window.addEventListener('DOMContentLoaded', ()=> {

    const modalTimeId = setTimeout(() => openModal('.modal',modalTimeId), 50000);

Calculator();
Cards();
Form('form', modalTimeId);
Modal('[data-modal]','.modal',modalTimeId);
Slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    slide: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    currentCounter: '#current',
    totalCounter: '#total',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slide__inner'

});
Tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
Timer('.timer','2022-10-25');

})