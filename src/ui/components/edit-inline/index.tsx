import { SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Popover,
  Space,
  SpaceProps,
  Typography,
} from "kedu-tech-ui";
import React, { useEffect, useState } from "react";
import { LabelContainer } from "./edit-inline.styles";

interface EditInlineProps {
  label?: React.ReactNode | string | number;
  canEdit: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
  value?: React.ReactNode | string | number;
  containerProps?: SpaceProps;
  inline?: boolean;
}

export const EditInline: React.FC<EditInlineProps> = React.memo(
  ({ label, value, canEdit, children, isLoading, containerProps, inline }) => {
    const [open, setIsOpen] = useState(false);
    const form = Form.useFormInstance();

    useEffect(() => {
      setIsOpen(false);
    }, [isLoading]);

    const valueElement = canEdit ? (
      <LabelContainer>{value || "-"}</LabelContainer>
    ) : (
      value || "-"
    );

    return !inline ? (
      <Space style={{ display: "flex" }} {...containerProps}>
        <Typography.Text type="secondary">{label}</Typography.Text>
        <Popover
          trigger={"click"}
          // placement="bottomLeft"
          onOpenChange={(visible) => {
            if (!canEdit) return;
            setIsOpen(visible);
            form.resetFields();
          }}
          open={open}
          destroyTooltipOnHide
          // defaultOpen={true}
          content={
            <Space.Compact
              style={{ width: "100%" }}
              onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
            >
              {children}
              <Button
                type="primary"
                htmlType="submit"
                onClick={form.submit}
                loading={isLoading}
                icon={<SaveOutlined />}
              />
            </Space.Compact>
          }
        >
          {valueElement}
        </Popover>

        {/* {teste && <div style={{ display: "none" }}>{children}</div>} */}
      </Space>
    ) : (
      <div>{children}</div>
    );
  },
);

EditInline.displayName = "EditInline";
