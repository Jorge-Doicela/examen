import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://whoa.onrender.com/whoas/random?results=5')
      .then(res => res.json())
      .then(data => {
        setPeliculas(data.results);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar datos');
        setLoading(false);
      });
  }, []);

  const guardarFavorito = async (item) => {
    try {
      const favoritos = JSON.parse(await AsyncStorage.getItem('favoritos')) || [];
      await AsyncStorage.setItem('favoritos', JSON.stringify([...favoritos, item]));
      alert('Guardado en favoritos');
    } catch (e) {
      alert('Error al guardar');
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /><Text>Cargando...</Text></View>;
  if (error) return <View style={styles.center}><Text>{error}</Text></View>;

  return (
    <View style={styles.container}>
      <Button title="Ver Favoritos" onPress={() => navigation.navigate('Favoritos')} />
      <FlatList
        data={peliculas}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.movie}</Text>
            <Text>Año: {item.year}</Text>
            <Text>Director: {item.director}</Text>
            <Text>Personaje: {item.character}</Text>
            <Text>Frase: {item.full_line}</Text>
            {item.poster && <Image source={{ uri: item.poster }} style={styles.image} />}
            <TouchableOpacity onPress={() => guardarFavorito(item)} style={styles.button}>
              <Text style={styles.buttonText}>Agregar a Favoritos</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}