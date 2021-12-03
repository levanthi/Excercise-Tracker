import {Link} from 'react-router-dom'
import clsx from 'clsx'
import styles from './navbar.module.scss'

function Navbar()
{
    return (
        <div className={clsx(styles.navbar)}>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/create'>Create Excercise</Link></li>
            </ul>
        </div>
    )
}

export default Navbar
