import { Alert } from 'react-native';

import { all, takeLatest, put, call } from 'redux-saga/effects';
import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
    const { name, email, ...rest } = payload.data;

    try {
        const profile = {
            name,
            email,
            ...(rest.oldPassword ? rest : {}),
        };

        const response = yield call(api.put, '/users', profile);

        Alert.alert('Success!', 'Successfully data changed');

        yield put(updateProfileSuccess(response.data));
    } catch ({ response }) {
        Alert.alert('Data change failure', response.data.error);
        yield put(updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
