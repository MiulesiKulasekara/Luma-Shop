import { useState } from "react";
import { useFormik } from "formik";
import { Form, Row, Col } from "react-bootstrap";
import { productvalidationSchema } from "../../schema/ValidationSchema";
import FormInput from "../../componets/FormInput";
import FormButton from "../../componets/FormButton";
import { furnitureCategories } from "../Test/Data";
import { useParams } from "react-router-dom";
import {
  useGetProductsByIdQuery,
  useUpdateProductMutation,
} from "../../core/services/product/product";
import { useGetAllProductListingsQuery } from "../../core/services/productListing/productListing";

const UpdateProduct = () => {
  const { id } = useParams();
  const productId = id;

  const { data: productData } = useGetProductsByIdQuery({ productId });
  const [updateProductById , { isLoading, isError, isSuccess }] = useUpdateProductMutation();

  const { data: productListData } = useGetAllProductListingsQuery();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: productData?.name || "",
        description: productData?.description || "",
        price: productData?.price || "",
        category: productData?.category || "",
        vendorId: productData?.vendorId || "",
        stockQuantity: productData?.stockQuantity || 0,
        dimensions: {
          width: productData?.width || 0,
          height: productData?.height || 0,
          depth: productData?.depth || 0,
        },
        material: productData?.material || "",
        colorOptions: productData?.colorOptions || "",
        weight: productData?.weight || 0,
        assemblyRequired: productData?.assemblyRequired || false,
        productImages: productData?.productImages || "",
        warrantyPeriod: productData?.warrantyPeriod || 0,
        isFeatured: productData?.isFeatured || false,
        listingId: productData?.listingId || "",
        isArchived: productData?.isArchived || false,
      },

      validationSchema: productvalidationSchema,

      onSubmit: async (values) => {
        try {
          console.log(values);
          if (productId)
            await updateProductById({ productId: productId, body: values });
          //resetForm();
        } catch (error) {
          console.log(error);
        }
      },
      enableReinitialize: true,
    });

  //input focus
  const [isFocusStates, setIsFocusStates] = useState({
    name: false,
    description: false,
    price: false,
    category: false,
    vendorId: false,
    stockQuantity: false,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    material: false,
    colorOptions: false,
    weight: false,
    assemblyRequired: false,
    productImages: false,
    warrantyPeriod: false,
    isFeatured: false,
    listingId: false,
    isArchived:false,
  });

  const handleFocus = (field, isNested = false) => {
    if (isNested) {
      setIsFocusStates((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, [field]: true },
      }));
    } else {
      setIsFocusStates((prev) => ({ ...prev, [field]: true }));
    }
  };

  const manageBlur = (field, isNested = false) => {
    if (isNested) {
      setIsFocusStates((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, [field]: false },
      }));
    } else {
      setIsFocusStates((prev) => ({ ...prev, [field]: false }));
    }
  };

  //list options
  const transformedOptions = productListData
    ? productListData
        .filter((productListData) => productListData.isActive)
        .map((product) => ({
          value: product.id,
          label: product.name,
        }))
    : [];

  const transformedCategories = furnitureCategories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  return (
    <div className="p-4">
      <h3 className="mb-4">Update Product - {productData?.name}</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormInput
              label="Name"
              id="name"
              name="name"
              type="text"
              value={values.name}
              onBlur={(e) => {
                manageBlur("name");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("name");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.name}
              placeholder="Enter Name"
              error={touched.name && errors.name}
              errorMessage={errors.name}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <FormInput
              label="Image"
              id="productImages"
              name="productImages"
              type="file"
              value={values.productImages}
              onBlur={(e) => {
                manageBlur("productImages");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("productImages");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.productImages}
              placeholder="Upload image"
              error={touched.productImages && errors.productImages}
              errorMessage={errors.productImages}
            />
          </Col>
          <Col>
            <FormInput
              label="Color"
              id="colorOptions"
              name="colorOptions"
              type="text"
              value={values.colorOptions}
              onBlur={(e) => {
                manageBlur("colorOptions");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("colorOptions");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.colorOptions}
              placeholder="Enter colors as comma separated values in Hex. ex: #0000"
              error={touched.colorOptions && errors.colorOptions}
              errorMessage={errors.colorOptions}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <FormInput
              label="Price"
              id="price"
              name="price"
              type="text"
              value={values.price}
              onBlur={(e) => {
                manageBlur("price");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("price");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.price}
              placeholder="Enter price in LKR. ex: 25000.00"
              error={touched.price && errors.price}
              errorMessage={errors.price}
            />
          </Col>
          <Col>
            <FormInput
              label="Quantity"
              id="stockQuantity"
              name="stockQuantity"
              type="text"
              value={values.stockQuantity}
              onBlur={(e) => {
                manageBlur("stockQuantity");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("stockQuantity");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.stockQuantity}
              placeholder="Enter quantity in LKR. ex: 100"
              error={touched.stockQuantity && errors.stockQuantity}
              errorMessage={errors.stockQuantity}
            />
          </Col>
          <Col>
            {" "}
            <FormInput
              label="Material"
              id="material"
              name="material"
              type="text"
              value={values.material}
              onBlur={(e) => {
                manageBlur("material");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("material");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.material}
              placeholder="Enter Material. ex: Wood"
              error={touched.material && errors.material}
              errorMessage={errors.material}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <FormInput
              label="Product List"
              id="listingId"
              name="listingId"
              type="select"
              value={values.listingId}
              onBlur={(e) => {
                manageBlur("listingId");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("listingId");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.listingId}
              options={transformedOptions}
              error={touched.listingId && errors.listingId}
              errorMessage={errors.listingId}
            />
          </Col>
          <Col>
            <FormInput
              label="Category"
              id="category"
              name="category"
              type="select"
              value={values.category}
              onBlur={(e) => {
                manageBlur("category");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("category");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.category}
              options={transformedCategories}
              error={touched.category && errors.category}
              errorMessage={errors.category}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <FormInput
              label="Width"
              id="dimensions.width"
              name="dimensions.width"
              type="text"
              value={values.dimensions.width}
              onBlur={(e) => {
                manageBlur("width", true);
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("width", true);
              }}
              onChange={handleChange}
              isFocused={isFocusStates.dimensions.width}
              placeholder="Enter width in meters. ex: 2"
            />
          </Col>
          <Col>
            <FormInput
              label="Height"
              id="dimensions.height"
              name="dimensions.height"
              type="text"
              value={values.dimensions.height}
              onBlur={(e) => {
                manageBlur("height", true);
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("height", true);
              }}
              onChange={handleChange}
              isFocused={isFocusStates.dimensions.height}
              placeholder="Enter height in meters. ex: 2"
            />
          </Col>
          <Col>
            <FormInput
              label="Depth"
              id="dimensions.depth"
              name="dimensions.depth"
              type="text"
              value={values.dimensions.depth}
              onBlur={(e) => {
                manageBlur("depth", true);
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("depth", true);
              }}
              onChange={handleChange}
              isFocused={isFocusStates.dimensions.depth}
              placeholder="Enter height in meters. ex: 1"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <FormInput
              label="Weight"
              id="weight"
              name="weight"
              type="text"
              value={values.weight}
              onBlur={(e) => {
                manageBlur("weight");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("weight");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.weight}
              placeholder="Enter Weight in Kg. ex: 200"
              error={touched.weight && errors.weight}
              errorMessage={errors.weight}
            />
          </Col>
          <Col>
            <FormInput
              label="Warranty Period"
              id="warrantyPeriod"
              name="warrantyPeriod"
              type="text"
              value={values.warrantyPeriod}
              onBlur={(e) => {
                manageBlur("warrantyPeriod");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("warrantyPeriod");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.warrantyPeriod}
              placeholder="Enter Warranty Period in month. ex: 12"
              error={touched.warrantyPeriod && errors.warrantyPeriod}
              errorMessage={errors.warrantyPeriod}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <FormInput
              label="Description"
              id="description"
              name="description"
              type="textarea"
              value={values.description}
              onBlur={(e) => {
                manageBlur("description");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("description");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.description}
              placeholder="Enter Description"
              rows={5}
              error={touched.description && errors.description}
              errorMessage={errors.companyName}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <FormInput
              id="isArchived"
              label="Archived"
              name="isArchived"
              type="select"
              value={values.isArchived}
              onBlur={(e) => {
                manageBlur("isArchived");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("isArchived");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.isArchived}
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
              error={touched.isArchived && errors.isArchived}
              errorMessage={errors.isArchived}
            />
          </Col>
          <Col>
            <FormInput
              id="isFeatured"
              label="Featured"
              name="isFeatured"
              type="select"
              value={values.isFeatured}
              onBlur={(e) => {
                manageBlur("isFeatured");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("isFeatured");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.isFeatured}
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
              error={touched.isFeatured && errors.isFeatured}
              errorMessage={errors.isFeatured}
            />
          </Col>
          <Col>
            <FormInput
              id="assemblyRequired"
              label="Assembly Required"
              name="assemblyRequired"
              type="select"
              value={values.assemblyRequired}
              onBlur={(e) => {
                manageBlur("assemblyRequired");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("assemblyRequired");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.assemblyRequired}
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
              error={touched.assemblyRequired && errors.assemblyRequired}
              errorMessage={errors.assemblyRequired}
            />
          </Col>
        </Row>
        <FormButton className="mt-2" text="Update Product" type="submit" />
      </Form>

      {isError && <p>Error updating product</p>}
      {isSuccess && (
        <span style={{ color: "green" }}>Product updated successfully!</span>
      )}
    </div>
  );
};

export default UpdateProduct;
