
import TeacherLoginScreen from '@/app/teacher/login/(login)'
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native'
import { router } from 'expo-router'

// Mock the necessary hooks and components
jest.mock('@/hooks/useOTP', () => ({
    useTeacherOTP: jest.fn(),
}))

jest.mock('expo-router', () => ({
    Link: ({ children }: { children: React.ReactNode }) => children,
    router: {
        replace: jest.fn(),
    },
}))

describe('TeacherLoginScreen', () => {
    const mockMutateAsync = jest.fn()

    beforeEach(() => {
        jest.spyOn(require('@/hooks/useOTP'), "useTeacherOTP").mockReturnValue({
            mutateAsync: mockMutateAsync, 
            isPending: false
        });
        jest.clearAllMocks()
    })

    it('Renders correctly', () => {
        render(<TeacherLoginScreen />)

        expect(screen.getByText('ลงชื่อเข้าใช้ระบบ คุณครู')).toBeTruthy()
        expect(screen.getByText('กรุณาใส่รหัสคุณครู')).toBeTruthy()
        expect(screen.getByPlaceholderText('รหัสคุณครู')).toBeTruthy()
        expect(screen.getByText('ลืมรหัสคุณครู?')).toBeTruthy()
        expect(screen.getByText('เข้าสู่ระบบ')).toBeTruthy()
        expect(screen.getByText('กลับสู่หน้าเริ่มต้น')).toBeTruthy()
    })

    it('Handles successful OTP request', async () => {
        const teacherId = 'teacher123'
        const teacherEmail = 'teacher@example.com'
        mockMutateAsync.mockResolvedValue({ data: { emailTeacher: teacherEmail } })

        render(<TeacherLoginScreen />)
        
        const input = screen.getByPlaceholderText('รหัสคุณครู')
        fireEvent.changeText(input, teacherId)

        const button = screen.getByText('เข้าสู่ระบบ')
        fireEvent.press(button)

        await waitFor(() => {
            expect(router.replace).toHaveBeenCalledWith({
                pathname: '/teacher/login/otp',
                params: { teacherId, teacherEmail },
            })
        })
    })

    it('Shows error if teacher ID is invalid', async () => {
        const teacherId = 'invalidTeacherId'
        mockMutateAsync.mockResolvedValue({ data: { emailTeacher: null } })

        render(<TeacherLoginScreen />)
        
        const input = screen.getByPlaceholderText('รหัสคุณครู')
        fireEvent.changeText(input, teacherId)

        const button = screen.getByText('เข้าสู่ระบบ')
        fireEvent.press(button)

        await waitFor(() => {
            expect(screen.getByText('รหัสคุณครูไม่ถูกต้อง')).toBeTruthy()
        })
    })

    it('handles loading state', () => {
        mockMutateAsync.mockResolvedValue({ data: { emailTeacher: 'teacher@example.com' } })

        render(<TeacherLoginScreen />)
        
        const input = screen.getByPlaceholderText('รหัสคุณครู')
        fireEvent.changeText(input, 'teacher123')

        const button = screen.getByText('เข้าสู่ระบบ')
        fireEvent.press(button)

        expect(screen.getByText('เข้าสู่ระบบ').props.isLoading).toBeTruthy()
    })
})
