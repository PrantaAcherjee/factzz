import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./Product.css";
import { connect } from "react-redux";
import { 
	fetchProductCategoriesStart,
	fetchProductSubCategoriesStart,
	userProductsSaveStart
 } from "../../../store/actions/ProductsAction";
import { translate, t } from "react-multi-lang";
import ProductHeader from "./ProductHeader";
import configuration from "react-global-configuration";
import {Grid,Stepper,Step,StepLabel,Box,Card,Paper} from "@material-ui/core"

function getSteps() {
return ["1. Product Info", "2.Pricing ", "3. Media"];
 }



const AddProduct = (props) => {

	function getStepContent(stepIndex) {
		switch (stepIndex) {
		  case 0:
		    return  <Box>
		<Box>
		 <Grid container spacing={3}>
		    <Grid item xs={12} sm={6}>
			<Form.Group controlId="formBasicEmail"><Form.Label>{t("name")}*</Form.Label>
			<Form.Control type="text" placeholder="Name"  
			name="name" onChange={(event) => {
			handleChange(event);}}
			 />
			</Form.Group>
		      </Grid>
	
		    <Grid item xs={12} sm={6}>
		    <Form.Group controlId="formBasicEmail"><Form.Label>{t("Quantity")}*</Form.Label>
			<Form.Control type="number" placeholder="Quantity"  
			name="Quantity"
			onChange={(event) => {
			handleChange(event);}}
			 />
			</Form.Group>
		    </Grid>
		    </Grid>
		       </Box>
			<Box>
		 <Grid container spacing={3}>
		    <Grid item xs={12} sm={6}>
		    <Form.Group>
	<Form.Label>{t("category")}*</Form.Label>
	<Form.Control
	as="select"
	className="mr-sm-2"
	id="inlineFormCustomSelect"
	custom
	name="product_category_id"
	onChange={(event) => {
	handleChange(event);
	}}>
								<option value="">Select Category</option>
	{props.categories.loading ? 'loading' : 
	props.categories.data.product_categories.map((category) => (
	<option value={category.product_category_id}>{category.name}</option>))}
	</Form.Control>
	</Form.Group>
		      </Grid>
	
		    <Grid item xs={12} sm={6}>
		    <Form.Group>
	<Form.Label>{t("sub_category")}*</Form.Label>
	<Form.Control
	as="select"
	className="mr-sm-2"
	id="inlineFormCustomSelect"
	custom
	name="product_sub_category_id"
	onChange={(event) => {
	handleChange(event);
	}}>
	<option value="0">Select Sub Category</option>
	{props.subCategories.loading ? null : 
	props.subCategories.data.product_sub_categories.map((sub_category) => (
	<option value={sub_category.product_sub_category_id}>{sub_category.name}</option>))}
	</Form.Control>
	</Form.Group>
	</Grid>
	</Grid>
	 </Box>
	</Box>;
		  case 1:
		    return  <Box>
		    <Grid container spacing={3}>
		    <Grid item xs={12} sm={6}>
		    <Form.Group controlId="formBasicEmail">
		<Form.Label>{configuration.get("configData.is_only_wallet_payment") == 1 ? t("token") : t("price")}*</Form.Label>
		<Form.Control type="number" placeholder={configuration.get("configData.is_only_wallet_payment") == 1 ? t("token") : t("price")} min="1"
		name="price"
		onChange={(event) => {
		handleChange(event);
		}}/>
		</Form.Group>
		</Grid>
	
		       <Grid item xs={12} sm={12}>
		       <Form.Group controlId="exampleForm.ControlTextarea1">
	            <Form.Label>{t("description")}</Form.Label>
	            <Form.Control as="textarea" rows={3} className="height-auto" 
	            name="description"
	            onChange={(event) => {
	            handleChange(event);
	            }}/>
	           </Form.Group>
		       </Grid>
		       
		     </Grid>
		    </Box>;
		  case 2:
		    return <Box>
			<Grid item xs={12} sm={12}>
			<Form.Label>{t("upload_product_image")}</Form.Label>
      <Form.Group id="file-upload-form" className="uploader">
        <Form.File id="file-upload" name="picture" accept="image/*" onChange={(event) => {
        handleChange(event);}}/>
       <label for="file-upload" id="file-drag">
       <div id="start">
       <i className="fa fa-download" aria-hidden="true"></i>
       <div>{t("select_a_image")}</div>
      </div>
      </label>
      <p className="inuput-help">{t("upload_product_image_para")}</p>
      </Form.Group>     
	</Grid>
	 </Box>
	  default:
	  return null;
	  } }

	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();
	const isLastStep = activeStep === steps.length - 1;    
	const handleNext = () => setActiveStep(activeStep + 1);
	const handleBack = () => setActiveStep(activeStep - 1);
      
	const [productData, setProductData] = useState([]);

	useEffect(() => {
	props.dispatch(
	fetchProductCategoriesStart());
	}, []);

	const handleChange = (event) => {
		let value = event.target.name == "picture" ? event.target.files[0] : event.target.value;
		if(event.target.name == "product_category_id"){
		setProductData({
		...productData,
		product_category_id: value,
		product_sub_category_id: '',
		});
		props.dispatch(fetchProductSubCategoriesStart({product_category_id: value}));
		}else{
		setProductData({
		...productData,
		[event.target.name]: value,
		});
		}};

	const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(userProductsSaveStart(productData));
  };

	return (
	<>
	<div className="add-product-sec"> 
	<Container>
	<div className="ecom-navbar">
	<ProductHeader />
         </div>
	  
	 <Form onSubmit={handleSubmit} className="">
	 <h2>{t("add_product")}</h2>	 
	<Box mt={1} mb={20}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel style={{color:'blue',fontSize:'24px'}}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Paper  elevation={3} sx={{ overflow: "visible" }}>
              <Box p={2}>
                <Box>
                  {getStepContent(activeStep)}
                  <Box mt={3} width="100%" display="flex" justifyContent="space-between">
                    {activeStep === 0 ? (
                      <Box />
                    ) : (
                      <span className="addToCart" onClick={handleBack}>
                        Back
                      </span>
                    )}
                    <span
                      onClick={!isLastStep ? handleNext : undefined}
                      >
                      {isLastStep ?<button 
		      disabled={props.productSave.buttonDisable}     
		      className="addToCart" type='submit'>{!props.productSave.loading
			? "Uploading": t("Send")}</button>:<span className="addToCartNext">Next</span>}
                    </span>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        </Box>
	</Form>			 
  </Container>
  </div>
  </>
	);
};

const mapStateToPros = (state) => ({
  categories: state.userProducts.productCategories,
  subCategories: state.userProducts.productSubCategories,
  productSave: state.userProducts.productSave,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(AddProduct));
