import React, { Component } from 'react';
import EntityNcm from './EntityNcm';
// import EntityCest from './EntityCest';

class FormularioNfe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nfe: null
        }

        this.handleChangeCest = this.handleChangeCest.bind(this);
        this.handlerSomaValorTotalItens = this.handlerSomaValorTotalItens.bind(this);
        this.buscaCest = this.buscaCest.bind(this);
        this.handlerChangeCest = this.handlerChangeCest.bind(this);
    }

    componentDidMount() {

        this.props.nfe.itens.map((item) => {
            var ncmAtual = EntityNcm.filter((ncm) => ncm.codigo.includes(item.ncm))[0]
            if (ncmAtual.tribSt) {
                item.tribSt = true;
                if (item.cest === null) {
                    if (ncmAtual.cest.length === 1) {
                        item.cest = ncmAtual.cest[0].codigo;
                    }
                } else {
                    if (item.pmvast === null) {
                        item.pmvast = ncmAtual.cest.filter((cest) => cest.codigo.includes(item.cest))[0].pmva;
                    }
                }
                return item;
            } else {
                if (item.cest === null) {
                    item.cest = "0000000"
                    item.pmvast = 0.00
                    return item;
                }
                return item;
            }
        });

        console.log(this.props.nfe);

        this.setState({ nfe: this.props.nfe })
    }

    buscaCest(ncm) {
        var ncms = EntityNcm.filter((ncm_) => ncm_.codigo.includes(ncm));
        if (ncms.length > 1) {
            console.log(ncms);
        }
    }

    handlerSomaValorTotalItens() {
        return (<b>{this.state.nfe.itens.reduce((acumulado, i) => acumulado + (i.vunit * i.quant), 0)}</b>);
    }

    handlerChangeCest(event) {
        event.preventDefault();
        console.log( event.target.value);
    }

    selectCest(props) {
        return (<>
            <td colSpan={2} className="text-center">
                <select defaultValue={0} onChange={null} className="custom-select custom-select-sm">
                    <option item={props.index} value="0">Celecionar Cest</option>
                    <option item={props.index} value="1002000">Materiais de construção e congêneres</option>
                    <option item={props.index} value="1301600">Medicamentos de uso humano e outros produtos farmacêuticos para uso humano ou veterinário​</option>
                    <option item={props.index} value="1900600">Produtos eletrônicos, eletroeletrônicos e eletrodomésticos</option>
                    <option item={props.index} value="2004000">Rações para animais domésticos</option>
                    <option item={props.index} value="2803800">VENDAS PORTA A PORTA</option>
                </select>
            </td>
        </>)
    }

    render() {
        if (this.state.nfe !== null) {
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
                                        <th scope="col">Qnt</th>
                                        <th scope="col">Valor un</th>
                                        <th scope="col">Desconto</th>
                                        <th scope="col">Valor Total</th>
                                        <th scope="col">Código NCM</th>
                                        <th scope="col">Código CEST</th>
                                        <th scope="col">MVA%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.nfe.itens.map(
                                        (produto, index) =>
                                            <tr key={produto.item} className={produto.tribSt ? 'table-danger' : ''}>
                                                <td className="text-center">{produto.item}</td>
                                                <td className="text-center">{produto.codigo}</td>
                                                <td>{produto.nome.toUpperCase()}</td>
                                                <td>{produto.quant}</td>
                                                <td>{produto.vunit}</td>
                                                <td>{produto.vdesc}</td>
                                                <td className="text-center">{produto.vprod}</td>
                                                <td className="text-center">{produto.ncm}</td>
                                                {produto.cest === null ?
                                                    <this.selectCest ncm={produto.ncm} index={index} /> :
                                                    <><td className="text-center">{produto.cest}</td>
                                                        <td className="text-center">{produto.pmvast}</td></>
                                                }

                                            </tr>
                                    )
                                    }
                                    <tr className="table-dark">
                                        <td colSpan={6}></td>
                                        <td className="text-center">{this.handlerSomaValorTotalItens()}</td>
                                        <td colSpan={3}></td>
                                    </tr>
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

    handleChangeCest(event) {
        var cestSelect = event.target.value;
        var itemSelect = event.target.querySelector('option[value="' + cestSelect + '"]').getAttribute('item');

        const itens = this.state.nfe.itens.map((item, i) => {
            if (itemSelect === i.toString()) {
                item.cest = cestSelect;
            }
            return item;
        });
        this.setState(prevState => ({ nfe: { ...prevState.nfe, itens: itens } }))
    }
}

export default FormularioNfe;