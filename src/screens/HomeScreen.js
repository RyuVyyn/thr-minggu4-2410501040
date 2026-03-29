// src/screens/HomeScreen.js
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import WalletHeader from "../components/WalletHeader";
import { useTheme } from "../context/ThemeContext";
import TransactionsScreen from "./TransactionsScreen";

export default function HomeScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <WalletHeader />
        <TransactionsScreen />
      </View>
    </SafeAreaView>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8 },
  });
