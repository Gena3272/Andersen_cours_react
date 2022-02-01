import React from 'react';
import './ResultForm.css';

const ResultForm = (props) => {
    return (
        <div className='wrapper'>
            <ul className='result-form'>
                <li>First Name : {props.dataForm.firstName.value}</li>
                <li>Last Name : {props.dataForm.lastName.value}</li>
                <li>Birthday : {props.dataForm.birthday.value}</li>
                <li>Your Phone : {props.dataForm.phone.value}</li>
                <li>Your Site : {props.dataForm.site.value}</li>
                <li>About Me : {props.dataForm.aboutMe.value}</li>
                <li>Technology Stack : {props.dataForm.stackTech.value}</li>
                <li>Last Project : {props.dataForm.lastProd.value}</li>
            </ul>
        </div>
    )
}
export default ResultForm;
