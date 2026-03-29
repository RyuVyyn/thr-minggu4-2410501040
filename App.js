// App.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RayaBudgetProvider } from "./src/context/RayaBudgetContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import HomeScreen from "./src/screens/HomeScreen";
import SummaryScreen from "./src/screens/SummaryScreen";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: focused ? "home" : "home-outline",
            Summary: focused ? "stats-chart" : "stats-chart-outline",
          };

          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1565C0",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        sceneStyle: {
          paddingTop: 40,
          backgroundColor: colors.background,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RayaBudgetProvider>
          <AppContent />
        </RayaBudgetProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}