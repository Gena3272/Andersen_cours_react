import React from 'react';
import './Form.css';

const ERROR = {
    firstName: {
        isEmpty: 'please enter your first name',
        valid: 'please enter capitalize your first name',
    },
    lastName:  {
        isEmpty: 'please enter your last name',
        valid: 'please enter capitalize your last name',
    },
    phone: {
        isEmpty: 'please enter your phone',
        valid: 'please enter valid your phone',
    },
    birthday: {
        isEmpty: 'please enter your birthday',
    },
    site: {
        isEmpty: 'please enter your site',
        valid: 'please enter valid your site address',
    },
    aboutMe: {
        isEmpty: 'please enter about you',
        valid: 'Exceeded character limit in field',
    },
    stackTech: {
        isEmpty: 'please enter your technology stack',
        valid: 'Exceeded character limit in field'
    },
    lastProd: {
        isEmpty: 'please enter description of the latest project',
        valid: 'Exceeded character limit in field',
    },
 }
class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: {
                firstName: '',
                lastName: '',
                phone: '',
                birthday: '',
                site: '',
                aboutMe: '',
                stackTech: '',
                lastProd: '',
            },
            errors: {},
            countInAboutMe: 0,
            countInStackTech: 0,
            countInLastProd: 0,
        }
        this.isBlockWithErrors = false;
        this.isFormValid = true;
    }

    handleChange = (event) => {
        const input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({input});
    }

    countSymbolForAboutMe = (event) => {
        let count = event.target.value.length;
        let errors = {};

        if(count > 600) {
            errors.aboutMe = ERROR.aboutMe.valid;
        }

        this.setState({
            countInAboutMe: count,
            errors: errors,
        });
    }

    countSymbolForStackTech = (event) => {
        let count = event.target.value.length;
        let errors = {};

        if(count > 600) {
            errors.stackTech = ERROR.stackTech.valid;
        }

        this.setState({
            countInStackTech : count,
            errors: errors,
        });
    }

    countSymbolForLastProd = (event) => {
        let count = event.target.value.length;
        let errors = {};

        if(count > 600) {
            errors.lastProd = ERROR.lastProd.valid;
        }

        this.setState({
            countInLastProd: count,
            errors: errors,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.isAllFieldsValid()) {
            let input = {};
            this.setState({input: input});
        }
    }

   validateFormField = (errors, name, regExp = '') => {
       const input = this.state.input;

       if (!input[name]) {
           errors[name] = ERROR[name].isEmpty;
           this.isBlockWithErrors = true;
           this.isFormValid = false;
       }

       if(input[name] && !!regExp && !regExp.test(input[name])) {
           errors[name] = ERROR[name].valid;
           this.isBlockWithErrors = true;
           this.isFormValid = false;
       }
   }

    isAllFieldsValid = () => {
        const errors = {};
        const regExpName = new RegExp('([А-ЯЁA-Z][а-яa-z]*((\\\\s[а-яё])?[а-яё]*)*)$');
        const regExpPhone = new RegExp('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,13}$');
        const regExpSite = new RegExp('^((https?|ftp)\\:\\/\\/)?([a-z0-9]{1})((\\.[a-z0-9-])|([a-z0-9-]))*\\.([a-z]{2,6})(\\/?)$');

        this.validateFormField(errors,'firstName', regExpName);
        this.validateFormField(errors,'lastName', regExpName);
        this.validateFormField(errors,'birthday');
        this.validateFormField(errors,'phone', regExpPhone);
        this.validateFormField(errors,'site', regExpSite);
        this.validateFormField(errors,'aboutMe');
        this.validateFormField(errors,'stackTech');
        this.validateFormField(errors,'lastProd');

        this.setState({errors: errors});
        return this.isFormValid;
    }

    resetForm = () => {
        this.myFormRef.reset();
    }

    render() {
        return (
            <div className='wrapper'>
                <h1>Creating a questionnaire</h1>
                <form
                    ref={(el) => this.myFormRef = el}>
                    <div className='container'>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            className='data-input'
                            name='firstName'
                            type="text"
                            value={this.state.input.firstName}
                            onChange={this.handleChange}
                        />
                        {this.isBlockWithErrors &&
                            <div className='form-error'>{this.state.errors.firstName}</div>
                        }
                    </div>
                    <div className='container'>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            className='data-input'
                            name='lastName'
                            type="text"
                            value={this.state.input.lastName}
                            onChange={this.handleChange}
                        />
                        {this.isBlockWithErrors &&
                            <div className='form-error'>{this.state.errors.lastName}</div>
                        }
                    </div>
                    <div className='container'>
                        <label htmlFor="birthday">Birthday</label>
                        <input
                            className='data-input'
                            name='birthday'
                            type="date"
                            value={this.state.input.birthday}
                            onChange={this.handleChange}
                        />
                        {this.isBlockWithErrors &&
                            <div className='form-error'>{this.state.errors.birthday}</div>
                        }
                    </div>
                    <div className='container'>
                        <label htmlFor="phone">Telephone</label>
                        <input
                            className='data-input'
                            name='phone'
                            type="tel"
                            value={this.state.input.phone}
                            onChange={this.handleChange}
                        />
                        {this.isBlockWithErrors &&
                            <div className='form-error'>{this.state.errors.phone}</div>
                        }
                    </div>
                    <div className='container'>
                        <label htmlFor='site'>Website</label>
                        <input
                            className='data-input'
                            name='site'
                            type="text"
                            value={this.state.input.site}
                            onChange={this.handleChange}
                        />
                        {this.isBlockWithErrors &&
                            <div className='form-error'>{this.state.errors.site}</div>
                        }
                    </div>
                    <div className='container'>
                        <label htmlFor='aboutMe'>About Me</label>
                        <textarea
                            className='data-textarea'
                            name='aboutMe'
                            value={this.state.input.aboutMe}
                            onInput={this.countSymbolForAboutMe}
                            onChange={this.handleChange}
                        />
                        {this.isBlockWithErrors &&
                            <div className='form-error'>{this.state.errors.aboutMe}</div>
                        }
                        <div>{this.state.countInAboutMe} / 600</div>
                    </div>
                    <div className='container'>
                        <label htmlFor='stackTech'>Technology Stack</label>
                        <textarea
                            className='data-textarea'
                            name='stackTech'
                            value={this.state.input.stackTech}
                            onInput={this.countSymbolForStackTech}
                            onChange={this.handleChange}
                        />
                        {this.isBlockWithErrors &&
                            <div className='form-error'>{this.state.errors.stackTech}</div>
                        }
                        <div>{this.state.countInStackTech} / 600</div>
                    </div>
                    <div className='container'>
                        <label htmlFor='lastProd'>Description Of The Last Project</label>
                        <textarea
                            className='data-textarea'
                            name='lastProd'
                            value={this.state.input.lastProd}
                            onInput={this.countSymbolForLastProd}
                            onChange={this.handleChange}
                        />
                        {this.isBlockWithErrors &&
                            <div className='form-error'>{this.state.errors.lastProd}</div>
                        }
                        <div>{this.state.countInLastProd} / 600</div>
                    </div>
                    <div className='container-btn'>
                        <button
                            type='submit'
                            className='btn-form'
                            onClick={this.handleSubmit}>
                                Save
                        </button>
                        <button
                            className='btn-form btn-cancel'
                            onClick={this.resetForm}>
                                Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form;
