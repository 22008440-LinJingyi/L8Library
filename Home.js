import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    const loadBooks = async () => {
        const collectedBooks = await AsyncStorage.getItem('books');
        setBooks(collectedBooks ? JSON.parse(collectedBooks) : []);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadBooks);
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Button
                title="New Book"
                onPress={() => navigation.navigate('AddBook')}
                color="#007BFF"
            />
            <FlatList
                data={books}
                keyExtractor={(item) => item.isbn}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditBook', { book: item })}
                        style={styles.bookItem}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>ISBN: {item.isbn}</Text>
                            <Text>Copies Owned: {item.copies}</Text>
                        </View>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'whitesmoke'
    },
    bookItem: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textContainer: {
        flex: 1
    },
    image: {
        width: 150,
        height: 200,
        resizeMode: 'cover'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4 },

    separator: {
        height: 1,
        backgroundColor: 'black',
        marginVertical: 8
    },
});

export default Home;
