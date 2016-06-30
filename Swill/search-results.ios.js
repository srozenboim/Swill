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
console.log("hello")
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
        <View style={styles.nav}>
          <TouchableHighlight underlayColor={'transparent'}
            onPress={this.back.bind(this, 'recipe')}
          >
            <Text style={styles.bButton}>  &lsaquo; </Text>
          </TouchableHighlight>
        <Text style={styles.navtitle}>
          {this.props.category}
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
    fontFamily: 'OriyaSangamMN',
    fontSize: 20,
    marginBottom: 1,
    textAlign: 'center',
    // fontWeight: 'bold',

  },
  ListView: {
    flex: 1,
    paddingTop: 10,
  },
  category: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#668cff',
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5
  },
  bButton: {
    backgroundColor: '#007399',
    color: 'white',
    // padding: 3,
    textAlign: 'left',
    marginTop: 0,
    fontSize: 40,
    width: 55,
    // paddingBottom: 10,
    fontWeight: 'bold',
  },
  nav: {
    justifyContent: 'flex-start',
    width: 378,
    height: 50,
    backgroundColor: '#007399',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  navtitle: {
    fontFamily: 'Helvetica',
    marginTop: 15,
    marginLeft: 74,
    fontSize: 20,
    color: 'white',
    letterSpacing: 2,
    fontWeight: 'bold',
  },

});

export default Search;
