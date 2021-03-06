/// <reference path="../global.d.ts" /> 
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from 'prop-types';
//
import './index.scss';

export interface LazyloadProps {
  src: string,
  defaultSrc: string,
  alt?: string,
  className?: string[] | string,
  style?: object,
}

export default class lazyload extends React.PureComponent<LazyloadProps> {
  static propTypes = {
    src: PropTypes.string.isRequired,
    defaultSrc: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    style: PropTypes.object,
  }

  static defaultProps = {
    alt: '',
    className: [],
    style: {},
  }

  boxRef = null;

  state = {
    isLazy: true,
  }

  componentDidMount() {
    if (window.IntersectionObserver) {
      this.intersectionObserver();
    } else {
      window.addEventListener('scroll', this.scrollFn)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFn);
  }

  scrollFn = () => {
    if (window.pageYOffset + window.innerHeight >= this.boxRef.offsetTop) {
      this.setState({ isLazy: false });

      window.removeEventListener('scroll', this.scrollFn);
    }
  }
  
  /**
   * Incompatible IntersectionObserver
   *
   */
  private intersectionObserver = () => {
    interface IntersectionEntry {
      [index: number]: any;
    }

    const io: any = new IntersectionObserver((change: IntersectionEntry) => {
      console.log(change[0])
      if (change[0].isIntersecting) {  
        this.setState({ isLazy: false });

        io.disconnect();
      }
    })

    io.observe(this.boxRef);
  }

  /**
   * Parsing class name
   *
   */
  private parseClassNames = () => {
    const { className } = this.props;
    const classNames = [].concat(className);
    let result = '';

    classNames.forEach(item => {
      result += `${item} `;
    })

    return result.trim();
  }

  render() {
    const {
      src,
      defaultSrc,
      alt,
      style,
    } = this.props;

    const { isLazy } = this.state;

    return (
      <div className="m-lazyload" ref={ref => this.boxRef = ref}>
        <img
          src={isLazy ? defaultSrc : src}
          alt={alt}
          className={this.parseClassNames()}
          style={style}
        />
      </div>
    );
  }
}
