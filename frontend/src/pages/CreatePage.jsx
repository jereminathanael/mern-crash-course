import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "@/components/ui/toaster";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    setLoading(true);
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        closable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        closable: true,
      });
    }
    setLoading(false);
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW={"sm"}>
      <VStack spaceY={2}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spaceY={4}>
            <Input variant={"outline"} borderColor={useColorModeValue("gray.200", "gray.500")} placeholder="Product Name" name="name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <Input
              variant={"outline"}
              borderColor={useColorModeValue("gray.200", "gray.500")}
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input variant={"outline"} borderColor={useColorModeValue("gray.200", "gray.500")} placeholder="Image URL" name="image" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
            <Button colorPalette={"blue"} onClick={handleAddProduct} w={"full"} disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </Button>
            <Toaster />
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
