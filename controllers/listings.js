const { x } = require("joi");
const Listing = require("../models/listings");
// const mbxTilesets = require('@mapbox/mapbox-sdk/services/tilesets');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index =  async (req, res) => {
    const allListings = await Listing.find({});

    // let response = await geocodingClient.forwardGeocode({
    //     query: Listing.location,
    //     limit: 1,
    // }).send();


    // for(listing of allListings){
    //     listing.geometry = response.body.features[0].geometry;
    // }

    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing =async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");

    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
}

module.exports.createListing=async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send();

    // console.log(response.body.features[0].geometry);
    // res.send("done");
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    // if(!newListing.title){
    //     throw new ExpressError(400,"Title is missing");
    // }
    // INSTEAD of writing for all the individually we can use joi package server side validation
    newListing.image = {url,filename};

    newListing.geometry = response.body.features[0].geometry;

    let saved = await newListing.save();
    console.log(saved);

    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { listing,originalImageUrl });
}

module.exports.updateListing =  async (req, res) => {
    let { id } = req.params;
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send();
    // let a = req.body.listing;
    
    
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    listing.geometry = response.body.features[0].geometry;
    await listing.save();

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}