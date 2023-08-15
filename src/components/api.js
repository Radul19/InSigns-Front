import axios from "axios"
const url = "http://192.168.1.113:4000/"
// const url = "https://in-signs-back-2puqk0khl-radul19.vercel.app/"

/// Funcion general para el catch error que se usa en TODAS las peticiones 
const catchError = async (err) => {
    /// Error
    if (err.response) {
        // console.log(err.response)
        // return { data: { msg: "No se ha contactado con el servidor" } }
        return {data:err.response.data , status:err.response.status}
        /// Error de mala conexion
    } else if (err.request) {
        // console.log(err.request)
        return { data: { msg: "No se ha contactado con el servidor, revise su conexion a internet y vuelva a intentarlo" } }
        /// Error inesperado
    } else {
        // console.log("Error", err.message)
        return { data: { msg: "Ha ocurrido un error inesperado, intente nuevamente" } }
    }
}


export const createUser = async (data) => {
    return await axios.post(`${url}createUser`, data).then(res => {
        return res
    }).catch(err => {
        return catchError(err)
    })
}

const checkLength = (item)=>{
    if(item.length > 0 ) return item
    else return false
}
//  avatar = false, email = false, username = false, password = false, _id
export const editUser = async (avatar , email , username , password, _id) => {
    const data = {
        email:checkLength(email),
        username:checkLength(username),
        password:checkLength(password),
        avatar,
        _id
    }



    return await axios.post(`${url}editUser`, data).then(res => {
        return res
    }).catch(err => {
        return err
        // return catchError(err)
    })
}
export const levelComplete = async (_id, classNumber, levelNumber, stars ) => {
    return await axios.post(`${url}levelComplete`, { _id, classNumber, levelNumber, stars  }).then(res => {
        return res
    }).catch(err => {
        return err
        // return catchError(err)
    })
}
export const login = async (namemail,password) => {
    return await axios.post(`${url}login`, { namemail,password }).then(res => {
        return res
    }).catch(err => {
        return catchError(err)
    })
}
export const findUser = async (_id) => {
    return await axios.post(`${url}findUser`, { _id}).then(res => {
        return res
    }).catch(err => {
        return catchError(err)
    })
}
export const verifyCode = async (code) => {
    return await axios.post(`${url}verifyCode`, {code}).then(res => {
        return res
    }).catch(err => {
        return catchError(err)
    })
}
