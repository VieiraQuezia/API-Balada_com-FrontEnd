import React from 'react';
// Importa o sistema de navegação
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa as páginas criadas
import HomeScreen from './pages/Home';
import BaladasScreen from './pages/balada';
import DetalhesBaladaScreen from './pages/detalhesBalada';
import CadastrarBalada from './pages/cadastrarBalada';

// Cria o gerenciador de rotas tipo "pilha" (Stack)
const Stack = createStackNavigator();

export default function App() {
  return (
    // NavigationContainer controla toda a navegação do app
    <NavigationContainer>
      {/* Stack.Navigator define as telas disponíveis */}
      <Stack.Navigator>
        {/* Cada Stack.Screen representa uma tela do app */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Baladas" component={BaladasScreen} />
        <Stack.Screen name="DetalhesBalada" component={DetalhesBaladaScreen} />
        <Stack.Screen name="CadastrarBalada" component={CadastrarBalada} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
