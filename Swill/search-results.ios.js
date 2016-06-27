import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight
} from 'react-native';


var REQUEST_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="

class Search extends Component {
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
    this.fetchData();
  }

  fetchData() {
    var ingredient = this.props.results
    fetch(REQUEST_URL + ingredient)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        if (responseData.drinks == null){
          this.navigate("error", responseData.drinks)
        }
        else {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.drinks),
            loaded: true,
          })
        }
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
          <TouchableHighlight underlayColor={'transparent'}
            onPress={this.back.bind(this, 'recipe')}
          >
            <Text style={styles.bButton}>  &lsaquo; </Text>
          </TouchableHighlight>
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
          <TouchableHighlight underlayColor={'transparent'}
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

  back(routeName, drink) {
    this.props.navigator.pop({
      name: routeName,
      passProps: {drinkId: drink}
    });
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
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FE5F55',
    backgroundColor: '#EEF5DB',
    paddingTop: 8,
    paddingBottom: 8
  },
  bButton: {
    backgroundColor: '#FE5F55',
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
});

export default Search;
