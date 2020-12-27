import React, { Component } from 'react';
import './style/App.css';
import KalimbaTab from './components/KalimbaTab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewSize: {
        outerWidth: 800,
        outerHeight: 600
      },
      midiFileData: [],
      timeSelection: null
    };
  }

  componentDidMount() {
    // Scale layout to current screen size
    window.addEventListener('resize', this.onResize, false);
    this.onResize();
  }

  /**
   * Updates the size state when the window size changes
   * so views can react and redraw
   */
  onResize = () => {
    this.setState({
      viewSize: {
        outerWidth: Math.floor(window.innerWidth - 20),
        outerHeight: Math.floor(window.innerHeight - 200)
      }
    });
  }

  render() {
    const s = this.state;
    return (
      <div className={`App dark`} >
        <KalimbaTab
          viewSize={s.viewSize}
        />
        <div className='githubLink'>
          <a href='https://github.com/fheyen/midi-pianoroll'>
            <FontAwesomeIcon icon={faGithub} />&nbsp;
                        https://github.com/fheyen/midi-pianoroll
                    </a>
        </div>
      </div >
    );
  }
}
