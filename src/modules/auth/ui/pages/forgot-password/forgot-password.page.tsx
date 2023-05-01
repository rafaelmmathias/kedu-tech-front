import { Button, Form, Input, Row, Typography } from "kedu-tech-ui";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const { Paragraph, Title } = Typography;
  return (
    <>
      <Title level={5}>Esqueceu sua senha?</Title>
      <Row justify={"center"} align={"middle"}>
        <Paragraph>
          Não se preocupe, preencha seu email abaixo que lhe enviaremos um email
          com as instruções para recuperação.
        </Paragraph>
      </Row>
      <Form>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            autoComplete="username"
            placeholder="email"
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block={true}>
            Recuperar senha
          </Button>
        </Form.Item>
        <Row justify={"center"}>
          <Link to={"../login"}>Voltar</Link>
        </Row>
      </Form>
    </>
  );
};
