import React, {useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {imgurl, url} from '../URL';
const PrepareTopic = ({navigation, route}) => {
  const {detailstopic} = route.params;
  const [topicsdata, setTopicsdata] = useState([]);

  useEffect(() => {
    console.log('QUESPT', detailstopic);
  }, []);

  return (
    <View>
      <ScrollView>
        <Text style={{fontWeight: 'bold'}}>{detailstopic[0].topicName}</Text>
        <Text style={{color: 'black'}}>{detailstopic[0].topicpara}</Text>
        <View>
          <FlatList
            data={detailstopic[0].img}
            renderItem={({item}) => {
              <Image
                source={{
                  uri: imgurl + 'Images/chpTopicImages/' + item.img,
                }}
                style={{
                  alignSelf: 'center',
                  width: 300,
                  height: 300,
                }}
              />;
            }}></FlatList>
        </View>

        {/* {topicsdata.map(
        ({TopicID, topicName, topicpara, Chapter, Class}, index) => (
          <View key={TopicID}>
            <Text>
              {TopicID}: {topicName}
            </Text>
          </View>
        ),
      )} */}
      </ScrollView>
    </View>
  );
};
export default PrepareTopic;
