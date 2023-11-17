import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  View
} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import Icon from 'react-native-vector-icons/Entypo';
import DATA from './src/users';
export default function App() {
  const [selectedId, setSelectedId] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const show = (item) =>{
    setModalVisible(true);
    setSelectedUser(item);
  };

  const Item = ({item, onPress, backgroundColor, textColor}) => (
  
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}> 
      
      <Text style={[styles.title, {color: textColor}]}> {item.nick} </Text>
      
    </TouchableOpacity>
  
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#ffff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => show(item) }
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    
    <SafeAreaView style={styles.container}>
      
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                {selectedUser &&(
                  <Text style={{fontSize: 28, fontWeight: '500', padding: 15}}>Hello! {selectedUser.nick}</Text>
                )}
                {selectedUser && (
                  <Text style={{fontSize: 28, fontWeight: '100'}}>{selectedUser.name.fname} {selectedUser.name.lname}.
                  </Text>
                )}
                {selectedUser && (
                  <Text style={{fontWeight: '100', fontSize: 22}}>{selectedUser.course}</Text>
                )}

                <TouchableOpacity onPress={()=> setModalVisible(false)}>
                  <Text style={{marginTop: 25, fontSize: 20, color: '#776B5D'}}>Hide</Text>
                </TouchableOpacity>
                  
                   
               
            </View>
          </View>
        </Modal>

      <Text style={{fontSize: 40, fontWeight: 'bold', color: '#22092C', padding: 20}}>FLATLIST</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />

    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 0
    
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#872341',
    borderWidth: 0.2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.50,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,

  },
});
