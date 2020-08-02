import React from 'react'
import styles from './Months.module.css'

const Months = props => {
    return(
        <ul className={styles.Months}>
            {props.months.map((month) => {
                return <li 
                    key={month.number} 
                    onMouseOver={() => props.filterUsers(month.number)}  //must be onMouseOver
                    style={{backgroundColor: month.color}}>
                        {month.name}
                    </li>
            })}
        </ul>
    )
}

export default Months