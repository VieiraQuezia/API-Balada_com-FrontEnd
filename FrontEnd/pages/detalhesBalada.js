import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { deleteBalada } from "../services/api";

// Tela de detalhes de uma balada com opção de deletar
export default function DetalhesBaladaScreen({ route, navigation }) {
  const { balada } = route.params; // Recebe os dados da balada pela navegação

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* Cabeçalho com nome, cidade, data e tipo */}
      <View style={styles.header}>
        <Text style={styles.nome}>{balada.nome}</Text>
        <Text style={styles.info}>
          {balada.cidade} • {balada.data}
        </Text>
        {balada.tipo ? <Text style={styles.tipo}>{balada.tipo}</Text> : null}
      </View>

      {/* Endereço */}
      <View style={styles.section}>
        <Text style={styles.label}>Endereço</Text>
        <Text style={styles.value}>{balada.endereco || 'Não informado'}</Text>
      </View>

      {/* Descrição */}
      <View style={styles.section}>
        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.value}>{balada.descricao || 'Sem descrição'}</Text>
      </View>

      {/* Botão para deletar a balada */}
      <TouchableOpacity
        style={{
          backgroundColor: '#ef4444',
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 16
        }}
        onPress={async () => {
          try {
            await deleteBalada(balada.id); // Chama a função que deleta a balada
            Alert.alert('Sucesso', 'Balada deletada com sucesso!');
          } catch (error) {
            Alert.alert('Erro', `Não foi possível deletar a balada.\n${error.message}`);
          } finally {
            navigation.navigate('Baladas'); // Volta para a tela de baladas
          }
        }}
      >
        <Text>Deletar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Estilos visuais
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { marginBottom: 24 },
  nome: { fontSize: 28, fontWeight: '800', color: '#0f172a' },
  info: { color: '#6b7280', marginTop: 4, fontSize: 16 },
  tipo: { marginTop: 6, fontSize: 16, fontWeight: '600', color: '#ef4444' },
  section: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  label: { color: '#6b7280', marginBottom: 6, fontWeight: '600' },
  value: { color: '#111827', fontSize: 16, lineHeight: 22 }
});
