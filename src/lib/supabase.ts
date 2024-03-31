import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';


function removeUserMetaData(itemValue: string) {
  let parsedItemValue = JSON.parse(itemValue);

  // Remove properties from the object
  if (parsedItemValue) {
      delete parsedItemValue.user?.identities;
      delete parsedItemValue.user?.user_metadata;
  }
  // Convert the modified object back to a JSON string
  return JSON.stringify(parsedItemValue);
}


const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, removeUserMetaData(value));
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = process.env.SUPABASE_URL || 'https://dmgktgdkgxzexxclvimw.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtZ2t0Z2RrZ3h6ZXh4Y2x2aW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5MDI3NjMsImV4cCI6MjAyNzQ3ODc2M30.yuiFZWKAJCqz2pNtuPZDUDXkzEZR1Pkg5ZI86Y_0csU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    },
});