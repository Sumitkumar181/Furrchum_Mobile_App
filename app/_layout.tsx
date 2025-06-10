import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/auth-store";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="vet/[id]" options={{ headerShown: true, title: "Veterinarian Profile" }} />
            <Stack.Screen name="specialty/[name]" options={{ headerShown: true, title: "Specialists" }} />
            <Stack.Screen name="TopSurgeons" options={{ headerShown: true, title: "Top Surgeons" }} />
            <Stack.Screen name="article/[id]" options={{ headerShown: true, title: "Article" }} />
            <Stack.Screen name="appointment/new" options={{ headerShown: true, title: "Book Appointment" }} />
            <Stack.Screen name="appointment/cancel/[id]" options={{ headerShown: true, title: "Cancel Appointment" }} />
            <Stack.Screen name="appointment/reschedule/[id]" options={{ headerShown: true, title: "Reschedule Appointment" }} />
            <Stack.Screen name="chat/[id]" options={{ headerShown: true, title: "Chat" }} />
            <Stack.Screen name="emergency" options={{ headerShown: true, title: "Emergency" }} />
          </>
        ) : (
          <>
            <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/forgot-password" options={{ headerShown: false }} />
          </>
        )}
      </Stack>
    </>
  );
}