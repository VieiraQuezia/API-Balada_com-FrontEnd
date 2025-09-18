import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getBaladas, searchCidade, searchData } from "../services/api";
import { Search, X } from "lucide-react-native";

export default function BaladasScreen({ navigation }) {
  const [baladas, setBaladas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cidade, setCidade] = useState("");
  const [data, setData] = useState(null); // YYYY-MM-DD

  const carregar = async () => {
    try {
      setLoading(true);
      const dataAll = await getBaladas();
      setBaladas(dataAll);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar as baladas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

 const pesquisar= () => {
if(cidade !==''){
    return pesquisarCidade();
 }
 else if(data !==''){
    return pesquisarData();
}
else{
    Alert.alert('Erro', 'Preencha um dos campos para pesquisar')
}
}

    const pesquisarCidade = async () => {
try {
      setLoading(true);
      const resultado = await searchCidade( cidade );
      setBaladas(resultado);
    } catch (err) {
      Alert.alert("Erro", "Falha na busca por cidade");
    } finally {
      setLoading(false);
    }
    }

const pesquisarData = async () => {
  try { setLoading(true);
      const resultado = await searchData(data);
      setBaladas(resultado);
  } catch (err) {
    Alert.alert("Erro", "Falha na busca por data");
  } finally {
    setLoading(false);
  }
}

  const limpar = () => {
    setCidade("");
    setData("");
    carregar();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("DetalhesBalada", { balada: item })}
    >
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.info}>
        {item.cidade} • {item.data}
      </Text>
      <Text numberOfLines={2} style={styles.descricao}>
        {item.descricao}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <View style={styles.inputRow}>
          <Search size={18} color="#6b7280" />
          <TextInput
            placeholder="Cidade"
            style={styles.input}
            value={cidade}
            onChangeText={setCidade}
          />
          {cidade && (
            <TouchableOpacity
              onPress={() => {
                setCidade("");
              }}
              style={styles.clearBtn}
            >
              <X size={18} />
            </TouchableOpacity>
          )}
        </View>

       

        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity style={styles.searchButton} onPress={pesquisar}>
            <Text style={{ color: "white" }}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={limpar}>
            <Text>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={() => navigation.navigate("CadastrarBalada")}>
            <Text>Criar balada</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 12 }}>Carregando...</Text>
        </View>
      ) : (
        <FlatList
          data={baladas}
          keyExtractor={(i) => i.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  filters: {
    padding: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  input: { height: 44, paddingLeft: 8, flex: 1 },
  searchButton: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  clearButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  clearBtn: { padding: 8 },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    elevation: 2,
  },
  nome: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  info: { color: "#6b7280", marginBottom: 8 },
  descricao: { color: "#374151" },
});
