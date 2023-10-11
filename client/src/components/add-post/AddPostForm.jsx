import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { UploadButton } from "@bytescale/upload-widget-react";
import { useDispatch } from "react-redux";

import AddContent from "./AddContentField";
// import { createPost } from "../../redux/actions/postActions";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createPostAsync } from "../../redux-toolkit/posts/PostSlice";

const uploadOptions = {
  apiKey: "public_W142iFxETsEJcJxodwWKvCXw2cQ1", // This is your API key.
  maxFileCount: 1,
};

// tags
const tags = ["fun", "programming", "health", "science"];

//schema
const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  tag: yup.mixed().oneOf(tags).required(),
});

export default function AddPostForm(props) {
  const { open, handleClose } = props;
  const [file, setFile] = useState(null);
  const [contentMode, setContentMode] = useState(false);
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const fileName = file?.fileUrl;
  const maxLength = 30;
  const shortenedFileName =
    fileName && fileName.length > maxLength
      ? fileName.substring(0, maxLength) + "..."
      : fileName;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    //Dispatch create post action
    const image = file?.fileUrl;
    const newPost = { ...data, image: image, content: content };
    console.log("🚀 ~ file: AddPostForm.jsx:71 ~ onSubmit ~ newPost:", newPost);
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
              setContent={setContent}
              contentMode={contentMode}
              setContentMode={setContentMode}
            />
          )}
          <Stack alignItems={"center"}>
            <UploadButton
              options={uploadOptions}
              onComplete={(file) => setFile(file[0])}
            >
              {({ onClick }) => (
                <Button
                  variant="outlined"
                  color="info"
                  onClick={onClick}
                  startIcon={<CloudUploadIcon />}
                >
                  Dosya {file ? "yüklendi" : "yükle..."}
                </Button>
              )}
            </UploadButton>
            {file && <p>Secili&nbsp;dosya:{`${shortenedFileName}`} </p>}
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
