import content from './Language';

let language = localStorage.language || process.env.REACT_APP_LANGUAGE;

const languages = [
    { code: 'az', name: 'Azərbaycan' },
    { code: 'ru', name: 'Россия' },
    { code: 'en', name: 'English' }
];

const ChangeLanguage = (lang) => {
    localStorage.setItem('language', lang);
    const { href } = window.location;
    window.open(href, "_parent");
}

const SelectLanguage = (page) => {
    return content[language][page];
}

export default {
    content,
    language,
    languages,
    ChangeLanguage,
    SelectLanguage
};
