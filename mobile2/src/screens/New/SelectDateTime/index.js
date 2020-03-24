import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, Hour, HourList, Title } from './styles';

import Background from '~/components/Background';
import DateTimeInput from '~/components/DateTimeInput';

export default function SelectDateTime({ navigation }) {
    const provider = navigation.getParam('provider');
    const [hours, setHours] = useState([]);

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        async function loadAvailble() {
            const response = await api.get(
                `/providers/${provider.id}/available`,
                {
                    params: {
                        date: date.getTime(),
                    },
                }
            );

            setHours(response.data);
            console.tron.log(date.getTime());
        }
        loadAvailble();
    }, [date, provider]);

    function handleSelectHour(time) {
        navigation.navigate('Confirm', {
            provider,
            time,
        });
    }

    return (
        <Background>
            <Container>
                <DateTimeInput date={date} onChange={setDate} />
                <HourList
                    data={hours}
                    keyExtractor={hour => String(hour.time)}
                    renderItem={({ item: hour }) => (
                        <Hour
                            onPress={() => handleSelectHour(hour.value)}
                            enabled={hour.avaliable}
                        >
                            <Title>{hour.time}</Title>
                        </Hour>
                    )}
                />
            </Container>
        </Background>
    );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
    title: 'Data do agendamento',
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
    ),
});
