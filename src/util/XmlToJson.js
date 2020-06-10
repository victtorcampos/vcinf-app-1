import moment from "moment";

const parser = new DOMParser();

const XmlToJson = (arquivo) => {
    const infNFe = parser.parseFromString(arquivo, 'text/xml').querySelector('nfeProc > NFe > infNFe');
    if (infNFe) {
        //const ide = Array.apply(null, infNFe.querySelectorAll('ide'))[0]
        const emit = Array.apply(null, infNFe.querySelectorAll('emit'))[0]
        const dest = Array.apply(null, infNFe.querySelectorAll('dest'))[0]
        const det = Array.apply(null, infNFe.querySelectorAll('det'))

        const item = det.map((item) => {
            var produto = {
                nome: item.querySelector('prod > xProd').textContent
                , tribSt: false
                , item: item.getAttribute('nItem')
                , codigo: item.querySelector('prod > cProd').textContent
                , ncm: item.querySelector('prod > NCM').textContent
                , cest: item.querySelector('prod > CEST') ? item.querySelector('prod > CEST').textContent : null
                , cfop: item.querySelector('prod > CFOP').textContent
                , un: item.querySelector('prod > uCom').textContent
                , vunit: item.querySelector('prod > vUnCom').textContent * 1
                , quant: item.querySelector('prod > qCom').textContent * 1
                , vseg: item.querySelector('prod > vSeg') ? item.querySelector('prod > vSeg').textContent * 1 : 0
                , vfrete: item.querySelector('prod > vFrete') ? item.querySelector('prod > vFrete').textContent * 1 : 0
                , voutro: item.querySelector('prod > vOutro') ? item.querySelector('prod > vOutro').textContent * 1 : 0
                , picms: item.querySelector('imposto > ICMS pICMS') ? item.querySelector('imposto > ICMS pICMS').textContent * 1 : 0
                , pipi: item.querySelector('imposto > IPI pIPI') ? item.querySelector('imposto > IPI pIPI').textContent * 1 : 0
                , vipi: item.querySelector('imposto > IPI vIPI') ? item.querySelector('imposto > IPI vIPI').textContent * 1 : 0
                , vdesc: item.querySelector('prod vDesc') ? item.querySelector('prod vDesc').textContent * 1 : 0
                , pmvast: item.querySelector('imposto > ICMS pMVAST') ? item.querySelector('imposto > ICMS pMVAST').textContent * 1 : null
                , vicmsst: item.querySelector('imposto > ICMS vICMSST') ? item.querySelector('imposto > ICMS vICMSST').textContent * 1 : 0
                , vicms: item.querySelector('imposto > ICMS vICMS') ? item.querySelector('imposto > ICMS vICMS').textContent * 1 : 0
                , vprod: item.querySelector('prod > vProd').textContent * 1
                , vicmsst2: null
            }
            return produto;
        })

        var datahorasE = moment(infNFe.querySelector('dhEmi').textContent, "YYYY-MM-DDTHH:mm:ssZ");
        var datahorasS = infNFe.querySelector('dhSaiEnt') ? moment(infNFe.querySelector('dhSaiEnt').textContent, "YYYY-MM-DDTHH:mm:ssZ") : datahorasE
        var nfe = {
            chave: infNFe.getAttribute('Id').replace('NFe', '')
            , numero: infNFe.querySelector('nNF').textContent
            , serie: infNFe.querySelector('serie').textContent
            //2020-04-07T10:41:00-03:00
            , datae: datahorasE.format('DD/MM/YYYY')
            , datas: datahorasS.format('DD/MM/YYYY')
            , horase: datahorasE.format('HH:mm')
            , horass: datahorasE.format('HH:mm')
            , emitente: {
                documento: emit.querySelector('CNPJ') ? emit.querySelector('CNPJ').textContent : emit.querySelector('CPF').textContent
                , ie: emit.querySelector('IE') ? emit.querySelector('IE').textContent : ''
                , iest: emit.querySelector('IEST') ? emit.querySelector('IEST').textContent : ''
                , nome: emit.querySelector('xNome').textContent
                , nomef: emit.querySelector('xFant') ? emit.querySelector('xFant').textContent : ''
                , endereco: {
                    rua: emit.querySelector('enderEmit xLgr').textContent
                    , nro: emit.querySelector('enderEmit nro').textContent
                    , xbairro: emit.querySelector('enderEmit xBairro').textContent
                    , cpl: emit.querySelector('enderEmit xCpl') ? emit.querySelector('enderEmit xCpl').textContent : ''
                    , cidade: emit.querySelector('enderEmit xMun').textContent + ' - ' + emit.querySelector('enderEmit cMun').textContent
                    , estado: emit.querySelector('enderEmit UF').textContent
                    , pais: (emit.querySelector('enderEmit xPais') ? emit.querySelector('enderEmit xPais').textContent : '') + ' - ' + (emit.querySelector('enderEmit cPais') ? emit.querySelector('enderEmit cPais').textContent : '')
                    , cep: emit.querySelector('enderEmit CEP').textContent
                }
            }
            , destinatario: {
                documento: dest.querySelector('CNPJ') ? dest.querySelector('CNPJ').textContent : dest.querySelector('CPF').textContent
                , ie: dest.querySelector('IE') ? dest.querySelector('IE').textContent : ''
                , nome: dest.querySelector('xNome') ? dest.querySelector('xNome').textContent : ''
                , endereco: {
                    rua: dest.querySelector('enderDest xLgr').textContent
                    , nro: dest.querySelector('enderDest nro').textContent
                    , xbairro: dest.querySelector('enderDest xBairro').textContent
                    , cidade: dest.querySelector('enderDest xMun').textContent + ' - ' + dest.querySelector('enderDest cMun').textContent
                    , estado: dest.querySelector('enderDest UF').textContent
                    , pais: (dest.querySelector('enderDest xPais') ? dest.querySelector('enderDest xPais').textContent : '') + ' - ' + (dest.querySelector('enderDest cPais') ? dest.querySelector('enderDest cPais').textContent : '')
                    , email: dest.querySelector('enderDest eMail') ? dest.querySelector('enderDest eMail').textContent : ''
                    , cep: dest.querySelector('enderDest CEP').textContent
                }
            }
            , itens: item
        }

        return JSON.parse(JSON.stringify(nfe));
    }
    return '';
}

export default XmlToJson;