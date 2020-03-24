import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
    behavior: 'padding',
    enabled: Platform.OS === 'ios',
})`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
`;

export const Form = styled.View`
    align-self: stretch;
    margin-top: 50px;
`;

export const FormInput = styled(Input)`
    margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
    margin-top: 5px;
    align-self: stretch;
`;

export const SignLink = styled.TouchableOpacity`
    margin-top: 20px;
`;

export const SignText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
`;
