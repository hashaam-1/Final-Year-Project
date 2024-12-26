import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const AdminDashboard = ({navigation}) => {
  const AddNew = () => {
    // Alert.alert('hasham go next page');
    //let grade = grades[0];
    //let board = boards[0];

    //if (grade == '9th' && subj == 'Physics' && board == 'Rawalpindi') {
    //console.log(grade, subj, board);
    navigation.navigate('AddNew');
  };
  const AllPapers = () => {
    // Alert.alert('hasham go next page');
    //let grade = grades[0];
    //let board = boards[0];

    //if (grade == '9th' && subj == 'Physics' && board == 'Rawalpindi') {
    //console.log(grade, subj, board);
    navigation.navigate('Allpapers');
  };

  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');

  const grades = ['9th', '10th', '11th', '12th'];
  const board = ['Rawalpindi', 'Federal', 'Lahore'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Select Grade</Text>
      <View style={styles.buttonContainer}>
        {grades.map((grade, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedGrade === grade && styles.selectedButton,
            ]}
            onPress={() => setSelectedGrade(grade)}>
            <Text style={styles.buttonText}>{grade}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.header}>Select Board</Text>
      <Picker
        selectedValue={selectedBoard}
        onValueChange={itemValue => setSelectedBoard(itemValue)}
        style={styles.picker}>
        {board.map((board, index) => (
          <Picker.Item key={index} label={board} value={board} />
        ))}
      </Picker>
      <View></View>
      <TouchableOpacity onPress={AddNew}>
        <View
          style={{
            backgroundColor: 'blue',
            padding: 5,
            borderRadius: 50,
            marginLeft: 100,

            width: 200,
            height: 40,
            margin: 2,
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              marginLeft: 1,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Add New
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={AllPapers}>
        <View
          style={{
            backgroundColor: 'blue',
            padding: 5,
            borderRadius: 50,
            marginLeft: 100,

            width: 200,
            height: 40,
            margin: 2,
            marginTop: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              marginLeft: 1,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            All Papers
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
});

export default AdminDashboard;
