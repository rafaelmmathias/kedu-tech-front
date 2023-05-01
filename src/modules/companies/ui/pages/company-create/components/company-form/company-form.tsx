import { Form, FormProps, Input } from "kedu-tech-ui";

export const CompanyForm: React.FC<FormProps> = (props) => {
  const itemLayout = { labelCol: { span: 3 }, wrapperCol: { span: 21 } };

  return (
    <Form {...itemLayout} {...props}>
      <Form.Item name={"name"} label="Nome" rules={[{ required: true }]}>
        <Input placeholder="nome da escola" />
      </Form.Item>
      <Form.Item rules={[{ required: true }]} name={"cnpj"} label="CNPJ">
        <Input placeholder="CNPJ" />
      </Form.Item>
    </Form>
  );
};
