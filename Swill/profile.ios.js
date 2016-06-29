import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
} from 'react-native';


var REQUEST_URL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: this.props.accessToken,
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
   fetch('http://localhost:3000/api/userfavorites', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favorite:{
          accessToken: this.props.accessToken,
          drink_id: this.props.drinkId,
        }
      })
    }).then((res) => res.json())
      .then((res) => {


        var favorite = [Object.values(res)]
        console.log(favorite)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(favorite),
          loaded: true,
        })


      })
      .catch((err) => console.log(err));

 }

          // this.setState({
          //   dataSource: this.state.dataSource.cloneWithRows(favorites),
          //   loaded: true,
          // })
          // console.log(favorites[11])
          // //On success we will store the access_token in the AsyncStorage
          // console.log(res)

  //     } else {
  //         //Handle error
  //         let error = res;
  //         throw error;
  //     }
  //   } catch(errors) {
  //     //errors are in JSON form so we must parse them first.
  //     let formErrors = JSON.parse(errors);
  //     //We will store all the errors in the array.
  //     let errorsArray = [];
  //     for(var key in formErrors) {
  //       //If array is bigger than one we need to split it.
  //       if(formErrors[key].length > 1) {
  //           formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
  //       } else {
  //           errorsArray.push(`${key} ${formErrors[key]}`);
  //       }
  //     }
  //     this.setState({errors: errorsArray})
  //     this.setState({showProgress: false});
  //   }
  // }






parseFavorites(){
  var favoritesObj = JSON.parse(favorites)
    console.log(favoritesObj[14029])
}






  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (

      <View style={styles.container}>

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

  renderDrink(drink) {
    return (
      <View style={styles.container}>
        <View style={styles.category}>
          <TouchableHighlight underlayColor={'transparent'}
            onPress={this.navigate.bind(this, 'recipe', drink.idDrink, drink.strDrink)}
          >
            <Text style={styles.title}>blah</Text>
          </TouchableHighlight>
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




  back(routeName, drink) {
    this.props.navigator.pop({
      name: routeName,
      passProps: {drinkId: drink}
    });
  }




  navigate(routeName, drink) {
    this.props.navigator.push({

      name: routeName,
      passProps: {drinkId: drink, accessToken: this.state.accessToken}
    });
  }

}
// 'Avenir'
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
    marginBottom: 8,
    textAlign: 'center',
    // fontWeight: 'bold',

  },
  ListView: {
    flex: 1,

  },
  category: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FE5F55',
    backgroundColor: '#EEF5DB',
    paddingTop: 10,
    paddingBottom: 10
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
    justifyContent: 'flex-start',
    width: 378,
    height: 50,
    backgroundColor: '#FE5F55',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  navtitle: {
    fontFamily: 'Helvetica',
    marginTop: 15,
    marginLeft: 74,
    fontSize: 20,
    color: 'white',
    letterSpacing: 14,
  },
});

export default Profile;