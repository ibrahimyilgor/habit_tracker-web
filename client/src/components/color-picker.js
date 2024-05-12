// "use strict";

import React, { useEffect, useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

export const ColorPicker = ({ color, onChange, style, disabled }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("color", color);
  }, [color]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (color) => {
    onChange(color);
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `${color}`,
      },
      root: {
        paddingRight: style?.paddingRight ?? 0,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: !disabled && "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div style={styles.root}>
      <div
        style={styles.swatch}
        onClick={() => {
          if (!disabled) {
            handleClick();
          }
        }}
      >
        <div style={styles.color} />
      </div>
      {open ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={() => handleClose()} />
          <SketchPicker color={color} onChange={(e) => handleChange(e)} />
        </div>
      ) : null}
    </div>
  );
};
