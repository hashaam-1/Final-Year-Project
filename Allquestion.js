import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {imgurl} from '../URL';

const AllQuestions = ({navigation, route}) => {
  const {allChapters, userID} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    console.log(userID);
  });
  // Filter chapters based on the search query
  const filteredChapters = allChapters.filter(
    chapter =>
      chapter.topicName &&
      chapter.topicName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const chaptersToDisplay =
    searchQuery.length > 0 ? filteredChapters : allChapters;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          console.log(allChapters);
          navigation.navigate('Attemptmcqs', {userID: userID});
        }}
        style={styles.quizButton}>
        <Text style={styles.quizButtonText}>Take Quiz</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Questions"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <ScrollView>
        {chaptersToDisplay.map(({topicID, topicName, topicPara, image}) => (
          <View key={topicID} style={styles.questionContainer}>
            <Text style={styles.questionTitle}>
              {topicID}: {topicName}
            </Text>
            <Text style={styles.answerText}>{topicPara}</Text>
            <ScrollView horizontal>
              <View style={{height: 600, width: 500, alignSelf: 'center'}}>
                <Image
                  source={{
                    uri: imgurl + 'Images/chpTopicImages/' + image,
                  }}
                  style={{
                    alignSelf: 'center',
                    width: 500,
                    height: 500,
                  }}
                />
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 10,
    color: '#fff',
  },
  searchBar: {
    borderRadius: 5,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black',
  },
  scrollView: {
    flex: 1,
  },
  questionContainer: {
    marginBottom: 20,
    color: 'black',
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  answerText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  quizButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 250,
  },
  quizButtonText: {
    color: 'white',
  },
});

export default AllQuestions;
