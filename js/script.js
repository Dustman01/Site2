'use strict';

//            TABS

const tab = document.querySelector('.tabheader__items');
const tabs = tab.querySelectorAll('.tabheader__item');
const tabContents = document.querySelectorAll('.tabcontent');

function tabsMenu(){
    tabs.forEach((tab, id) => {
        tab.addEventListener('click', e =>{
            if(e.target){
                showTabs(e.target);
                showTabContents(id);
            }
        });
    });

}

function showTabs(tab){
    hiddTabs();
    tab.classList.add('tabheader__item_active');
}
let i = 0;

function hiddTabs(){
    tabs.forEach(itam => {
            itam.classList.remove('tabheader__item_active');
    });
}

function showTabContents(id){
    hiddTabContents();
    tabContents[id].style.display = 'block';
}

function hiddTabContents(){
    tabContents.forEach(tab =>{
        tab.style.display = 'none';
    });
}
tabsMenu();
showTabContents(0);


// связаться с нами

const btns = document.querySelectorAll('[data-btn]');
const modal = document.querySelector('.modal');
const btnClosModal = document.querySelector('[data-modlClose]');

//modal.style.display = 'block';

btns.forEach(btn =>{
    btn.addEventListener('click', e =>{
        showModal();
    });
});

function showModal(){
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closModal(){
    modal.addEventListener('click', e =>{
        if(modal === e.target){
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    btnClosModal.addEventListener('click', e => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    document.addEventListener('keydown', e =>{
        if(e.code === 'Escape' && modal.style.display === 'block'){
            console.log(modal.style.display);
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

closModal();