import HomeScreen from '@/app/(index)';
import { cleanup, fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import React from 'react';

jest.mock('expo-router', () => ({
    router: {
        push: jest.fn(),
    },
}));

describe('HomeScreen', () => {
    beforeEach(cleanup)
    it('Renders correctly with all characters', () => {
        const { getByText, getAllByTestId } = render(<HomeScreen />);

        expect(getByText('กรุณาเลือกประเภทผู้ใช้')).toBeTruthy();
        expect(getByText('กรุณาเลือกประเภทผู้ใช้ที่ท่านต้องการเข้าใช้ระบบ')).toBeTruthy();
        expect(getAllByTestId('MemoCharacterCard')).toHaveLength(3);
        expect(getByText('ตกลง')).toBeTruthy();
    });

    it('Show selected character when a card is pressed', () => {
        const { getAllByTestId } = render(<HomeScreen />);
        const characterCards = getAllByTestId('MemoCharacterCard');

        fireEvent.press(characterCards[1]);
        expect(characterCards[1].props.active).toBe(true);
    });

    it('Should show an error when no character is selected and the button is pressed', () => {
        const { getByText, queryByText } = render(<HomeScreen />);

        fireEvent.press(getByText('ตกลง'));
        expect(queryByText('กรุณาเลือกประเภทผู้ใช้ก่อน')).toBeTruthy();
    });

    it('Should navigates to the correct route when a character is selected', () => {
        const { getByText, getAllByTestId } = render(<HomeScreen />);
        const characterCards = getAllByTestId('MemoCharacterCard');

        fireEvent.press(characterCards[0]); // Select first character
        fireEvent.press(getByText('ตกลง')); // Confirm selection

        expect(router.push).toHaveBeenCalledWith('/teacher/login');
    });

    it('Should not navigate if an invalid index is selected', () => {
        const { getByText } = render(<HomeScreen />);

        fireEvent.press(getByText('ตกลง'));
        expect(router.push).not.toHaveBeenCalled();
    });
});
