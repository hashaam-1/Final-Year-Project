import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import URL, {url} from '../URL';

const Chapterwise = ({navigation, route}) => {
  const [allChapters, setAllChapters] = useState([]);
  const [chapters, setChapters] = useState([]);
  const {userID} = route.params;
  useEffect(() => {
    console.log(userID);
    fetchChapters();
  }, []);
  const fetchChapters = async () => {
    try {
      console.log('Hi');
      const response = await fetch(url + 'AllChapters/allchps', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('data');
        const data = await response.json();
        setAllChapters(data);
        console.log('DAta', data); // Logging the fetched data
      } else {
        console.log('Error fetching chapters');
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };
  const chpterQues = async () => {
    console.log('Pressed');
    console.log(allChapters);
    navigation.navigate('Allquestion', {
      allChapters: allChapters,
      chapterName: chapters,
      userID: userID,
    });
  };
  return (
    <ScrollView>
      <View>
        <TouchableOpacity onPress={chpterQues}>
          <View style={styles.chapterContainer}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{
                  height: 50,
                  width: 50,
                }}
                source={require('../../Pictures/9thTopicImages/9thchp1.png')}
              />

              <View style={{flexDirection: 'column', marginLeft: 3}}>
                <Text
                  style={{
                    color: 'white',
                    fontStyle: 'italic',
                    fontVariant: 'bold',
                    fontSize: 18,
                  }}>
                  Chapter# 1
                </Text>
                <Text
                  style={{color: 'white', fontVariant: 'bold', fontSize: 15}}>
                  Physical Quantities and Measurement
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={chpterQues}>
          <View style={styles.chapterContainer}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                }}></View>
              <View style={{flexDirection: 'column', marginLeft: 3}}>
                <Text
                  style={{
                    color: 'white',
                    fontStyle: 'italic',
                    fontVariant: 'bold',
                    fontSize: 18,
                  }}>
                  Chapter# 2
                </Text>
                <Text
                  style={{color: 'white', fontVariant: 'bold', fontSize: 15}}>
                  Kinematics
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={chpterQues}>
          <View style={styles.chapterContainer}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                }}></View>
              <View style={{flexDirection: 'column', marginLeft: 3}}>
                <Text
                  style={{
                    color: 'white',
                    fontStyle: 'italic',
                    fontVariant: 'bold',
                    fontSize: 18,
                  }}>
                  Chapter# 3
                </Text>
                <Text
                  style={{color: 'white', fontVariant: 'bold', fontSize: 15}}>
                  Dynamics
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={chpterQues}>
          <View style={styles.chapterContainer}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                }}></View>
              <View style={{flexDirection: 'column', marginLeft: 3}}>
                <Text
                  style={{
                    color: 'white',
                    fontStyle: 'italic',
                    fontVariant: 'bold',
                    fontSize: 18,
                  }}>
                  Chapter# 4
                </Text>
                <Text
                  style={{color: 'white', fontVariant: 'bold', fontSize: 15}}>
                  Turning Effect of Forces
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={chpterQues}>
          <View style={styles.chapterContainer}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                }}></View>
              <View style={{flexDirection: 'column', marginLeft: 3}}>
                <Text
                  style={{
                    color: 'white',
                    fontStyle: 'italic',
                    fontVariant: 'bold',
                    fontSize: 18,
                  }}>
                  Chapter# 5
                </Text>
                <Text
                  style={{color: 'white', fontVariant: 'bold', fontSize: 15}}>
                  Gravitation
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={chpterQues}>
          <View style={styles.chapterContainer}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                }}></View>
              <View style={{flexDirection: 'column', marginLeft: 3}}>
                <Text
                  style={{
                    color: 'white',
                    fontStyle: 'italic',
                    fontVariant: 'bold',
                    fontSize: 18,
                  }}>
                  Chapter# 6
                </Text>
                <Text
                  style={{color: 'white', fontVariant: 'bold', fontSize: 15}}>
                  Work and Energy
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={chpterQues}>
          <View style={styles.chapterContainer}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                }}></View>
              <View style={{flexDirection: 'column', marginLeft: 3}}>
                <Text
                  style={{
                    color: 'white',
                    fontStyle: 'italic',
                    fontVariant: 'bold',
                    fontSize: 18,
                  }}>
                  Chapter# 7
                </Text>
                <Text
                  style={{color: 'white', fontVariant: 'bold', fontSize: 15}}>
                  Properties of Matter
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={chpterQues}>
          <View style={styles.chapterContainer}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                }}></View>
              <View style={{flexDirection: 'column', marginLeft: 3}}>
                <Text
                  style={{
                    color: 'white',
                    fontStyle: 'italic',
                    fontVariant: 'bold',
                    fontSize: 18,
                  }}>
                  Chapter# 8
                </Text>
                <Text
                  style={{color: 'white', fontVariant: 'bold', fontSize: 15}}>
                  Thermal Properties of Matter
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={chpterQues}>
          <View style={styles.chapterContainer}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                }}></View>
              <View style={{flexDirection: 'column', marginLeft: 3}}>
                <Text
                  style={{
                    color: 'white',
                    fontStyle: 'italic',
                    fontVariant: 'bold',
                    fontSize: 18,
                  }}>
                  Chapter# 9
                </Text>
                <Text
                  style={{color: 'white', fontVariant: 'bold', fontSize: 15}}>
                  Transfer Of Heat
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  chapterContainer: {
    marginVertical: 5,
    padding: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
});

export default Chapterwise;
