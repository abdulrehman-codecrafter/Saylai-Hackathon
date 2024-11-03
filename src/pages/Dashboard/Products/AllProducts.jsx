
// import React, { useState, useContext } from 'react';
// import { ItemsContext } from '../../../Contexts/ItemContext';
// import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { Table, Button, Modal } from 'antd';
// import { firestore } from '../../../config/firebase';

// const AllProducts = () => {
//   const { restaurantItems, setRestaurantItems } = useContext(ItemsContext);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);
//   const [editData, setEditData] = useState({
//     category: '',
//     description: '',
//     featured: false,
//     id: '',
//     imgUrl: '',
//     name: '',
//     price: 0,
//   });

//   const [loadingDelete, setLoadingDelete] = useState(false);
//   const [loadingUpdate, setLoadingUpdate] = useState(false);

//   const handleDelete = (item) => {
//     console.log('Delete item:', item);
//     setCurrentItem(item);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (currentItem) {
//       console.log('Confirming delete for ID:', currentItem.id);
//       setLoadingDelete(true);
//       try {
//         await deleteDoc(doc(firestore, 'restaurantItems', currentItem.id));
//         console.log('Item deleted successfully');
//       } catch (error) {
//         console.error('Error deleting item: ', error);
//       } finally {
//         setLoadingDelete(false);
//         setShowDeleteModal(false);
//         setCurrentItem(null);
//       }
//     }
//   };

//   const handleEdit = (item) => {
//     setEditData({ ...item });
//     setCurrentItem(item);
//     setShowEditModal(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditData({
//       ...editData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoadingUpdate(true);
//     try {
//       console.log(editData);
//       await updateDoc(doc(firestore, 'restaurantItems', currentItem.id), editData);
//       console.log('Item updated successfully');
//     } catch (error) {
//       console.error('Error updating item: ', error);
//     } finally {
//       setLoadingUpdate(false);
//       setShowEditModal(false);
//       setCurrentItem(null);
//     }
//   };

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Image',
//       dataIndex: 'imgUrl',
//       key: 'imgUrl',
//       render: (text) => <img src={text} alt="Product" width={70} className="rounded" />,
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//       render: (text) => `$${text.toFixed(2)}`,
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <>
//           <Button type="primary" className='me-2' ghost onClick={() => handleEdit(record)}>Edit</Button>
//           <Button danger onClick={() => handleDelete(record)}>Delete</Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div className="container">
//       <h1 className="text-center my-5">All Products</h1>
//       <Table columns={columns} dataSource={restaurantItems} rowKey="id" />

//       <Modal
//         title="Confirm Delete"
//         visible={showDeleteModal}
//         onCancel={() => setShowDeleteModal(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setShowDeleteModal(false)}>
//             Cancel
//           </Button>,
//           <Button key="delete" type="primary" danger loading={loadingDelete} onClick={confirmDelete}>
//             Delete
//           </Button>,
//         ]}
//       >
//         <p>Are you sure you want to delete this product?</p>
//       </Modal>

//       <Modal
//         title="Edit Product"
//         visible={showEditModal}
//         onCancel={() => setShowEditModal(false)}
//         footer={null}
//       >
//         <form onSubmit={handleUpdate} className="edit-product-form">
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               value={editData.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="description" className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               id="description"
//               name="description"
//               rows="3"
//               value={editData.description}
//               onChange={handleInputChange}
//               required
//             ></textarea>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="category" className="form-label">Category</label>
//             <input
//               type="text"
//               className="form-control"
//               id="category"
//               name="category"
//               value={editData.category}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="price" className="form-label">Price</label>
//             <input
//               type="number"
//               className="form-control"
//               id="price"
//               name="price"
//               value={editData.price}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="imgUrl" className="form-label">Image URL</label>
//             <input
//               type="url"
//               className="form-control"
//               id="imgUrl"
//               name="imgUrl"
//               value={editData.imgUrl}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="mb-3 form-check">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="featured"
//               name="featured"
//               checked={editData.featured}
//               onChange={handleInputChange}
//             />
//             <label className="form-check-label" htmlFor="featured">Featured</label>
//           </div>
//           <Button type="primary" htmlType="submit" loading={loadingUpdate}>
//             Update
//           </Button>
//           <Button style={{ margin: '0 8px' }} onClick={() => setShowEditModal(false)}>
//             Cancel
//           </Button>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default AllProducts;
import React, { useState, useContext } from 'react';
import { ItemsContext } from '../../../Contexts/ItemContext';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Table, Button, Modal } from 'antd';
import { firestore } from '../../../config/firebase';

const AllProducts = () => {
  const { restaurantItems, updateItems } = useContext(ItemsContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editData, setEditData] = useState({
    category: '',
    description: '',
    featured: false,
    id: '',
    imgUrl: '',
    name: '',
    price: 0,
  });

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const handleDelete = (item) => {
    setCurrentItem(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (currentItem) {
      setLoadingDelete(true);
      try {
        await deleteDoc(doc(firestore, 'restaurantItems', currentItem.id));
        // Update the restaurantItems state after deletion
        updateItems(restaurantItems.filter(item => item.id !== currentItem.id));
        console.log('Item deleted successfully');
      } catch (error) {
        console.error('Error deleting item: ', error);
      } finally {
        setLoadingDelete(false);
        setShowDeleteModal(false);
        setCurrentItem(null);
      }
    }
  };

  const handleEdit = (item) => {
    setEditData({ ...item });
    setCurrentItem(item);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      await updateDoc(doc(firestore, 'restaurantItems', currentItem.id), editData);
      // Update the restaurantItems state after updating
      updateItems(restaurantItems.map(item => (item.id === currentItem.id ? { ...item, ...editData } : item)));
      console.log('Item updated successfully');
    } catch (error) {
      console.error('Error updating item: ', error);
    } finally {
      setLoadingUpdate(false);
      setShowEditModal(false);
      setCurrentItem(null);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      render: (text) => <img src={text} alt="Product" width={70} className="rounded" />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$ ${text}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="primary" className='me-2' ghost onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <h1 className="text-center my-5">All Products</h1>
      <Table columns={columns} dataSource={restaurantItems} rowKey="id" />

      <Modal
        title="Confirm Delete"
        visible={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger loading={loadingDelete} onClick={confirmDelete}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>

      <Modal
        title="Edit Product"
        visible={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
      >
        <form onSubmit={handleUpdate} className="edit-product-form">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={editData.name}
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
              value={editData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={editData.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={editData.price}
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
              value={editData.imgUrl}
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
              checked={editData.featured}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="featured">Featured</label>
          </div>
          <Button type="primary" htmlType="submit" loading={loadingUpdate}>
            Update
          </Button>
          <Button style={{ margin: '0 8px' }} onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AllProducts;
