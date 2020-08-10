import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import './Image.scss';

export default class ImageContent extends React.Component {
  constructor(props) {
    super(props);
    this.resetImageInitialState = this.resetImageInitialState.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.isInsideImage = this.isInsideImage.bind(this);
    this.state = {
      loader: true,
    };
  }

  componentDidMount() {
    this.resetImageInitialState(this.props);
    this.startPoints = null;
    window.addEventListener('resize', this.handleWindowResize);
    window.setTimeout(this.props.toggleControls, 500);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  resetImageInitialState(props) {
    let img = new Image();
    let _this = this;
    img.onload = function(){
      let [width, height] = [this.width, this.height];
      let box = ReactDOM.findDOMNode(_this.refs.container);
      let [boxWidth, boxHeight] = [box.offsetWidth, box.offsetHeight]
      let ratio = Math.min(boxWidth / width, boxHeight / height);

      if(isNaN(ratio)) {
        ratio = 1;
      }

      _this.setState({
        loader: false,
        ratio: ratio,
        positionX: (boxWidth - width * ratio) / 2,
        positionY: (boxHeight - height * ratio) / 2,
        width: this.width,
        height: this.height,
        boxWidth: boxWidth,
        boxHeight: boxHeight,
      })
    };
    img.src = props.src;
  }

  handleWindowResize() {
    this.resetImageInitialState(this.props);
  }

  isInsideImage(ev) {
    let rect = ReactDOM.findDOMNode(this.refs.container).getBoundingClientRect();
    
    if(ev.pageY < rect.top || ev.pageY > rect.bottom || ev.pageX < rect.left || ev.pageX > rect.right) {
      return false;
    }

    return true;
  }

  render() {
    let [props, state] = [this.props, this.state];
    let background = `url(${props.src})`;
    let loader;

    if(state.loader){
      background = 'none';
      loader = (
        <div className='lightbox-loader'>
          <Icon icon="spinner" size={ 58 } />
        </div>
      )
    }

    let styles = {
      height: '100%',
      backgroundImage: background,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${state.width * state.ratio}px ${state.height * state.ratio}px`,
      backgroundPosition: `${state.positionX}px ${state.positionY}px`,
    }
    
    return (
      <div className='lightbox-content-center'>
        <div className='lightbox-image-container' ref='container'>
          <div className={'lightbox-image' + (state.moving ? ' moving' : '')} style={styles}>
            {loader}
          </div>
        </div>
      </div>
    )
  }
}

Image.propTypes = {
  src: PropTypes.string,
};