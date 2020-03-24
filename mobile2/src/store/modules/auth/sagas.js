import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import { singInSuccess, singFailure } from './actions';

import api from '~/services/api';

export function* singIn({ payload }) {
    const { email, password } = payload;
    try {
        const response = yield call(api.post, 'sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        if (user.provider) {
            Alert.alert('Login failure', 'User cannot be a provider');
            return;
        }

        yield put(singInSuccess(token, user));

        // history.push('/dashboard');
    } catch ({ response }) {
        Alert.alert('Login failure', response.data.error);
        yield put(singFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) {
        return;
    }
    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function* singUp({ payload }) {
    const { name, email, password } = payload;

    try {
        yield call(api.post, '/users', {
            name,
            email,
            password,
        });

        Alert.alert('Success', 'User successfuly registered');
    } catch ({ response }) {
        Alert.alert('Register failure', response.data.error);

        yield put(singFailure());
    }
}

export function singOut() {
    // history.push('/');
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SING_IN_REQUEST', singIn),
    takeLatest('@auth/SING_UP_REQUEST', singUp),
    takeLatest('@auth/SING_OUT', singOut),
]);
