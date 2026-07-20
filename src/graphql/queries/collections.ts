export const COLLECTIONS_QUERY = /* GraphQL */ `
  query Collections {
    collections(first: 12) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
            width
            height
          }
    
        }
      }
    }
  }
`;
