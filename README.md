# Product Listing Web Application

<table width="100%">
  <tr>
    <td align="center" width="33%">
      <img src="https://raw.githubusercontent.com/Appyouz/product-listing-app/refs/heads/main/assets/product-pc.png" width="90%" alt="Screenshot of the AbaTask todo list"/>
      <br>
     <b> Product List</b>
    </td>
  </tr>
</table>

---

A simple product listing page built with Next.js and Tailwind CSS in response to
assignment given by Nepasys PVT LTD.

## Features

- Product list fetched from external API
- Search products by name
- Filter by category
- Infinite scroll
- Responsive design
- Add to cart functionality
- Sort by price

## Tech Stack

- Next.js
- Tailwind CSS
- React Context API
- External API: [DummyJson](https://dummyjson.com/docs/products)
(Had issue with image not laoding with the provided [URL](https://freeapi.hashnode.space/api-guide/apireference/getProducts) )
- Deployed to [Vercel](https://product-listing-app-eight-zeta.vercel.app/)

## Setup

1. Clone the repository
```bash
git clone https://github.com/Appyouz/product-listing-app.git
cd product-listing-app/
```


2. Install Dependencies/packages
```bash
npm install

# or

pnpm install
```


3. Run the Development server
```bash
npm run dev

# or
pnpm dev 


```

*Open http://localhost:3000 to view the application.*


## Project Structure
- /src/app - Main application
- /src/components - Reusable components
- /src/context - Cart context for state management
- /src/lib - API functions
