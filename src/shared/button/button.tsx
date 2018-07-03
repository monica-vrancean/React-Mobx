import * as React from 'react';
import './button.css';
import * as classNames from 'classnames';

interface Props{
    onClick: Function,
    value: string,
    isActive?: ()=>boolean
}

function Button(props: Props) {
    return (
        <button id="buttonId" onClick={()=>{props.onClick()}} className={classNames({'btn-primary':props.isActive? props.isActive():true, 'btn': true})}>
          {props.value}
        </button>
    );  
}

export default Button;
