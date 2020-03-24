import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'react-native';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignText,
} from './styles';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';
import { singInRequest } from '~/store/modules/auth/actions';

export default function SingIn({ navigation }) {
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        dispatch(singInRequest(email, password));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />
                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyBoardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            passwordRef.current.focus();
                        }}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={password}
                        onChangeText={setPassword}
                    />
                </Form>
                <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>

                <SignLink onPress={() => navigation.navigate('SingUp')}>
                    <SignText>Criar conta </SignText>
                </SignLink>
            </Container>
        </Background>
    );
}
