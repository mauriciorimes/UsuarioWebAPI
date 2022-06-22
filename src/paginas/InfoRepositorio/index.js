import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { salvarRepositoriosDoUsuario, deletarRepositoriosDoUsuario } from '../../service/requisicoes/repositorios';


export default function InfoRepositorio({ route, navigation }) {
    const [nome, setNome] = useState(route.params.item.name);
    const [data, setData] = useState(route.params.item.data);

    async function salvar() {

        const resultado = await salvarRepositoriosDoUsuario(
            route.params.item.postId,
            nome,
            data,
            route.params.item.id
        )

        if(resultado === `sucesso`) {
            Alert.alert(`Repository updated`);
            navigation.goBack();
        } else {
            Alert.alert(`Error for updated repository`);
        }

    }

    async function deletar() {

        const resultado = await deletarRepositoriosDoUsuario(route.params.item.id);

        if (resultado === `sucesso`) {
            Alert.alert(`Repository deleted!`);
            navigation.goBack();
        } else {
            Alert.alert(`Error for delete repository!`)
        }

    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Repository name"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nome}
                onChangeText={ setNome }
            />
            <TextInput
                placeholder="Creation date"
                autoCapitalize="none"
                style={estilos.entrada}
                value={ data }
                onChangeText={ setData }
            />
            <TouchableOpacity 
                style={estilos.botao} 
                onPress={salvar}
            >
                <Text style={estilos.textoBotao}>
                    Save
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[estilos.botao, {backgroundColor: '#DD2B2B', marginTop: 10}]} 
                onPress={ deletar }
            >
                <Text style={estilos.textoBotao}>
                    Delete
                </Text>
            </TouchableOpacity>
        </View>
    );
}
