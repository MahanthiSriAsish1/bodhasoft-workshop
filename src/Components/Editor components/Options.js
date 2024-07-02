import React from 'react'
import "../../style/EditorCompCSS/Options.css"

const Options = () => {

    const handleClick = () => {
        alert('Div clicked!');
    };

    return (
        <div className='options'>
            <div onClick={handleClick} className='OptionDiv'>
                click me!
            </div>
            <div onClick={handleClick} className='OptionDiv'>
                click me!
            </div>
            <div onClick={handleClick} className='OptionDiv'>
                click me!
            </div>
            <div onClick={handleClick} className='OptionDiv'>
                click me!
            </div>
            <div onClick={handleClick} className='OptionDiv'>
                click me!
            </div>
        </div>
    )
}

export default Options