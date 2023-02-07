import axios from 'axios'
import { useEffect, useState } from 'react';
import BaseUrl from './BaseUrl';
const GetData = (url) => {
    const baseUrl = BaseUrl()
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [reload, setReload] = useState(false)
    const instance = axios.create({
        baseURL: `${baseUrl}/api/`,
        headers:{
            'Content-type' : 'application/json'
        }
      });
    
    useEffect(()=> { 
                const getData = async () => {
                    try {
                    setIsPending(true)
                    const response = await instance.get(url);
                    setData(response.data)
                    setIsPending(false)
                    setError(null)
                    return response.data;
                    }
                    catch (error) {
                        setIsPending(false)
                        setError("Cannot fetch this data...")
                        setData(null)
                        console.log(error)
                    }
                };
                getData();
    },[reload])
    
    return {data, isPending, error, reload, setReload};
}
 
export default GetData;