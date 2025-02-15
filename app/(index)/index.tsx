import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoCard from '@/components/container/memo-card';
import MemoCharacterCard from '@/components/container/memo-character-card';
import MemoErrorMessage from '@/components/helper/memo-error-message';
import ScrollableView from '@/components/scrollable/scrollable-view';
import ParentWomanDefaultSvg from '@/components/ui/icons/parent/woman/default-svg';
import StudentBoyDefaultSvg from '@/components/ui/icons/student/boy/default-svg';
import TeacherWomanDefaultSvg from '@/components/ui/icons/teacher/woman/default-svg';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  const [active, setActive] = useState<number>(-1)
  const [error, setError] = useState<string | undefined>(undefined)

  const characters = [
    {
      icon: <TeacherWomanDefaultSvg container="medium" size={75} />,
      name: "คุณครูประจำชั้น",
      navigate: () => router.replace("/teacher/(auth)/login")
    },
    {
      icon: <StudentBoyDefaultSvg container="medium" size={75} />,
      name: "นักเรียนชั้นประถมศึกษา",
      navigate: () => router.replace("/student/(auth)/login")
    },
    {
      icon: <ParentWomanDefaultSvg container="medium" size={75} />,
      name: "ผู้ปกครองของนักเรียน",
      navigate: () => router.replace("/parent/(auth)/login")
    },
  ]

  function handleCardPress(index: number) {
    setError(undefined)
    setActive(index)
  }

  function handlePress() {
    if (active === -1 || active >= characters.length) {
      setError("กรุณาเลือกประเภทผู้ใช้ก่อน")
      return
    }
    const character = characters[active]
    character.navigate()
  }

  return (
    <BrandingBackground variant="secondary" className="justify-end">
      <MemoCard>
        <View className="flex-[1] gap-y-3xl">
          <View className="items-center">
            <Text className="font-kanit-bold text-title text-body-1">
              กรุณาเลือกประเภทผู้ใช้
            </Text>
            <Text className="font-kanit-regular text-body text-body-2">
              กรุณาเลือกประเภทผู้ใช้ที่ท่านต้องการเข้าใช้ระบบ
            </Text>
          </View>
          <ScrollableView scrollEnabled={characters.length > 3} className="gap-y-lg">
              {characters.map((character, index) =>
                <MemoCharacterCard
                  testID={`MemoCharacterCard`}
                  key={index + character.name}
                  character={character.icon}
                  active={index === active}
                  onPress={() => handleCardPress(index)}
                  texts={[{ text: character.name, extraClassName: "font-kanit-bold text-title" }]}
                />
              )}
          </ScrollableView>
        </View>
        <View className="gap-y-md">
          <MemoErrorMessage error={error} />
          <MemoButton name="ตกลง" variant="primary" onPress={handlePress} />
        </View>
      </MemoCard>
    </BrandingBackground>
  )
}

