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
} from 'react-native';

import Main from './main'
import Category from './category-drinks'
import Recipe from './recipe'

const categories = ['Vodka','Tequila', 'Light rum', 'Gin', 'Dark rum', 'Scotch', 'Whiskey', 'Bourbon', 'Mezcal', 'Brandy', 'Champagne', 'Rum', 'Cognac', 'Kahlua', 'Peanut Liqueur', 'Sake', 'Soju', 'Peppermint schnapps', 'Everclear' ]

class Swill extends Component {

  renderScene(route, navigator) {
    if (route.name === 'main') {
      return <Main navigator={navigator} />
    }
    else if (route.name === 'recipe') {
      return <Recipe navigator={navigator} {...route.passProps} />
    }
    else if (route.name === 'category') {
      return <Category navigator={navigator} {...route.passProps} />
    }
  }

  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
      // passProps: {name: routeName},
    })
  }

  render() {

    return (

      <Navigator
        initialRoute={{name:'main'}}
        renderScene={this.renderScene.bind(this)}
      />
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
