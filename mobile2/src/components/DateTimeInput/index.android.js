import React, { useMemo } from 'react';
import { DatePickerAndroid } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// import DateTimePiker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles';

export default function DateTimeInput({ date, onChange }) {
    const dateFormated = useMemo(
        () =>
            format(date, "dd 'de' MMM 'de' yyyy ", {
                locale: ptBR,
            }),
        [date]
    );

    async function handleOpnePiker() {
        const { action, year, month, day } = await DatePickerAndroid.open({
            mode: 'calendar',
            date,
        });

        if (action === DatePickerAndroid.dateSetAction) {
            const selectedDate = new Date(year, month, day);

            onChange(selectedDate);
        }
    }

    return (
        <Container>
            <DateButton onPress={handleOpnePiker}>
                <Icon name="event" color="rgba(255,255,255,0.6)" size={20} />
                <DateText>{dateFormated}</DateText>
            </DateButton>
        </Container>
    );
}
