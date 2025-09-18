import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


export default function HomeScreen({ navigation }) {
return (
<View style={styles.container}>
<Text style={styles.title}>BaladaFinder</Text>
<Text style={styles.subtitle}>Encontre baladas por cidade e data</Text>


<TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Baladas')}>
<Text style={styles.primaryText}>Procurar Baladas</Text>
</TouchableOpacity>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#0f172a' },
title: { color: '#fff', fontSize: 34, fontWeight: '700', marginBottom: 8 },
subtitle: { color: '#c7d2fe', fontSize: 16, marginBottom: 24, textAlign: 'center' },
primaryButton: { backgroundColor: '#7c3aed', padding: 14, borderRadius: 12, width: '80%', alignItems: 'center' },
primaryText: { color: 'white', fontWeight: '600', fontSize: 16 }
});