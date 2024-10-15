# Wanderlust - Travel Listings
### Description:
Wanderlust is a web application that allows users to browse, add, and manage travel listings, including vacation homes, cabins, and unique retreats around the world. Built with Node.js, Express, MongoDB (MongoDB Atlas), and Cloudinary for image hosting.

**Website Demo:** [View the application here](https://wanderlust-3qt2.onrender.com/listings)

## Screenshots
![Home Page](./screenshots/homepage.png)
*The homepage displays featured travel listings.*

![Map View](./screenshots/mapview.png)
*Interactive Map showing travel locations using Mapbox.*

![Show page](./screenshots/show.png)
*Interactive Map showing travel locations using Mapbox.*

## Table of Contents
#### Features
#### Installation
#### Usage
#### Configuration
#### Contact

## Features
- View, create, update, and delete travel listings
- Store images with Cloudinary integration
- MongoDB (Atlas) for data storage
- User authentication and authorization
- Display interactive maps with Mapbox
- Deploy on Render

## Installation
### Prerequisites
Make sure you have the following accounts and tools:
- Node.js
- MongoDB (MongoDB Atlas)
- Cloudinary Account
- Mapbox API Key
- Render Account (for deployment)

### Steps
1. Clone the repository:
   
   git clone https://github.com/Mithun-AM/Wanderlust.git

2. Navigate into the project directory:
   
   cd Wanderlust

3. Install dependencies:
   
   npm install

4. Configure environment variables by adding a .env file as described in the Configuration section.
   
## Usage
### Displaying Maps
The project uses Mapbox for displaying interactive maps. To display maps:  
1. Ensure your Mapbox token is set in the .env file.
2. Mapbox is used to show the location of travel listings based on their latitude and longitude.
3. You can customize the map style, zoom levels, and other settings within the app's frontend code (usually in the component where the map is rendered).
   
## Configuration
Create a .env file in the root directory and add the following environment variables:

#### MongoDB connection string
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.eakti5m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
#### Cloudinary configuration
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-key
CLOUD_API_SECRET=your-cloudinary-secret

#### Mapbox API Key
MAP_TOKEN=your-mapbox-access-token

## Deployment
### Deploying on Render
To deploy this project on Render, follow these steps:

#### 1. Create a Render Account:
- Go to Render and sign up if you don’t have an account.
#### 2. Create a New Web Service:
- After logging in, go to the Dashboard and click on New > Web Service.
#### 3. Connect your GitHub Repository:
- Select the repository that contains your project (e.g., wanderlust-travel).
#### 4. Set Environment Variables:
- Add the environment variables required for MongoDB, Cloudinary, and Mapbox in the Environment section.
#### 5. Build and Deploy:
- Once your environment variables are set, click Deploy. Render will automatically detect your project settings and start the build process.
- Your app will be available at a public URL provided by Render.
