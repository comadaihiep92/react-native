import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import {FAB } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote } from '../redux/notesApp'


import Header from '../components/Header'

const Item = ({ title }) => (
  <View >
    <Text style={styles.title}>{title}</Text>
  </View>
);

function ViewNotes({ navigation }) {
  const notes = useSelector(state => state)
  const dispatch = useDispatch()
  const addNote = note => dispatch(addnote(note))
  const deleteNote = id => dispatch(deletenote(id));
  const result = Object.keys(notes).map(key => ({[key]: notes[key]}));
  console.log('notes: ', notes)
  
  const renderItem = ({item}) => {
    <Item style={{flex: 1}}
      name={item.note.name}
      age={item.note.age}
      date={item.note.date}
      married={item.note.married}
      onPress={() => deleteNote(item.id)}
    />
  };



  return (
    <>
      <Header titleText='test-RESUTL' />
        <View style={{flex: 1}}>
          {notes.length === 0 ? (
            <View style={styles.titleContainer} >
              <Text style={styles.title}>You do not have any things</Text>
            </View>
          ) : (
            <View style={styles.titleContainer} >
              <Text>Total: {notes.length}</Text>
              {notes.map(item => (
                <View style={{backgroundColor: "#fff", borderRadius: 10, shadowColor:'#000', width: '90%', paddingHorizontal: 20 ,paddingVertical: 10, marginVertical: 5 }}>
                  <Text>{item.note.name}</Text>
                  <Text>{item.note.age}</Text>
                  <Text>{item.note.date.toString()}</Text>
                  <Text>{item.note.married.toString()}</Text>
                </View>
              ))}
              <FlatList
                data={notes}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
            <FAB
              style={styles.fab}
              small
              icon='plus'
              label='Add new test'
              onPress={() =>
                navigation.navigate('AddNotes', {
                  addNote
                })
              }
            />
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  title2: {
    fontSize: 18,
    color: '#5e53ae',
   
    marginVertical: 15,
  },
  input: {
    borderColor: '#b7b7b7',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 20,
    height: 40,
    lineHeight: 40,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18,
    color: '#403967'
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    marginVertical: 15
  },
  button: {
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    color: 'red',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 20
  },container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0
  },
  listTitle: {
    fontSize: 20
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
})

export default ViewNotes

