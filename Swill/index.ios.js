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
  Navigator
} from 'react-native';

import Category from './category-drinks'

const categories = ['Vodka','Tequila', 'Light rum', 'Gin', 'Dark rum', 'Scotch', 'Whiskey', 'Bourbon', 'Mezcal', 'Brandy', 'Champagne', 'Rum', 'Cognac', 'Kahlua', 'Peanut Liqueur', 'Sake', 'Soju', 'Peppermint schnapps', 'Everclear' ]

class Swill extends Component {
  constructor(props) {
    console.log("constructor")
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
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
  //   fetch(REQUEST_URL)
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       console.log(responseData)
  //
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(categories),
          loaded: true,
        });
  //     })
  }

  navigate(routeName) {
    this.props.navigator.push({
      component: Category,
      passProps: {name: routeName},
    })
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
        <View style={styles.ListView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderCategory}
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
            onPress={this.navigate.bind(this)}
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
  },
  ListView: {
    flex: 1,
    paddingTop: 10,
  },
  category: {
    flex: 1,
  }
});

AppRegistry.registerComponent('Swill', () => Swill);
