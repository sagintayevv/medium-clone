export const getItem = (key) => {
    try{
        return JSON.parse(localStorage.getItem(key))
    }
    catch(e) {
        console.log('Error', e);
        return null
    }
}


export const setItem = (key,value) => {
    try{
        return localStorage.setItem(key,JSON.stringify(value))
    }
    catch(e) {
        console.log('Error', e);
        return null
    }
}