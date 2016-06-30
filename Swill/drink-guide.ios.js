import Qty from 'js-quantities';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
  Image,
  ScrollView,
  UIManager,
  findNodeHandle
} from 'react-native';

import InvertibleScrollView from 'react-native-invertible-scroll-view';

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
    this.setState({
      loaded: true,
    });
  }

  back(routeName, drink) {
    this.props.navigator.pop({
      name: routeName,
      passProps: {drinkId: drink}
    });
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
          {this.props.drink.strDrink}
        </Text>

      </View>
      <View>
        <Text style={styles.instructions}>
          Directions: {this.props.instructions}
        </Text>
      </View>

    <View style={styles.container} ref='container'>
      <InvertibleScrollView>
          {this.state.scrollViewPadding ? <View style={{height: this.state.scrollViewPadding}} /> : null}
          <View onLayout={this._adjustPadding.bind(this)}>
          <Text style={styles.text}>
            {this.displayIngredients(this.renderGuide, this.props.ingredients)}
          </Text>
          </View>
      </InvertibleScrollView>
      </View>
    </View>
    );
  }

  _adjustPadding({nativeEvent}) {
    let height = nativeEvent.layout.height;
    let container = this.refs.container;
    UIManager.measure(findNodeHandle(container), (x, y, width, containerHeight) => {
        this.setState({scrollViewPadding: Math.max(containerHeight - height, 0)});
    });
  }

  // <ScrollView>
  //   <View>
  //     <Text style={styles.text}>
  //       {this.displayIngredients(this.renderGuide, this.props.ingredients)}
  //     </Text>
  //   </View>
  // </ScrollView>

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading drinks...
        </Text>
      </View>
    );
  }

  displayIngredients(callback, ingredients){
    var keys = Object.keys(ingredients)
    //the total number of pixels in the drink
    //this will be calculated by figuring out
    //the total number of inches in the drink
    //this is done by taking the total volume of the drink,
    //which is the sum of the volumes of the ingredients in the drink,
    //and using the volume to height calculation we came up with earlier
    var totalPix = 576 //6 inches in px default, this will need to be calculated
    var total = 0
    for (key of keys) {
      amount =  ingredients[key].correctedMeasurement
      total += amount
    }

    totalPix = totalPix*(total/16)
    console.log(totalPix);
    console.log(total)

    return(
      <Text style={styles.text}>
      {keys.map(function(key, index){
         amount = ingredients[key].correctedMeasurement;
         return callback(ingredients[key], key, totalPix*(amount/total))
       })}
       </Text>
     )
  }

  // allowScroll() {
  //   return scrollEnabled= true
  //   this.setState({ scrollEnabled: scrollEnabled })
  // }

  renderGuide(ingredient, key, height) {
    var colors = ['#FF66E3', '#e1f7d5', '#ffbdbd', '#c9c9ff', '#f1cbff', '#b3d9ff', '#ff9999', '#ffff99', '#99ff99', '#80ffff', '#EFA9FE', '#44B4D5', "#FFFF84", "#E4C6A7", "#FFA4A4"];
    var rand = Math.floor((Math.random() * colors.length));
    return (
      // <ScrollView>
        <View key={ key } style={[styles.section, {
              width: 358,
              height:  height,
              backgroundColor: colors[rand],
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'grey',
              justifyContent: 'center'
            }]}>
          <Text style={styles.text} key={ key }>
            {ingredient.measurement} {ingredient.ingredient}
          </Text>
          </View>
          // </ScrollView>
      );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'stretch',
    backgroundColor: '#B8D8D8',
    marginTop: 24,
    // paddingLeft: 8,
    // paddingRight: 8,
    // paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4F6367'
  },
  text: {
    fontSize: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  bButton: {
    backgroundColor: '#FE5F55',
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
    marginLeft: -8,
    justifyContent: 'flex-start',
    width: 378,
    height: 50,
    backgroundColor: '#FE5F55',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  navtitle: {
    marginTop: 18,
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
  instructions: {
    fontSize: 16,
    justifyContent: 'flex-start',
    paddingBottom: 15,
  },
  scrollview: {
    height: 400,
    justifyContent: 'space-between'
  }

});

export default Guide;
