import React, { Component } from 'react';
import MemberInfo from './MemberInfo';
import '.././index.css';
import './team.css';

export default class Team extends Component {
  state = {
    displayInfo: false
  }
  render() {
    const kyle = (
      <p>
        Hello! I am a self-taught front-end developer and UX/UI Researcher currently studying Human-Computer
        Interaction at the University of Washington.
        Whether I am developing efficient code or sketching new
        designs, I love to create. <br />
        Check out my portfolio: <a href="https://kylekusche.com">KyleKusche.com</a>
      </p>
    )

    const jin = (
      <p>
        Hi! I am a front-end developer/UI desinger/photographer currently studying at the University of Washington in
        Seattle.
        I am focused on details and enjoy learning.
        I love creating new stuffs from web pages to web extensions!
        Currently, the design project I am working on is for a chrome extension; you can check that out
                  <a
          href="https://adobeid-na1.services.adobe.com/ims/jump/eyJraWQiOiJLMjAxNiIsImFsZyI6IlJTMjU2In0.eyJqdGkiOiIxNTg3OTQ2OTYxNTE0X2U5ZDliYzVkLTBlYjQtNDY4MC04ODBmLWZkYTk2ZTk5NGE2OF91ZTEiLCJjaWQiOiJDb21ldFdlYjEiLCJ1aWQiOiI2RkQzMUFFQjVDOEU1ODlEMEE0OTVDNjVAQWRvYmVJRCIsInJ1IjoiaHR0cHM6Ly94ZC5hZG9iZS5jb20vdmlldy9hNjIwZGJjOS01NzE2LTRlZTQtNGVjOS0zOWUxNDRmMmFiYjItZDAxMS8iLCJydCI6InRva2VuIiwiY2UiOiJBWGFtc1J6M2p5VFFTbU56bS1VTlRhOW5YOVdaUjJVUlBEbzBQZG1QeTRnbWhSQjVrYzBQYU9wQ05HOHdGREQzUFBaM2tMNXNjVFBwWjNNWU5vaW9DelNnTGJLV3VMTjZPV0UwemczTEY3azVQdyIsImV4cCI6MTU4Nzk0Nzg2MTUxNCwicmYiOiJVTUlMSllFVVhMTzU3NzYyQzZZTFFQUUFWTT09PT09PSIsImlzcyI6Imh0dHBzOi8vaW1zLW5hMS5hZG9iZWxvZ2luLmNvbSJ9.Nj_ThIxrW-oKPEX5sa0_QITsqVWdonlHm2ADaqpCjMuSZkc6SS-EWtMRy6pfo4eBwIlNzVLJzmd4XcKDh73NKu7gLywrWzK-DYXEsdJrIUKuKZ4S-T-_Btkgn_JmbjfPca69VmiIS96BPmLSiZB1_LXabOTPUyBG7opkcCzxLbfaGShENLuG28ZWBaZXt5XLRmxVQNBoy7BJLizZbTSgtSXQniOUzcUIieHif_2XZPTtSgi0TWEVQZn63YO05OVuo70EdYx07r2_uLouVV8vBSexN4Zq_fnFYQeEclOYsgHMRZxySr7cBZD3g_XyIzdYZE788g0aRuOqunXFVPz6ag"> here</a>.
Vocaby, a Chrome extension project to aid the non-native speakers
of English with learning vocabularies, had just been released on the Chrome extension market!
You can learn more about the app
        <a href="https://chrome.google.com/webstore/detail/vocaby/hdckfbbgphgdfhofmledaeoibolimehd?hl=en"> here!</a>
      </p>
    )

    return (
      <div className="wrapper d-flex flex-column mt-3">
        <h1 className="team-h1">Meet the Team</h1>
        <MemberInfo name={"Kyle"} content={kyle} />
        <MemberInfo name={"Jin"} content={jin} />
      </div>
    )
  }
} 