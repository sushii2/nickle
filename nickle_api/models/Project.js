const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name for your project.'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters.']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a Description for your project.'],
        maxlength: [500, 'Description can not be more than 500 characters.']
    },
    make: {
        type: String,
        required: true,
        enum: [
            'Acura',
            'Alfa Romeo',
            'AMC',
            'Aston Martin',
            'Audi',
            'Avanti',
            'Bentley',
            'BMW',
            'Buick',
            'Cadillac',
            'Chevorlet',
            'Datsun',
            'DeLorean',
            'Dodge',
            'Eagle',
            'Ferrari',
            'Fiat',
            'Fisker',
            'Ford',
            'Geo',
            'GMC',
            'Honda',
            'Hummer',
            'Hyundai',
            'Infiniti',
            'Isuzu',
            'Jaguar',
            'Jeep',
            'Kia',
            'Lamborghini',
            'Lancia',
            'Land Rover',
            'Lexus',
            'Lincoln',
            'Lotus',
            'Maserati',
            'Maybach',
            'Mercedes-Benz',
            'Mercury',
            'Merkur',
            'Mini',
            'Mitsubishi',
            'Nissan',
            'Oldsmobile',
            'Peugeot',
            'Plymouth',
            'Pontiac',
            'Porsche',
            'RAM',
            'Renault',
            'Rolls-Royce',
            'Saab',
            'Saturn',
            'Scion',
            'smart',
            'SRT',
            'Sterling',
            'Subaru',
            'Suzuki',
            'Tesla',
            'Toyota',
            'Triumph',
            'Volkswagen',
            'Volvo',
            'Yugo',
            'Other'
        ]
    },
    body: {
        type: String,
        required: true,
        enum: [
            'Hatchback',
            'Sedan',
            'Coupe',
            'Convertible',
            'SUV',
            'Pickup',
            'Van',
            'Wagon',
            'Other'
        ]
    },
    transmission: {
        type: String,
        required: true,
        enum: [
            'Automatic',
            'Manual'
        ]
    },
    engine: {
        type: String,
        required: true,
        enum: [
            'H4',
            'H6',
            'I2',
            'I3',
            'I4',
            'I5',
            'I6',
            'R2',
            'V12',
            'V10',
            'V6',
            'V8',
            'W12',
            'Other'
        ]
    },
    drivetrain: {
        type: String,
        required: true,
        enum: [
            'FWD',
            'RWD',
            'AWD',
            '4X4',
            '4X2',
            'Other'
        ]
    },
    fuel: {
        type: String,
        required: true,
        enum: [
            'Petrol',
            'Diesel',
            'Electric',
            'Hybrid',
            'Biodiesel',
            'Flex Fuel',
            'Other'
        ]
    },
    address: {
        type: String
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must at least be 1.'],
        max: [10, 'Rating can not be more than 10'],
    },
    photos: {
        type: [{ url: String }],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create project slug from the name.
ProjectSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower:true });
    next();
});

// Geocode & create location field
ProjectSchema.pre('save', async function(next) {
   const loc =  await geocoder.geocode(this.address);
   this.location = {
       type: 'Point',
       coordinates: [loc[0].longitude, loc[0].latitude],
       formattedAddress: loc[0].formattedAddress,
       street: loc[0].streetName,
       city: loc[0].city,
       state: loc[0].stateCode,
       zipcode: loc[0].zipcode,
       country: loc[0].countryCode
   }

   // Do not save address in DB
   this.address = undefined;
    next();
});

module.exports = mongoose.model('Project', ProjectSchema);