export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products {
    products(first: 12) {
      edges {
        node {
          id
          handle
          title
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          availableForSale
        }
      }
    }
  }
`;
