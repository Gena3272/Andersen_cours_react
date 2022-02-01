import React, { useEffect, useRef, useState} from 'react';
import { ERROR, REG_EXP_NAME, REG_EXP_SITE, REG_EXP_PHONE } from '../../constants/constnants';
import './NewForm.css';
import ResultForm from '../ResultForm/ResultForm';

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true);
    const [siteError, setSiteError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [maxLengthTextError, setMaxLengthTextError] = useState(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true);
                    break;
                case 'isName':
                    REG_EXP_NAME.test(String(value)) ? setNameError(false) : setNameError(true);
                    break;
                case 'isSite':
                    REG_EXP_SITE.test(String(value).toLowerCase()) ? setSiteError(false) : setSiteError(true);
                    break;
                case 'isPhone':
                    REG_EXP_PHONE.test(String(value).toLowerCase()) ? setPhoneError(false) : setPhoneError(true);
                    break;
                case 'isMaxLengthText' :
                    value.length > validations[validation] ? setMaxLengthTextError(true) : setMaxLengthTextError(false);
                    break;
            }
        }
    }, [validations, value]);

    return {
        isEmpty,
        nameError,
        phoneError,
        siteError,
        maxLengthTextError,
    }
}

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const validationForm = useValidation(value, validations);

    const handleInputChange = (event) => {
        setValue(event.target.value);
    }

    const onBlur = () => {
        setDirty(true);
    }

    return {
        value,
        handleInputChange,
        onBlur,
        isDirty,
        ...validationForm,
    }
}

const NewForm = () => {
    const fullForm = {
        firstName: useInput('', {isEmpty: true, isName: false}),
        lastName: useInput('', {isEmpty: true, isName: false}),
        birthday: useInput('', {isEmpty: true}),
        phone: useInput('', {isEmpty: true, isPhone: false}),
        site: useInput('', {isEmpty: true, isSite: false}),
        aboutMe: useInput('', {isEmpty: true, isMaxLengthText: 600}),
        stackTech: useInput('', {isEmpty: true, isMaxLengthText: 600}),
        lastProd: useInput('', {isEmpty: true, isMaxLengthText: 600}),
    }
    const [showResultForm, setShowResultForm] = useState(false);
    let restForm = useRef(null);

    const handleResetForm = (event) => {
        event.preventDefault();
        setShowResultForm(false);
        restForm.reset();
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        setShowResultForm(true);
    }

    return (
        <>
            {showResultForm ? <ResultForm dataForm={fullForm}/> :
                <div className='wrapper'>
                    <h1>Creating a questionnaire</h1>
                    <form
                        onSubmit={(e) => HandleSubmit(e)}
                        ref={(el) => restForm = el}>
                        <div className='container'>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                className='data-input'
                                name='firstName'
                                type="text"
                                value={fullForm.firstName.value}
                                onChange={event => fullForm.firstName.handleInputChange(event)}
                                onBlur={event => fullForm.firstName.onBlur(event)}
                            />
                            {(fullForm.firstName.isDirty && fullForm.firstName.isEmpty) &&
                                <div className='form-error'>{ERROR.firstName.isEmpty}</div>}
                            {(fullForm.firstName.isDirty && fullForm.firstName.nameError) &&
                                <div className='form-error'>{ERROR.firstName.valid}</div>}
                        </div>
                        <div className='container'>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                className='data-input'
                                name='lastName'
                                type="text"
                                value={fullForm.lastName.value}
                                onChange={event => fullForm.lastName.handleInputChange(event)}
                                onBlur={event => fullForm.lastName.onBlur(event)}
                            />
                            {(fullForm.lastName.isDirty && fullForm.lastName.isEmpty) &&
                                <div className='form-error'>{ERROR.lastName.isEmpty}</div>}
                            {(fullForm.lastName.isDirty && fullForm.lastName.nameError) &&
                                <div className='form-error'>{ERROR.lastName.valid}</div>}
                        </div>
                        <div className='container'>
                            <label htmlFor="birthday">Birthday</label>
                            <input
                                className='data-input'
                                name='birthday'
                                type="date"
                                value={fullForm.birthday.value}
                                onChange={event => fullForm.birthday.handleInputChange(event)}
                                onBlur={event => fullForm.birthday.onBlur(event)}
                            />
                            {(fullForm.birthday.isDirty && fullForm.birthday.isEmpty) &&
                                <div className='form-error'>{ERROR.birthday.isEmpty}</div>}
                        </div>
                        <div className='container'>
                            <label htmlFor="phone">Telephone</label>
                            <input
                                className='data-input'
                                name='phone'
                                type="tel"
                                value={fullForm.phone.value}
                                onChange={event => fullForm.phone.handleInputChange(event)}
                                onBlur={event => fullForm.phone.onBlur(event)}
                            />
                            {(fullForm.phone.isDirty && fullForm.phone.isEmpty) &&
                                <div className='form-error'>{ERROR.phone.isEmpty}</div>}
                            {(fullForm.phone.isDirty && fullForm.phone.phoneError) &&
                                <div className='form-error'>{ERROR.phone.valid}</div>}
                        </div>
                        <div className='container'>
                            <label htmlFor='site'>Website</label>
                            <input
                                className='data-input'
                                name='site'
                                type="text"
                                value={fullForm.site.value}
                                onChange={event => fullForm.site.handleInputChange(event)}
                                onBlur={event => fullForm.site.onBlur(event)}
                            />
                            {(fullForm.site.isDirty && fullForm.site.isEmpty)
                                && <div className='form-error'>{ERROR.site.isEmpty}</div>}
                            {(fullForm.site.isDirty && fullForm.site.siteError)
                                && <div className='form-error'>{ERROR.site.valid}</div>}
                        </div>
                        <div className='container'>
                            <label htmlFor='aboutMe'>About Me</label>
                            <textarea
                                className='data-textarea'
                                name='aboutMe'
                                value={fullForm.aboutMe.value}
                                onChange={event => fullForm.aboutMe.handleInputChange(event)}
                                onBlur={event => fullForm.aboutMe.onBlur(event)}
                            />
                            {(fullForm.aboutMe.isDirty && fullForm.aboutMe.isEmpty) &&
                                <div className='form-error'>{ERROR.aboutMe.isEmpty}</div>}
                            {fullForm.aboutMe.maxLengthTextError ?
                                <div className='form-error'>{ERROR.aboutMe.valid}</div> :
                                <div>{fullForm.aboutMe.value.length} / 600</div>
                            }
                        </div>
                        <div className='container'>
                            <label htmlFor='stackTech'>Technology Stack</label>
                            <textarea
                                className='data-textarea'
                                name='stackTech'
                                value={fullForm.stackTech.value}
                                onChange={event => fullForm.stackTech.handleInputChange(event)}
                                onBlur={event => fullForm.stackTech.onBlur(event)}
                            />
                            {(fullForm.stackTech.isDirty && fullForm.stackTech.isEmpty) &&
                                <div className='form-error'>{ERROR.stackTech.isEmpty}</div>}
                            {fullForm.stackTech.maxLengthTextError ?
                                <div className='form-error'>{ERROR.stackTech.valid}</div> :
                                <div>{fullForm.stackTech.value.length} / 600</div>
                            }
                        </div>
                        <div className='container'>
                            <label htmlFor='lastProd'>Description Of The Last Project</label>
                            <textarea
                                className='data-textarea'
                                name='lastProd'
                                value={fullForm.lastProd.value}
                                onChange={event => fullForm.lastProd.handleInputChange(event)}
                                onBlur={event => fullForm.lastProd.onBlur(event)}
                            />
                            {(fullForm.lastProd.isDirty && fullForm.lastProd.isEmpty) &&
                                <div className='form-error'>{ERROR.lastProd.isEmpty}</div>}
                            {fullForm.lastProd.maxLengthTextError ?
                                <div className='form-error'>{ERROR.lastProd.valid}</div> :
                                <div>{fullForm.lastProd.value.length} / 600</div>
                            }
                        </div>
                        <div className='container-btn'>
                            <button
                                type='submit'
                                className='btn-form'>
                                    Save
                            </button>
                            <button
                                className='btn-form btn-cancel'
                                onClick={(event) => handleResetForm(event)}>
                                    Cancel
                            </button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default NewForm;
