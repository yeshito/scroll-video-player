import React, { Component } from 'react';
import { ReactComponent as Arrow } from './arrow-icon.svg';
import './App.css';

class App extends Component {
  state = {
    videoContainerHeight: null,
    titleContainerHeight: null
  };

  titleContainer = React.createRef();
  video = React.createRef();
  frameNumber = 405;
  // start video at frame 405 where video actually starts
  playbackConst = 200;
  // lower numbers = faster playback

  handleVideoData = event => {
    this.setState({ videoContainerHeight: Math.floor(event.currentTarget.duration) * this.playbackConst + "px" });
  };

  scrollPlay = () => {
    const scrollBuffer = window.pageYOffset - this.state.titleContainerHeight * .7;
    const scrollPosition = scrollBuffer > 0 ? scrollBuffer + this.frameNumber : this.frameNumber;
    const frameNumber = scrollPosition / this.playbackConst;
    this.video.current.currentTime = frameNumber;
    window.requestAnimationFrame(this.scrollPlay);
  }

  componentDidMount() {
    this.setState({ titleContainerHeight: this.titleContainer.current.clientHeight })
    window.requestAnimationFrame(this.scrollPlay)
  }

  render() {

    return (
      <div className="App">
        <section ref={this.titleContainer} className="title-container">
          <div className="title-content">
            <h1>Scroll down to Begin</h1>
          </div>
          <Arrow className="arrow-icon"/>
        </section>
        <div
          className="video-container"
          style={{ height: this.state.videoContainerHeight }}
        >
          <video
            ref={this.video}
            className="video"
            tabIndex="0"
            autobuffer="true"
            preload="true"
            onLoadedMetadata={this.handleVideoData}
          >
            <source
              type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'
              src="oculus.mp4"
            />
          </video>
        </div>
      </div>
    );
  }
}

export default App;
