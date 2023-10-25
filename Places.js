import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';


export default function PlacesScreen({ navigation }) {

    const [ place, setPlace ] = useState('');
    const [ places, setPlaces ] = useState([]);

    const firebaseConfig = {
        apiKey: "AIzaSyBVBuIob_8vZ-Tnf5mJ0VI_zV03sY03GYk",
        authDomain: "ostoslistahhdb.firebaseapp.com",
        databaseURL: "https://ostoslistahhdb-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "ostoslistahhdb",
        storageBucket: "ostoslistahhdb.appspot.com",
        messagingSenderId: "626461195782",
        appId: "1:626461195782:web:1c6c71117ea73bd0accd87",
        measurementId: "G-R1WCYMKBFQ"
      };
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);

      useEffect(() => {
        const itemsRef = ref(database, 'places/');
        onValue(itemsRef, (snapshot) => {
          const data = snapshot.val();
          const dbPlaces = data ? Object.keys(data).map(key => ({key, ...data[key]})) : [];
          setPlaces(dbPlaces);
        })
      }, []);

    return (
        <View>
            <Text>This is PlacesScreen</Text>
            <Input
                label='PLACEFINDER'
                placeholder='Type in address'
                onChangeText={inputPlace => setPlace({})}
                value={place}
            />
            <Button icon={{name: 'save'}} onPress={() => navigation.navigate('Maps')} title="Maps" color={'gray'} />
        </View>
    );
};