import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button } from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Favorites({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const cargarFavoritos = async () => {
      const data = await AsyncStorage.getItem('favoritos');
      setFavoritos(JSON.parse(data) || []);
    };
    const unsubscribe = navigation.addListener('focus', cargarFavoritos);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      <FlatList
        data={favoritos}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.nombre}</Text>
            <Text>Año: {item.año}</Text>
            <Text>Director: {item.director}</Text>
            <Text>Actores: {item.actores}</Text>
            {item.imagen && <Image source={{ uri: item.imagen }} style={styles.image} />}
          </View>
        )}
        ListEmptyComponent={<Text>No hay favoritos guardados.</Text>}
      />
    </View>
  );
}
