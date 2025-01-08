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

const EditBook = ({ route, navigation }) => {
    const { book } = route.params;
    const [title, setTitle] = useState(book.title);
    const [isbn, setIsbn] = useState(book.isbn);
    const [copies, setCopies] = useState(book.copies.toString());
    const [imageUrl, setImageUrl] = useState(book.imageUrl);

    const saveChanges = async () => {
        if (!title || !isbn || !copies || !imageUrl) {
            Alert.alert('Please fill all fields!');
            return;
        }

        const storedBooks = await AsyncStorage.getItem('books');
        const books = storedBooks ? JSON.parse(storedBooks) : [];
        const updatedBooks = books.map((b) =>
            b.isbn === book.isbn ? { title, isbn, copies: parseInt(copies), imageUrl } : b
        );
        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
        navigation.goBack();
    };

    const deleteBook = async () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this book?', [
            {
                text: 'Yes',
                onPress: async () => {
                    const storedBooks = await AsyncStorage.getItem('books');
                    const books = storedBooks ? JSON.parse(storedBooks) : [];
                    const filteredBooks = books.filter((b) => b.isbn !== book.isbn);
                    await AsyncStorage.setItem('books', JSON.stringify(filteredBooks));
                    navigation.goBack();
                },
            },
            { text: 'No' },
        ]);
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
            <Button title="Save Changes" onPress={saveChanges} color="#007BFF" />
            <Button title="Delete Book" color="red" onPress={deleteBook} />
        </View>
    );
};


export default EditBook;
