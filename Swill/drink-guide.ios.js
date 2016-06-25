import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
  Image
} from 'react-native';

var REQUEST_URL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="

class Guide extends Component {
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
    var drink_id = this.props.drinkId
    fetch(REQUEST_URL + drink_id)
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

  navigate(routeName, drinkCategory) {
    this.props.navigator.pop({
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
            {this.props.type}
          </Text>

          <TouchableHighlight
            onPress={this.navigate.bind(this, 'category')}
          >
            <Text style={styles.bButton}> &larr; Back</Text>
          </TouchableHighlight>

        </View>
        <View style={styles.ListView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRecipe.bind(this)}
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

  renderGuide(recipe) {
      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{recipe.strDrink}</Text>
            <Text style={styles.header}>Ingredients: </Text>
            <Text style={styles.text}>{this.displayIngredients(recipe)}</Text>
            <Text style={styles.header}>Instructions: </Text>
            <Text style={styles.text}>{this.displayInsructions(recipe)}{"\n"}</Text>
            </View>
          </View>
        );
    } else {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{recipe.strDrink}</Text>
          <Text style={styles.header}>Ingredients: </Text>
          <Text style={styles.text}>{this.displayIngredients(recipe)}</Text>
          <Text style={styles.header}>Instructions: </Text>
          <Text style={styles.text}>{this.displayInsructions(recipe)}{"\n"}</Text>
          <Image
            style={styles.drinkImage}
            source={{uri: url}}
          />
        </View>
      </View>
    );
  }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#B8D8D8',
    marginTop: 24,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4F6367'
  },
  ListView: {
    flex: 1,
    paddingTop: 10,
  },
  category: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  drinkImage: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',

  },
  header: {
    fontSize: 16,
    fontWeight: 'bold'
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

export default Guide;
