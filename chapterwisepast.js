import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import {url} from '../URL';

const ChpwisePast = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [chapterNo, setChapterNo] = useState('');
  const [topicName, setTopicName] = useState('');
  const [results, setResults] = useState([]);
  const [allTopics, setAllTopics] = useState([]);

  useEffect(() => {
    const fetchAllChapters = async () => {
      try {
        const response = await fetch(
          url + 'ChpwisePastPapers/chpwisepastpapers',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log('ans', data);
          setAllTopics(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllChapters();
  }, []);

  const handleSearch = () => {
    try {
      console.log('allTopics', allTopics);
      const filteredResults = allTopics.filter(item => {
        return (
          //(selectedYear ? item.examYear === selectedYear : true) &&
          chapterNo ? item.ChapterNo.toString() === chapterNo : true //&&
          //(topicName ? item.topicName.toString() === topicName : true)
        );
      });
      setResults(filteredResults);

      if (filteredResults.length === 0) {
        Alert.alert(
          'No Results',
          'No past papers found for the given criteria',
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemQuestion}>{item.ExamQuestion}</Text>
      <Text style={styles.itemAnswer}>{item.ExamAnswer}</Text>
      <Text style={styles.itemDetails}>
        Exam Year: {item.examYear}, Chapter: {item.ChapterNo}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, {color: 'black'}]}
        keyboardType="numeric"
        placeholder="Enter Chapter No"
        placeholderTextColor="gray"
        value={chapterNo}
        onChangeText={setChapterNo}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={results}
        keyExtractor={item => item.ExamsubjectiveID.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  selectYears: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  yearContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  yearButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  selectedYearButton: {
    backgroundColor: 'grey',
  },
  yearText: {
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemQuestion: {
    fontWeight: 'bold',
    color: 'black',
  },
  itemAnswer: {
    marginVertical: 10,
    color: 'black',
  },
  itemDetails: {
    color: '#555',
    fontWeight: 'bold',
  },
});

export default ChpwisePast;
