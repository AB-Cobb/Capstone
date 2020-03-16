import React from 'react';
import { View, Text } from 'react-native';

class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            elapsedTime: props.elapsedTime,
            isActive: false
        }
    }

    getElapsedTime(){
        return this.state.elapsedTime
    }

    convertToSeconds() {
        return (('0' + this.state.elapsedTime % 60).slice(-2))
    }

    convertToMinutes() {
        return (('0' + Math.floor(this.state.elapsedTime / 60)).slice(-2))
    }

    startTimer() {
        console.log("Starting Timer")
        this.timer = setInterval(() => {
            this.setState({
                elapsedTime: this.state.elapsedTime + 1
            })
        }, 1000)
    }

    stopTimer() {
        console.log("Stopping Timer")
        clearInterval(this.timer)
    }

    pausedStatus(){
        let paused = this.props.isPaused()
        let active = this.state.isActive
        if (!paused && !active){
            this.setState({
                isActive: true
            })
            this.startTimer()
        }
        else if (paused && active){
            this.setState({
                isActive: false
            })
            this.stopTimer()
        }
    }

    render() {
        this.pausedStatus()
        return (
        <View>
            <Text style={{fontSize: 16, margin: 15}}>Time: {this.convertToMinutes()}:{this.convertToSeconds()}</Text>
        </View>);
    }
}
 
export default Timer;