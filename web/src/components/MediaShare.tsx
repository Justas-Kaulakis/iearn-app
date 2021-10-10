import React, { FC } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

interface MediaShareProps {
  url: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

const MediaShare: FC<MediaShareProps> = ({
  url,
  title,
  description,
  disabled,
}) => {
  return (
    <span className={!disabled ? "share-media" : undefined}>
      <FacebookShareButton disabled={disabled} url={url}>
        <FacebookIcon size={35} />
      </FacebookShareButton>
      <WhatsappShareButton disabled={disabled} title={title} url={url}>
        <WhatsappIcon size={35} />
      </WhatsappShareButton>
      <EmailShareButton
        disabled={disabled}
        subject={`iEARN Žiežmariai - "${title.slice(0, 20)}..."`}
        url={url}
      >
        <EmailIcon size={35} />
      </EmailShareButton>
    </span>
  );
};

export default MediaShare;
