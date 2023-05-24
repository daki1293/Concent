import { db } from "../db.js";

export const getProducts = (_, res) => {
    const q = "SELECT * FROM tabprodutos;";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addProduts = (req, res) => {

    const q =
        "INSERT INTO tabprodutos (tabprodutosNome, TabProdutosValor, TabProdutosGrupo, TabProdutosTempoPreparo, TabProdutosAtivo) VALUES (?)";

    const values = [
        req.body.nome,
        req.body.valor,
        req.body.grupo,
        req.body.tempopreparo,
        req.body.ativo
    ];
    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto criado com sucesso.");
    });
};

export const updateProducts = (req, res) => {
    const q =
        "UPDATE tabprodutos SET tabprodutosNome = ?, TabProdutosValor = ?, TabProdutosGrupo = ?, TabProdutosTempoPreparo = ?, TabProdutosAtivo = ? WHERE idTabUsuario = ?";

    const values = [
        req.body.nome,
        req.body.valor,
        req.body.grupo,
        req.body.tempopreparo,
        req.body.ativo,
    ];

    db.query(q, [...values, req.params.idTabProdutos], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto atualizado com sucesso.");
    });
};

export const deleteProducts = (req, res) => {
    const q = "DELETE FROM tabprodutos WHERE idTabProdutos = ? AND TabProdutosAtivo = 0";

    db.query(q, [req.params.idTabProdutos], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto deletado com sucesso.");
    });
};

export const getProductsByOrder = (req, res) => {
    const q = "SELECT * FROM tabpedidositens WHERE TabPedidosItensIdPedido = ?";

    db.query(q, req.params.TabPedidosItensIdPedido, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};