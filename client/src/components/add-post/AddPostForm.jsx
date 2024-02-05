import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FileBase64 from "react-file-base64";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import AddContent from "./AddContentField";
import { createPostAsync } from "../../redux-toolkit/posts/PostSlice";

// tags
const tags = ["fun", "programming", "health", "science"];
const allowedImageFormats = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
//schema
const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  tag: yup.mixed().oneOf(tags).required(),
});

export default function AddPostForm(props) {
  const { open, handleClose } = props;
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [contentMode, setContentMode] = useState(false);
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    //Dispatch create post action
    if (fileError !== "") return;
    const newPost = { ...data, image: file, content: content };
    dispatch(createPostAsync(newPost));
    clearForm();
  };

  function clearForm() {
    handleClose();
    reset();
    setFile(null);
    setContentMode(false);
    setContent(null);
  }

  useEffect(() => {
    reset();
    setFile(null);
    setContent(null);
    setContentMode(false);
  }, [isSubmitSuccessful, reset]);

  const handleFileDone = ({ base64, file }) => {
    const isAllowedFormat = allowedImageFormats.includes(file.type);

    if (isAllowedFormat) {
      setFile(base64);
      setValue("image", base64);
      setFileError("");
    } else {
      setFileError(
        "Geçersiz dosya formatı. Lütfen JPG,JPEG, PNG veya GIF kullanın."
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Yeni Yazı Oluştur</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Yeni yazı eklemek için aşağıdaki formu doldurunuz.
        </DialogContentText>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="title"
            name="title"
            label="Başlık"
            variant="outlined"
            sx={{ mb: 2 }}
            size="small"
            fullWidth
            error={errors.title ? true : false}
            {...register("title")}
          />
          <p>{errors.title?.message}</p>
          <TextField
            id="subtitle"
            name="subtitle"
            label="Alt Başlık"
            variant="outlined"
            sx={{ mb: 2 }}
            size="small"
            fullWidth
            error={errors.subtitle ? true : false}
            {...register("subtitle")}
          />
          <p>{errors.subtitle?.message}</p>

          {/* select */}
          <Controller
            name="tag"
            control={control}
            error={errors.tag ? true : false}
            defaultValue={tags[0]}
            render={({ field }) => (
              <Select sx={{ mb: 2 }} fullWidth {...field} input={<Input />}>
                {tags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag?.charAt(0)?.toUpperCase() +
                      tag?.slice(1)?.toLocaleLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {/* content field created with markdown-editor */}
          {setContentMode && (
            <AddContent
              content={content}
              control={control}
              setContent={setContent}
              contentMode={contentMode}
              setContentMode={setContentMode}
            />
          )}
          <Stack alignItems={"center"}>
            {errors.image && (
              <>
                <p>{errors.image.message}</p>
                <br />
              </>
            )}
            {fileError && <p style={{ marginBottom: "5px" }}>{fileError} </p>}
            {<h4>{!file ? `Lütfen  dosya seciniz.` : "Dosya yüklendi."}</h4>}
            <br />
            {/* destructure base64 prop  */}
            <FileBase64 multiple={false} onDone={handleFileDone} />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" fullWidth onClick={clearForm}>
          Vazgeç
        </Button>
        <Button
          color={"primary"}
          fullWidth
          variant="contained"
          type="submit"
          onClick={() => handleSubmit(onSubmit)()}
          endIcon={<SendIcon />}
        >
          Yayınla
        </Button>
      </DialogActions>
    </Dialog>
  );
}
