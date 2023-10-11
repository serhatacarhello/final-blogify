import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MarkDownEditor from "./MarkDownEditor";
import { Box, DialogContentText } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function AddContentField({
  content,
  setContent,
  contentMode,
  setContentMode,
}) {
  const handleCancel = () => {
    console.log("iptal");
    setContent("");
    setContentMode(false);
  };
  const handleSubscribe = () => {
    console.log("ekle butonu");
    setContentMode(false);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        color="inherit"
        sx={{ my: 2 }}
        onClick={() => setContentMode(true)}
        startIcon={<EditNoteIcon />}
      >
        İÇERİK {content ? "Oluşturuldu" : " Oluştur"}
      </Button>
      <Dialog open={contentMode} onClose={() => setContentMode(false)}>
        <DialogTitle>İçerik Alanı</DialogTitle>
        <DialogContent>
          <DialogContentText>
            İçerik ekleyiniz. Tam ekran modunu seçebilirsiniz.
          </DialogContentText>

          {/* MarkdownEditor component */}
          <MarkDownEditor content={content} setContent={setContent} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined" color="error">
            Vazgeç
          </Button>
          <Button onClick={handleSubscribe} variant="outlined">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
