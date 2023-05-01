import { useCreateRoleGroup, useUpdateRoleGroup } from "@/modules/settings";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popconfirm, Popover, Space } from "kedu-tech-ui";
import { useEffect, useState } from "react";
import { CreateRoleGroupRequest, RoleGroupsResponse } from "../../services/api";
import { useDeleteRoleGroup } from "../../services/hooks/useDeleteRoleGroup";

interface GroupActionsProps {
  group?: RoleGroupsResponse;
  children: React.ReactNode;
}

export const GroupActions: React.FC<GroupActionsProps> = ({
  group,
  children,
}) => {
  const [open, setIsOpen] = useState(false);
  const { mutate, isLoading } = useCreateRoleGroup();
  const { mutateAsync: deleteRoleGroup, isLoading: isDeleting } =
    useDeleteRoleGroup();
  const { mutateAsync: updateRoleGroup, isLoading: isUpdating } =
    useUpdateRoleGroup();
  const [form] = Form.useForm();

  const loading = isLoading || isDeleting || isUpdating;

  const onCreateGroup = (values: CreateRoleGroupRequest) => {
    if (group) {
      updateRoleGroup({ ...group, ...values });
      return;
    }

    mutate(
      {
        name: values.name,
        roles: [],
      },
      {
        onSuccess: () => {
          form.setFieldValue("name", "");
        },
      },
    );
  };

  useEffect(() => {
    if (!loading) setIsOpen(false);
  }, [isLoading, isDeleting, isUpdating]);

  return (
    <Popover
      trigger={"click"}
      onOpenChange={setIsOpen}
      open={open}
      content={
        <Space onClick={(e) => e.stopPropagation()}>
          <Form<CreateRoleGroupRequest>
            initialValues={group}
            onFinish={onCreateGroup}
            form={form}
          >
            <Space.Compact style={{ width: "100%" }}>
              <Form.Item
                noStyle
                name="name"
                rules={[
                  {
                    required: true,
                    type: "string",
                  },
                ]}
              >
                <Input
                  disabled={loading}
                  style={{ width: "190px" }}
                  placeholder="nome do cargo"
                />
              </Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
              >
                Salvar
              </Button>
            </Space.Compact>
          </Form>

          {group && (
            <Popconfirm
              title={"Atenção"}
              description={"Tem certeza que deseja apagar este cargo?"}
              onConfirm={(e) => {
                e?.stopPropagation();
                return deleteRoleGroup(group);
              }}
              onCancel={(e) => {
                e?.stopPropagation();
              }}
            >
              <Button
                block
                type="primary"
                danger
                onClick={(e) => e.stopPropagation()}
              >
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          )}
        </Space>
      }
    >
      {children}
    </Popover>
  );
};
