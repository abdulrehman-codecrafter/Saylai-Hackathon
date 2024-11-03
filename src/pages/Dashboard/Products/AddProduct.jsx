import React, { useState } from 'react';
import { collection, setDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { toast } from 'sonner';

const getRandomId = () => Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)
const AddProduct = () => {
  const [productData, setProductData] = useState({
    id:"",
    name: '',
    category: '',
    description: '',
    price: '',
    imgUrl: '',
    featured: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newId = getRandomId(); // Generate a new ID
    const newProductRef = doc(firestore, 'restaurantItems', newId); // Create document reference with the generated ID

    try {
        await setDoc(newProductRef, {
            ...productData,
            price: parseFloat(productData.price), // Ensure price is a number
            id: newId, // Set the document ID
        });
        console.log('Product added successfully');
        
        // Optionally, reset the form
        setProductData({
            name: '',
            category: '',
            description: '',
            price: '',
            imgUrl: '',
            featured: false,
        });
    } catch (error) {
        console.error('Error adding product: ', error);
    } finally {
        toast.success("Item Added Successfully");
    }
};


  return (
    <div className="container " style={{width:"350px"}} >
      <h1 className="text-center my-5">Add New Product</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={productData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imgUrl" className="form-label">Image URL</label>
          <input
            type="url"
            className="form-control"
            id="imgUrl"
            name="imgUrl"
            value={productData.imgUrl}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="featured"
            name="featured"
            checked={productData.featured}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="featured">Featured</label>
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

