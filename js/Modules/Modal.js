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


export default Modal;

export {closeModal};
export {openModal};