const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

// Security Imports
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

//Utilities
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Sequelize Imports 
const { Review } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');
const { ErrorHandler } = require('../../utils/errorHandler');

const router = express.Router();

/*
 *  GET all reviews of current user
 *  /reviews/session
 * 
 */
router.get('/current', async (req, res, next) => {
    try {

        if(!req.user || !req.user.id){
            throw new ErrorHandler("User not authenticated", 401);
        }
        const userId = await req.user.id;

        if (!userId) {
            throw new ErrorHandler("User not found", 404);
        }

        const reviews = await Review.findAll({
            where: { userId },
            include:[{
                model: User,
                where: {id : userId},
                attributes: {exclude:['username','email','hashedPassword','createdAt','updatedAt']}
            },
            {
                model:Spot,
            },
            {
                model:ReviewImage,
                attributes: {exclude:['id','email','hashedPassword','createdAt','updatedAt']}
            }
        ]
        });

        if (reviews && reviews.length > 0){
            return res.json(reviews);
        } else {
            throw new ErrorHandler("No reviews found", 404);
        }
    } catch (error) {
        next(error);
    }

});

// router.get('/spots/:spotId', async (req, res, next) => {
//     try {
//         const spotId = req.params.spotId;

//         const spot = await Spot.findByPk(spotId);
//         if (!spot) {
//             throw new ErrorHandler("Spot not found", 404);
//         }

//         const reviews = await Review.findAll({
//             where: { spotId }
//         });

//         return res.json(reviews);
//     } catch (error) {
//         next(error);
//     }
// });
// router.post('/spots/:spotId', requireAuth, async (req, res, next) => {
//     try {
//         const { review, stars } = req.body;
//         const spotId = req.params.spotId;
//         const userId = req.user.id;

//         if (!review || !stars || stars < 1 || stars > 5) {
//             throw new ErrorHandler("Review text and star rating (1-5) is required.", 400);
//         }

//         const spot = await Spot.findByPk(spotId);
//         if (!spot) {
//             throw new ErrorHandler("Spot not found", 404);
//         }

//         const newReview = await Review.create({ userId, spotId, review, stars });

//         return res.status(201).json(newReview);
//     } catch (error) {
//         next(error);
//     }
// });

/*
 *  POST a ReviewImage
 *  /reviews/:reviewId/images
 * 
 * try {
        const { url } = req.body;
        const reviewId = req.user.id;
        const review = await Review.findByPk(reviewId);

        if (!url){
            throw new ErrorHandler("url couldn't be found", 404);
        }
        if (!review) {
            throw new ErrorHandler("Review couldn't be found", 404);
        }

        const newReviewImage = await ReviewImage.create({ url, reviewId: review });
        return res.status(201).json(newReviewImage);
    } catch (error) {
        next(error);
    }
 */
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const { url } = req.body;
        const userId = req.user.id;

        if(!userId){
            throw new ErrorHandler("User not authenticated", 401);
        }
        if (isNaN(reviewId)) {
            throw new ErrorHandler("Invalid review ID format", 400);
        }        
        if(url.length > 255){
            throw new ErrorHandler("URL is too long", 400);
        }        

        const review = await Review.findByPk(reviewId);
        if (!review) {
            throw new ErrorHandler("Review couldn't be found", 404);
        }

        // Check if review belongs to current user
        if (review.userId !== userId) {
            throw new ErrorHandler("Forbidden", 403);
        }

        // Check number of existing images
        const imageCount = await ReviewImage.count({ where: { reviewId } });
        if (imageCount >= 10) {
            throw new ErrorHandler("Maximum number of images for this review was reached", 403);
        }

        const newReviewImage = await ReviewImage.create({ reviewId, url });
        return res.json({
            id: newReviewImage.id,
            url: newReviewImage.url
        });
    } catch (error) {
        next(error);
    }
});

/*
 *  PUT (update) a review
 *  /reviews/:reviewId
 * 
 */
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        const { review, stars } = req.body;
        const userId = req.user.id;

        if(!review || !stars){
            throw new ErrorHandler("Review and stars are required", 400);
        }
        if(typeof stars !== 'number' || stars < 1 || stars > 5){
            throw new ErrorHandler("Stars must be a number between 1 and 5", 400);
        }

        const reviewToUpdate = await Review.findByPk(reviewId);
        if (!reviewToUpdate) {
            throw new ErrorHandler("Review not found", 404);
        }

        if (reviewToUpdate.userId !== userId) {
            throw new ErrorHandler("You are not authorized to update this review", 403);
        }

        await reviewToUpdate.update({ review, stars });

        return res.json(reviewToUpdate);
    } catch (error) {
        next(error);
    }
});

/*
 *  DELETE a review
 *  /reviews/:reviewId
 * 
 */
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.user.id;

        if(isNaN(reviewId)){
            throw new ErrorHandler("not a valid ReviewId", 400);
        }        

        const reviewToDelete = await Review.findByPk(reviewId);
        if (!reviewToDelete) {
            throw new ErrorHandler("Review not found", 404);
        }

        if (reviewToDelete.userId !== userId) {
            throw new ErrorHandler("You are not authorized to delete this review", 403);
        }

        await reviewToDelete.destroy();

        return res.json({ message: "Review successfully deleted" });
    } catch (error) {
        next(error);
    }
});


module.exports = router;