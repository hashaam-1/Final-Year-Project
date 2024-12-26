import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {url} from '../URL';

const AllPapers = ({navigation}) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('MCQ');
  const [ttmcqs, setTtmcqs] = useState([]);
  const years = ['2019', '2020', '2021', '2022', '2023'];
  const subjects = [
    'Physics',
    'Chemistry',
    'Urdu',
    'Mathematics',
    'Pak Studies',
    'Islamiyat',
    'Biology',
    'Computer Science',
  ];

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch(url + 'Admin/t3PhysicsPapers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTtmcqs(data);
          console.log('data', data);
        } else {
          throw new Error('Failed to fetch Subj quizzes');
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchPapers();
  }, []);

  const mcqPapers23 = async () => {
    console.log('Pressed');
    console.log(ttmcqs);
    navigation.navigate('Papershow23', {
      ttmcqs: ttmcqs,
    });
  };

  const handleDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => console.log('Deleted')},
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedYear}
          onValueChange={itemValue => setSelectedYear(itemValue)}
          style={styles.picker}
          itemStyle={{color: 'black'}}>
          {years.map((year, index) => (
            <Picker.Item key={index} label={year} value={year} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Select Subject</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSubject}
          onValueChange={itemValue => setSelectedSubject(itemValue)}
          style={styles.picker}
          itemStyle={{color: 'black'}}>
          {subjects.map((subject, index) => (
            <Picker.Item key={index} label={subject} value={subject} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Select Type</Text>
      <View style={styles.radioButtonContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="Subjective"
            status={selectedType === 'Subjective' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedType('Subjective')}
          />
          <Text style={styles.radioText}>Subjective</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="MCQ"
            status={selectedType === 'MCQ' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedType('MCQ')}
          />
          <Text style={styles.radioText}>MCQ</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={mcqPapers23} style={styles.paperContainer}>
          <View style={styles.paperDetails}>
            <Text style={styles.paperText}>Paper 1</Text>
            <Text style={styles.paperText}>Subject: Physics</Text>
            <Text style={styles.paperText}>Year: 2023</Text>
            <Text style={styles.paperText}>Type: MCQ</Text>
          </View>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 5}}>
        <TouchableOpacity onPress={mcqPapers23} style={styles.paperContainer}>
          <View style={styles.paperDetails}>
            <Text style={styles.paperText}>Paper 1</Text>
            <Text style={styles.paperText}>Subject: Physics</Text>
            <Text style={styles.paperText}>Year: 2022</Text>
            <Text style={styles.paperText}>Type: MCQ</Text>
          </View>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 5}}>
        <TouchableOpacity onPress={mcqPapers23} style={styles.paperContainer}>
          <View style={styles.paperDetails}>
            <Text style={styles.paperText}>Paper 1</Text>
            <Text style={styles.paperText}>Subject: Physics</Text>
            <Text style={styles.paperText}>Year: 2021</Text>
            <Text style={styles.paperText}>Type: MCQ</Text>
          </View>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 5}}>
        <TouchableOpacity onPress={mcqPapers23} style={styles.paperContainer}>
          <View style={styles.paperDetails}>
            <Text style={styles.paperText}>Paper 1</Text>
            <Text style={styles.paperText}>Subject: Physics</Text>
            <Text style={styles.paperText}>Year: 2020</Text>
            <Text style={styles.paperText}>Type: MCQ</Text>
          </View>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderColor: 'black',
    color: 'black',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  paperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '80%',
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
  },
  paperDetails: {
    flex: 1,
  },
  paperText: {
    color: 'black',
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default AllPapers;
