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
import { singUpRequest } from '~/store/modules/auth/actions';

export default function SingUp({ navigation }) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        dispatch(singUpRequest(name, email, password));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />
                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        placeholder="Digite seu nome"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            emailRef.current.focus();
                        }}
                        value={name}
                        onChangeText={setName}
                    />
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
                        ref={emailRef}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        ref={passwordRef}
                        value={password}
                        onChangeText={setPassword}
                    />
                </Form>
                <SubmitButton onPress={handleSubmit}>Cadastrar-se</SubmitButton>

                <SignLink onPress={() => navigation.navigate('SingIn')}>
                    <SignText>Já tenho login</SignText>
                </SignLink>
            </Container>
        </Background>
    );
}
