import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { criarRepositoriosDoUsuario } from '../../service/requisicoes/repositorios';

export default function CriarRepositorio({ route, navigation }) {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');

    async function criar() {

        const resultado = await criarRepositoriosDoUsuario(
            route.params.id,
            nome,
            data           
        )

        if(resultado === `sucesso`) {
            Alert.alert(`Repository created!`);
            navigation.goBack();
        } else {
            Alert.alert(`Erro for create repository`);
        }

    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Repository name"
                autoCapitalize="none"
                style={estilos.entrada}
                value={ nome }
                onChangeText= { setNome }
            />
            <TextInput
                placeholder="Creation date"
                autoCapitalize="none"
                style={estilos.entrada}
                onChangeText={ setData }
            />
            <TouchableOpacity style={estilos.botao} onPress={ criar }>
                <Text style={estilos.textoBotao}>
                    Create
                </Text>
            </TouchableOpacity>
        </View>
    );
}
