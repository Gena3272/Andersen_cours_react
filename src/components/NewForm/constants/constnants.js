export const ERROR = {
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

export const REG_EXP_NAME = new RegExp('([А-ЯЁA-Z][а-яa-z]*((\\\\s[а-яё])?[а-яё]*)*)$');
export const REG_EXP_PHONE = new RegExp('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,13}$');
export const REG_EXP_SITE = new RegExp('^((https?|ftp)\\:\\/\\/)?([a-z0-9]{1})((\\.[a-z0-9-])|([a-z0-9-]))*\\.([a-z]{2,6})(\\/?)$');
