// src/screens/CadastroBaladaScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Save } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createBalada, updateBalada } from '../services/api';

export default function CadastroBaladaScreen({ navigation, route }) {
  const baladaExistente = route.params?.balada;
  const isEditando = !!baladaExistente;

  const [nome, setNome] = useState(baladaExistente?.nome || '');
  const [endereco, setEndereco] = useState(baladaExistente?.endereco || '');
  const [data, setData] = useState(baladaExistente?.data ? new Date(baladaExistente.data) : null);
  const [tipo, setTipo] = useState(baladaExistente?.tipo || '');
  const [cidade, setCidade] = useState(baladaExistente?.cidade || '');
  const [saving, setSaving] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: isEditando ? 'Editar Balada' : 'Adicionar Balada',
    });
  }, [isEditando, navigation]);

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setData(selectedDate);
    }
  };

  const salvarBalada = async () => {
    if (!nome.trim() || !endereco.trim() || !data || !tipo.trim() || !cidade.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setSaving(true);
    try {
      const balada = {
        nome: nome.trim(),
        endereco: endereco.trim(),
        data: formatDate(data),
        tipo: tipo.trim(),
        cidade: cidade.trim(),
      };

      if (isEditando) {
        await updateBalada(baladaExistente.id, balada);
        Alert.alert('Sucesso', 'Balada atualizada com sucesso', [
          { text: 'OK', onPress: () => navigation.navigate('Baladas') },
        ]);
      } else {
        await createBalada(balada);
        Alert.alert('Sucesso', 'Balada adicionada com sucesso', [
          { text: 'OK', onPress: () => navigation.navigate('Baladas') },
        ]);
      }
    } catch (error) {
      Alert.alert('Erro', `Não foi possível salvar a balada.\n${error.message}`);
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
            placeholder="Digite o nome da balada"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Endereço *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o endereço"
            value={endereco}
            onChangeText={setEndereco}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data *</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Text style={{ color: data ? '#000' : '#9ca3af' }}>
              {data ? formatDate(data) : 'Selecione a data'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={data || new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date(2026, 11, 31)}
              minimumDate={new Date(2025, 9, 18)}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tipo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o tipo (ex: Show de Rock)"
            value={tipo}
            onChangeText={setTipo}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cidade *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a cidade"
            value={cidade}
            onChangeText={setCidade}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={salvarBalada} disabled={saving}>
          {saving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Save size={20} color="white" style={styles.buttonIcon} />
          )}
          <Text style={styles.saveButtonText}>
             Salvar  Balada
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
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonIcon: { marginRight: 8 },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});