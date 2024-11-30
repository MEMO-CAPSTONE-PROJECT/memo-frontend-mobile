import ParentHomeScreen from '@/app/parent/(tabs)/home';
import { render, screen, waitFor } from '@testing-library/react-native';

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

jest.mock('@/shared/services/user-service', () => ({
   getParent: jest.fn(),
}));

describe('ParentHomeScreen', () => {
    beforeEach(() => {
        jest.spyOn(require('@tanstack/react-query'), 'useQuery').mockReturnValue({
            data: {
                firstName: 'พิณ',
                lastName: 'อิอิจ่ะ',
            },
            isLoading: false,
            error: null,
        });
        jest.spyOn(require('@/shared/services/user-service'), "getParent").mockReturnValue({
            firstName: 'พิณ',
            lastName: 'อิอิจ่ะ',
        });
    });

    it('renders correctly with parent data', async () => {
        render(<ParentHomeScreen />);

        await waitFor(() => screen.getByText('ผู้ปกครองพิณ อิอิจ่ะ'));

        expect(screen.getByText('สวัสดี')).toBeTruthy();
        expect(screen.getByText('ผู้ปกครองพิณ อิอิจ่ะ')).toBeTruthy();
        expect(screen.getByText('ของนักเรียน ด.ช. พิณ อิอิจ่ะ')).toBeTruthy();
    });
    
    it('renders the navigator cards with the correct icons', async () => {
        render(<ParentHomeScreen />);

        expect(screen.getByText('ความสามารถที่โดดเด่น')).toBeTruthy();
        expect(screen.getByText('บุคลิกของคุณ')).toBeTruthy();
        expect(screen.getByText('เหรียญและถ้วยรางวัล')).toBeTruthy();
    });
});
