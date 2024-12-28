import { SxProps, Theme, Tooltip, Typography } from "@mui/material";
import hljs from "highlight.js";

import javascript from "highlight.js/lib/languages/javascript";
import csharp from "highlight.js/lib/languages/csharp";

import React from "react";
import IsaxIcon from "./IsaxIcon";
import IconButton from "./IconButton";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("csharp", csharp);

export type HighlightProps = {
  block?: boolean;
  children?: React.ReactNode;
  language?: string;
};

type CopyButtonProps = {
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  tooltipDuration?: number;
};

function CopyButton({
  onClick: onClickProp,
  tooltipDuration,
}: CopyButtonProps) {
  tooltipDuration ??= 1000;

  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>(null);

  function onClick(e: React.MouseEvent<HTMLSpanElement>) {
    onClickProp(e);

    setTooltipOpen(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setTooltipOpen(false);
      timeoutRef.current = null;
    }, tooltipDuration);
  }

  return (
    <Tooltip title="Copied" open={tooltipOpen} arrow>
      <IconButton
        size="small"
        aria-label="Copy code"
        onClick={onClick}
        sx={(theme) => ({
          position: "absolute",
          right: theme.spacing(1),
          top: theme.spacing(1),
        })}
      >
        <IsaxIcon name="isax-copy" />
      </IconButton>
    </Tooltip>
  );
}

export default function Highlight({
  children,
  language,
  block,
}: HighlightProps) {
  block ??= false;
  const codeRef = React.useRef<HTMLElement>(undefined);

  React.useEffect(() => {
    if (codeRef.current && !codeRef.current.classList.contains("hljs")) {
      hljs.highlightElement(codeRef.current);
    }
  }, [codeRef]);

  const Container = block
    ? ({ children }) => (
        <Typography
          variant="body1"
          component="pre"
          sx={{ position: "relative" }}
        >
          {children}
        </Typography>
      )
    : ({ children }) => <>{children}</>;

  function copyToClipboard() {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText).then(() => {});
    }
  }

  return (
    <Container>
      {block && (
        <CopyButton
          onClick={() => {
            copyToClipboard();
          }}
        />
      )}
      <Typography
        variant="body2"
        component="code"
        ref={codeRef}
        className={language ? `language-${language}` : ""}
        sx={(theme) => ({
          whiteSpace: "pre",
          borderRadius: "0.5rem",
          backgroundorderColor: "rgba(0, 0, 0, 0.08)",
          ...(block
            ? {
                border: "1px solid black",
                borderColor: "rgba(0, 0, 0, 0.16)",
              }
            : {
                fontSize: "85%",
              }),
        })}
      >
        {children}
      </Typography>
    </Container>
  );
}
