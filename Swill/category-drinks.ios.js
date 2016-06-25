import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
} from 'react-native';

import Recipe from './recipe'

var REQUEST_URL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      isVisible: true,
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
    var ingredient = this.props.category
    fetch(REQUEST_URL + ingredient)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.drinks),
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            {this.props.type}
          </Text>
        </View>
        <View style={styles.ListView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderDrink.bind(this)}
            style={styles.ListView}
          />
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <Text>
        Loading drinks...
      </Text>
    );
  }

  renderDrink(drink) {
    return (
      <View style={styles.container}>
        <View style={styles.category}>
          <TouchableHighlight
            onPress={this.navigate.bind(this, 'recipe', drink.idDrink)}
          >
            <Text style={styles.title}>{drink.strDrink}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  navigate(routeName, drink) {
    this.props.navigator.push({
      name: routeName,
      passProps: {drinkId: drink}
    });
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
  }
});

export default Category;
