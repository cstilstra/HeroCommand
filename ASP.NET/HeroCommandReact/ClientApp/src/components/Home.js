import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome to Hero Command!</h1>
        <p>
            In Hero Command you play the part of a leader who hires heroes to undertake various missions.
            As a reward for completing missions, heroes gain skill while you gain coin and experience.
            As you gain experience, more heroes become available for hire and more missions become available to undertake.
        </p>
        <p>Hero Command is single-page application serving data through a REST API, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>
            Hero Command <strong>is not</strong> meant to be a fully-realized, playable game. 
            Rather it has been designed as a technical demo to show off its creator's technical capabilities.
            If you would like to take a look at the source code for Hero Command, please feel free to visit over on <a href='https://github.com/cstilstra/HeroCommand'>Github</a>.
        </p>
      </div>
    );
  }
}
