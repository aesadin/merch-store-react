import React from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ProductDetails from './ProductDetails';

class DisplayWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      masterList: [],
      currentPage: 'index',
      currentProductId: null,
      currentProduct: null
    };
  }

  handleLinks = (pageName) => {
    this.setState({
      currentPage: pageName,
      currentProductId: null 
    });
  }

  handleIDLinks = (pageName, id) => {
    this.setState({
      currentPage: pageName,
      currentProductId: id
    });
  }

  handleAddingNewProduct = (newProduct) => {
    const newMasterList = this.state.masterList.concat(newProduct);
    this.setState({
      masterList: newMasterList,
      currentPage: 'index',
      currentProductId: null
    });
  }

  handleViewingDetails = (id) => {
    const productToView = this.state.masterList.filter(products => products.id === id)[0];
    this.setState({
      currentPage: 'details',
      currentProduct: productToView
    })
  }

  render() {
    let pageToDisplay = null;
    if (this.state.currentPage === 'index') {
      pageToDisplay = <ProductList
        productList = {this.state.masterList} 
        onLinkClick = {this.handleLinks}
        onProductClick = {this.handleViewingDetails} />
    } else if (this.state.currentPage === 'create') {
      pageToDisplay = <ProductForm 
        onLinkClick = {this.handleLinks}
        onProductFormSubmit = {this.handleAddingNewProduct} />
    } else if (this.state.currentPage === 'details') {
      pageToDisplay = <ProductDetails
        product = {this.state.currentProduct}
        onLinkClick = {this.handleLinks} />
    }
    return (
      <React.Fragment>
        {pageToDisplay}
      </React.Fragment>
    )
  }
}

export default DisplayWindow;