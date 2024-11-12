import BrandingBackground from '@/components/background/branding-background';
import MemoTextButton from '@/components/button/memo-text-button';
import MemoCard from '@/components/container/memo-card';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <BrandingBackground variant="primary">
        <MemoCard containerClassName="h-full ">
          <Text className="font-kanit-bold text-title">Home Screen</Text>
          <View className="gap-y-sm">
            <Link href="/login/student" asChild><MemoTextButton name="Student Login"/></Link>
            <Link href="/login/student" asChild><MemoTextButton name="Teacher Login"/></Link>
            <Link href="/login/student" asChild><MemoTextButton name="Parent Login"/></Link>
          </View>
        </MemoCard>
    </BrandingBackground>
  )
}

