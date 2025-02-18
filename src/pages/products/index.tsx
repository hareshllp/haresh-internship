import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

// import { timeSince } from 'helpers';

import Layout from "components/layout";
import Pagination from 'components/pagination/Pagination';

import { RootState, store } from 'redux/store';
import { addProductClicked, deleteProduct, editProductClicked, productTypes } from 'redux/slices/products.slice';

import { toast } from "react-toastify";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import { RECORDS_PER_PAGES } from "../../constants";
import NewProduct from "./add";
import { paginate } from "helpers";

export type AppDispatch = typeof store.dispatch;


var categories = [
  {
    "key": "electronics",
    "value": "Electronics"
  },
  {
    "key": "homeAppliances",
    "value": "Home Appliances"
  },
  {
    "key": "clothes",
    "value": "Clothes"
  },
  {
    "key": "sport",
    "value": "Sport"
  },
  {
    "key": "furniture",
    "value": "Furniture"
  }
];


const ProductItems = (props: {
  products: productTypes[],
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
}): JSX.Element => {
  const { products, handleDelete, handleEdit } = props;
  return <>
    {
      products.map((item: productTypes) => {

        let Categoryobj: any = categories.find((cat, index) => cat.key === item.productCategory);
        // console.log(Categoryobj);

        return (<tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.productName}</td>
          <td>{Categoryobj ? Categoryobj.value : ""}</td>
          <td>{item.manufacturer}</td>
          <td>{item.price}</td>
          <td><button onClick={() => handleEdit(item.id)}><FontAwesomeIcon icon={faPencil} /></button></td>
          <td><button onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
        </tr>)
      }

      )}
  </>;

}

type Props = {}



const Products = (props: Props) => {


  const dispatch = useDispatch<AppDispatch>();
  const { data: products, loading, pagination, totalRecords, dataToggler } = useSelector((state: RootState) => state.products);

  // const {setCurrentPage} = props;
  const [pageData, setPageData] = useState<productTypes[]>(products);


  useEffect(() => {

    setPageData(paginate(products, pagination.currentPage));
    console.log(pageData);
    return () => {
    }

  }, [dataToggler, totalRecords, pagination]);


  // const handlePageDown = (event: React.MouseEvent) => {
  //   event.preventDefault();
  //   dispatch(pageDown());
  // }



  const handleDelete = (itemId: string) => {

    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(deleteProduct({ id: itemId }));
            toast('Product Deleted successfully');
          }
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    });
  }

  const handleEdit = (itemId: string) => {
    dispatch(editProductClicked({ id: itemId }));
  }

  //{removingSessions && <span className="spinner-border spinner-border-sm"></span>} 

  return (

    <Layout>
      <NewProduct />

      <div className="products-wrapper">

        {!pagination.isPaginationReady && <span className="spinner-border spinner-border-sm"></span>}
        {pagination.isPaginationReady &&
          <Pagination currentPage={pagination.currentPage} lastPage={pagination.totalPages} maxLength={7} />
        }

        <button className="btn btn-primary btn-new-product" onClick={() => { dispatch(addProductClicked()) }}>
          <FontAwesomeIcon icon={faAdd} /> Add Product
        </button>


        {loading && <span className="spinner-border spinner-border-sm"></span>}
        {!loading &&

          <table className="table sessions-list-table">
            <thead>
              <tr>
                <th style={{ width: "120px" }} > Product ID </th>
                <th style={{ width: "250px" }}> Product Name </th>
                <th style={{ width: "200px" }}> Product Category </th>
                <th style={{ width: "180px" }}> Manufacturer </th>
                <th style={{ width: "100px" }}> Price </th>
                <th style={{ width: "350px" }} colSpan={2}> Actions </th>
              </tr>
            </thead>
            {products.length === 0 &&
              <tbody>
                <td colSpan={6} style={{ color: 'red', textAlign: "center" }}>No Products Found. Please Add Products from Top Right</td>
              </tbody>
            }
            {products.length > 0 &&
              <tbody>
                <ProductItems products={pageData} {...{
                  handleDelete,
                  handleEdit
                }} /> :
              </tbody>
            }

          </table>

        }
      </div>
    </Layout>
  );

}

export default Products;