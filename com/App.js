import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  const [product, setProduct] = useState({
    title: '',
    amount: ''
  });    
  const [ productList, setProductList ] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, 'productList/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const products = data ? Object.keys(data).map(key => ({key, ...data[key]})) : [];
      setProductList(products);
    })
  }, []);
    

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
  
  const saveItem = () => {
    push(ref(database, 'productList/'), product);
    setProduct({
      title: '',
      amount: ''
    });
  }

  const deleteItem = (key) => {
    remove(ref(database, 'productList/' + key));
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff', paddingVertical: 10
         } }}
        />
        <Input
          label='Product'
          placeholder='Product'
          onChangeText={inputProduct => setProduct({...product, title:inputProduct})}
          value={product.title}/>
        <Input
          label='Amount'
          placeholder='Amount'
          onChangeText={inputAmount => setProduct({...product, amount:inputAmount})}
          value={product.amount}/>
        <View style={{
                justifyContent: 'center',
                alignItems: 'center'
          }}>
          <Button title='Save' onPress={saveItem} icon={{name: 'save'}} containerStyle={{
                height: 40,
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
            }} titleStyle={{ color: 'white', marginHorizontal: 20 }} 
          />
        </View>
        <FlatList
          keyExtractor={(item, index) => index}
          renderItem={({item}) =>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle style={{color: 'grey'}}>{item.amount}</ListItem.Subtitle>
              </ListItem.Content>
              <Icon type='material' name='delete' style={{color: 'red'}} onPress={() => deleteItem(item.key)} />
            </ListItem>
          }
          data={productList}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
});
