import { useState } from "react";
import { UserLogin } from "@/modules/auth/entities";

import { UserOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons/lib/icons";
import {
  Alert,
  Button,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "kedu-tech-ui";
import { Link } from "react-router-dom";

import { useAuth, useLoginMutation } from "@/modules/auth/services";
const { Paragraph } = Typography;

export const LoginPage = () => {
  const { mutate, isLoading } = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuth } = useAuth();

  const onSuccess = setAuth;

  const onError = (error: Error) => {
    setErrorMessage(error.message);
  };

  const onSubmitLogin = (form: UserLogin) => {
    clearPasswordError();
    mutate(form, {
      onError,
      onSuccess,
    });
  };

  const clearPasswordError = () => {
    setErrorMessage("");
  };

  return (
    <>
      <Row justify={"center"} align={"middle"}>
        <Paragraph>
          Para acessar sua conta, por favor, informe suas credenciais de login
          abaixo:
        </Paragraph>
      </Row>

      <Form<UserLogin> onFinish={onSubmitLogin} size="large">
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
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Informe sua senha.",
            },
          ]}
        >
          <Input.Password
            autoComplete="current-password"
            prefix={<LockOutlined />}
            type="password"
            placeholder="senha"
            allowClear
          />
        </Form.Item>

        <Space direction="vertical" style={{ width: "100%" }} size={10}>
          <Form.Item noStyle>
            <Button
              type="primary"
              htmlType="submit"
              block={true}
              disabled={isLoading !== false}
              loading={isLoading}
            >
              Entrar
            </Button>
          </Form.Item>
          {errorMessage && (
            <Alert
              message={errorMessage}
              type="error"
              closable
              onClose={clearPasswordError}
            />
          )}
          <Row justify={"end"}>
            <Link to={"../forgot-password"}>Esqueci minha senha</Link>
          </Row>
        </Space>
      </Form>
    </>
  );
};
