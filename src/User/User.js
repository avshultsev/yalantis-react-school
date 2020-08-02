import React from 'react'

const User = props => {
    return(
        <React.Fragment>
            <span>{`${props.firstName} ${props.lastName}`}</span><br />
            <span>{props.dob}</span>
        </React.Fragment>
    )
}

export default User