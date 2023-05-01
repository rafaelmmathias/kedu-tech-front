import { PlanFilters as PlanFiltersType } from "@/modules/companies/services/entities";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "kedu-tech-ui";
const { RangePicker } = DatePicker;

interface PlanFiltersProps {
  onFormSubmit: (filters: PlanFiltersType) => void;
  isLoading: boolean;
}
export const PlanFilterForm: React.FC<PlanFiltersProps> = ({
  onFormSubmit,
  isLoading,
}) => {
  return (
    <Card>
      <Form<PlanFiltersType> layout="vertical" onFinish={onFormSubmit}>
        <Row gutter={8}>
          <Col span={6}>
            <Form.Item name="period" label="Período">
              <RangePicker
                format={"DD/MM/YYYY"}
                disabledDate={(date) => date.isAfter(dayjs())}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="CPF"
              name="ownerCPF"
              tooltip="CPF do responsável financeiro"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ownerName" label="Responsável Financeiro">
              <Input placeholder="digite o nome" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="studentName" label="Dependente">
              <Input placeholder="digite o nome" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="status" label="Status">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Selecione..."
              >
                <Select.Option value="1">status-1</Select.Option>
                <Select.Option value="2">status-2</Select.Option>
                <Select.Option value="3">status-3</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"end"}>
          <Space>
            <Button htmlType="reset">Limpar</Button>
            <Button htmlType="submit">Filtrar</Button>
            {isLoading && <LoadingOutlined spin />}
          </Space>
        </Row>
      </Form>
    </Card>
  );
};
