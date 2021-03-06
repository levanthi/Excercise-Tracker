import clsx from 'clsx'
import axios from 'axios'
import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './home.module.scss'
import { Link } from 'react-router-dom'
import Loading from '../../Loading'

// function getActiveIndex()
// {
//     let temp = document.querySelectorAll(`.${styles.tabItem}`)
//     temp = [...temp]
//     let result = 0
//     temp.forEach((item,index)=>
//     {
//         if(item.classList.contains('active'))
//         {
//             result = index
//         }
//     })
//     return result
// }

function Home()
{
    const [viewAll,setViewAll] = useState()
    const [completed,setCompleted] = useState([])
    const [pending,setPending] = useState([])
    const [render,setRender] = useState(true)
    const renderTab = useRef([])
    const tabIndex = useRef(0)

    const getExcercise = useRef()

    useMemo(()=>{
        renderTab.current= [viewAll,completed,pending]
    },[viewAll,completed,pending])

    useEffect(()=>{
        
        getExcercise.current = ()=>{axios.get('https://61a9915033e9df0017ea3e37.mockapi.io/excercise')
            .then(res=>{
                setViewAll(res.data)
                setCompleted(res.data.filter((item)=>{
                    return item.status==='completed'
                }))
                setPending(res.data.filter((item)=>{
                    return item.status==='pending'
                }))
            })
            .catch(err=>console.log(err))
        }
        getExcercise.current()
    },[])

    function handleToggle(excercise)
    {
        let statusUpdate = excercise.status==='completed'?'pending':'completed'
        axios.put(`https://61a9915033e9df0017ea3e37.mockapi.io/excercise/${excercise.id}`,{...excercise,status:statusUpdate})
            .then(()=>getExcercise.current())
            .catch(err=>console.log(err))
    }

    function handleDelete(id)
    {
        axios.delete(`https://61a9915033e9df0017ea3e37.mockapi.io/excercise/${id}`)
            .then(()=>getExcercise.current())
            .catch(err=>console.log(err))
    }    
    console.log('render')

    useEffect(()=>{
        let tabs = document.querySelectorAll(`.${styles.tabItem}`)
        tabs = [...tabs]
        tabs.forEach((button,index)=>{
            button.onclick = function(){
                document.querySelector(`.${styles.tabItem}.active`).classList.remove('active')
                button.classList.add('active')
                tabIndex.current = index
                setRender(!render)
            }
        })
    },[render])
    return(
        <div className={clsx(styles.home)}>
            <div className={clsx(styles.tab)}>
                <button className={clsx(styles.tabItem,'active')}>VIEW ALL</button>
                <button className={clsx(styles.tabItem)}>COMPLETED</button>
                <button className={clsx(styles.tabItem)}>PENDING</button>
            </div>
            {viewAll?'':<Loading/>}
            <ul className={clsx(styles.courseList)}>
                {
                   viewAll?renderTab.current[tabIndex.current].map((excercise)=>{
                        return(
                            <li 
                                key={excercise.id}
                                className={clsx(styles.courseItem,
                                    excercise.status==='completed'?
                                    styles.completed:styles.pending
                                )}
                            >
                                <div className={clsx(styles.headingWrap)}>
                                    <div><h4>{excercise.name}</h4></div>
                                    <div>
                                        <button onClick={()=>handleDelete(excercise.id)}>Delete</button>
                                        <button className={clsx(styles.edit)}><Link to={`/Excercise-Tracker/edit/${excercise.id}`}>Edit</Link></button>
                                        <button onClick={()=>handleToggle(excercise)}>Toggle</button>
                                    </div>
                                </div>
                                <p>{excercise.description}</p>
                            </li>
                        )
                    }):''
                }
            </ul>
        </div>
    )
}

export default Home