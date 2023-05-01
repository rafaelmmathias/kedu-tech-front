import { Company } from "@/modules/companies/services/entities";
import { FileSearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Button, Row, Table } from "kedu-tech-ui";
import { useNavigate } from "react-router-dom";

interface CompaniesTableProps {
  data: Company[];
  current: number;
  pageSize: number;
  total: number;
  loading: boolean;
  onChange: (page: number, pageSize: number) => void;
}
type DataType = Company & {
  key: React.Key;
};

export const CompaniesTable: React.FC<CompaniesTableProps> = ({
  data,
  current,
  pageSize,
  total,
  onChange,
  loading,
}) => {
  const navigate = useNavigate();
  const indexedData: DataType[] = data.map((company, index) => ({
    key: `company-row-${index}-${company.id}`,
    ...company,
  }));

  const columns: ColumnsType<DataType> = [
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      width: 160,
      key: "cnpj",
    },
    {
      title: "Escola",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (company) => {
        return (
          <Row justify={"center"}>
            <Button
              icon={<FileSearchOutlined />}
              type="primary"
              onClick={() => {
                navigate(`${company.id}`);
              }}
            />
          </Row>
        );
      },
    },
  ];

  return (
    <Table
      pagination={{
        current,
        pageSize,
        total,
        onChange,
        hideOnSinglePage: true,
        position: ["bottomCenter"],
        showSizeChanger: false,
      }}
      loading={loading}
      columns={columns}
      dataSource={indexedData}
      scroll={{ x: 780 }}
    />
  );
};
