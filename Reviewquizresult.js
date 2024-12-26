import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
//import axios from 'axios';

const ReviewQuizResult = ({userID}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          'http://192.168.42.2/oldexamrepo/api/QuizReview/FetchQuizData',
          {UserID: userId},
        );
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Quiz Results</Text>
      {data &&
        data.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>Correct Quiz Number: {item.CorrectQuizNo}</Text>
            <Text>Wrong Quiz Number: {item.WrongQuizNo}</Text>
            <Text>Correct Quiz: {item.CorrecQuiz}</Text>
            <Text>Wrong Quiz: {item.WrongQuiz}</Text>
            <Text>Remarks: {item.Remarks}</Text>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default ReviewQuizResult;
