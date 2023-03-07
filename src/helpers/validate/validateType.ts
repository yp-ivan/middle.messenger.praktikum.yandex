export type ValidateType = 'notEmpty' | 'login' | 'password' | 'email' | 'phone' | 'firstName' | 'secondName';

export const ValidateRegex = {
  notEmpty: /.+/,
  login: /^[a-zA-Z\d-_]{3,20}$/,
  password: /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  email: /^\S+@\S+\.\S+$/,
  phone: /^(\+?\d+){10,15}$/,
  firstName: /^[A-ZА-Я][a-zа-я-]*$/,
  secondName: /^[A-ZА-Я][a-zа-я-]*$/
};

export const errorsTexts = {
  notEmpty: 'Обязательное поле',
  login: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  password: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  email: 'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собачка» и точка после неё, но перед точкой обязательно должны быть буквы',
  phone: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
  firstName: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  secondName: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)'
};
