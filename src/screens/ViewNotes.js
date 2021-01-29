import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Text, Button, TextInput } from 'react-native'
// import { TextInput, Title, List } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote } from '../redux/notesApp'
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

import Header from '../components/Header'

function ViewNotes({ navigation }) {
  const notes = useSelector(state => state)
  const dispatch = useDispatch()
  const addNote = note => dispatch(addnote(note))
  const deleteNote = id => dispatch(deletenote(id));
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)


  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <>
      <Header titleText='test-rating' />
        <View>
          <Text>Enter your name</Text>
          <TextInput keyboardType="default" value={name} onChangeText={name => setName(name)}/>
          <Text>Enter your age</Text>
          <TextInput keyboardType="number-pad" value={age} onChangeText={age => setAge(age)}/>
          <Text>Select birth date</Text>
          <View>
            <View>
              <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            <Text>Select birth date</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />

        {/* {notes.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>You do not have any notes</Text>
          </View>
        ) : (
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <List.Item
                title={item.note.noteTitle}
                description={item.note.noteValue}
                descriptionNumberOfLines={1}
                titleStyle={styles.listTitle}
                onPress={() => deleteNote(item.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}
        <FAB
          style={styles.fab}
          small
          icon='plus'
          label='Add new note'
          onPress={() =>
            navigation.navigate('AddNotes', {
              addNote
            })
          }
        /> */}
      </View>
      <Button
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
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
    bottom: 10
  },
  listTitle: {
    fontSize: 20
  }
})

export default ViewNotes
