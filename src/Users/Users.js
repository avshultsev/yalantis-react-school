import React from 'react'
import styles from './Users.module.css'
import User from '../User/User'

const Users = props => {
    return(
        <ul className={styles.Users}>
            {props.users.map((user) => {
                return <li key={user.id}>
                    <User firstName={user.firstName} lastName={user.lastName} dob={user.dob}/>
                </li>
            })}
        </ul>
    )
}

export default Users