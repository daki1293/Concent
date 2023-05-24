import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.TabUsuarioNome;
      user.cpf.value = onEdit.TabUsuarioCpf;
      user.mesa.value = onEdit.TabUsuarioMesa;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;
    if (
      !user.nome.value ||
      !user.cpf.value ||
      !user.mesa.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/edit/" + onEdit.idTabUsuario, {
          nome: user.nome.value,
          cpf: user.cpf.value,
          mesa: user.mesa.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
      user.cpf.focus();
      user.nome.value = "";
      user.mesa.value = "";
      user.cpf.value = "";
    } else {
      if (cpfExists === false) {
        await axios
          .post("http://localhost:8800", {
            nome: user.nome.value,
            cpf: user.cpf.value,
            mesa: user.mesa.value
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
        user.cpf.focus();
        user.nome.value = "";
        user.mesa.value = "";
        user.cpf.value = "";
      }
    }

    user.cpf.focus();
    user.nome.value = "";
    user.mesa.value = "";
    user.cpf.value = "";

    setOnEdit(null);
    getUsers();
  };

  const [nome, setNome] = useState("");
  const [mesa, setMesa] = useState("");
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [cpfExists, setCpfExists] = useState(false);

  const handleBlurCpf = async () => {
    const user = ref.current;
    if (user.cpf.value !== "" || !onEdit) {
      try {
        const response = await axios.get("http://localhost:8800/usersbycpf/" + user.cpf.value);
        const data = response.data;

        if (data.length > 0) {
          setNome(data[0].TabUsuarioNome);
          setMesa(data[0].TabUsuarioMesa);
          setDadosCarregados(true);
          setCpfExists(true);
          toast.success("Dados carregados com sucesso");
        } else {
          setNome("");
          setMesa("");
          toast.error("Usuário não encontrado");
          setCpfExists(false);
          setDadosCarregados(false);
        }
      } catch (error) {
        toast.error("Erro ao buscar os dados do usuário");

        console.error("Erro ao fazer a requisição ", error);
      }
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea onBlur={handleBlurCpf}>
        <Label>CPF</Label>
        <Input type="text" name="cpf" maxLength={11} />
      </InputArea>
      <InputArea>
        <Label>Nome</Label>
        <Input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      </InputArea>
      <InputArea>
        <Label>Mesa</Label>
        <Input type="text" name="mesa" value={mesa} onChange={(e) => setMesa(e.target.value)} />
      </InputArea>

      {cpfExists ? (
        <Button type="button">Ir Para Pedidos Realizados</Button>
      ) : (
        <Button type="submit">Visualizar Cardápio</Button>
      )}
      {/* <Button type="submit">Abrir Cardápio</Button> */}


    </FormContainer>

  );
};

export default Form;
