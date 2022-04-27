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
}

const StyledIcon = styled.span<{ size?: string; color?: string }>`
  svg {
    color: ${(props) => (props.color ? props.color : "#000000")};
    font-size: ${(props) => (props.size ? props.size : "1rem")};
  }
`;

export default function Icon({ mode, icon, color, size }: IconProps) {
  library.add(fas, far);
  const iconLookup: IconLookup = { prefix: mode, iconName: icon };
  const iconDefinition: IconDefinition = findIconDefinition(iconLookup);

  return (
    <StyledIcon color={color} size={size}>
      <FontAwesomeIcon icon={iconDefinition} />
    </StyledIcon>
  );
}
