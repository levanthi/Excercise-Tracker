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

    const [excercise,setExcercise] = useState()
    const [returnHome,setReturnHome] = useState(false)

    const idRef = useRef(getId(useLocation().pathname))
    useEffect(()=>{
        axios.get(`https://61a9915033e9df0017ea3e37.mockapi.io/excercise/${idRef.current}`)
            .then((res)=>{
                setExcercise(res.data)
            })
            .catch(err=>console.log(err))
    },[])
    function handleSubmit()
    {
        if(excercise.name==='' || excercise.description==='')
            return
        axios.put(`https://61a9915033e9df0017ea3e37.mockapi.io/excercise/${idRef.current}`,{
            ...excercise
        })
            .then(()=>setReturnHome(true))
            .catch(err=>console.log(err))
    }
    console.log(excercise)
    return(
        <div className={clsx(styles.create)}>
            {returnHome===true?<Navigate to='/Excercise-Tracker'/>:undefined}
            {excercise?
                <>
                    <h4>TITLE</h4>
                    <input 
                        value={excercise.name} 
                        onChange={(e)=>setExcercise({...excercise,name:e.target.value})} 
                        placeholder="Enter subject name" 
                    />
                    <h4>DETAILS</h4>
                    <textarea 
                        placeholder='Enter excercise detail here...'
                        value={excercise.description}
                        onChange={(e)=>setExcercise({...excercise,description:e.target.value})}
                    />
                    <button onClick={()=>handleSubmit()}>Update Excercise</button>
                </>:''
            }
        </div>
    )
}

export default Edit