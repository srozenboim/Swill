

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
import Guide from './drink-guide'
import Search from './search-results'
import Error from './error'
import Register from './register'
import Login from './login'
import Root from './root'

class Swill extends Component {

  renderScene(route, navigator) {
    if(route.name == 'root') {
    return <Root navigator={navigator} />
    }
    else if (route.name === 'main') {
      return <Main navigator={navigator} {...route.passProps} />
    }
    else if(route.name == 'register') {
      return <Register navigator={navigator} />
    }
    else if(route.name == 'login') {
      return <Login navigator={navigator} />
    }
    else if (route.name === 'recipe') {
      return <Recipe navigator={navigator} {...route.passProps} />
    }
    else if (route.name === 'category') {
      return <Category navigator={navigator} {...route.passProps} />
    }
    else if (route.name === 'guide') {
      return <Guide navigator={navigator} {...route.passProps} />
    }
    else if (route.name === 'search') {
      if (route.passProps.results == "") {
        return <Error navigator={navigator} {...route.passProps} />
      }
      else {
      return <Search navigator={navigator} {...route.passProps} />
      }
    }
    else if (route.name === 'error') {
      return <Error navigator={navigator} {...route.passProps} />
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
