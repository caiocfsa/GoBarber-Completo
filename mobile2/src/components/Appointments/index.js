import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

import { parseISO, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointments({ data, onCancel }) {
    const dateParsed = useMemo(() => {
        return formatDistance(parseISO(data.date), new Date(), {
            locale: ptBR,
            addSuffix: true,
        });
    }, [data.date]);

    return (
        <Container past={data.past}>
            <Left>
                <Avatar
                    source={{
                        uri: data.provider.avatar
                            ? data.provider.avatar.url
                            : 'https://static1.joj.sk/html/assets/avatar-placeholder.jpg',
                    }}
                />
                <Info>
                    <Name>{data.provider.name}</Name>
                    <Time>{dateParsed}</Time>
                </Info>
            </Left>
            {data.cancelable && !data.canceled_at && (
                <TouchableOpacity onPress={onCancel}>
                    <Icon name="event-busy" size={20} color="#fb4c75" />
                </TouchableOpacity>
            )}
        </Container>
    );
}
