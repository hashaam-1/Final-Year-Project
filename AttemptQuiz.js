import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {RadioButton} from 'react-native-paper';
import {url} from '../URL';

const AttemptQuiz = () => {
  const [timer, setTimer] = useState(3600); // 10 minutes in seconds
  const [timerStarted, setTimerStarted] = useState(false);
  const [questionType, setQuestionType] = useState('MCQs');
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [result, setResult] = useState({correct: 0, total: 0});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(url + 'AttemptQuiz/takeSubjectiveQuiz', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
          startTimer();
        } else {
          throw new Error('Failed to fetch quizzes');
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    let interval;
    if (timerStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerStarted, timer]);

  const startTimer = () => {
    setTimerStarted(true);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    for (let i = 0; i < quizzes.length; i++) {
      const currentQuestion = quizzes[i];
      if (selectedOptions[i] === currentQuestion.correctOption) {
        correct++;
      }
    }
    setResult({correct, total: quizzes.length});
    Alert.alert(
      'Result',
      `You answered ${correct} out of ${quizzes.length} questions correctly.`,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={questionType}
          onValueChange={itemValue => setQuestionType(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Subjective" value="Subjective" />
          <Picker.Item label="MCQ's" value="MCQs" />
        </Picker>
      </View>

      <View style={styles.questionBox}>
        {quizzes.length > 0 && (
          <View>
            {questionType === 'Subjective' ? (
              <Text>Subjective</Text>
            ) : (
              <View>
                <View style={styles.questionContainer}>
                  <Text style={styles.questionTitle}>
                    Question {currentQuestionIndex + 1} of {quizzes.length}
                  </Text>
                  <TouchableOpacity onPress={startTimer}>
                    <Text style={styles.timer}>{formatTime(timer)}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{color: 'black'}}>
                  {quizzes[currentQuestionIndex].mcqQuestion}
                </Text>
                {['option1', 'option2', 'option3', 'option4'].map(option => (
                  <View
                    key={option}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <RadioButton
                      style={{color: 'black'}}
                      value={option}
                      status={
                        selectedOptions[currentQuestionIndex] === option
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        handleOptionSelect(currentQuestionIndex, option)
                      }
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        padding: 3,
                        color: 'black',
                        margin: 2,
                      }}>
                      {quizzes[currentQuestionIndex][option]}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>

      <View style={styles.navigationButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.navigationButton,
            currentQuestionIndex === 0 && styles.disabledButton,
          ]}
          onPress={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navigationButton,
            currentQuestionIndex === quizzes.length - 1 &&
              styles.disabledButton,
          ]}
          onPress={handleNextQuestion}
          disabled={currentQuestionIndex === quizzes.length - 1}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      {result.total > 0 && (
        <View style={styles.resultContainer}>
          <Text style={{color: 'black'}}>
            Correct: {result.correct} / {result.total}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  pickerContainer: {
    width: '100%',
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginBottom: 20,
    borderColor: 'black',
    backgroundColor: 'white',
    fontcolor: 'black',
  },
  picker: {
    alignItems: 'center',
    borderRadius: 9,
    borderWidth: 1,
    height: 50,
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  timer: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  questionBox: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: 'black',
  },
  navigationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navigationButton: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
  submitButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 125,
    marginRight: 125,
  },
});
export default AttemptQuiz;
