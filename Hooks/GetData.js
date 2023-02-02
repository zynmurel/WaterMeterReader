import axios from 'axios'
import { useEffect, useState } from 'react';
const GetData = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [reload, setReload] = useState(false)

    const instance = axios.create({
        baseURL: 'http://192.168.1.20:8080/api/',
        headers:{
            'Content-type' : 'application/json'
        }
      });
    
    useEffect(()=> { 
                const getData = async () => {
                    try {
                    setIsPending(true)
                    const response = await instance.get('brgyprk');
                    console.log(response.data)
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