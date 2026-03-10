import api from './api.js'

const handleLogin = async (data) => {
    console.log("handleLogin ",data);
    
    try {
        const response = await api.post('/user/login',data);
        console.log("login up data",response.data);
    } catch (error) {
        console.log("Error",error.response?.data || error.message);
    }
}

const handleSignup = async (data) => {
    try {
        const response = await api.post('/user/signup',data);
        console.log("sign up data",response.data);
    } catch (error) {
        console.log("Error",error.response?.data || error.message);
    }
}

export {handleLogin, handleSignup}

