import {Link} from 'react-router-dom'
import clsx from 'clsx'
import styles from './navbar.module.scss'

function Navbar()
{
    return (
        <div className={clsx(styles.navbar)}>
            <ul>
                <li><Link to='/Excercise-Tracker/'>Home</Link></li>
                <li><Link to='/Excercise-Tracker/create'>Create Excercise</Link></li>
            </ul>
        </div>
    )
}

export default Navbar
