import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const FILTERS = [
  { key: "all", label: "Semua" },
  { key: "income", label: "Pemasukan" },
  { key: "expense", label: "Pengeluaran" },
];

export default function TypeFilter({ activeFilter, onChange }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      {FILTERS.map((filter) => (
        <Pressable
          key={filter.key}
          style={[styles.button, activeFilter === filter.key && styles.buttonActive]}
          onPress={() => onChange(filter.key)}
        >
          <Text
            style={[styles.buttonText, activeFilter === filter.key && styles.buttonTextActive]}
          >
            {filter.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    container: { flexDirection: "row", gap: 8, marginBottom: 12 },
    button: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingVertical: 8,
      alignItems: "center",
      backgroundColor: colors.card,
    },
    buttonActive: { borderColor: colors.primary, backgroundColor: colors.primary },
    buttonText: { color: colors.text, fontWeight: "600" },
    buttonTextActive: { color: colors.primaryText },
  });
