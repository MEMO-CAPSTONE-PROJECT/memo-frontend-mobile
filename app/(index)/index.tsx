import BrandingBackground from '@/components/background/branding-background';
import MemoTextButton from '@/components/button/memo-text-button';
import MemoCard from '@/components/container/memo-card';
import MemoText from '@/components/text/memo-text';
import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <BrandingBackground variant="primary">
        <MemoCard containerClassName="h-full">
          <MemoText weight="bold" size="title">Home Screen</MemoText>
          <View className="gap-y-sm">
            <Link href="/student/login" asChild><MemoTextButton name="Student Login"/></Link>
            <Link href="/student/login" asChild><MemoTextButton name="Teacher Login"/></Link>
            <Link href="/student/login" asChild><MemoTextButton name="Parent Login"/></Link>
          </View>
        </MemoCard>
    </BrandingBackground>
  )
}

