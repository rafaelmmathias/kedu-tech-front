import { FullHeightContainer } from "kedu-tech-ui";
import Icon from "@ant-design/icons";
import { Logo } from "@/ui/components";
import { SpinningIcon } from "./session-loader.styles";

const KeduLogoSpinning = () => {
  return (
    <div style={{ position: "relative" }}>
      <Logo />
      <SpinningIcon />
    </div>
  );
};

export const SessionLoader = () => (
  <FullHeightContainer>
    <Icon component={KeduLogoSpinning} />
  </FullHeightContainer>
);
