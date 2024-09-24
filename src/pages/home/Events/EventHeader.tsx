import { Container, Theme, Typography } from "@mui/material";

export const headerTopPadding = 8;
export const bodyOffset = (theme: Theme) =>
  `${theme.spacing(headerTopPadding)} + ${theme.typography.h1.lineHeight} * ${theme.typography.h1.fontSize}`;
export const bodyMinHeight = (theme: Theme) =>
  `100vh - ${theme.spacing(headerTopPadding)} - ${theme.typography.h1.lineHeight} * ${theme.typography.h1.fontSize}`;
export const bodyPaddingBottom = (theme: Theme) => `${bodyOffset(theme)} * 2`;

export type EventHeaderProps = {
  children?: string;
};

export default function EventHeader(props: EventHeaderProps) {
  const { children } = props;
  return (
    <Container
      maxWidth="lg"
      sx={theme => ({
        position: "sticky",
        top: 0,
        pt: headerTopPadding,
        backgroundColor: theme.palette.background.default,
        zIndex: 2,
      })}
    >
      <Typography variant="h1">{children}</Typography>
    </Container>
  );
}
