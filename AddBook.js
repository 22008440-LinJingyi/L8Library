import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        borderColor: '#CED4DA',
        marginBottom: 15,
        backgroundColor: '#F8F9FA',
    },
});

const AddBook = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const saveBook = async () => {
        if (!title || !isbn || !copies || !imageUrl) {
            Alert.alert('Please fill all fields!');
            return;
        }

        const newBook = { title, isbn, copies: parseInt(copies), imageUrl };
        const storedBooks = await AsyncStorage.getItem('books');
        const books = storedBooks ? JSON.parse(storedBooks) : [];

        books.push(newBook);
        await AsyncStorage.setItem('books', JSON.stringify(books));
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <Text style={styles.label}>ISBN:</Text>
            <TextInput
                value={isbn}
                onChangeText={setIsbn}
                style={styles.input}
            />
            <Text style={styles.label}>Image URL:</Text>
            <TextInput
                value={imageUrl}
                onChangeText={setImageUrl}
                style={styles.input}
                keyboardType="url"
            />
            <Text style={styles.label}>Copies Owned:</Text>
            <TextInput
                value={copies}
                onChangeText={setCopies}
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title="Add" onPress={saveBook} color="#007BFF" />
        </View>
    );
};


export default AddBook;
