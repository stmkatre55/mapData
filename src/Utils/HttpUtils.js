import { Platform } from 'react-native';

const API_PARAMS = {
  fbAccessToken: '&access_token=',
};
export default {
  API_PARAMS,
  TERMSANDCONDITIONS: 'https://sarasvihealth.com/terms_and_conditions.html',
  MIXPANEL_KEY: '4334c2bc9fcec4d026360603e8597d15',
  DEVICE_TYPE: Platform.OS === 'ios' ? 1 : 2,
  API_BASE_URL: 'http://94.237.72.174/AUDITRESTAPI/api/Values/',
  IMG_BASE_URL: 'https://demo.cryptora.in/festival/public/images/',




  FB_LOGIN_URL: '/facebook-login',
  REGISTER: 'account_register',
  LOGIN: 'Login',
  



};