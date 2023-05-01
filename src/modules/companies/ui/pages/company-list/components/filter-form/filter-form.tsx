import {
  FilterOutlined,
  LoadingOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Space } from "kedu-tech-ui";

export interface CompaniesFormFilter {
  name?: string;
  cnpj?: string;
}

interface FilterFormProps {
  onSubmitFilter: (values: CompaniesFormFilter) => void;
  isLoading: boolean;
}

export const FilterForm: React.FC<FilterFormProps> = ({
  onSubmitFilter,
  isLoading,
}) => {
  const [form] = Form.useForm<CompaniesFormFilter>();

  const resetFilter = () => {
    form.resetFields();
    form.submit();
  };

  return (
    <Form<CompaniesFormFilter>
      layout="inline"
      form={form}
      wrapperCol={{ xs: 24 }}
      onFinish={onSubmitFilter}
    >
      <Form.Item name={"name"}>
        <Input placeholder="Escola" />
      </Form.Item>
      <Form.Item name={"cnpj"}>
        <Input placeholder="CNPJ" />
      </Form.Item>

      <Space style={{ display: "flex" }}>
        <Button
          icon={<UndoOutlined />}
          onClick={resetFilter}
          disabled={isLoading}
        >
          Limpar
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          icon={<FilterOutlined />}
          disabled={isLoading}
        >
          Buscar
        </Button>
        {isLoading && <LoadingOutlined spin />}
      </Space>
    </Form>
  );
};
