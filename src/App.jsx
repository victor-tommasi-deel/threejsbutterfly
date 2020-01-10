import React from 'react';
import { init, createButterfly } from './utils/utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ADD: 0.8,
      renderer: null,
      scene: null,
      camera: null,
      butterfly: null
    };
  }

  componentDidMount = () => {
    const butterfly = createButterfly();
    const start = init(butterfly);
    const { viewer } = this.refs;
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera } = start;
    this.setState({
      renderer,
      scene,
      camera,
      butterfly
    });
    this.mainLoop();
  };

  mainLoop = () => {
    const { ADD, butterfly, scene, camera, renderer } = this.state;
    if (
      scene !== null &&
      butterfly !== null &&
      camera !== null &&
      renderer !== null
    ) {
      butterfly.geometry.vertices[2].y += ADD;
      butterfly.geometry.vertices[3].y += ADD;
      butterfly.geometry.verticesNeedUpdate = true;

      if (
        butterfly.geometry.vertices[2].y < -4 ||
        butterfly.geometry.vertices[2].y > 4
      ) {
        this.setState({
          ADD: ADD * -1
        });
      }
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  body = () => <div id="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
