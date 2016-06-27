# Swill
The mobile bartender


User stories:
* A user should be able to see a list of drink categories when they open the app.
* A user should be able to select a category and see all the drinks in that category.
* A user should be able to search for a specific drink.
* A user should be able to select their desired drink.
* A user should be able to see the recipe for that drink.
* A user should be able to see the visual representation of the drink.

## Installation (MAC OS X)

You will need Brew, NodeJS and Xcode.

Then, install the React Native command line tools:

```
npm install -g react-native-cli
```

Install Watchman and Flow:
```
brew install watchman

brew install flow
```

To run the application, navigate to its directory and run the command:

```
react-native run-ios
```

### Installation Notes

You might need to also to take care of Node dependencies using

```
npm install
```

In case you get an error where the development server is not running, type:

```
npm start
```

If you have trouble with the version of Node, you can install a newer version using:

```
npm install -g n
n v4.1.2

# Verify the Node version
node -v
```
