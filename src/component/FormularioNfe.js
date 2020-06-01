import React, { Component } from 'react';
import EntityNcm from './EntityNcm';
import EntityCest from './EntityCest';

class FormularioNfe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nfe: null
        }
    }

    handleChangeCest(event) {
        console.log(event.target.querySelector('option[value="' + event.target.value + '"]').textContent.split('-')[1].replace(' ',''));
        console.log(event.target.value);
    }

    componentDidMount() {
        this.setState({ nfe: this.props.nfe })
    }

    checkCest(key, ncm, cest) {
        if (cest !== '') {
            let cest_ = EntityCest.filter((cest_) => cest_.codigo.includes(cest))[0];
            return (<><td>{cest_.codigo}</td><td>{cest_.pmva}</td></>)
        } else {
            let ncm_ = EntityNcm.filter((ncm_) => ncm_.codigo.includes(ncm))[0];
            if (ncm_.tribSt) {
                if (ncm_.cest.length > 0) {
                    return (<><td colSpan={2}>
                        <select value="0000000" onChange={this.handleChangeCest}>
                            <option value="0000000"> - </option>
                            {ncm_.cest.map((cest, index) =>
                                <option key={cest.codigo} value={cest.codigo}>{cest.codigo} - {cest.pmva}</option>
                            )}

                        </select>
                    </td></>)
                }
                return (<><td>{ncm_.cest.codigo}</td><td>{ncm_.cest.pmva}</td></>)
            }
            return (<><td>0000000</td><td>0.00</td></>)
        }
    }

    handleClick(key, value) {
        console.log("click " + key);
        const itens = this.state.nfe.itens.map((item, i) => {
            if (i === key) {
                item.codigo = value
                return item
            } else {
                return item;
            }
        });
        console.log(itens);
        this.setState(prevState => ({ nfe: { ...prevState.nfe, itens: itens } }))
    }

    render() {
        if (this.state.nfe !== null) {
            console.log(this.state.nfe);
            return (

                <div className="container-fluid" >
                    <div className="card">
                        <div className="card-header" >Nota Fiscal</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="form-group col-12 col-md-8 col-lg-6 col-xl-5">
                                    <label htmlFor="formGroupChave">Chave</label>
                                    <div className="form-control" id="formGroupChave">
                                        {this.state.nfe.chave}
                                    </div>
                                </div>
                                <div className="form-group col-6 col-md-2">
                                    <label htmlFor="formGroupNumeroNfe">Numero</label>
                                    <div className="form-control" id="formGroupNumeroNfe">
                                        {this.state.nfe.numero}
                                    </div>
                                </div>
                                <div className="form-group col-6 col-md-2  col-xl-1">
                                    <label htmlFor="formGroupSerieNfe">Serie</label>
                                    <div className="form-control" id="formGroupSerieNfe">
                                        {this.state.nfe.serie}
                                    </div>
                                </div>
                                <div className="form-group col-6 col-lg-2">
                                    <label htmlFor="formGroupNomeEmitente">Data Emissão</label>
                                    <div className="form-control" id="formGroupNomeEmitente">
                                        {this.state.nfe.datae}
                                    </div>
                                </div>
                                <div className="form-group col-6 col-lg-2">
                                    <label htmlFor="formGroupNomeEmitente">Hora Emissão</label>
                                    <div className="form-control" id="formGroupNomeEmitente">
                                        {this.state.nfe.horase}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">Emitente</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="form-group col-12 col-lg-9  col-xl-7">
                                    <label htmlFor="formGroupNomeEmitente">Nome / Razão Social</label>
                                    <div className="form-control" id="formGroupNomeEmitente">
                                        {this.state.nfe.emitente.nome.toUpperCase()}
                                    </div>
                                </div>
                                <div className="form-group col-7 col-lg-3 col-xl-3">
                                    <label htmlFor="formGroupNomeEmitente">CNPJ/CPF</label>
                                    <div className="form-control" id="formGroupNomeEmitente">
                                        {this.state.nfe.emitente.documento}
                                    </div>
                                </div>
                                <div className="form-group col-5 col-lg-3 col-xl-2">
                                    <label htmlFor="formGroupNomeEmitente">Inscrição Estadual</label>
                                    <div className="form-control" id="formGroupNomeEmitente">
                                        {this.state.nfe.emitente.ie}
                                    </div>
                                </div>
                                <div className="form-group col-5 col-md-6 col-lg-5 col-xl-4">
                                    <label htmlFor="formGroupNomeEmitente">Cidade/UF</label>
                                    <div className="form-control" id="formGroupNomeEmitente"> {this.state.nfe.emitente.endereco.cidade.split(' - ')[0]} - {this.state.nfe.emitente.endereco.estado} </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">Destinatario</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="form-group col-12 col-lg-9  col-xl-7">
                                    <label htmlFor="formGroupNomeEmitente">Nome / Razão Social</label>
                                    <div className="form-control" id="formGroupNomeEmitente">
                                        {this.state.nfe.destinatario.nome.toUpperCase()}
                                    </div>
                                </div>
                                <div className="form-group col-7 col-lg-3 col-xl-3">
                                    <label htmlFor="formGroupNomeEmitente">CNPJ/CPF</label>
                                    <div className="form-control" id="formGroupNomeEmitente">
                                        {this.state.nfe.destinatario.documento}
                                    </div>
                                </div>
                                <div className="form-group col-5 col-lg-3 col-xl-2">
                                    <label htmlFor="formGroupNomeEmitente">Inscrição Estadual</label>
                                    <div className="form-control" id="formGroupNomeEmitente">
                                        {this.state.nfe.destinatario.ie}
                                    </div>
                                </div>
                                <div className="form-group col-5 col-md-6 col-lg-5 col-xl-4">
                                    <label htmlFor="formGroupNomeEmitente">Cidade/UF</label>
                                    <div className="form-control" id="formGroupNomeEmitente"> {this.state.nfe.destinatario.endereco.cidade.split(' - ')[0]} - {this.state.nfe.destinatario.endereco.estado} </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">Produto</div>
                        <div className="card-body">
                            <table className="table table-bordered table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">Item</th>
                                        <th scope="col">Código</th>
                                        <th scope="col">Descrição</th>
                                        <th scope="col">Código NCM</th>
                                        <th scope="col">Código CEST</th>
                                        <th scope="col">MVA%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.nfe.itens.map((produto, index) =>
                                        <tr key={produto.item}>
                                            <td className="text-center">{produto.item}</td>
                                            <td className="text-center">{produto.codigo}</td>
                                            <td>{produto.nome.toUpperCase()}</td>
                                            {/* <td className="text-center" onClick={() => this.handleClick(index,'9999')}>{produto.ncm}</td> */}
                                            <td className="text-center">{produto.ncm}</td>
                                            {this.checkCest(index, produto.ncm, produto.cest)}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            );
        } else {
            return (<></>)
        }

    }
}

export default FormularioNfe;