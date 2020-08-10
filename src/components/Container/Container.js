import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types';
import ImageContent from '../Image';
import Button from '../Button';
import { addClass, removeClass } from '../../utils/classNames';
import './Container.scss';

const transitionTime = 300;

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.canMoveToLeft = this.canMoveToLeft.bind(this);
    this.canMoveToRight = this.canMoveToRight.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.state = {
      selectedImgIndex: props.selectedImgIndex,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyboard);
    const scrollTop = document.body.scrollTop;
    addClass(document.documentElement, 'lightbox--opened');
    document.documentElement.style.top = `-${scrollTop}px`;
    document.body.scroll = 'no'; // для IE
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyboard);
    const scrollTop = Math.abs(parseInt(document.documentElement.style.top, 10))
    removeClass(document.documentElement, 'lightbox--opened');
    document.documentElement.style.top = null;
    document.body.scrollTop = scrollTop
    document.body.scroll = "yes"; // для IE
  }

  handleKeyboard(ev) {
    const key = ev.keyCode ? ev.keyCode : ev.which;

    switch (key) {
      case 37:
        return this.handleLeftClick();
      case 39:
        return this.handleRightClick();
      case 27:
        return this.props.toggleControls();
      default:
        break;
    }
  }

  handleLeftClick(){
    if (this.canMoveToLeft()) {
      this.setState({
        selectedImgIndex: (this.state.selectedImgIndex - 1),
        direction: 'left'
      });
    };
  }

  handleRightClick(){
    if (this.canMoveToRight()) {
      this.setState({
        selectedImgIndex: (this.state.selectedImgIndex + 1),
        direction: 'right'
      });
    };
  }

  canMoveToLeft() {
    return (this.state.selectedImgIndex > 0);
  }

  canMoveToRight() {
    return (this.state.selectedImgIndex < (this.props.images.length - 1));
  }

  render() {
    let [props, state] = [this.props, this.state];
    let image = props.images[state.selectedImgIndex];
    let leftButton, rightButton;
    const transitionName = 'lightbox-transition-image';

    if(this.canMoveToLeft())
      leftButton = (
        <div className='lightbox-btn-left'>
          <Button icon="left-arrow" onClick={this.handleLeftClick} size={56} />
        </div>
      )

    if(this.canMoveToRight())
      rightButton = (
        <div className='lightbox-btn-right'>
          <Button icon="right-arrow" onClick={this.handleRightClick} size={56} />
        </div>
      )
    
    return (
      <div className='lightbox-backdrop' ref='container'>
        <div className='lightbox-btn-close'>
          <Button icon="back-arrow" onClick={props.toggleControls} size={34} />
        </div>
        <div className='lightbox-title-content'>
          <div className='lightbox-title'>
            {image.title}
          </div>
        </div>
        <CSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={transitionTime}
          transitionEnterTimeout={transitionTime}
          transitionLeaveTimeout={transitionTime}
          transitionName={ {
            enter: `${transitionName}-enter-${state.direction}`,
            enterActive: `${transitionName}-enter-${state.direction}-active`,
            leave: `${transitionName}-leave-${state.direction}`,
            leaveActive: `${transitionName}-leave-${state.direction}-active`,
            appear: `${transitionName}-appear`,
            appearActive: `${transitionName}-appear-active`
          } }
        >
          <ImageContent
            key={Math.random()}
            src={image.url}
          />
        </CSSTransitionGroup>
        {leftButton}
        {rightButton}
      </div>
    )
  }
}

Container.propTypes = {
  selectedImgIndex: PropTypes.number,
  images: PropTypes.array.isRequired,
  toggleControls: PropTypes.func.isRequired,
}