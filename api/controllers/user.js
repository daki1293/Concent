import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM tabusuario;";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  
  const q =
    "INSERT INTO tabusuario (TabUsuarioNome, TabUsuarioCpf, TabUsuarioMesa) VALUES (?)";
  
  const values = [
    req.body.nome,
    req.body.cpf,
    req.body.mesa
  ];
  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE TabUsuario SET TabUsuarioNome = ?, TabUsuarioCpf = ?, TabUsuarioMesa = ? WHERE idTabUsuario = ?";

  const values = [
    req.body.nome,
    req.body.cpf,
    req.body.mesa,
  ];

  db.query(q, [...values, req.params.idTabUsuario], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM TabUsuario WHERE idTabUsuario = ?";

  db.query(q, [req.params.idTabUsuario], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};

export const getUsersByCpf = (req, res) => {
  const q = "SELECT * FROM tabusuario WHERE TabUsuarioCpf = ?";

  db.query(q, req.params.TabUsuarioCpf, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
