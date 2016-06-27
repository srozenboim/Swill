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
          loaded: true,
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

        <TouchableHighlight
          onPress={this.back.bind(this, 'recipe')}
        >
          <Text style={styles.bButton}>  &larr; Back </Text>
        </TouchableHighlight>

        <View style={styles.drinks}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderDrink.bind(this)}
            style={styles.ListView}
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
          Loading drinks...
        </Text>
      </View>
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

  back(routeName, drink) {
    this.props.navigator.pop({
      name: routeName,
      passProps: {drinkId: drink}
    });
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
    backgroundColor: 'white',
    marginTop: 24,
    alignItems: 'stretch'
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#B8D8D8',

  },
  ListView: {
    flex: 1,
    paddingTop: 5,
  },
  category: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10
  },
  bButton: {
    backgroundColor: '#EEF5DB',
    color: 'white',
    padding: 3,
    textAlign: 'left',
    marginLeft: 19,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius:4,
    width: 85,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  drinks: {
    backgroundColor: "white",
  }
});

export default Category;
