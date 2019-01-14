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
    interface IntersectionEntry {
      [index: number]: any;
    }

    const io: any = new IntersectionObserver((change: IntersectionEntry) => {
      if (change[0].isIntersecting) {
        this.setState({ isLazy: false });

        io.disconnect();
      }
    })

    io.observe(this.boxRef);
  }

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
