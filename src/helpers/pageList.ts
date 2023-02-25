import { BlockClass } from 'core';
import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import ProfilePage from 'pages/profile';
import OnboardingPage from 'pages/onboarding';

export enum Pages {
  Home = 'home',
  Login = 'login',
  Profile = 'profile',
  Onboarding = 'onboarding'
}

const map: Record<Pages, BlockClass<any>> = {
  [Pages.Home]: HomePage,
  [Pages.Login]: LoginPage,
  [Pages.Profile]: ProfilePage,
  [Pages.Onboarding]: OnboardingPage,
};

export const getPageComponent = (page: Pages): BlockClass<any> => {
  return map[page];
};
