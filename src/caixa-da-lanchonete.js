class CaixaDaLanchonete {
    constructor() {
        this.cardapio = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        ];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        // validar se ha itens no "carrinho"
        if (itens.length === 0) 
            return 'Não há itens no carrinho de compra!';
        
        var totalComAjusteCentavos = 0;

        for (const element of itens) {
            const [codigo, quantidade] = element.split(',');
            var itemCardapio = this.cardapio.find(item => item.codigo === codigo);
            
            //validar codigo do item 
            if (!itemCardapio)
                return "Item inválido!";
            
            // validar quantidade de cada item 
            if (quantidade <= 0) 
                return "Quantidade inválida!";
            
            // validar se o item extra possui seu respectivo item principal
            if ((codigo === 'chantily' || codigo === 'queijo')) {
                var codigoPrincipal = (codigo === 'chantily' ? 'cafe' : 'sanduiche');
                if (!itens.some(item => item.startsWith(codigoPrincipal))) 
                    return "Item extra não pode ser pedido sem o principal";
            }
            
            // validar forma de pagamento
            var totalCentavos = itemCardapio.valor * quantidade * 100;

            if (metodoDePagamento === "dinheiro") 
                totalComAjusteCentavos += totalCentavos - (totalCentavos * 0.05);
            else if (metodoDePagamento === "credito")
                totalComAjusteCentavos += totalCentavos + (totalCentavos * 0.03);
            else if (metodoDePagamento === "debito") 
                totalComAjusteCentavos += totalCentavos;
            else 
                return "Forma de pagamento inválida!";
            
        }
        var totalEmReais = totalComAjusteCentavos / 100;
        return "R$ " + totalEmReais.toFixed(2).replace(".", ",");
    }
}

export { CaixaDaLanchonete };
