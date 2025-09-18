import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/Home';
import BaladasScreen from './pages/balada';
import DetalhesBaladaScreen from './pages/detalhesBalada';
import CadastrarBalada from './pages/cadastrarBalada'


const Stack = createStackNavigator();


export default function App() {
return (
<NavigationContainer>
<Stack.Navigator>
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Baladas" component={BaladasScreen} />
<Stack.Screen name="DetalhesBalada" component={DetalhesBaladaScreen} />
<Stack.Screen name="CadastrarBalada" component={CadastrarBalada} />
</Stack.Navigator>
</NavigationContainer>
);
}