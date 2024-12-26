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

const UserDashboard = ({navigation, route}) => {
  const {userID} = route.params;
  useEffect(() => {
    console.log('userid:', userID);
  });
  const Nextbutton = () => {
    if (
      selectedGrade == '9th' &&
      selectedSubjects == 'Physics' &&
      selectedBoard == 'Rawalpindi' &&
      selectedVariation == 'Chapter-Wise'
    ) {
      if (selectedStream == 'Biology' || selectedStream == 'Computer Science')
        console.log(
          selectedGrade,
          selectedStream,
          selectedSubjects,
          selectedBoard,
          selectedVariation,
        );
      navigation.navigate('Chapterwise', {
        selectedGrade,
        selectedSubjects,
        selectedBoard,
        userID: userID,
      });
    } else if (
      selectedGrade == '9th' &&
      selectedSubjects == 'Physics' &&
      selectedBoard == 'Rawalpindi' &&
      selectedVariation == 'Past Papers'
    ) {
      if (selectedStream == 'Biology' || selectedStream == 'Computer Science')
        console.log(
          selectedGrade,
          selectedStream,
          selectedSubjects,
          selectedBoard,
          selectedVariation,
        );
      navigation.navigate('Pastpaper', {
        selectedGrade,
        selectedSubjects,
        selectedBoard,
      });
    } else if (
      selectedGrade == '9th' &&
      selectedSubjects == 'Physics' &&
      selectedBoard == 'Federal' &&
      selectedVariation == 'Past Papers'
    ) {
      if (selectedStream == 'Biology' || selectedStream == 'Computer Science')
        console.log(
          selectedGrade,
          selectedStream,
          selectedSubjects,
          selectedBoard,
          selectedVariation,
        );
      navigation.navigate('Pastpaper', {
        selectedGrade,
        selectedSubjects,
        selectedBoard,
      });
    } else if (
      (selectedGrade == '9th' &&
        selectedSubjects == 'Physics' &&
        selectedBoard == 'Federal') ||
      ('Rawalpindi' && selectedVariation == 'Chapterwise PastPapers')
    ) {
      if (selectedStream == 'Biology' || selectedStream == 'Computer Science')
        console.log(
          selectedGrade,
          selectedStream,
          selectedSubjects,
          selectedBoard,
          selectedVariation,
        );
      navigation.navigate('ChpwisePastPaper', {
        selectedGrade,
        selectedSubjects,
        selectedBoard,
      });
    }
  };

  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedVariation, setSelectedVariation] = useState('');

  const grades = ['9th', '10th', '11th', '12th'];
  const streams = [
    'FSc Pre-Engineering',
    'FSc Pre-Medical',
    'ICS',
    'Biology',
    'Computer Science',
  ];
  const subjects = [
    'English',
    'Urdu',
    'Islamiyat',
    'Pak-Studies',
    'Physics',
    'Chemistry',
    'Mathematics',
  ];
  const boards = ['Rawalpindi', 'Lahore', 'Federal'];
  const variations = ['Past Papers', 'Chapter-Wise', 'Chapterwise PastPapers'];

  const toggleSubject = subject => {
    const index = selectedSubjects.indexOf(subject);
    if (index !== -1) {
      setSelectedSubjects(selectedSubjects.filter(item => item !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

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
      <Text style={styles.header}>Select Stream</Text>
      <Picker
        selectedValue={selectedStream}
        onValueChange={itemValue => setSelectedStream(itemValue)}
        style={styles.picker}>
        {streams.map((stream, index) => (
          <Picker.Item key={index} label={stream} value={stream} />
        ))}
      </Picker>
      <Text style={styles.header}>Select Subject</Text>
      <View style={styles.buttonContainer}>
        {subjects.map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedSubjects.includes(subject) && styles.selectedButton,
            ]}
            onPress={() => toggleSubject(subject)}>
            <Text style={styles.buttonText}>{subject}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.header}>Select Board</Text>
      <View style={styles.buttonContainer}>
        {boards.map((board, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedBoard === board && styles.selectedButton,
            ]}
            onPress={() => setSelectedBoard(board)}>
            <Text style={styles.buttonText}>{board}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.header}>Select Variation</Text>
      <View style={styles.buttonContainer}>
        {variations.map((variation, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedVariation === variation && styles.selectedButton,
            ]}
            onPress={() => setSelectedVariation(variation)}>
            <Text style={styles.buttonText}>{variation}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={Nextbutton}>
        <View
          style={{
            backgroundColor: 'blue',
            padding: 5,
            borderRadius: 50,
            marginLeft: 100,

            width: 200,
            height: 40,
            margin: 2,
            marginTop: 4,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              marginLeft: 1,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Next
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
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});

export default UserDashboard;
