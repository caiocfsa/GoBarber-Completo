import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DateTimePiker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateTimeInput({ date, onChange }) {
    const [opened, setOpened] = useState(false);

    const dateFormated = useMemo(
        () =>
            format(date, "dd 'de' MMM 'de' yyyy ", {
                locale: ptBR,
            }),
        [date]
    );

    return (
        <Container>
            <DateButton onPress={() => setOpened(!opened)}>
                <Icon name="event" color="rgba(255,255,255,0.6)" size={20} />
                <DateText>{dateFormated}</DateText>
            </DateButton>
            {opened && (
                <Picker>
                    <DateTimePiker
                        value={date}
                        onChange={(e, newDate) => onChange(newDate)}
                        minimumDate={new Date()}
                        minuteInterval={60}
                        locale="pt"
                        display="default"
                        mode="date"
                    />
                </Picker>
            )}
        </Container>
    );
}
