// EditProfileModal.jsx
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";

const EditProfileModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Edit profile</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className="bg-white p-6 rounded-lg shadow-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md"
        >
          <Dialog.Title className="text-lg font-bold mb-2">Edit Profile</Dialog.Title>
          <Dialog.Description className="text-sm mb-4 text-gray-500">
            Make changes to your profile.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root placeholder="Enter your full name" defaultValue="Freja Johnsen" />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Root placeholder="Enter your email" defaultValue="freja@example.com" />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close asChild>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditProfileModal;
