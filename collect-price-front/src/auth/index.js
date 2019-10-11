import { menuKey } from '../config/menuList' 

const Auth = (key, code) => {
    const authObj = JSON.parse(sessionStorage.getItem('c_auth'))
    let authCode = ''
    switch(key) {
        case menuKey.KIND:
            authCode = `${menuKey.KIND}${code}`
        break
        case menuKey.PRICE:
            authCode = `${menuKey.PRICE}${code}`
        break
        case menuKey.SYSTEM:
            authCode = `${menuKey.SYSTEM}${code}`
        break
        case menuKey.DICT:
            authCode = `${menuKey.DICT}${code}`
        break
        case menuKey.PROJECT:
            authCode = `${menuKey.PROJECT}${code}`
        break
        case menuKey.MATERIAL:
            authCode = `${menuKey.MATERIAL}${code}`
        break
        case menuKey.WEIGHT:
            authCode = `${menuKey.WEIGHT}${code}`
        break
        case menuKey.SHAPE:
            authCode = `${menuKey.SHAPE}${code}`
        break
        case menuKey.PACK:
            authCode = `${menuKey.PACK}${code}`
        break
        case menuKey.IDENTIFY:
            authCode = `${menuKey.IDENTIFY}${code}`
        break
        case menuKey.GRADE:
            authCode = `${menuKey.GRADE}${code}`
        break
        case menuKey.PRICETYPE:
            authCode = `${menuKey.PRICETYPE}${code}`
        break
        case menuKey.PRICEFROM:
            authCode = `${menuKey.PRICEFROM}${code}`
        break
        case menuKey.MANAGER:
            authCode = `${menuKey.MANAGER}${code}`
        break 
        default:
            throw Error('请输入type/code')
    }
    return {
        isAuth: authObj && authObj[authCode] ? true : false,
        authCode
    }
}

export default Auth