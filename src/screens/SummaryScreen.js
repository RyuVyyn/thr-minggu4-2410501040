import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useWallet } from "../hooks/useWallet";

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export default function SummaryScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { totalIncome, totalExpense, balance, transactions } = useWallet();
  const incomeCount = transactions.filter((item) => item.type === "income").length;
  const expenseCount = transactions.filter((item) => item.type === "expense").length;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Total Pemasukan</Text>
        <Text style={styles.valueIncome}>{formatRupiah(totalIncome)}</Text>
        <Text style={styles.info}>{incomeCount} transaksi pemasukan</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Pengeluaran</Text>
        <Text style={styles.valueExpense}>{formatRupiah(totalExpense)}</Text>
        <Text style={styles.info}>{expenseCount} transaksi pengeluaran</Text>
      </View>

      <View style={[styles.card, styles.balanceCard]}>
        <Text style={styles.balanceLabel}>Sisa Saldo</Text>
        <Text style={styles.balanceValue}>{formatRupiah(balance)}</Text>
      </View>
    </View>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, gap: 10, paddingHorizontal: 16 },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },
    label: { color: colors.textMuted, fontSize: 13 },
    valueIncome: { color: "#22c55e", fontSize: 23, fontWeight: "800", marginVertical: 6 },
    valueExpense: { color: "#ef4444", fontSize: 23, fontWeight: "800", marginVertical: 6 },
    info: { color: colors.textMuted, fontSize: 12 },
    balanceCard: { backgroundColor: colors.primary, borderColor: colors.primary },
    balanceLabel: { color: colors.primaryText },
    balanceValue: { color: colors.primaryText, fontSize: 28, fontWeight: "900", marginTop: 6 },
  });
