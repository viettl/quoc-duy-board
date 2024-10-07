import React, { useState } from 'react';
import { CardHeader, CardStyled, CardTitle } from './CardStyled';
import { Modal } from 'antd';
import { FullScreenIcon } from '../Icon';

/**
 * Card component that displays a card with a title and an optional fullscreen button.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string | React.ReactNode} props.title - The title of the card
 * @param {boolean} [props.ableToFullScreen=false] - Flag to enable fullscreen functionality
 * @param {React.ReactNode} props.children - The content of the card
 * @param {React.ReactNode} [props.toolbar=null] - The toolbar of the card
 * @param {React.ReactNode} [props.prefixIcon=null] - The prefix
 * @param {React.ReactNode} [props.rightToolbar=null] - The right toolbar
 * @returns {JSX.Element}
 */
export function Card({
  title,
  rightToolbar = null,
  prefixIcon = null,
  ableToFullScreen = false,
  children,
  toolbar = null,
}) {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleClickShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  return (
    <CardStyled>
      <Modal width={1000} centered open={isShowModal} onCancel={handleClickShowModal} footer={null}>
        {children}
      </Modal>
      <CardHeader>
        <CardTitle>
          {prefixIcon ? prefixIcon : null}
          {title}
        </CardTitle>

        {rightToolbar ? rightToolbar : null}
        {ableToFullScreen ? (
          <div className="toolbar">
            {typeof toolbar !== null ? <>{toolbar}</> : null}
            <div className={'full-icon'} onClick={handleClickShowModal}>
              <FullScreenIcon />
            </div>
          </div>
        ) : null}
      </CardHeader>
      {children}
    </CardStyled>
  );
}
