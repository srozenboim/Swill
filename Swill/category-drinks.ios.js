import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator
} from 'react-native';

import Recipe from './recipe'
import Spinner from 'react-native-spinkit'

var REQUEST_URL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'ChasingDots',
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
    setTimeout(function(){
      this.setState({
        loaded: true,
        isVisible: false,
      })
    }.bind(this), 1000);

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
            renderRow={this.renderDrink}
            style={styles.ListView}
          />
        </View>
      </View>
    );
  }


        // <Text>
        //   Loading drinks...
        // </Text>
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={100} type={this.state.type} color={'#ff8c00'}/>
      </View>
    );
  }

  renderDrink(drink) {
    return (
      <View style={styles.container}>
        <View style={styles.drink}>
          <Text style={styles.title}>{drink.strDrink}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  spinner: {
    marginBottom: 50
  },
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
  },
  category: {
    flex: 1,
  }
});

export default Category;
