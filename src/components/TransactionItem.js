import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { 
  FadeIn, 
  SlideInRight,
  FadeOut,
  SlideOutLeft 
} from 'react-native-reanimated';
import { useTheme } from "../context/ThemeContext";

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export default function TransactionItem({ item, onDelete }) {
  const isIncome = item.type === "income";
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{isIncome ? item.from : item.category}</Text>
          <Text style={styles.meta}>
            {item.date} - {isIncome ? "Pemasukan" : "Pengeluaran"}
          </Text>
        </View>
        <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
          {isIncome ? "+" : "-"} {formatRupiah(item.amount)}
        </Text>
      </View>

      <Pressable onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Hapus</Text>
      </Pressable>
    </View>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    title: { fontSize: 15, fontWeight: "700", color: colors.text },
    meta: { marginTop: 3, color: colors.textMuted, fontSize: 12 },
    amount: { fontSize: 14, fontWeight: "700" },
    income: { color: "#22c55e" },
    expense: { color: "#ef4444" },
    deleteBtn: {
      alignSelf: "flex-end",
      marginTop: 8,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
      backgroundColor: colors.dangerBg,
    },
    deleteText: { color: colors.dangerText, fontSize: 12, fontWeight: "600" },
  });
