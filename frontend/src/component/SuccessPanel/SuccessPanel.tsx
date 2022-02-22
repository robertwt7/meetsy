import { Stack, Typography, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FunctionComponent } from "react";
import { blue } from "@mui/material/colors";
import { useSnackBar } from "../SnackBar";

interface SuccessPanelProps {
  url: string;
}

export const SuccessPanel: FunctionComponent<SuccessPanelProps> = ({ url }) => {
  const setSnackBar = useSnackBar();
  const handleCopy = (): void => {
    void navigator.clipboard.writeText(url);
    setSnackBar({ message: "Copied to clipboard" });
  };

  return (
    <Stack spacing={2}>
      <Typography align="center" variant="h5" color={blue[500]}>
        Events created successfully, please share the link below to your friends
      </Typography>
      <div className="bg-gray-200 rounded-lg relative">
        <Button
          variant="outlined"
          size="small"
          onClick={handleCopy}
          startIcon={<ContentCopyIcon />}
        >
          Copy
        </Button>
        <Typography
          align="center"
          variant="body1"
          onClick={handleCopy}
          sx={{ margin: "1rem", overflowWrap: "break-word" }}
        >
          {url}
        </Typography>
      </div>
    </Stack>
  );
};
