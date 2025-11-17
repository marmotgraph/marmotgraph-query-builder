// src/components/InfoTooltip.tsx
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import type { ReactNode } from 'react';

export interface InfoTooltipProps {
  text: ReactNode;
  /** Tooltip placement (default: "right") */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /** Size of the FontAwesome icon (default: "sm") */
  iconSize?: 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x' | '5x';
  className?: string;
  /**
   * In the case of a custom trigger element (e.g., a question‑mark,
   * an SVG, or even a text label). If omitted, the default
   * info‑circle icon is rendered.
   */
  children?: ReactNode;
}

/**
 * Generic, reusable tooltip component.
 *
 * Usage:
 *   <InfoTooltip text="Explain this field" />
 *   <InfoTooltip text={<strong>Bold tip</strong>} placement="top" />
 *   <InfoTooltip text="Custom trigger" children={<MyIcon />} />
 */
export const InfoTooltip: React.FC<InfoTooltipProps> = ({
                                                          text,
                                                          placement = 'right',
                                                          iconSize = 'sm',
                                                          className,
                                                          children,
                                                        }) => {
  // Build the tooltip element once – React‑Bootstrap expects a JSX node.
  const tooltip = <Tooltip id={`tooltip-${Math.random()}`} style={{ textAlign: 'left' }} >{text}</Tooltip>;

  // Default trigger is the FontAwesome info‑circle.
  const trigger = children ?? (
    <FontAwesomeIcon icon={faCircleInfo} size={iconSize}/>
  );

  return (
    <OverlayTrigger placement={placement} overlay={tooltip}>
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'default',
          marginLeft: 8, // gap when placed after a label
        }}
      >
        {trigger}
      </span>
    </OverlayTrigger>
  );
};

export default InfoTooltip;
