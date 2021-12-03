import { useState,useRef,useEffect } from 'react'
import {Navigate,useLocation } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'
import styles from '../Create/create.module.scss'

function getId(path)
{
    path=path.split('')
    while(path.indexOf('/')>=0)
    {
        path=path.slice(path.indexOf('/')+1)
    }
    path = path.join('')
    return path
}

function Edit()
{

    const [inputTitle,setInputTitle] = useState('')
    const [inputDesctiprion,setInputDesctiprion] = useState('')
    const [returnHome,setReturnHome] = useState(false)

    const idRef = useRef(getId(useLocation().pathname))
    useEffect(()=>{
        axios.get(`https://my-json-server.typicode.com/levanthi/Excercise-Tracker/excercise/${idRef.current}`)
            .then((res)=>{
                setInputTitle(res.data.name)
                setInputDesctiprion(res.data.description)
            })
            .catch(err=>console.log(err))
    },[])

    function handleSubmit()
    {
        if(setInputTitle==='' || inputDesctiprion==='')
            return
        axios.patch(`https://my-json-server.typicode.com/levanthi/Excercise-Tracker/excercise/${idRef.current}`,{
            name:inputTitle,
            description:inputDesctiprion,
        })
            .then(()=>setReturnHome(true))
            .catch(err=>console.log(err))
    }

    return(
        <div className={clsx(styles.create)}>
            {returnHome===true?<Navigate to='/'/>:undefined}
            <h4>TITLE</h4>
            <input 
                value={inputTitle} 
                onChange={(e)=>setInputTitle(e.target.value)} 
                placeholder="Enter subject name" 
            />
            <h4>DETAILS</h4>
            <textarea 
                placeholder='Enter excercise detail here...'
                value={inputDesctiprion}
                onChange={(e)=>setInputDesctiprion(e.target.value)}
            />
            <button onClick={handleSubmit}>Update Excercise</button>
        </div>
    )
}

export default Edit