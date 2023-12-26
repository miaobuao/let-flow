import type { LocalePack } from './type';

const en: LocalePack = {
  result: {
    403: {
      title: '403 Forbidden',
      description: 'Some of the doors are always close to you.',
      handle: 'Take It Easy',
    },
    404: {
      title: '404 Not Found',
      description: 'You know life is always ridiculous.',
      handle: 'Find Something Funny',
    },
    418: {
      title: "418 I'm a teapot",
      description:
        "In Chinese, teapot is a kind of 'Beiju', which means 'tragedy'.",
      handle: 'It Is Easy to Take the Truth',
    },
    500: {
      title: '500 Server Error',
      description:
        'Server error may prove that you need hiring more developers.',
      handle: 'Speard Money Out',
    },
    success: {
      title: 'Success',
      description: 'child of failure',
      handle: 'I like it',
    },
    info: {
      title: 'Information',
      description: 'In this era, info is about money and money is about info.',
      handle: 'I Want Information',
    },
    warning: {
      title: 'Warning',
      description: 'People seldom see it until it comes true.',
      handle: "Hmm, Truly Sad, Isn't It?",
    },
  },
  common: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    password: 'Password',
    username: 'Username',
    email: 'Email',
  },
  login: {
    form: {
      retype_password: 'Retype Password',
      retype_password_error: 'Retype Password Error',
    },
  },
};
export default en;
