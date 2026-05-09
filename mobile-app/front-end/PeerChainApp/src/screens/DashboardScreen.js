import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useWallet } from '../hooks/useWallet';

export default function DashboardScreen() {
  const { walletAddress } = useAuthStore();
  const { disconnect } = useWallet();

  const truncate = (addr) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Command Center</Text>
        <Text style={styles.headerSubtitle}>Your decentralized learning overview</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Connected Wallet</Text>
        <Text style={styles.walletText}>{truncate(walletAddress)}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Reputation</Text>
            <Text style={styles.statValue}>1,250</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Sessions</Text>
            <Text style={styles.statValue}>48</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.disconnectBtn} onPress={disconnect}>
        <Text style={styles.disconnectBtnText}>Disconnect</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0d0f', padding: 16 },
  header: { marginBottom: 24, marginTop: 24 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#e8eaed' },
  headerSubtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  card: { backgroundColor: '#131920', padding: 20, borderRadius: 16, borderColor: '#00d08433', borderWidth: 1 },
  label: { fontSize: 12, color: '#6b7280', textTransform: 'uppercase', marginBottom: 8 },
  walletText: { fontSize: 16, color: '#00d084', fontFamily: 'monospace', marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { backgroundColor: '#0f1419', padding: 16, borderRadius: 12, flex: 1, marginRight: 8 },
  statLabel: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#e8eaed' },
  disconnectBtn: { marginTop: 'auto', marginBottom: 24, paddingVertical: 16, backgroundColor: '#ef444422', borderRadius: 12, alignItems: 'center', borderColor: '#ef444444', borderWidth: 1 },
  disconnectBtnText: { color: '#ef4444', fontWeight: 'bold', fontSize: 16 }
});
