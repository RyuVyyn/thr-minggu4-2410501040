import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useWallet } from "../hooks/useWallet";
import { useTheme } from "../context/ThemeContext";

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export default function WalletHeader() {
  const { balance, totalIncome, totalExpense } = useWallet();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const styles = getStyles(colors, isDarkMode);

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <Text style={styles.title}>RayaBudget</Text>
        <Pressable onPress={toggleTheme} style={styles.toggleBtn}>
          <Text style={styles.toggleText}>{isDarkMode ? "☀️" : "🌙"}</Text>
        </Pressable>
      </View>
      <Text style={styles.balance}>{formatRupiah(balance)}</Text>
      <View style={styles.row}>
        <Text style={styles.income}>Masuk: {formatRupiah(totalIncome)}</Text>
        <Text style={styles.expense}>Keluar: {formatRupiah(totalExpense)}</Text>
      </View>
    </View>
  );
}

const getStyles = (colors, isDarkMode) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: 14,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    title: { color: colors.textMuted, fontSize: 14, marginBottom: 6 },
    toggleBtn: {
      width: 34,
      height: 34,
      borderRadius: 17,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#334155" : "#e2e8f0",
    },
    toggleText: { fontSize: 16 },
    balance: { color: colors.text, fontSize: 28, fontWeight: "800", marginBottom: 8 },
    row: { flexDirection: "row", justifyContent: "space-between" },
    income: { color: "#22c55e", fontSize: 12, fontWeight: "700" },
    expense: { color: "#ef4444", fontSize: 12, fontWeight: "700" },
  });
