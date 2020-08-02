import React from 'react'
import styles from './Button.module.css'

const Button = props => {
    return(
        <button 
            className={`${styles.Button} ${props.isFiltering ? null : styles.disabled}`} 
            onClick={props.handleClick}>
            Show all users
        </button>
    )
}

export default Button