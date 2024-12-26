import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Modal, RadioButton, TextInput} from 'react-native-paper';
import {url} from '../URL';

const Pastpaper = ({navigation, route}) => {
  const {chapterName} = route.params;
  const {detailstopic} = route.params;
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedType, setSelectedType] = useState('Subjective');
  const [Ninequizzes23Fed, setNineQuizzes23Fed] = useState([]);
  const [Ninequizzes22Fed, setNineQuizzes22Fed] = useState([]);
  const [Ninequizzes21Fed, setNineQuizzes21Fed] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState();
  const [topicsdata, setTopicsdata] = useState([]);
  //Rawalpindi Nine Mcqs
  const [quizzes23, setQuizzes23] = useState([]);
  const [quizzes22, setQuizzes22] = useState([]);
  const [quizzes21, setQuizzes21] = useState([]);
  const [quizzes20, setQuizzes20] = useState([]);
  const [quizzes19, setQuizzes19] = useState([]);

  //Federal Mcqs Nine
  const [fedquizzes23, setfedQuizzes23] = useState([]);
  useEffect(() => {
    console.log('topicName', detailstopic);
  }, []);
  const quesDatawithNav = async () => {
    setTopicsdata([]);
    console.log('QUES', modalText);
    var formData = new FormData();
    formData.append('QText', modalText);
    const response = await fetch(url + 'PrepareTopic/questionTopics', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    if (response.ok) {
      var ans = await response.json();
      setTopicsdata(ans);
      console.log('ANS: ', ans);
      setShowModal(false);
      navigation.navigate('PrepareTopic', {detailstopic: ans});
    }
  };
  2;

  useEffect(() => {
    console.log(chapterName);
    console.log('UE: ', topicsdata);
  }, [chapterName, topicsdata]);
  //NINE SUBJECTIVE RAWALPINDI
  useEffect(() => {
    const ninefetchSubtwentythreeFed = async () => {
      try {
        const response = await fetch(
          url + 'pastpapers/NineTwentyThreePaperFederal',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setNineQuizzes23Fed(data);
        } else {
          throw new Error('Failed to fetch Subjective');
        }
      } catch (error) {
        console.error('Error fetching Subjective:', error);
      }
    };
    ninefetchSubtwentythreeFed();
  }, []);
  useEffect(() => {
    const ninefetchSubtwentytwoFed = async () => {
      try {
        const response = await fetch(
          url + 'pastpapers/NineTwentyTwoPaperFederal',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setNineQuizzes22Fed(data);
        } else {
          throw new Error('Failed to fetch Subjective');
        }
      } catch (error) {
        console.error('Error fetching Subjective:', error);
      }
    };
    ninefetchSubtwentytwoFed();
  }, []);
  useEffect(() => {
    const ninefetchSubtwentyoneFed = async () => {
      try {
        const response = await fetch(
          url + 'pastpapers/NineTwentyOnePaperFederal',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setNineQuizzes21Fed(data);
        } else {
          throw new Error('Failed to fetch Subjective');
        }
      } catch (error) {
        console.error('Error fetching Subjective:', error);
      }
    };
    ninefetchSubtwentyoneFed();
  }, []);
  //NINE MCQS RAWALPINDI
  useEffect(() => {
    const ninefetchMCQStwentythree = async () => {
      try {
        const response = await fetch(
          url + 'pastpapers/NineTwentyThreePaperRwp',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQuizzes23(data);
        } else {
          throw new Error('Failed to fetch MCQS');
        }
      } catch (error) {
        console.error('Error fetching MCQS:', error);
      }
    };
    ninefetchMCQStwentythree();
  }, []);
  useEffect(() => {
    const ninefetchMCQStwentytwo = async () => {
      try {
        const response = await fetch(url + 'pastpapers/NineTwentyTwoPaperRwp', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQuizzes22(data);
        } else {
          throw new Error('Failed to fetch MCQS');
        }
      } catch (error) {
        console.error('Error fetching MCQS:', error);
      }
    };
    ninefetchMCQStwentytwo();
  }, []);
  useEffect(() => {
    const NinefetchMCQSTwentyOne = async () => {
      try {
        const response = await fetch(url + 'pastpapers/NineTwentyOnePaperRwp', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQuizzes21(data);
        } else {
          throw new Error('Failed to fetch MCQS');
        }
      } catch (error) {
        console.error('Error fetching MCQS:', error);
      }
    };
    NinefetchMCQSTwentyOne();
  }, []);
  useEffect(() => {
    const NinefetchMCQSTwentyTwenty = async () => {
      try {
        const response = await fetch(
          url + 'pastpapers/NineTwentyTwentyPaperRwp',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQuizzes20(data);
        } else {
          throw new Error('Failed to fetch MCQS');
        }
      } catch (error) {
        console.error('Error fetching MCQS:', error);
      }
    };
    NinefetchMCQSTwentyTwenty();
  }, []);
  useEffect(() => {
    const NinefetchMCQSTwentyNineteen = async () => {
      try {
        const response = await fetch(
          url + 'pastpapers/NineTwentyNineteenPaperRwp',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQuizzes19(data);
        } else {
          throw new Error('Failed to fetch MCQS');
        }
      } catch (error) {
        console.error('Error fetching MCQS:', error);
      }
    };
    NinefetchMCQSTwentyNineteen();
  }, []);
  //Nine MCQS FEDERAL.........
  useEffect(() => {
    const NinefetchMCQSTwentyThreefed = async () => {
      try {
        const response = await fetch(
          url + 'pastpapers/NineTwentyThreePaperFed',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setfedQuizzes23(data);
        } else {
          throw new Error('Failed to fetch MCQS');
        }
      } catch (error) {
        console.error('Error fetching MCQS:', error);
      }
    };
    NinefetchMCQSTwentyThreefed();
  }, []);

  const handleYearChange = year => {
    setSelectedYear(year);
  };
  const subjModal = ques => {
    console.log(ques);
    setShowModal(true);
    setModalText(ques);
  };
  return (
    <View>
      <ScrollView>
        <View style={{backgroundColor: '#ffffff ', height: '100%'}}>
          <View
            style={{
              width: '80%',
              alignSelf: 'center',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 20,
            }}>
            <Picker
              style={{color: 'black'}}
              selectedValue={selectedYear}
              onValueChange={handleYearChange}>
              <Picker.Item label="2023" value="2023" />
              <Picker.Item label="2022" value="2022" />
              <Picker.Item label="2021" value="2021" />
              <Picker.Item label="2020" value="2020" />
              <Picker.Item label="2019" value="2019" />
            </Picker>
          </View>
          <Text style={styles.label}>Select Type</Text>
          <View style={styles.radioButtonContainer}>
            <View style={styles.radioButton}>
              <RadioButton
                value="MCQ"
                status={selectedType === 'MCQ' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedType('MCQ')}
              />
              <Text style={styles.radioText}>MCQ's</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="Subjective"
                status={selectedType === 'Subjective' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedType('Subjective')}
              />
              <Text style={styles.radioText}>Subjective</Text>
            </View>
          </View>

          {selectedYear == '2023' && (
            <View>
              {selectedType == 'Subjective' && (
                <View>
                  {Ninequizzes23Fed.map(({QNum, QText, Qanswer}, index) => (
                    <View key={QNum} style={styles.questionContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          subjModal(QText);
                        }}>
                        <Text style={styles.questionTitle}>
                          {index + 1}: {QText}
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.answerbox}>
                        <View
                          style={{
                            width: '100%',
                            alignSelf: 'center',
                          }}>
                          <Text style={{color: 'blue', fontWeight: '800'}}>
                            Answer:{' '}
                          </Text>
                          <Text style={{color: 'black'}}>{Qanswer}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
          {selectedYear == '2022' && (
            <View>
              {selectedType == 'Subjective' && (
                <View>
                  {Ninequizzes22Fed.map(({QNum, QText, Qanswer}, index) => (
                    <View key={QNum} style={styles.questionContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          subjModal(QText);
                        }}>
                        <Text style={styles.questionTitle}>
                          {index + 1}: {QText}
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.answerbox}>
                        <View
                          style={{
                            width: '100%',
                            alignSelf: 'center',
                          }}>
                          <Text style={{color: 'blue', fontWeight: '800'}}>
                            Answer:{' '}
                          </Text>
                          <Text style={{color: 'black'}}>{Qanswer}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
          {selectedYear == '2021' && (
            <View>
              {selectedType == 'Subjective' && (
                <View>
                  {Ninequizzes21Fed.map(({QNum, QText, Qanswer}, index) => (
                    <View key={QNum} style={styles.questionContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          subjModal(QText);
                        }}>
                        <Text style={styles.questionTitle}>
                          {index + 1}: {QText}
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.answerbox}>
                        <View
                          style={{
                            width: '100%',
                            alignSelf: 'center',
                          }}>
                          <Text style={{color: 'blue', fontWeight: '800'}}>
                            Answer:{' '}
                          </Text>
                          <Text style={{color: 'black'}}>{Qanswer}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
          {selectedYear == '2023' && (
            <View>
              {selectedType == 'MCQ' && (
                <View>
                  {quizzes23.map(
                    (
                      {
                        Emcqid,
                        MCQ,
                        option1,
                        option2,
                        option3,
                        option4,
                        correctOption,
                      },
                      index,
                    ) => (
                      <View key={Emcqid} style={styles.questionContainer}>
                        <Text style={styles.questionTitle}>
                          {index + 1}: {MCQ}
                        </Text>
                        <View style={styles.answerbox}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{width: '40%,', color: 'black'}}>
                              a: {option1}
                            </Text>
                            <Text
                              style={{
                                width: '40%',
                                color: 'black',
                                marginLeft: 105,
                              }}>
                              b: {option2}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{width: '40%', color: 'black'}}>
                              c: {option3}
                            </Text>
                            <Text style={{width: '40%', color: 'black'}}>
                              d: {option4}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{color: 'blue', fontWeight: '800'}}>
                              Correct Option:{' '}
                            </Text>
                            <Text style={{color: 'black'}}>
                              {correctOption}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ),
                  )}
                </View>
              )}
            </View>
          )}
          {selectedYear == '2022' && (
            <View>
              {selectedType == 'MCQ' && (
                <View>
                  {quizzes22.map(
                    (
                      {
                        Emcqid,
                        MCQ,
                        option1,
                        option2,
                        option3,
                        option4,
                        correctOption,
                      },
                      index,
                    ) => (
                      <View key={Emcqid} style={styles.questionContainer}>
                        <Text style={styles.questionTitle}>
                          {index + 1}: {MCQ}
                        </Text>
                        <View style={styles.answerbox}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{width: '40%,', color: 'black'}}>
                              a: {option1}
                            </Text>
                            <Text
                              style={{
                                width: '40%',
                                color: 'black',
                                marginLeft: 105,
                              }}>
                              b: {option2}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{width: '40%', color: 'black'}}>
                              c: {option3}
                            </Text>
                            <Text style={{width: '40%', color: 'black'}}>
                              d: {option4}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{color: 'blue', fontWeight: '800'}}>
                              Correct Option:{' '}
                            </Text>
                            <Text style={{color: 'black'}}>
                              {correctOption}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ),
                  )}
                </View>
              )}
            </View>
          )}
          {selectedYear == '2021' && (
            <View>
              {selectedType == 'MCQ' && (
                <View>
                  {quizzes21.map(
                    (
                      {
                        Emcqid,
                        MCQ,
                        option1,
                        option2,
                        option3,
                        option4,
                        correctOption,
                      },
                      index,
                    ) => (
                      <View key={Emcqid} style={styles.questionContainer}>
                        <Text style={styles.questionTitle}>
                          {index + 1}: {MCQ}
                        </Text>
                        <View style={styles.answerbox}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{width: '40%,', color: 'black'}}>
                              a: {option1}
                            </Text>
                            <Text
                              style={{
                                width: '40%',
                                color: 'black',
                                marginLeft: 105,
                              }}>
                              b: {option2}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{width: '40%', color: 'black'}}>
                              c: {option3}
                            </Text>
                            <Text style={{width: '40%', color: 'black'}}>
                              d: {option4}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{color: 'blue', fontWeight: '800'}}>
                              Correct Option:{' '}
                            </Text>
                            <Text style={{color: 'black'}}>
                              {correctOption}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ),
                  )}
                </View>
              )}
            </View>
          )}
          {selectedYear == '2020' && (
            <View>
              {selectedType == 'MCQ' && (
                <View>
                  {quizzes20.map(
                    (
                      {
                        Emcqid,
                        MCQ,
                        option1,
                        option2,
                        option3,
                        option4,
                        correctOption,
                      },
                      index,
                    ) => (
                      <View key={Emcqid} style={styles.questionContainer}>
                        <Text style={styles.questionTitle}>
                          {index + 1}: {MCQ}
                        </Text>
                        <View style={styles.answerbox}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{width: '40%,', color: 'black'}}>
                              a: {option1}
                            </Text>
                            <Text
                              style={{
                                width: '40%',
                                color: 'black',
                                marginLeft: 105,
                              }}>
                              b: {option2}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{width: '40%', color: 'black'}}>
                              c: {option3}
                            </Text>
                            <Text style={{width: '40%', color: 'black'}}>
                              d: {option4}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{color: 'blue', fontWeight: '800'}}>
                              Correct Option:{' '}
                            </Text>
                            <Text style={{color: 'black'}}>
                              {correctOption}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ),
                  )}
                </View>
              )}
            </View>
          )}
          {selectedYear == '2019' && (
            <View>
              {selectedType == 'MCQ' && (
                <View>
                  {quizzes19.map(
                    (
                      {
                        Emcqid,
                        MCQ,
                        option1,
                        option2,
                        option3,
                        option4,
                        correctOption,
                      },
                      index,
                    ) => (
                      <View key={Emcqid} style={styles.questionContainer}>
                        <Text style={styles.questionTitle}>
                          {index + 1}: {MCQ}
                        </Text>
                        <View style={styles.answerbox}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{width: '40%,', color: 'black'}}>
                              a: {option1}
                            </Text>
                            <Text
                              style={{
                                width: '40%',
                                color: 'black',
                                marginLeft: 105,
                              }}>
                              b: {option2}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{width: '40%', color: 'black'}}>
                              c: {option3}
                            </Text>
                            <Text style={{width: '40%', color: 'black'}}>
                              d: {option4}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{color: 'blue', fontWeight: '800'}}>
                              Correct Option:{' '}
                            </Text>
                            <Text style={{color: 'black'}}>
                              {correctOption}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ),
                  )}
                </View>
              )}
            </View>
          )}
          {selectedYear == '2023' && (
            <View>
              {selectedType == 'MCQ' && (
                <View>
                  {fedquizzes23.map(
                    (
                      {
                        Emcqid,
                        MCQ,
                        option1,
                        option2,
                        option3,
                        option4,
                        correctOption,
                      },
                      index,
                    ) => (
                      <View key={Emcqid} style={styles.questionContainer}>
                        <Text style={styles.questionTitle}>
                          {index + 1}: {MCQ}
                        </Text>
                        <View style={styles.answerbox}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{width: '40%,', color: 'black'}}>
                              a: {option1}
                            </Text>
                            <Text
                              style={{
                                width: '40%',
                                color: 'black',
                                marginLeft: 105,
                              }}>
                              b: {option2}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{width: '40%', color: 'black'}}>
                              c: {option3}
                            </Text>
                            <Text style={{width: '40%', color: 'black'}}>
                              d: {option4}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignSelf: 'center',
                            }}>
                            <Text style={{color: 'blue', fontWeight: '800'}}>
                              Correct Option:{' '}
                            </Text>
                            <Text style={{color: 'black'}}>
                              {correctOption}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ),
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View style={styles.modalContainer}>
          <View
            style={{
              width: 300,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
            }}>
            <Text style={styles.title}>Let's Prepare!...</Text>
            <Text style={styles.subtitle}>Do you want to prepare?</Text>
            <TouchableOpacity style={styles.button} onPress={quesDatawithNav}>
              <Text style={styles.buttonText}>Prepare</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'gray'}]}
              onPress={() => setShowModal(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
  },
  subtitle: {
    fontSize: 15,
    color: 'black',
    marginBottom: 30,
  },
  modalContainer: {
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 25,
    marginBottom: 5,
    color: '#51695b',
    marginTop: 10,
    fontWeight: 'bold',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    marginTop: 17,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  questionTitle: {
    color: 'black',
    marginTop: 10,
  },
});

export default Pastpaper;
