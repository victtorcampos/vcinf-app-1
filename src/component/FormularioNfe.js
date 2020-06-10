import React, { Component } from 'react';
import EntityNcm from './EntityNcm';
// import EntityCest from './EntityCest';

class FormularioNfe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nfe: null
        }

        this.handlerSomaValorTotalItens = this.handlerSomaValorTotalItens.bind(this);
        this.handlerSomaValorIcmsStPago = this.handlerSomaValorIcmsStPago.bind(this);
        this.buscaCest = this.buscaCest.bind(this);
        this.selectCest = this.selectCest.bind(this);
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
                        return item;
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
        return (<b>{this.state.nfe.itens.reduce((a, i) => a + (i.vunit * i.quant), 0)}</b>);
    }

    handlerSomaValorIcmsStPago() {
        return (<b>{this.state.nfe.itens.reduce((a, i) => a + i.vicmsst, 0)}</b>);
    }

    calculaIcmsSt(props) {
        var v = 0;
        if (props.produto.tribSt) {
            var p = props.produto;
            
            v = ((((p.vprod + p.vfrete + p.vseg + +p.voutro + p.vipi) - p.vdesc) * (1 + (p.pmvast / 100))) * (17 / 100)) - p.vicms;
        }
        console.log(props.produto.vicmsst2);
        
        return (<>
            <td className="text-center">{fn(v)}</td>
        </>);
    }

    selectCest(props) {
        return (<>
            <td colSpan={2} className="text-center">

                <select className="custom-select custom-select-sm" onChange={(e) => {
                    this.state.nfe.itens.map((prod, i) => {
                        if (i === props.index) {
                            prod.cest = e.target.value
                            return prod;
                        } else {
                            return prod;
                        }

                    });
                    this.setState({ nfe: this.state.nfe })
                }} defaultValue={0} >
                    <option value="0">Celecionar Cest</option>
                    <option item="6" value="1002000">Materiais de construção e congêneres</option>
                    <option item="6" value="1301600">Medicamentos de uso humano e outros produtos farmacêuticos para uso humano ou veterinário​</option>
                    <option item="6" value="1900600">Produtos eletrônicos, eletroeletrônicos e eletrodomésticos</option>
                    <option item="6" value="2004000">Rações para animais domésticos</option>
                    <option item="6" value="2803800">VENDAS PORTA A PORTA</option>
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
                                        <th scope="col">ICMS ST</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.nfe.itens.map(
                                        (produto, index) =>
                                            <tr key={produto.item} className={`${produto.tribSt ? 'table-danger' : ''}`}>
                                                <td className="text-center">{produto.item}</td>
                                                <td className="text-center">{produto.codigo}</td>
                                                <td>{produto.nome.toUpperCase()}
                                                    {produto.pipi > 0 ? <><br /><span>IPI : {(produto.vprod * produto.pipi) / 100}</span></> : ''}
                                                    {produto.vicms > 0 ? <><br /><span>ICMS : {produto.vicms}</span></> : ''}
                                                    {produto.vicmsst > 0 ? <><br /><span>ICMS ST : {produto.vicmsst}</span> </> : ''}
                                                </td>
                                                <td className="text-center" >{fn(produto.quant)}</td>
                                                <td className="text-center">{fn(produto.vunit)}</td>
                                                <td className="text-center">{fn(produto.vdesc)}</td>
                                                <td className="text-center">{fn(produto.vprod)}</td>
                                                <td className="text-center">{produto.ncm}</td>
                                                {produto.cest === null ?
                                                    <this.selectCest ncm={produto.ncm} index={index} /> :
                                                    <><td className="text-center">{produto.cest}</td>
                                                        <td className="text-center">{fn(produto.pmvast)}</td>
                                                        {produto.vicmsst2 === null ?
                                                            <this.calculaIcmsSt produto={produto} /> :
                                                            <td className="text-center">{fn(produto.vicmsst2 * 1)}</td>
                                                        }
                                                    </>
                                                }

                                            </tr>
                                    )
                                    }
                                    <tr className="table-dark">
                                        <td colSpan={6}></td>
                                        <td className="text-center">{this.handlerSomaValorTotalItens()}</td>
                                        <td colSpan={5}></td>
                                        {/* <td className="text-center">{this.handlerSomaValorIcmsStPago()}</td> */}
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
}

const fn = (numero) => {
    return new Intl.NumberFormat("de-DE").format(numero);
}

export default FormularioNfe;