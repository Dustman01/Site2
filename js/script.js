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
const btnModals = document.querySelectorAll('[data-post]');
const modalContent = document.querySelector('.modal__content');

const massage = {
    success: 'запрос отправлен',
    failure: 'что то пошло не так'
};


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
    const modal = document.querySelector('.modal');
    modal.addEventListener('click', e =>{
        if(modal === e.target || e.target.getAttribute('data-modlClose') == ''){
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

async function sendPost(url, json){
    // const request = new XMLHttpRequest();

    // request.open('POST', url);
    // request.setRequestHeader('Content-Type', 'application/json charset=utf-8');
    // request.send(json);

    // request.addEventListener('load', () =>{
    //     console.log(request.statusText);
    //     if(request.status === 200){
    //         console.log(massage.success);
    //     }else{
    //         console.log(massage.failure);
    //     }
    // });

    const answer = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: json
    });

    return await answer;
}
function postModal(btnModal){
    btnModal.addEventListener('submit', e =>{
        e.preventDefault();

        const post = {};
        const formData = new FormData(btnModal);
        formData.forEach((el, key) =>{
            post[key] = el;
        });

        const json = JSON.stringify(post);
        console.log(json);
        sendPost('http://localhost:3000/modal', json)
            .then(resolv => resultPostForm(massage.success))
            .catch(reject => resultPostForm(massage.failure));
    });
}

btnModals.forEach(btn =>{
    postModal(btn);
});

function resultPostForm(massage){
    const div = document.createElement('div');
    const modalDialog = document.querySelector('.modal__dialog');
    div.innerHTML = `
        <div data-modlClose class="modal__close">&times;</div>
        <div class="modal__title">${massage}</div>
    `;
    div.classList.add('modal__content');
    modalContent.style.display = 'none';
    modalDialog.append(div);
    setTimeout(()=>{
        div.remove();
        modalContent.style.display = 'block';
        modal.style.display = 'none';
    }, 2000);
    closModal();
}