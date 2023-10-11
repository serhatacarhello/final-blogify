import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Input,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { UploadButton } from "@bytescale/upload-widget-react";
import { useDispatch } from "react-redux";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MarkDownEditor from "./add-post/MarkDownEditor";
import { updatePostAsync } from "../redux-toolkit/reducers/PostSlice";
const apiKey = process.env.REACT_APP_UPLOADER_API_KEY;
// console.log("🚀 ~ file: EditPostForm.jsx:22 ~ apiKey:", apiKey);

const uploadOptions = {
  apiKey,
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

// post={post} closeEditMode={closeEditMode}

export default function EditPostForm(props) {
  const { post, handleClose } = props;

  const [file, setFile] = useState({
    fileUrl: post?.image,
  });
  const [content, setContent] = useState(post?.content);

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

  const currentImage = post?.image;

  const onSubmit = (data) => {
    const image = file?.fileUrl || currentImage;
    const postContent = content || post?.content;

    const updatedPost = {
      _id: post._id,
      ...data,
      image,
      content: postContent,
    };

    dispatch(updatePostAsync(updatedPost));
    clearForm();
  };

  function clearForm() {
    handleClose();
    reset();
    setFile(null);
    setContent(null);
  }

  useEffect(() => {
    reset();
    setFile(null);
    setContent(null);
  }, [isSubmitSuccessful, reset]);

  return (
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
        defaultValue={post?.title}
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
        defaultValue={post?.subtitle}
      />
      <p>{errors.subtitle?.message}</p>

      {/* select */}
      <Controller
        name="tag"
        control={control}
        error={errors.tag ? true : false}
        defaultValue={post?.tag}
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

      <MarkDownEditor
        content={content}
        setContent={setContent}
        defaultValue={post?.content}
      />

      <Stack alignItems={"center"} my={3}>
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
        {!file?.fileUrl && post?.image && (
          <p>Secili&nbsp;dosya:{`${post.image}`} </p>
        )}
        {file && <p>Secili&nbsp;dosya:{`${shortenedFileName}`} </p>}
      </Stack>
      {/* action buttons */}
      <Stack direction={"row"} gap={2} justifyContent={"flex-end"} mt={2}>
        <Button variant="outlined" color="error" onClick={clearForm}>
          Vazgeç
        </Button>
        <Button
          color={"primary"}
          variant="contained"
          type="submit"
          // onClick={() => handleSubmit(onSubmit)}
          endIcon={<SendIcon />}
        >
          Güncelle
        </Button>
      </Stack>
    </form>
  );
}
