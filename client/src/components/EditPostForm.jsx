import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FileBase64 from "react-file-base64";
import {
  Button,
  Input,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";

import MarkDownEditor from "./add-post/MarkDownEditor";
import { updatePostAsync } from "../redux-toolkit/posts/PostSlice";

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

export default function EditPostForm(props) {
  const { post, handleClose } = props;
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [content, setContent] = useState(post?.content);

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
    defaultValues: {
      title: post?.title,
      subtitle: post?.subtitle,
      content: post?.content,
    },
  });

  const onSubmit = (data) => {
    const image = file || post?.image;
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
        control={control}
      />

      <Stack alignItems={"center"} my={3}>
        {post && !file && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <p>Seçili resim</p>
            <img src={post?.image} width={50} alt="post file" />
            <br />
          </Stack>
        )}
        {errors.image && (
          <>
            <p>{errors.image?.message}</p>
            <br />
          </>
        )}
        {fileError && <p style={{ marginBottom: "5px" }}>{fileError} </p>}
        <FileBase64 multiple={false} onDone={handleFileDone} />
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
          endIcon={<SendIcon />}
        >
          Güncelle
        </Button>
      </Stack>
    </form>
  );
}
