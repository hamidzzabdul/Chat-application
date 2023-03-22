const activeUser = document.querySelectorAll('.chat-user-container')

export const chatSwitch = ()=>{
    activeUser.forEach((user,_,chats) => {
        user.onclick= ()=>{
            chats.forEach(bt => {
                bt.classList.toggle('active', bt===user)
            })
        }
    })
}
