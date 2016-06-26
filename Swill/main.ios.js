/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Navigator,
  TextInput,
} from 'react-native';

import Category from './category-drinks'
import Search from './search-results'
import Error from './error'


const categories = ['Vodka','Tequila', 'Light rum', 'Gin', 'Dark rum', 'Scotch', 'Whiskey', 'Bourbon', 'Mezcal', 'Brandy', 'Champagne', 'Rum', 'Cognac', 'Kahlua', 'Peanut Liqueur', 'Sake', 'Peppermint schnapps', 'Everclear', 'Beer' ]

class Main extends Component {

  constructor(props) {
    console.log("constructor")
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      search: "",
    };
  }

  componentWillMount() {
    console.log("constructor")
  }

  componentDidMount() {
    console.log("constructor")
    this.fetchData();
  }

  fetchData() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(categories),
      loaded: true,
    });
  }

  navigate(routeName, drinkCategory) {
    this.props.navigator.push({
      name: routeName,
      passProps: {
        category: drinkCategory,
        results: drinkCategory
      }
    });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (

      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            Swill
          </Text>
        </View>
        <View style={styles.body}>
          <TextInput
            style={styles.search}
            onChangeText={(text) => this.setState({search: text})}
            placeholder="Search"
            autoCorrect={false}
            value={this.state.search}
            onSubmitEditing={(text) => {
              this.navigate('search', this.state.search )
              this.state.search = ""
              }
            }
          />
            <Text style={styles.titleCategory}>
              Pick a Category
            </Text>

          <View style={styles.ListView}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderCategory.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading categories...
        </Text>
      </View>
    );
  }


  renderCategory(category) {
    return (

      <View style={styles.listContainer}>
        <View>
          <TouchableHighlight
            onPress={this.navigate.bind(this, 'category', category)}
          >
            <Text style={styles.category}>{category}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#B8D8D8',
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FE5F55',
  },
  titleCategory: {
    fontSize: 20,
    marginBottom: 8,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4F6367',
  },
  ListView: {
    flex: 1,
    paddingBottom: 10,
  },
  category: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#B8D8D8',
    fontSize: 30,
    marginLeft: 20,
    borderRadius: 10,
    textAlign: 'left',
  },
  search: {
    height: 40,
    borderColor: '#FE5F55',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white'
  },
  listContainer: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    color: '#B8D8D8',
    fontSize: 30,
    textAlign: 'right',
    marginRight: 10,
  },
});

export default Main
