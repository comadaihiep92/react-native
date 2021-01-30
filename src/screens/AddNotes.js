
import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Text, Button, TextInput,TouchableOpacity } from 'react-native'
// import { TextInput, Title, List } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote } from '../redux/notesApp'
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

import Header from '../components/Header'

function AddNote({ navigation }) {
  const notes = useSelector(state => state)
  const dispatch = useDispatch()
  const addNote = note => dispatch(addnote(note))
  const deleteNote = id => dispatch(deletenote(id));
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [married, setMarried] = useState(false)

  const [date, setDate] = useState(new Date());
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

  function onSaveNote() {
    navigation.state.params.addNote({ name, age, date, married })
    navigation.goBack()
  }
  // function onSaveNote() {
  //   navigation.state.params.addNote({ noteTitle, noteValue })
  //   navigation.goBack()
  // }
  return (
    <>
      <Header titleText='test-rating' />
         <View style={{paddingHorizontal: 20}}>
          <Text style={styles.title}>Enter your name</Text>
          <TextInput style={styles.input} keyboardType="default" value={name} onChangeText={name => setName(name)}/>
           <Text style={styles.title}>Enter your age</Text>
           <TextInput style={styles.input} keyboardType="number-pad"  value={age.toString()} onChangeText={age => setAge(age)}/>
          <View>
             <View>
             <Text style={styles.title}>Select birth date</Text>
            </View>
            
             <Text style={styles.input}  onPress={showDatepicker}>{formatDate(date)}</Text>
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
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={married}
              onValueChange={(married) => setMarried(married)}
            />
            <Text style={{color:'#403967', fontSize:18}}>Married</Text>
          </View>
          
      </View>
          
      <TouchableOpacity
        style={styles.button}
        disabled={name == '' ? true : false}
        onPress={() => onSaveNote()}
      >
        <Text style={{color:'#7b7979'}}>Finish</Text>
      </TouchableOpacity>
    </>
  )
}
const formatDate = (date, time) => {
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()} `;
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 20
    },
    title: {
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
    }
})

export default AddNote
