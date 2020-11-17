import { forModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import React from 'react';
import {Alert} from 'react-native';
import QuizzComponent from '../Components/QuizzComponent';
import {quizScore} from '../environment'
import {connect} from 'react-redux';
function RandomQuizz(props) {
    const {quizzState} = props
    const [index, setIndex] = React.useState(0);
    const [questionData,setQuestionData] = React.useState({...quizzState.CONTENT[index]})
    const [answered, setAnswered] = React.useState(null);
    const [points, setPoints] = React.useState(0);
    const [isGameOver, setGameOver] = React.useState(false);
    // console.log("qsndata",questionData)
    const checkCorrect = (answer) => {
        setAnswered(answer);
        if (answerId === qsnId) {
            setPoints(points+quizScore)
        }
        setTimeout(() => {
            handleNext()
        },800)
    }

    const handleNext = () => {
        setIndex(index + 1)
        setAnswered(false)
    }

    React.useEffect(() => {
        if (quizzState.CONTENT[index]) {
            setQuestionData({...quizzState.CONTENT[index]})
        }
        else {
            setGameOver(true)
        }
    },[index])
    const handleClose = () => {
        Alert.alert(
            "Alert",
            "Do you wish to exit the quizz ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log('canceled'),
                    style:"cancel"
                },
                {
                    text: "Yes",
                    onPress: handleExit,
                    style:"default"
                },
                
            ],
            { cancelable: true },
        )
    }

    const handleExit = () => {
        setIndex(0);
        props.navigation.navigate('UserHome');
    }
    return (
        <React.Fragment> 
            <QuizzComponent
                {...props}
                qsn={questionData}
                checkCorrect={checkCorrect}
                answered={answered}
                handleClose={handleClose}
            />
        </React.Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        quizzState:state.quizzData
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RandomQuizz);

