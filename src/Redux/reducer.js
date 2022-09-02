import { ADD_USER } from "./action"
let token = localStorage.getItem("token") ;

const init_data = {
    user:token
}

export const Reducer = (store=init_data,{type,payload})=>{
    if(type===ADD_USER){
        return {...store,user:payload}
    }
    else{
        return store;
    }
}

