import React, { Component } from 'react';
import XmlToJson from './util/XmlToJson';
import FormularioNfe from './component/FormularioNfe';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonHandler: true
    }
    this.onClickHandler = this.onClickHandler.bind(this);
    this.fileInput = React.createRef();
  }

  onClickHandler(event) {
    event.preventDefault();
    if (this.fileInput.current.files.length === 1) {
      this.setState(state => ({ buttonHandler: !state.buttonHandler }));
      const file = this.fileInput.current.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onloadend = (evt) => {
        const readerData = evt.target.result;
        this.setState({ nfe: XmlToJson(readerData) })
      }
    }
  }

  render() {

    // console.log(EntityNcm);
    // const ncm = EntityNcm;

    // function functiondd(ncm) {
    //   return ncm.codigo.includes('2711');
    // } 

    // console.log(ncm.filter((ncm) => ncm.codigo.includes('2711') ));


    return (
      <div>
        {this.state.nfe ? <FormularioNfe nfe={this.state.nfe} /> :
          <form>
            <input type='file' accept='.xml' ref={this.fileInput} />
            <button onClick={this.onClickHandler} >
              {this.state.buttonHandler ? "Enviar" : "Aguardar"}
            </button>
          </form>}
      </div>

    );
  }
}

export default App;
