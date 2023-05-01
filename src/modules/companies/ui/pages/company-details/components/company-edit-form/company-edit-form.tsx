import { useUpdateCompany } from "@/modules/companies/services";
import { useAbility } from "@/services/app/abilities";
import { Company } from "@/modules/companies/services/entities";
import {
  Avatar,
  Button,
  Card,
  Collapse,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Space,
  Switch,
  Typography,
} from "kedu-tech-ui";
import { EditInline } from "@/ui/components";
import avatar from "@/assets/avatar.png";
import { BilletType } from "@/constants";
import { displayDate } from "@/services/app/formatters/date";
import { displayPercentage } from "@/services/app/formatters";
import { PlusOutlined } from "@ant-design/icons";

interface CompanyEditFormProps {
  company: Company;
}

export const CompanyEditForm: React.FC<CompanyEditFormProps> = ({
  company,
}) => {
  const ability = useAbility();
  const { mutate, isLoading } = useUpdateCompany();
  const canEditCompany = ability.can("edit", "companies");
  const canSeeContract = ability.can("see", "companies.contracts");
  const [form] = Form.useForm();

  const updateCompany = (updatedCompany: Company) => {
    if (!updatedCompany) return;
    const mergedCompany = { ...company, ...updatedCompany };
    mutate(mergedCompany, {
      onError: () => {
        message.error(
          "Não foi possível salvar os dados dessa escola, tente novamente",
        );
      },
    });
  };
  return (
    <Form
      onFinish={updateCompany}
      initialValues={company}
      form={form}
      onKeyDown={(e) => {
        if (e.key == "Enter") form.submit();
      }}
    >
      <Space direction="vertical" style={{ display: "flex" }}>
        <Card title="Dados cadastrais">
          <Row justify="center" style={{ marginBottom: 10 }}>
            <Space align={"center"} direction="vertical" size={0}>
              <Avatar size={64} src={avatar} />
              <Row justify={"center"}>
                <EditInline
                  isLoading={isLoading}
                  canEdit={canEditCompany}
                  value={
                    <Typography.Title level={4} style={{ textAlign: "center" }}>
                      {company.name}
                    </Typography.Title>
                  }
                >
                  <Form.Item name={"name"} rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </EditInline>
              </Row>
              <Typography.Text type="secondary">
                Registrada em {displayDate(company.registeredAt)}
              </Typography.Text>
            </Space>
          </Row>
          <Space direction="vertical">
            <EditInline
              isLoading={isLoading}
              canEdit={canEditCompany}
              label={"CNPJ:"}
              value={company.cnpj}
            >
              <Form.Item name={"cnpj"} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </EditInline>
            <EditInline
              isLoading={isLoading}
              canEdit={canEditCompany}
              value={company.systemName}
              label={`Sistema de Gestão Utilizado:`}
            >
              <Form.Item name={"systemName"} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </EditInline>
            <EditInline
              label={`Multa:`}
              canEdit={canEditCompany}
              value={displayPercentage(company.fine)}
            >
              <Form.Item name="fine">
                <InputNumber min={0} formatter={(value) => `${value} %`} />
              </Form.Item>
            </EditInline>
            <EditInline
              label={`Juros:`}
              canEdit={canEditCompany}
              value={displayPercentage(company.interest)}
            >
              <Form.Item name="interest">
                <InputNumber min={0} formatter={(value) => `${value} %`} />
              </Form.Item>
            </EditInline>
            <Row>
              <Space direction="vertical" style={{ display: "flex" }}>
                <Divider orientation="left" plain>
                  Endereço
                </Divider>
                <Space wrap align="start">
                  <EditInline
                    isLoading={isLoading}
                    canEdit={canEditCompany}
                    value={company.address?.line1}
                    label={`Rua:`}
                  >
                    <Form.Item
                      name={["address", "line1"]}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </EditInline>
                  <EditInline
                    isLoading={isLoading}
                    canEdit={canEditCompany}
                    value={company.address?.line2}
                    label={`Complemento:`}
                  >
                    <Form.Item
                      name={["address", "line2"]}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </EditInline>
                  <EditInline
                    isLoading={isLoading}
                    canEdit={canEditCompany}
                    value={company.address?.city}
                    label={`Cidade:`}
                  >
                    <Form.Item
                      name={["address", "city"]}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </EditInline>
                  <EditInline
                    isLoading={isLoading}
                    canEdit={canEditCompany}
                    value={company.address?.state}
                    label={`Estado:`}
                  >
                    <Form.Item
                      name={["address", "state"]}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </EditInline>
                  <EditInline
                    isLoading={isLoading}
                    canEdit={canEditCompany}
                    value={company.address?.zipCode}
                    label={`CEP:`}
                  >
                    <Form.Item
                      name={["address", "zipCode"]}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </EditInline>
                </Space>
              </Space>
            </Row>
            <Row>
              <Divider orientation="left" plain>
                Representante legal:
              </Divider>
              <Space wrap direction="vertical" style={{ display: "flex" }}>
                <EditInline
                  isLoading={isLoading}
                  canEdit={canEditCompany}
                  value={company.legalRepresentative}
                  label={`Nome:`}
                >
                  <Form.Item
                    name={"legalRepresentative"}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </EditInline>
                <EditInline
                  isLoading={isLoading}
                  canEdit={canEditCompany}
                  value={company.legalRepresentativeEmail}
                  label={`Email:`}
                >
                  <Form.Item
                    name={"legalRepresentativeEmail"}
                    rules={[{ required: true, type: "email" }]}
                  >
                    <Input />
                  </Form.Item>
                </EditInline>
                <EditInline
                  isLoading={isLoading}
                  canEdit={canEditCompany}
                  value={company.legalRepresentativePhone}
                  label={`Telefone:`}
                >
                  <Form.Item
                    name={"legalRepresentativePhone"}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="00 " />
                  </Form.Item>
                </EditInline>
              </Space>
            </Row>

            <Collapse>
              <Collapse.Panel key={"days"} header="Dias de repasse">
                <Form.List name={"days"}>
                  {(fields, { add }) => (
                    <Space direction="vertical" key={`list-space`}>
                      {fields.map((field, index) => {
                        return (
                          <Row key={`list-row-${field.key}`}>
                            <Divider plain orientation="left">
                              {`${index + 1}º dia de repasse `}
                            </Divider>
                            <EditInline
                              isLoading={isLoading}
                              canEdit={canEditCompany}
                              value={form.getFieldValue([index, "monthDay"])}
                              inline={true}
                            >
                              <Form.Item
                                label="Dia"
                                name={[index, "monthDay"]}
                                rules={[{ required: true }]}
                              >
                                <Input />
                              </Form.Item>
                            </EditInline>
                            <EditInline
                              isLoading={isLoading}
                              canEdit={canEditCompany}
                              value={form.getFieldValue([index, "percentage"])}
                              inline={true}
                            >
                              <Form.Item
                                label="Percentual"
                                name={[index, "percentage"]}
                                rules={[{ required: true }]}
                              >
                                <Input />
                              </Form.Item>
                            </EditInline>
                          </Row>
                        );
                      })}
                      <Button
                        onClick={() => add({ monthDay: 1, percentage: 0 })}
                        type="dashed"
                      >
                        {" "}
                        <PlusOutlined /> Adicionar dia para repasse
                      </Button>
                    </Space>
                  )}
                </Form.List>
              </Collapse.Panel>
            </Collapse>
          </Space>
        </Card>
        {canSeeContract && (
          <Card title="Contrato">
            <Space direction="vertical" style={{ display: "flex" }}>
              <EditInline
                label={`Vigência contratual:`}
                canEdit={canEditCompany}
                value={
                  company.contractualTerm && `${company.contractualTerm} meses`
                }
              >
                <Form.Item name="contractualTerm">
                  <InputNumber
                    min={0}
                    formatter={(value) => `${value} meses`}
                  />
                </Form.Item>
              </EditInline>

              <Form.Item
                name={"legacy"}
                label={
                  <Typography.Text type="secondary">
                    {"Cobrança de legado"}
                  </Typography.Text>
                }
                valuePropName="checked"
              >
                <Switch
                  disabled={!canEditCompany}
                  onChange={() => form.submit()}
                />
              </Form.Item>
            </Space>
          </Card>
        )}
        <Card title="Financeiro">
          <Space direction="vertical">
            <EditInline
              label={`Taxa negociada:`}
              canEdit={canEditCompany}
              value={displayPercentage(company.tax)}
            >
              <Form.Item name="tax">
                <InputNumber min={0} formatter={(value) => `${value} %`} />
              </Form.Item>
            </EditInline>
            <Form.Item
              name={"cashback"}
              label={
                <Typography.Text type="secondary">{"Cashback"}</Typography.Text>
              }
              valuePropName="checked"
              style={{ margin: 0 }}
            >
              <Switch
                disabled={!canEditCompany}
                onChange={() => form.submit()}
              />
            </Form.Item>
            <Form.Item
              name={"billetType"}
              label={
                <Typography.Text type="secondary" style={{ margin: 0 }}>
                  Boletegem
                </Typography.Text>
              }
            >
              <Radio.Group
                disabled={!canEditCompany}
                buttonStyle="solid"
                onChange={() => form.submit()}
              >
                <Radio.Button value={BilletType.Physical}>Física</Radio.Button>
                <Radio.Button value={BilletType.Digital}>Digital</Radio.Button>
                <Radio.Button value={BilletType.Mixed}>Mista</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Space>
        </Card>
      </Space>
    </Form>
  );
};
