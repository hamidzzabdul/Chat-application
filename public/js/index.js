
import {login, logout, signUp} from '../js/login'
import { chatSwitch } from './chat';
// Dom elements
const closeBtn = document.querySelector('.side-bar');
const hamburger= document.querySelector('.hamburger')
const chatroom = document.querySelector('.chatroom')
const textContainer = document.querySelector('.individual-chatroom')
const signupForm = document.querySelector('.form-sign-up')
const loginForm = document.querySelector('.login-form')
const chatsWrapper  = document.querySelector('.chats-wrapper')

if(chatsWrapper){
    chatSwitch();
}

if(!signupForm && !loginForm){
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


const messageInput = document.querySelector('.message')
const sendMessage = document.querySelector('.send-message') 
sendMessage.addEventListener('click', (e)=> {
    const html = `<div class="user-texts"><img src="./assets/liebe.png" class="users-profile" alt="" /><div class="outgoing-textbox"><p class="user-message">${messageInput.value}</p></div></div>`
    const usersMessage = document.querySelector('.chat-texts')
    usersMessage.insertAdjacentHTML('beforeend', html)
    // messageInput.value = ''
})
}

const logoutbtn = document.querySelector('.logout-btn')


// text message area



// Delegation

if(signupForm){
    signupForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const passwordConfirm = document.getElementById('passwordConfirm').value
        signUp(name,email,password,passwordConfirm)
    })
}

if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        login(email, password)
    })
}

if(logoutbtn) logoutbtn.addEventListener('click', logout)