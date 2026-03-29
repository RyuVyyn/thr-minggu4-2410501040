import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useWallet } from "../hooks/useWallet";
import { useTheme } from "../context/ThemeContext";

const expenseCategories = ["Belanja", "Sedekah", "Investasi", "Lainnya"];

export default function TransactionForm() {
  const { addIncome, addExpense } = useWallet();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [type, setType] = useState("income");
  const [from, setFrom] = useState("");
  const [category, setCategory] = useState(expenseCategories[0]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  function resetForm() {
    setFrom("");
    setAmount("");
    setDate(new Date().toISOString().slice(0, 10));
  }

  function handleSubmit() {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      Alert.alert("Nominal tidak valid", "Masukkan nominal lebih dari 0.");
      return;
    }

    if (type === "income" && !from.trim()) {
      Alert.alert("Data kurang lengkap", "Isi sumber pemasukan THR.");
      return;
    }

    if (type === "income") {
      addIncome({ from, amount: numericAmount, date });
    } else {
      addExpense({ category, amount: numericAmount, date });
    }

    resetForm();
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Tambah Transaksi</Text>

      <View style={styles.row}>
        <Pressable
          style={[styles.chip, type === "income" && styles.chipActive]}
          onPress={() => setType("income")}
        >
          <Text style={[styles.chipText, type === "income" && styles.chipTextActive]}>
            Pemasukan
          </Text>
        </Pressable>
        <Pressable
          style={[styles.chip, type === "expense" && styles.chipActive]}
          onPress={() => setType("expense")}
        >
          <Text style={[styles.chipText, type === "expense" && styles.chipTextActive]}>
            Pengeluaran
          </Text>
        </Pressable>
      </View>

      {type === "income" ? (
        <TextInput
          value={from}
          onChangeText={setFrom}
          style={styles.input}
          placeholder="Pemberi THR"
          placeholderTextColor={colors.textMuted}
        />
      ) : (
        <View style={styles.rowWrap}>
          {expenseCategories.map((item) => (
            <Pressable
              key={item}
              style={[styles.smallChip, category === item && styles.smallChipActive]}
              onPress={() => setCategory(item)}
            >
              <Text style={styles.smallChipText}>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <TextInput
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        placeholder="Jumlah"
        placeholderTextColor={colors.textMuted}
        keyboardType="numeric"
      />

      <TextInput
        value={date}
        onChangeText={setDate}
        style={styles.input}
        placeholder="Tanggal (YYYY-MM-DD)"
        placeholderTextColor={colors.textMuted}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: 14,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: { fontSize: 16, fontWeight: "700", color: colors.text, marginBottom: 10 },
    row: { flexDirection: "row", gap: 8, marginBottom: 10 },
    rowWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 10 },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 10,
      backgroundColor: colors.input,
      color: colors.text,
    },
    chip: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      alignItems: "center",
      paddingVertical: 8,
    },
    chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    chipText: { color: colors.text, fontWeight: "600" },
    chipTextActive: { color: colors.primaryText },
    smallChip: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    smallChipActive: { backgroundColor: colors.chipActive },
    smallChipText: { color: colors.text, fontSize: 12 },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 10,
      alignItems: "center",
    },
    buttonText: { color: colors.primaryText, fontWeight: "700", fontSize: 22, lineHeight: 22 },
  });
