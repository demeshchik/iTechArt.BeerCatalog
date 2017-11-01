import React from 'react'

const Button = (props) => {
    return <span className={props.buttonStyle}>
                <a onClick={props.onClick} className={props.linkStyle}>{props.title}</a>
            </span>
};

export default Button;