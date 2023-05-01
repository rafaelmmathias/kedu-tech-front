import { Divider, Form, message, Modal, Space } from "kedu-tech-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCompany } from "../../../services";
import { Company } from "../../../services/entities";
import { CompanyForm } from "./components";

export const CompanyCreate = () => {
  const [open, setOpen] = useState(true);
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateCompany();
  const navigate = useNavigate();

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => {
      navigate("../");
    }, 200);
  };

  const onSaveCompany = () => {
    form.submit();
  };

  const onSuccess = () => {
    message.success("Escola cadastrada com sucesso.");
    closeModal();
  };

  const onError = (error: Error) => {
    message.error(error.message);
  };

  const submit = (company: Company) => {
    mutate(company, {
      onSuccess,
      onError,
    });
  };

  return (
    <Modal
      closable={false}
      title="Nova escola"
      open={open}
      onOk={onSaveCompany}
      onCancel={closeModal}
      okText="Salvar"
      maskClosable={false}
      confirmLoading={isLoading}
    >
      <Space direction="vertical">
        Post votum promissa memini cuius adeptione cupis; quem pollicitus est
        aversione aversi et fuga.
        <Divider />
        <CompanyForm onFinish={submit} form={form} />
        <Divider style={{ marginTop: 0 }} />
      </Space>
    </Modal>
  );
};
