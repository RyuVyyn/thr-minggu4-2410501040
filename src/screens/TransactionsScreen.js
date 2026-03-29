import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TransactionForm from "../components/TransactionForm";
import TransactionItem from "../components/TransactionItem";
import TypeFilter from "../components/TypeFilter";
import { useTheme } from "../context/ThemeContext";
import { useWallet } from "../hooks/useWallet";

export default function TransactionsScreen() {
  const { transactions, deleteTransaction } = useWallet();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    if (activeFilter === "all") return transactions;
    return transactions.filter((item) => item.type === activeFilter);
  }, [transactions, activeFilter]);

  return (
    <View style={styles.container}>
      <TransactionForm />
      <TypeFilter activeFilter={activeFilter} onChange={setActiveFilter} />

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={deleteTransaction} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada transaksi.</Text>
        }
      />
    </View>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    container: { flex: 1 },
    emptyText: {
      textAlign: "center",
      color: colors.textMuted,
      marginTop: 24,
    },
  });
