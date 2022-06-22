import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import estilos from './estilos';
import { buscaUsuario } from '../../service/requisicoes/usuarios';

export default function Principal({ navigation }) {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [usuario, setUsuario] = useState({});

    async function busca() {
        const resultado = await buscaUsuario(nomeUsuario);
        
        
        setNomeUsuario(``);

        if (resultado) {
            setUsuario(resultado)
            
        } else {
            Alert.alert(`User not found!`);
            setUsuario({})
        }
    }

    return (
        <ScrollView>
            <View style={estilos.container}>
                {
                    usuario?.login &&
                <>
                    <View style={estilos.fundo} />
                    <View style={estilos.imagemArea}>
                        <Image source={{ uri: usuario.avatar_url }} style={estilos.imagem} />
                    </View>
                    <Text style={estilos.textoNome}>{usuario.name}</Text>
                    <Text style={estilos.textoEmail}>{usuario.email}</Text>
                    <View style={estilos.seguidoresArea}>
                        <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>{usuario.followers}</Text>
                            <Text style={estilos.seguidoresTexto}>Followers</Text>
                        </View>
                        <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>{usuario.following}</Text>
                            <Text style={estilos.seguidoresTexto}>Following</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Repositories', { id: usuario.id })}>
                        <Text style={estilos.repositorios}>
                            View all repositories
                        </Text>
                    </TouchableOpacity>
                </>}

                <TextInput
                    placeholder="Search for user"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={nomeUsuario}
                    onChangeText={setNomeUsuario}
                />

                <TouchableOpacity style={estilos.botao} onPress={busca}>
                    <Text style={estilos.textoBotao}>
                        Search 
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
