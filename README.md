
# Housed.

This is a front end project 
of a real estate website.

Housed has four sections namely: Home, Services, Featured and Contact.
The hero section contains a search bar that takes an input of a two 
character state abbreviation. When the state is searched its rental properties
listings is then displayed in a new tab.

The service section displays the services offered, while the featured section
displays three properties with its rent, square footage, bedroom and bathroom information.
The contact section lists the contact information with a contact form
and a map that shows the location.

## Video Demo
https://user-images.githubusercontent.com/59707565/183533084-ff07a1bd-0dbd-492e-bf4f-2493e550b890.mp4


## Live Link




## Authors

- [@blairedesouza](https://github.com/blairesc)
## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Main Color | ![#006aff](https://via.placeholder.com/15/006aff/006aff.png) `#006aff`|
| Accent Color| ![#ebf4f9](https://via.placeholder.com/15/ebf4f9/ebf4f9.png) `#ebf4f9`|

## API Reference

#### Realty Mole Property API

```http
  https://realty-mole-property-api.p.rapidapi.com/rentalListings?state=${state}&limit=${limit}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `X-RapidAPI-Key` | `enum` | **Required**. API key |
| `X-RapidAPI-Host` | `string` | **Required** |
| `state` | `string` | state of rental listings to be fetch |
| `limit` | `number` | the maximum number of property records to return  |


#### Google Street View Static API

```http
  https://maps.googleapis.com/maps/api/streetview?size=500x500&location=${location}&fov=80&heading=70&pitch=0&key=${key}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `key`      | `string` | **Required**. API key |
| `location` | `lat/lng value` | **Required**. latitude and longitude of specific location |




## Tech Stack

**Client:** HTML, CSS, JavaScript
