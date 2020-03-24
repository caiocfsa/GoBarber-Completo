import React, { useRef, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import { updateProfileRequest } from '~/store/modules/user/actions';

import {
    Container,
    Title,
    Form,
    Separator,
    FormInput,
    SubmitButton,
    LogoutButton,
} from './styles';
import { singOut } from '~/store/modules/auth/actions';

export default function Profile() {
    const profile = useSelector(state => state.user.profile);
    const dispatch = useDispatch();

    const emailRef = useRef();
    const oldPasswordRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    }, [profile]);

    function handleSubmit() {
        const data = {
            name,
            email,
            oldPassword,
            password,
            confirmPassword,
        };

        dispatch(updateProfileRequest(data));
    }

    return (
        <Background>
            <Container>
                <Title>Meu perfil</Title>
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
                            oldPasswordRef.current.focus();
                        }}
                        ref={emailRef}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Separator />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha atual"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            passwordRef.current.focus();
                        }}
                        ref={oldPasswordRef}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua nova senha"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            confirmPasswordRef.current.focus();
                        }}
                        ref={passwordRef}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Confirme sua senha"
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        ref={confirmPasswordRef}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <SubmitButton onPress={handleSubmit}>
                        Atualizar perfil
                    </SubmitButton>
                    <LogoutButton onPress={() => dispatch(singOut())}>
                        Sair
                    </LogoutButton>
                </Form>
            </Container>
        </Background>
    );
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu perfil',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="person" size={20} color={tintColor} />
    ),
};
