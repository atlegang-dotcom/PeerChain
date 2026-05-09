import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { useWallet } from '../hooks/useWallet';
import { useAuthStore } from '../store/authStore';

export default function ConnectWalletScreen({ navigation }) {
  const { connect, loading, error } = useWallet();
  const { isConnected, restoreSession } = useAuthStore();

  useEffect(() => {
    restoreSession();
  }, []);

  useEffect(() => {
    if (isConnected) {
      navigation.replace('Dashboard');
    }
  }, [isConnected]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoMark}>
        <Text style={styles.logoMarkText}>P</Text>
      </View>
      <Text style={styles.title}>Peer<Text style={{color: '#00d084'}}>Chain</Text></Text>
      <Text style={styles.subtitle}>Proof of Learning Protocol</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={connect} disabled={loading}>
        {loading ? <ActivityIndicator color="#0a0d0f" /> : <Text style={styles.buttonText}>Connect Wallet</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0d0f', padding: 24 },
  logoMark: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#00d084', justifyContent: 'center', alignItems: 'center', marginBottom: 16, shadowColor: '#00d084', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  logoMarkText: { fontSize: 32, fontWeight: 'bold', color: '#0a0d0f' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#e8eaed', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6b7280', marginBottom: 48 },
  button: { backgroundColor: '#00d084', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 12, width: '100%', alignItems: 'center' },
  buttonText: { color: '#0a0d0f', fontSize: 16, fontWeight: 'bold' },
  error: { color: '#ef4444', marginBottom: 16, textAlign: 'center' }
});
