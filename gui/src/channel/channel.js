import React from 'react';
import './channel.scss';

import channel from './channeljs'

class Channel extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";
    script.onload = () => {
      window.gapi.load('client', () => {
        channel.getVidContent();
      });
    };

    document.body.appendChild(script);
  }

  render(){
    return(
      <div className="Channel">
        <section className="panel region">
          <div id="video-screen"></div>
          <div id="navigation">
            <img alt='' onClick={()=>channel.getVidContent(channel.yt_prevPageToken)} src={'/images/left.png'} />
            <img alt='' onClick={()=>channel.getVidContent()} src={'/images/home.png'} />
            <img alt='' onClick={()=>channel.getVidContent(channel.yt_nextPageToken)} src={"/images/right.png"} />
          </div>
        </section>

      </div>
    );
  }
}

export default Channel;