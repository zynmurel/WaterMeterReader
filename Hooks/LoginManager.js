import axios from 'axios';
import BaseUrl from './BaseUrl';

const baseUrl = BaseUrl()
const http = axios.create({
    baseURL:`${baseUrl}/api/`,
    headers:{
        'Content-type' : 'application/json',
    }
});
 
export default http;