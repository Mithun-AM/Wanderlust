const Listing = require("./models/listings");
const Review = require("./models/review");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");

module.exports.isLoggedIn = (req,res,next)=>{
    // console.log(req.user);//req.user consist of user data
    if(!req.isAuthenticated()){
        req.session.redirectURL = req.originalUrl;
        req.flash("error","you must be logged in to create listings!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectURL){
        console.log(req.session.redirectURL);
        res.locals.redirectUrl = req.session.redirectURL;
    }
    next();
} 

module.exports.isOwner = async(req,res,next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission");
        return res.redirect(`/listings/${id}`);
    };
    next();  
}

module.exports.validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


module.exports.validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.isReviewAuthor = async(req,res,next)=>{
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    };
    next();  
}   

// module.exports.coordinatesI = async(req,res)=>{
//     let response = await geocodingClient.forwardGeocode({
//         query: req.body.listing.location,
//         limit: 1,
//     }).send();

//     const allListings = await Listing.find({});

//     for(listing of allListings){
//         listing.geometry = response.body.features[0].geometry;
//     }
// }