import { useState } from 'react'
import {Navigate } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'
import styles from './create.module.scss'

function Create()
{

    const [inputTitle,setInputTitle] = useState('')
    const [inputDesctiprion,setInputDesctiprion] = useState('')
    const [returnHome,setReturnHome] = useState(false)

    function handleSubmit()
    {
        if(setInputTitle==='' || inputDesctiprion==='')
            return
        axios.post('https://61a9915033e9df0017ea3e37.mockapi.io/excercise',{
            name:inputTitle,
            description:inputDesctiprion,
            status:'pending'
        })
            .then(()=>setReturnHome(true))
            .catch(err=>console.log(err))
    }
    return(
        <div className={clsx(styles.create)}>
            {returnHome===true?<Navigate to='/Excercise-Tracker'/>:undefined}
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
            <button onClick={handleSubmit}>Add Excercise</button>
        </div>
    )
}

export default Create
