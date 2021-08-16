import React, {useState, useEffect} from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router';
import {Searchbar} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

let to; //timeout declared for debouncing

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'lightgrey'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('RELEASED_AT');
  const [direction, setDirection] = useState('DESC');
  const { repositories, fetchMore } = useRepositories(searchQuery, orderBy, direction);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {value: "latest", label: "Latest"},
    {value: "highest", label: "Highest rated"},
    {value: "lowest",label: "Lowest rated"}
  ]);
  
  const onChangeSearch = query => {
    clearTimeout(to);
    to = setTimeout(() => {
      setSearchQuery(query);
    }, 500);
  };

  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  const renderItem = ({ item }) => (
    <Pressable onPress={() => history.push(`/${item.id}`)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  const filter = () => {
    switch(value){
      case "highest":
        setOrderBy("RATING_AVERAGE");
        setDirection("DESC");
        break;
      case "lowest":
        setOrderBy("RATING_AVERAGE");
        setDirection("ASC");
        break;
      default:
        setOrderBy("CREATED_AT");
        setDirection("DESC");
        break;
    }
  };


  useEffect(() => {
    filter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <View style={{flex: 1}}>
      <Searchbar
        style={{}}
        placeholder="Search"
        onChangeText={onChangeSearch}
      />
      <DropDownPicker
        style={{borderWidth: 0, borderRadius: 0, paddingLeft: 15}}
        labelStyle={{
          fontWeight: "bold"
        }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={'Latest'}
        placeholderStyle={{
          fontWeight: "bold"
        }}
        dropDownContainerStyle={{
          backgroundColor: "#dfe6e9",
          borderWidth: 0,
          paddingLeft: 5
        }}
      />
      <View style={{backgroundColor: 'grey', padding: 0.5}}></View>
      <FlatList
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 15}}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(_item,index) => index.toString()}
      />
    </View>
  );
};

export default RepositoryList;