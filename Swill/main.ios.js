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
import Search from './search_results'


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
            Welcome to Swill!
          </Text>
        </View>
        <TextInput
          style={styles.search}
          onChangeText={(text) => this.setState({search: text})}
          placeholder="Search"
          autoCorrect={false}
          value={this.state.search}
          onSubmitEditing={(text) => {
            this.navigate('search', this.state.search )
            }
          }
        />
        <View style={styles.ListView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderCategory.bind(this)}
            style={styles.ListView}
          />
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

      <View style={styles.container}>
        <View style={styles.category}>
          <TouchableHighlight
            onPress={this.navigate.bind(this, 'category', category)}
          >
            <Text style={styles.title}>{category}</Text>
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
    backgroundColor: '#F5FCFF',
    marginTop: 24,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ListView: {
    flex: 1,
    paddingTop: 10,
  },
  category: {
    flex: 1,
  },
  search: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  }
});

export default Main

// AppRegistry.registerComponent('Swill', () => Swill);
