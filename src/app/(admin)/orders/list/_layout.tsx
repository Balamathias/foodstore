import { withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import Colors from '@/src/constants/Colors';

export const TopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function OrdersTabs() {
    const colorScheme = useColorScheme()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme || 'light'].background }} edges={['top']}>
      <TopTabs>
        <TopTabs.Screen name="index" options={{ title: 'Active' }} />
        <TopTabs.Screen name="archive" options={{ title: 'Archived' }} />
      </TopTabs>
    </SafeAreaView>
  );
}