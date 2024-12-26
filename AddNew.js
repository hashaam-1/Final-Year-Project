import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
const AddNew = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('Subjective');

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
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  const [subjectiveQuestion, setSubjectiveQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const renderMCQFields = () => {
    return (
      <>
        <TextInput
          style={styles.input}
          placeholder="Enter question"
          value={question}
          onChangeText={text => setQuestion(text)}
        />
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              marginBottom: 10,
              padding: 10,
              marginLeft: 70,
            }}
            placeholder="Option A"
            value={optionA}
            onChangeText={text => setOptionA(text)}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              marginBottom: 10,
              padding: 10,
              marginLeft: 70,
            }}
            placeholder="Option B"
            value={optionB}
            onChangeText={text => setOptionB(text)}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              marginBottom: 10,
              padding: 10,
              marginLeft: 70,
            }}
            placeholder="Option C"
            value={optionC}
            onChangeText={text => setOptionC(text)}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              marginBottom: 10,
              padding: 10,
              marginLeft: 70,
            }}
            placeholder="Option D"
            value={optionD}
            onChangeText={text => setOptionD(text)}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Correct option"
          value={correctOption}
          onChangeText={text => setCorrectOption(text)}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderSubjectiveFields = () => {
    return (
      <>
        <TextInput
          style={styles.questioninput}
          placeholder="Enter question"
          value={subjectiveQuestion}
          onChangeText={text => setSubjectiveQuestion(text)}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            marginBottom: 10,
            marginTop: 10,
            padding: 100,
          }}
          placeholder="Enter answer"
          value={answer}
          onChangeText={text => setAnswer(text)}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </>
    );
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log('Saved!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedYear}
          onValueChange={itemValue => setSelectedYear(itemValue)}
          style={styles.picker}>
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
          style={styles.picker}>
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
      {selectedType === 'MCQ' ? renderMCQFields() : renderSubjectiveFields()}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color: '#ffffff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  radioButtonContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  questioninput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  saveButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddNew;
