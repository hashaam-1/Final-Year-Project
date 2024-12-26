import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {RadioButton, TextInput} from 'react-native-paper';
import {url} from '../URL';

const Attemptmcqs = ({navigation, route}) => {
  const {userID} = route.params;
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [timerStarted, setTimerStarted] = useState(false);
  const [questionType, setQuestionType] = useState('MCQs');
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState({correct: 0, total: 0});
  const [subjquiz, setSubjQuiz] = useState([]);
  const [subjectiveAnswers, setSubjectiveAnswers] = useState([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  useEffect(() => {
    console.log(userID);
    const fetchSubj = async () => {
      try {
        const response = await fetch(url + 'AttemptQuiz/takeSubjectiveQuiz', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSubjQuiz(data);
          startTimer();
        } else {
          throw new Error('Failed to fetch Subj quizzes');
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchSubj();
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(url + 'AttemptQuiz/takeQuiz', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setQuizzes(shuffleArray(data));
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

  const shuffleArray = array => {
    return array.sort(() => Math.random() - 0.5);
  };

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

  const handleOptionSelect = (questionIndex, option, optionText) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [questionIndex]: optionText,
    }));
  };

  const handleSubmit = async () => {
    console.log(userID);

    if (questionType === 'MCQs') {
      let correct = 0;
      let wrong = 0;
      let corrQuiz = [];
      let worQuiz = [];

      for (let i = 0; i < quizzes.length; i++) {
        const currentQuestion = quizzes[i];
        if (selectedOptions[i] === currentQuestion.correctOption) {
          correct++;
          corrQuiz.push(currentQuestion.mcqQuestion);
        } else {
          wrong++;
          worQuiz.push(currentQuestion.mcqQuestion);
        }
      }

      setResult({correct, total: quizzes.length});
      setShowCorrectAnswers(true);
      let rem;
      if (correct > 0 && correct < 4) {
        rem = 'Poor';
      } else if (correct > 5 && correct < 7) {
        rem = 'Avg';
      } else {
        rem = 'Excellent';
      }
      let list = {
        remarks: rem,
        userID: userID,
        tcorrQuiz: correct,
        tworQuiz: wrong,
        corrQuiz: corrQuiz,
        worQuiz: worQuiz,
      };

      console.log('list', list);

      Alert.alert(
        'Result',
        `You answered ${correct} out of ${quizzes.length} questions correctly.`,
      );
      const response = await fetch(url + 'ChpwisePastPapers/quizRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
      });
      if (response.ok) {
        var ans = await response.json();
        console.log('Done', ans);
      }
    } else if (questionType === 'Subjective') {
      Alert.alert(
        'Submission Confirmation',
        'Your subjective answers have been submitted. They will be evaluated manually.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Calculate the number of correct subjective answers
              let correctCount = 0;
              for (let i = 0; i < subjquiz.length; i++) {
                const currentQuestion = subjquiz[i];
                const submittedAnswer = subjectiveAnswers[i];
                console.log('submittedAnswer', submittedAnswer);
                console.log(
                  'currentQuestion.corrAnswer',
                  currentQuestion.corrAnswer,
                );
                if (
                  submittedAnswer &&
                  submittedAnswer === currentQuestion.corrAnswer
                ) {
                  correctCount++;
                }
              }
              setResult({correct: correctCount, total: subjquiz.length});
              Alert.alert(
                'Subjective Quiz Submitted',
                `You answered ${correctCount} out of ${subjquiz.length} questions correctly.`,
              );
            },
          },
        ],
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            console.log('Pressed');
            navigation.navigate('Reviewquizresult', {userID: userID});
          }}
          style={{
            backgroundColor: 'blue',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginLeft: 230,
          }}>
          <Text>Review Result</Text>
        </TouchableOpacity>
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
                <View>
                  {subjquiz.length > 0 && (
                    <View>
                      <View style={styles.questionContainer}>
                        <Text style={styles.questionTitle}>
                          Question {currentQuestionIndex + 1} of{' '}
                          {subjquiz.length}
                        </Text>
                        <TouchableOpacity onPress={startTimer}>
                          <Text style={styles.timer}>{formatTime(timer)}</Text>
                        </TouchableOpacity>
                      </View>
                      <Text style={{color: 'black'}}>
                        {subjquiz[currentQuestionIndex].SubjQues}
                      </Text>
                      <TextInput
                        style={{height: 200}}
                        mode="outlined"
                        label="Enter Answer"
                        onChangeText={text => {
                          const updatedAnswers = [...subjectiveAnswers];
                          updatedAnswers[currentQuestionIndex] = text;
                          setSubjectiveAnswers(updatedAnswers);
                        }}
                      />
                    </View>
                  )}
                </View>
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
                          selectedOptions[currentQuestionIndex] ===
                          quizzes[currentQuestionIndex][option]
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() =>
                          handleOptionSelect(
                            currentQuestionIndex,
                            option,
                            quizzes[currentQuestionIndex][option],
                          )
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

        {showCorrectAnswers && (
          <View style={styles.correctAnswersContainer}>
            <Text style={styles.correctAnswersTitle}>Correct Answers:</Text>
            {quizzes.map((quiz, index) => (
              <Text key={index} style={styles.correctAnswer}>
                Q{index + 1}: {quiz.correctOption}
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
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
  submitText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  correctAnswersContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  correctAnswersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  correctAnswer: {
    fontSize: 16,
    color: 'black',
  },
});

export default Attemptmcqs;
