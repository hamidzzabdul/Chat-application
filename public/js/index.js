import {login, logout, signUp} from '../js/login'

// Dom elements
const closeBtn = document.querySelector('.side-bar');
const hamburger= document.querySelector('.hamburger')
const chatroom = document.querySelector('.chatroom')
const textContainer = document.querySelector('.individual-chatroom')
const signupForm = docuemnt.querySelector('.form-sign-up')

closeBtn.addEventListener('click', (e)=>{
    // console.log(e.target);
    chatroom.classList.add('inactive')
    textContainer.classList.add('active')
    hamburger.classList.remove('active-bars')
})


hamburger.addEventListener('click', ()=>{
    chatroom.classList.remove('inactive')
    textContainer.classList.remove('active')
    if(!textContainer.classList.contains('active')){
        hamburger.classList.add('active-bars')
    }
})

// text message area

const messageInput = document.querySelector('.message')
const sendMessage = document.querySelector('.send-message') 

sendMessage.addEventListener('click', (e)=> {
        const html = `<div class="user-texts"><img src="./assets/liebe.png" class="users-profile" alt="" /><div class="outgoing-textbox"><p class="user-message">${messageInput.value}</p></div></div>`
        const usersMessage = document.querySelector('.chat-texts')
        usersMessage.insertAdjacentHTML('beforeend', html)
        // messageInput.value = ''

})

// Delegation

if(signupForm){
    signupForm.addEventListener('click', )
}