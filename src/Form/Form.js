import React from "react";
import './Form.css'

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
    }

    handleChange = (event) => {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({input});
    }

    countSymbolForAboutMe = (event) => {
        let count = event.target.value.length;
        let errors = {};

        if(count > 600) {
            errors['aboutMe'] = 'Exceeded character limit in field';
        }

        this.setState({errors: errors});
        this.setState({countInAboutMe : count });
    }

    countSymbolForStackTech = (event) => {
        let count = event.target.value.length;
        let errors = {};

        if(count > 600) {
            errors['stackTech'] = 'Exceeded character limit in field';
        }

        this.setState({errors: errors});
        this.setState({countInStackTech : count });
    }

    countSymbolForLastProd = (event) => {
        let count = event.target.value.length;
        let errors = {};

        if(count > 600) {
            errors['lastProd'] = 'Exceeded character limit in field';
        }

        this.setState({errors: errors});
        this.setState({countInLastProd : count });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.validate()) {
            let input = {};
            this.setState({input: input});
        }
    }

    validate = () => {
        let input = this.state.input;
        let errors = {};
        let isValid = true;
        const pattern = new RegExp('([А-ЯЁA-Z][а-яa-z]*((\\\\s[а-яё])?[а-яё]*)*)$');

        if(input['firstName']){
            if(!pattern.test(input['firstName'])) {
                isValid = false;
                errors['firstName'] = 'please enter capitalize your first name';
            }
        } else if (!input['firstName']) {
            isValid = false;
            errors['firstName'] = 'please enter your first name';
        }

        if(input['lastName']){
            if(!pattern.test(input['lastName'])) {
                isValid = false;
                errors['lastName'] = 'please enter capitalize your last name';
            }
        } else if (!input['lastName']) {
            isValid = false;
            errors['lastName'] = 'please enter your last name';
        }

        if (!input['birthday']) {
            isValid = false;
            errors['birthday'] = 'please enter your birthday';
        }

        if(input['phone']) {
            const pattern = new RegExp('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,13}$');

            if(!pattern.test(input['phone'])) {
                isValid = false;
                errors['phone'] = 'please enter valid your phone'
            }
        } else if (!input['phone']) {
            isValid = false;
            errors['phone'] = 'please enter your phone';
        }

        if (input['site']) {
            const pattern = new RegExp('^((https?|ftp)\\/\\/)?([a-z0-9]{1})((\\.[a-z0-9-])|([a-z0-9-]))*\\.([a-z]{2,6})(\\/?)$');

            if (!pattern.test(input['site'])) {
                isValid = false;
                errors['site'] = 'please enter valid your site address';
            }
        } else if (!input['site']) {
            isValid = false;
            errors['site'] = 'please enter your site';
        }

        if(!input['aboutMe']) {
            isValid = false;
            errors['aboutMe'] = 'please enter about you';
        }

        if(!input['stackTech']) {
            isValid = false;
            errors['stackTech'] = 'please enter your technology stack';
        }

        if(!input['lastProd']) {
            isValid = false;
            errors['lastProd'] = 'please enter description of the latest project';
        }

        this.setState({errors: errors});

        return isValid;
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
                        <div className='form-error'>{this.state.errors.firstName}</div>
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
                        <div className='form-error'>{this.state.errors.lastName}</div>
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
                        <div className='form-error'>{this.state.errors.birthday}</div>
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
                        <div className='form-error'>{this.state.errors.phone}</div>
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
                        <div className='form-error'>{this.state.errors.site}</div>
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
                        <div className='form-error'>{this.state.errors.aboutMe}</div>
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
                        <div className='form-error'>{this.state.errors.stackTech}</div>
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
                        <div className='form-error'>{this.state.errors.lastProd}</div>
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
