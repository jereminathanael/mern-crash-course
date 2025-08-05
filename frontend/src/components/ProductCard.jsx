import { useColorModeValue } from "@/components/ui/color-mode";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Box, Heading, HStack, IconButton, Image, Text, Button, CloseButton, Dialog, Portal, Input, VStack } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 3000,
        closable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        duration: 3000,
        closable: true,
      });
    }
  };
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 3000,
        closable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: "Product updated successfully",
        type: "success",
        duration: 3000,
        closable: true,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <Box shadow={"lg"} rounded={"lg"} overflow={"hidden"} transition={"all 0.3s"} _hover={{ transform: "translateY(-6px)", shadow: "xl" }} bg={bg}>
      <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spaceX={2}>
          <Dialog.Root open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e.open)}>
            <Dialog.Trigger asChild>
              <IconButton colorPalette={"blue"} onClick={() => setIsDialogOpen(true)}>
                <FaRegEdit />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Update Product</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <VStack spaceY={4}>
                      <Input placeholder="Product Name" name="name" variant={"outline"} value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
                      <Input placeholder="Price" name="price" type="number" variant={"outline"} value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} />
                      <Input placeholder="Image URL" name="image" variant={"outline"} value={updatedProduct.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} />
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          <IconButton colorPalette={"red"} onClick={() => handleDeleteProduct(product._id)}>
            <RiDeleteBin6Line />
          </IconButton>
          <Toaster />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
