import axios from 'axios'

export const signUp = async(name, email, password, passwordConfirm)=>{
    try{
        const res = await axios({
            method: 'POST',
            url: 'api/v1/users/register',
            data:{
                name,
                email,
                password,
                passwordConfirm
            }
        })
        if(res.data.status === 'Success'){
            window.setTimeout(()=> {
                location.assign('/')
            }, 1500)
        }

    }catch(err){
        alert(`${err.message}`)
    }
}
export const login = async(email, password)=>{
    try{
        const res = await axios({
            method: 'POST',
            url: 'api/v1/users/login',
            data:{
                email,
                password
            }
        })
        if(res.data.status === 'Success'){
            window.setTimeout(()=> {
                location.assign('/')
            }, 1500)
        }

    }catch(err){
        alert(`${err}`)
    }
}

export const logout = async()=>{
    try {
        const res = await axios({
            method: 'GET',
            url: 'api/v1/users/logout'
        })
        if(res.data.status === 'Success'){
            window.setTimeout(()=> {
                location.assign('/login')
            }, 1500)
        }
    } catch (error) {
        alert(`${error.message}`)
    }
}