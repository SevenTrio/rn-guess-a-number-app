import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import StartGameScreen from "./screens/StartGameScreen";

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
}

const App = () => {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

    const configureNewGame = () => {
        setGuessRounds(0);
        setUserNumber(null);
    }

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    };

    const gameOverHandler = (numOfRounds) => {
        setGuessRounds(numOfRounds);
    }

    let content = <StartGameScreen onStartGame={startGameHandler}/>;

    if (userNumber && guessRounds <= 0) {
        content = (
            <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
        );
    } else if (guessRounds > 0) {
        content = (
            <GameOverScreen
                roundsNumber={guessRounds}
                userNumber={userNumber}
                onRestart={configureNewGame}
            />
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Header title="Guess a Number"/>
            {content}
            <StatusBar style="auto"/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default App;
