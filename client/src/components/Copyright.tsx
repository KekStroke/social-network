import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { CopyrightProps } from "../types/components.types";

export default function Copyright(props: CopyrightProps) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" sx={props.sx}>
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  } 