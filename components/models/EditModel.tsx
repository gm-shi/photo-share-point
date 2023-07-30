"use client";
import { useEditModel } from "@/hooks/useEditModel";
import { useUser } from "@/hooks/useUser";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Model } from "../Model";
import { Input } from "../Input";
import { ImageUpload } from "../ImageUpload";

export const EditModel: FC = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFechedUser } = useUser(currentUser?.id);
  const editModel = useEditModel();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  useEffect(() => {
    if (currentUser) {
      setProfileImage(currentUser.profileImage);
      setCoverImage(currentUser.coverImage);
      setName(currentUser.name);
      setUsername(currentUser.username);
      setBio(currentUser.bio);
    }
  }, [currentUser]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      mutateFechedUser();

      toast.success("Updated");

      editModel.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    coverImage,
    editModel,
    mutateFechedUser,
    name,
    profileImage,
    username,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        onChange={(base64) => setProfileImage(base64)}
        label="Upload profile image"
        value={profileImage}
        disabled={isLoading}
      />
      <ImageUpload
        onChange={(base64) => setCoverImage(base64)}
        label="Upload cover image"
        value={coverImage}
        disabled={isLoading}
      />

      <Input
        palceholder="Name"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
        value={name}
      />
      <Input
        palceholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        value={username}
      />
      <Input
        palceholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        disabled={isLoading}
        value={bio}
      />
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={editModel.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModel.onClose}
      onSubmit={handleSubmit}
      body={bodyContent}
    />
  );
};
