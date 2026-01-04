const Review = require('../model/review-model');
const Product = require('../model/product-model');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {createTokenUser, attachCookiesToResponse, checkPermission} = require('../utils');

const createReview = async (req, res) => {
    const {product: productId} = req.body;
     req.body.user = req.user.userId;
    const isValidProduct = await Product.findOne({_id:productId});
    if(!isValidProduct){
        throw new CustomError.NotFoundError(`No Prodcut with ${productId} is found`);
    };
    const alreadySubmitted = await Review.findOne({
        product: productId,
        user: req.user.userId
    });
    if(alreadySubmitted){
        throw new CustomError.BadRequestError(`Already review submitted by the user for the product`);
    }
   
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({review});
};
const getAllReviews = async (req, res) => {
    const reviews = await Review.find({})
    .populate({path:'product', select:'name company price'})
    .populate({path:'user', select:'name'});;
    res.status(StatusCodes.OK).json({reviews, count:reviews.length});
};
const getSingleReview = async (req, res) => {
    const {id:reviewId} = req.params;
    const review = await Review.findOne({_id:reviewId});
    if(!review) {
        throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
    }
    res.status(StatusCodes.OK).json({review});
};
const updateReview = async (req, res) => {
    const {id:reviewId} = req.params;
    const {rating, title, comment} = req.body;
    const review = await Review.findOne({_id:reviewId});
    if(!review) {
        throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
    };
    checkPermission(req.user, review.user);
    review.rating = rating;
    review.title = title;
    review.comment = comment;
    await review.save();
    res.status(StatusCodes.OK).json({review});
};
const deleteReview = async (req, res) => {
    const {id:reviewId} = req.params;
    const review = await Review.findOne({_id:reviewId});
    if(!review) {
        throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
    };
    checkPermission(req.user, review.user);
    await review.deleteOne();
    res.status(StatusCodes.OK).json({msg:"successfully removed"});
};

const getSingleProductReviews = async(req, res) => {
    const {id:productId} = req.params;
    const reviews = await Review.find({product:productId});
    res.status(StatusCodes.OK).json({reviews, count:reviews.length})
}
module.exports = {
    createReview, getAllReviews, getSingleReview, updateReview,deleteReview,getSingleProductReviews
}