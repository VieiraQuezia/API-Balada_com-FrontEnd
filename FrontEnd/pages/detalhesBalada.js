import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// Tela de detalhes de uma balada
export default function DetalhesBaladaScreen({ route }) {
  // Recebe os dados da balada pela navegação
  const { balada } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding:16 }}>
      {/* Cabeçalho com nome e informações principais */}
      <View style={styles.header}>
        <Text style={styles.nome}>{balada.nome}</Text>
        <Text style={styles.info}>{balada.cidade} • {balada.data}</Text>
      </View>

      {/* Endereço da balada */}
      <View style={styles.section}>
        <Text style={styles.label}>Endereço</Text>
        <Text style={styles.value}>{balada.endereco || 'Não informado'}</Text>
      </View>

      {/* Descrição da balada */}
      <View style={styles.section}>
        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.value}>{balada.descricao || 'Sem descrição'}</Text>
      </View>

      {/* Preço da entrada */}
      <View style={styles.section}>
        <Text style={styles.label}>Preço</Text>
        <Text style={styles.value}>
          {balada.preco ? `R$ ${balada.preco}` : 'Gratuito / não informado'}
        </Text>
      </View>
    </ScrollView>
  );
}

// Estilos visuais
const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#f8fafc' },
  header: { marginBottom:16 },
  nome: { fontSize:26, fontWeight:'800', color:'#0f172a' },
  info: { color:'#6b7280', marginTop:4 },
  section: { backgroundColor:'white', padding:16, borderRadius:12, marginBottom:12 },
  label: { color:'#6b7280', marginBottom:6 },
  value: { color:'#111827', fontSize:16 }
});
