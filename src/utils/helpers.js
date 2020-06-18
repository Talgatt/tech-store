// flatten
export function flattenProducts(data) {
  return data.map((item) => {
    // cloudinary
    // console.log("data");
    //console.log(data);
    let image = item.image.url;
    // local setup no deployment
    // let image = `${url}${item.image.url}`;
    //console.log(image);
    return { ...item, image };
  });
}

// helper functions
export function featuredProducts(data) {
  return data.filter((item) => {
    return item.featured === true;
  });
}
