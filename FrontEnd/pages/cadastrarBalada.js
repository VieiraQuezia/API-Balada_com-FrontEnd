// src/screens/CadastroClienteScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Save } from 'lucide-react-native';
// src/screens/CadastroClienteScreen.js
import { createClient, updateClient } from "../services/api";

export default function CadastroClienteScreen({ navigation, route }) {
  const clienteExistente = route.params?.cliente;
  const isEditando = !!clienteExistente;

  const [nome, setNome] = useState(clienteExistente?.nome || '');
  const [email, setEmail] = useState(clienteExistente?.email || '');
  const [telefone, setTelefone] = useState(clienteExistente?.telefone || '');
  const [endereco, setEndereco] = useState(clienteExistente?.endereco || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: isEditando ? 'Editar Cliente' : 'Adicionar Cliente',
    });
  }, [isEditando, navigation]);

  const salvarCliente = async () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Erro', 'Nome e email são obrigatórios');
      return;
    }

    setSaving(true);
    try {
      const cliente = {
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        endereco: endereco.trim(),
      };

      if (isEditando) {
        await updateClient(clienteExistente.id, cliente);
        Alert.alert('Sucesso', 'Cliente atualizado com sucesso', [
          { text: 'OK', onPress: () => navigation.navigate('Clientes') }
        ]);
      } else {
        await createClient(cliente);
        Alert.alert('Sucesso', 'Cliente adicionado com sucesso', [
          { text: 'OK', onPress: () => navigation.navigate('Clientes') }
        ]);
      }
    } catch (error) {
      Alert.alert('Erro', `Não foi possível salvar o cliente.\n${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome completo"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o telefone"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Digite o endereço completo"
            multiline
            numberOfLines={3}
            value={endereco}
            onChangeText={setEndereco}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={salvarCliente} disabled={saving}>
          {saving ? <ActivityIndicator color="white" /> : <Save size={20} color="white" style={styles.buttonIcon} />}
          <Text style={styles.saveButtonText}>
            {isEditando ? 'Atualizar' : 'Salvar'} Cliente
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  form: { padding: 16 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '500', color: '#374151', marginBottom: 8 },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, fontSize: 16 },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#4F46E5', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 8, marginTop: 20 },
  buttonIcon: { marginRight: 8 },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
