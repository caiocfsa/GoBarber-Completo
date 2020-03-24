import styled from 'styled-components/native';

export const Container = styled.View`
    margin: 60px 0 30px;
`;

export const DateButton = styled.TouchableOpacity`
    padding: 0 15px;
    height: 46px;
    background: rgba(0, 0, 0, 0.1);
    flex-direction: row;
    border-radius: 4px;
    margin: 0 30px;
    align-items: center;
`;

export const DateText = styled.Text`
    color: #fff;
    font-size: 14px;
    margin-left: 15px;
`;

export const Picker = styled.View`
    background: #fff;
    padding: 15px 30px;
    margin-top: 30px;
`;
