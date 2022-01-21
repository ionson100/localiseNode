import { useCookies } from 'react-cookie'
export function MyControl({req}){
    const [cookies, setCookie] = useCookies(['access_token'])

    if(!cookies){
        let expires = new Date()
        expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
        setCookie('access_token', response.data.access_token, { path: '/',  expires})
    }
}