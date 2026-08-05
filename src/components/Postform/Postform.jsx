import React, { useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Select, RTE, Input } from '../index'
import dataService from '../../Appwrite/Data'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Postform({ form }) {

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: form?.title || "",
      slug: form?.slug || "",
      content: form?.content || "",
      status: form?.status || "active"
    }
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [preview, setPreview] = useState(null);
  const [editImageUrl, setEditImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 load original image in edit mode
  useEffect(() => {
    if (form && form.featuredImage && !preview) {
      dataService.getPreview(form.featuredImage)
        .then((url) => {
          setEditImageUrl(url);
          console.log("Loaded image preview URL:", url);
        })
        .catch((error) => {
          console.error("Error loading image preview:", error);
        });
    }
  }, [form, preview]);

  // 🔥 slug transform
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  // 🔥 auto slug
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // 🔥 submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      if (form) {
        // update
        const file = data.image?.[0] 
          ? await dataService.uploadFile(data.image[0], userData?.$id) 
          : null;

        if (file) {
          dataService.deleteFile(form.featuredImage);
        }

        const dbPost = await dataService.updatePost(form.$id, {
          ...data,
          featuredImage: file ? file.$id : form.featuredImage,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);

      } else {
        // create
        if (!data.image || !data.image[0]) {
          alert("Please choose an image");
          return;
        }
        console.log("User data from Redux:", userData);
        if (!userData.emailVerification) {
          
          console.error("User not authenticated", userData);
          alert("please mail the admin for verification to create post on shubhamyadav0194@gmail.com");
          return;
        }

        const file = await dataService.uploadFile(data.image[0], userData?.$id);

        if (file) {
          data.featuredImage = file.$id;

          const dbPost = await dataService.createPost({
            ...data,
            userId: userData.$id
          });

          if (dbPost) navigate(`/post/${dbPost.$id}`);
        }
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-2">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 flex flex-wrap gap-3">

        {/* 🔹 LEFT */}
        <div className="w-full md:w-2/3 space-y-2">

          <div>
            <label className="text-sm font-medium text-gray-600">Title</label>
            <Input
              placeholder="Enter post title..."
              className="mt-1"
              {...register("title", { required: true })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Content</label>
            <div className="mt-1 border border-gray-200 rounded-xl overflow-hidden">
              <RTE
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
          </div>

        </div>

        {/* 🔹 RIGHT */}
        <div className="w-full md:w-1/3 space-y-2">

          {/* Upload */}
          <div>
            <label className="text-sm font-medium text-gray-600">Upload Image</label>

            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-gray-400 transition">

              <Input
                type="file"
                id="fileUpload"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className="hidden"
                {...register("image", {
                  required: !form,
                  onChange: (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }
                })}
              />

              <label htmlFor="fileUpload" className="cursor-pointer text-gray-500 text-xs">
                {preview ? "Change Image" : "Click to upload"}
              </label>

            </div>
          </div>

          {/* Preview */}
          {preview && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Preview</p>
              <img
                src={preview}
                alt="Preview"
                className="rounded-xl shadow-sm max-h-32 w-full object-cover"
              />
            </div>
          )}

          {/* Old Image (edit mode) */}
          {!preview && form && editImageUrl && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Image</p>
              <img
                src={editImageUrl}
                alt={form.title}
                className="rounded-xl shadow-sm max-h-32 w-full object-cover"
              />
            </div>
          )}

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-600">Status</label>
            <Select
              options={["active", "inactive"]}
              className="mt-1"
              {...register("status", { required: true })}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-2.5 rounded-xl hover:bg-black transition disabled:opacity-50"
          >
            {loading ? "Processing..." : form ? "Update Post" : "Publish Post"}
          </Button>

        </div>

      </div>

    </form>
  );
}

export default Postform;