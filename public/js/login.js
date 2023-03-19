import axios from 'axios'

export const signUp = async(email, password, passwordConfirm)=>{
    try{
        const res = await axios({
            method: 'POST',
            url: 'api/v1/user/register',
            data:{
                email,
                password,
                passwordConfirm
            }
        })
        if(res.data.status === 'success'){
            window.setTimeout(()=> {
                location.assign('/')
            }, 1500)
        }

    }catch(err){
        alert(`${err.response.data.message}`)
    }
}
export const login = async(email, password)=>{
    try{
        const res = await axios({
            method: 'POST',
            url: 'api/v1/user/login',
            data:{
                email,
                password
            }
        })
        if(res.data.status === 'success'){
            window.setTimeout(()=> {
                location.assign('/')
            }, 1500)
        }

    }catch(err){
        alert(`${err.response.data.message}`)
    }
}

export const logout = async()=>{
    try {
        const res = await axios({
            method: 'GET',
            url: 'api/v1/user/logout'
        })
        if(res.data.status === 'success') location.reload(true)
    } catch (error) {
        alert(`${error.response.data.message}`)
    }
}