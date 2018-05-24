import { push } from 'react-router-redux';
import api from 'utils/api';
import createAsyncAction from 'utils/createAsyncAction';

const login = (username, password) => (
  createAsyncAction('APP_LOGIN', () => (
    api.post('/api/login', {
      username,
      password,
    })
  ))
);

const resetLoginErrorMsg = () => ({
  type: 'APP_RESET_LOGIN_ERROR_MSG',
});

const loginUser = (username, password) => {
  const action = login(username, password);

  return dispatch => (
    action(dispatch)
      .then(((callbackAction) => {
        if (callbackAction.type === 'APP_LOGIN_ERROR') {
          return setTimeout(() => dispatch(resetLoginErrorMsg()), 1500);
        }
        return dispatch(push('/'));
      }))
  );
};

export default {
  login,
  loginUser,
  resetLoginErrorMsg,
};
