import { db } from "../db.js";

export const getOrders = (_, res) => {
  const q = "SELECT * FROM tabpedidos;";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addOrder = (req, res) => {
  
  const q =
    "INSERT INTO tabpedidos (tabpedidosmesa, tabpedidos, tabpedidosidusuario) VALUES (?)";
  
  const values = [
    req.body.mesa,
    req.body.status,
    req.body.idTabUsuario
  ];
  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Pedido criado com sucesso.");
  });
};

export const updateOrder = (req, res) => {
  const q =
    "UPDATE tabpedidos SET tabpedidosstatus ? WHERE idTabpedidos = ?";

  const values = [
    req.body.status
  ];

  db.query(q, [...values, req.params.idTabpedidos], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Status do Pedido atualizado com sucesso.");
  });
};

export const deleteOrder = (req, res) => {
  const q = "DELETE FROM tabpedidos WHERE idTabpedidos = ? AND tabpedidostatus = 3";

  db.query(q, [req.params.idTabpedidos], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Pedido deletado com sucesso.");
  });
};

export const getOrdersByIdUser = (req, res) => {
  const q = "SELECT * FROM tabpedidos WHERE TabPedidosIdUsuario = ?";

  db.query(q, req.params.TabPedidosIdUsuario, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};