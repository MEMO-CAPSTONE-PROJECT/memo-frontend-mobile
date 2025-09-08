import MemoButton from '@/components/button/memo-button'
import MemoBottomSheet from '@/components/sheet/memo-bottom-sheet'
import { CALENDAR_DATE_FORMAT } from '@/constants/date'
import { getMemoBorderWidth } from '@/constants/theme/border-width'
import { Color } from '@/constants/theme/color'
import { FontFamily } from '@/constants/theme/font'
import { getMemoLayoutSize } from '@/constants/theme/layout-size'
import { InputStateColors } from '@/shared/themes/input-variants'
import { MemoInputStates } from '@/shared/types/input-state-type'
import dayjs from 'dayjs'
import { CalendarDots } from 'phosphor-react-native'
import { useEffect, useMemo, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import { Input, SelectSeparator, XStack } from 'tamagui'

export interface MemoDatePickerProps {
    id?: string
    value?: Date
    state?: keyof MemoInputStates
    placeholder?: string
    onConfirm?: (date?: Date) => void
}

export default function MemoDatePicker({
    id = 'date-picker',
    value,
    state = 'default',
    placeholder,
    onConfirm
}: Readonly<MemoDatePickerProps>) {
    const [show, setShow] = useState(false)
    const [focus, setFocus] = useState(false)
    const { bgColor, placeholderColor, borderColor, textColor } = focus ? InputStateColors.focus : InputStateColors[state]
    const [selectedDate, setSelectedDate] = useState(dayjs(value || new Date()).format(CALENDAR_DATE_FORMAT))
    const [currentDate, setCurrentDate] = useState(selectedDate)
    // Memoize formatted display date
    const displayDate = useMemo(() => selectedDate || placeholder, [selectedDate, placeholder])

    // Sync internal state with value prop when it changes
    useEffect(() => {
      if (value) {
          const formattedValue = dayjs(value).format(CALENDAR_DATE_FORMAT)
          setSelectedDate(formattedValue)
          setCurrentDate(formattedValue)
      }
    }, [value])

    function handleNextMonth() {
        setCurrentDate(prev => dayjs(prev).add(1, 'month').format(CALENDAR_DATE_FORMAT))
    }

    function handlePreviousMonth() {
        setCurrentDate(prev => dayjs(prev).subtract(1, 'month').format(CALENDAR_DATE_FORMAT))
    }

    function handleToday() {
        const today = dayjs().format(CALENDAR_DATE_FORMAT)
        setSelectedDate(today)
        setCurrentDate(today)
    }

    function handleDayPick(date: DateData) {
        setSelectedDate(dayjs(date.dateString).format(CALENDAR_DATE_FORMAT))
    }

    function hideDatePicker() {
        setShow(false)
        setFocus(false)
    }

    function handleConfirm() {
        onConfirm?.(dayjs(selectedDate).toDate())
        hideDatePicker()
    }

    function handleCancel() {
        setSelectedDate(dayjs(value || new Date()).format(CALENDAR_DATE_FORMAT))
        hideDatePicker()
    }

    // Memoized calendar theme
    const calendarTheme = useMemo(() => ({
      arrowColor: Color['primary-2'],
      todayTextColor: Color['primary-2'],
      selectedDayBackgroundColor: Color['primary-2'],
      selectedDayTextColor: Color['system-white'],
      monthTextColor: Color['primary-2'],
      textDayFontFamily: FontFamily['kanit-regular'],
      textMonthFontFamily: FontFamily['kanit-medium'],
      textDayHeaderFontFamily: FontFamily['kanit-medium'],
    }), [])

    return (
        <MemoBottomSheet
            open={show}
            id={id}
            onOpenChange={setShow}
            button={
                <Pressable onPress={() => setShow(true)}>
                    <XStack alignItems='center' justifyContent='flex-end'>
                        <Input
                            pointerEvents='none'
                            editable={false}
                            flexGrow={1}
                            height={getMemoLayoutSize('5xl')}
                            borderWidth={getMemoBorderWidth('xsm')}
                            borderColor={borderColor}
                            backgroundColor={bgColor}
                        >
                            <Text className='font-kanit-medium' style={{ color: selectedDate ? textColor : placeholderColor }}>
                                {displayDate}
                            </Text>
                        </Input>
                        <XStack paddingRight={10} position='absolute'>
                            <CalendarDots color={textColor} />
                        </XStack>
                    </XStack>
                </Pressable>
            }
            snapPoints={[500]}
            snapPointsMode='constant'
        >
            <View className='h-full justify-between gap-y-md'>
                <Calendar
                    initialDate={currentDate}
                    theme={calendarTheme}
                    enableSwipeMonths
                    onDayPress={handleDayPick}
                    onPressArrowLeft={handlePreviousMonth}
                    onPressArrowRight={handleNextMonth}
                    markedDates={{
                        [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: Color['primary-2'] }
                    }}
                />
                <SelectSeparator />
                <View className='w-full flex-row justify-between gap-x-xl'>
                    <MemoButton size="full" name="ยกเลิก" variant="primary" onPress={handleCancel}/>
                    <MemoButton size="full" name="วันนี้" variant="ghost" onPress={handleToday}/>
                    <MemoButton size="full" name="ยืนยัน" variant="primary" onPress={handleConfirm}/>
                </View>
            </View>
        </MemoBottomSheet>
    )
}
