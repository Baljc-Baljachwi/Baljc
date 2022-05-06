import { IconName, IconPrefix, fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  library,
  IconLookup,
  IconDefinition,
  findIconDefinition,
} from "@fortawesome/fontawesome-svg-core";

import styled from "styled-components";

interface IconProps {
  mode: IconPrefix;
  icon: IconName;
  color?: string;
  size?: string;
  display?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledIcon = styled.span<{
  size?: string;
  color?: string;
  display?: string;
}>`
  display: ${(props) => (props.display ? props.display : "")};
  svg {
    color: ${(props) => (props.color ? props.color : "#000000")};
    font-size: ${(props) => (props.size ? props.size : "1rem")};
  }
`;

export default function Icon({
  mode,
  icon,
  color,
  size,
  display,
  onClick,
}: IconProps) {
  library.add(fas, far);
  const iconLookup: IconLookup = { prefix: mode, iconName: icon };
  const iconDefinition: IconDefinition = findIconDefinition(iconLookup);

  return (
    <StyledIcon color={color} size={size} display={display} onClick={onClick}>
      <FontAwesomeIcon icon={iconDefinition} />
    </StyledIcon>
  );
}
