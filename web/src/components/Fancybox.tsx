import React, { FC, useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

interface FancyBoxProps {
  options?: any;
  delegate?: string;
}

const Fancybox: FC<FancyBoxProps> = ({
  options = {},
  delegate = "[data-fancybox]",
  children,
}) => {
  //const delegate = props.delegate || "[data-fancybox]";

  useEffect(() => {
    //const opts = props.options || {};

    NativeFancybox.bind(delegate, options);

    return () => {
      NativeFancybox.destroy();
    };
  }, [delegate, options]);

  return <>{children}</>;
};

export default Fancybox;
