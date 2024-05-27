// // const Property = require("../models/Property");

// // // Get all properties
// // exports.getAllProperties = async (req, res) => {
// //   try {
// //     const properties = await Property.find();
// //     res.json(properties);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send("Server error");
// //   }
// // };

// // // Create a property
// // exports.createProperty = async (req, res) => {
// //   const { place, area, bedrooms, bathrooms, nearby, description } = req.body;

// //   //   console.log(req.user.isSeller);

// //   try {
// //     const newProperty = new Property({
// //       userId: req.user.id,
// //       place,
// //       area,
// //       bedrooms,
// //       bathrooms,
// //       nearby,
// //       description,
// //     });

// //     const property = await newProperty.save();
// //     res.json(property);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send("Server error");
// //   }
// // };

// // // Update a property
// // exports.updateProperty = async (req, res) => {
// //   const { place, area, bedrooms, bathrooms, nearby, description } = req.body;

// //   try {
// //     let property = await Property.findById(req.params.id);

// //     if (!property) {
// //       return res.status(404).json({ msg: "Property not found" });
// //     }

// //     // if (property.userId.toString() !== req.user.id || !req.user.isSeller) {
// //     //   return res
// //     //     .status(401)
// //     //     .json({ msg: "Unauthorized. Only sellers can update properties." });
// //     // }

// //     property = await Property.findByIdAndUpdate(
// //       req.params.id,
// //       { $set: { place, area, bedrooms, bathrooms, nearby, description } },
// //       { new: true }
// //     );

// //     res.json(property);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send("Server error");
// //   }
// // };

// // // Delete a property
// // exports.deleteProperty = async (req, res) => {
// //   try {
// //     const property = await Property.findById(req.params.id);

// //     if (!property) {
// //       return res.status(404).json({ msg: "Property not found" });
// //     }

// //     // if (property.userId.toString() !== req.user.id || !req.user.isSeller) {
// //     //   return res
// //     //     .status(401)
// //     //     .json({ msg: "Unauthorized. Only sellers can delete properties." });
// //     // }

// //     await property.deleteOne();
// //     res.json({ msg: "Property removed" });
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send("Server error");
// //   }
// // };

// const Property = require("../models/Property");

// // Get all properties
// exports.getAllProperties = async (req, res) => {
//   try {
//     const properties = await Property.find();
//     res.json(properties);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// // Create a property
// exports.createProperty = async (req, res) => {
//   const {
//     place,
//     area,
//     bedrooms,
//     bathrooms,
//     nearby,
//     price,
//     rating,
//     description,
//     likes,
//   } = req.body;

//   try {
//     const newProperty = new Property({
//       userId: req.user.id,
//       place,
//       area,
//       bedrooms,
//       bathrooms,
//       nearby,
//       price,
//       rating,
//       description,
//       likes: likes || 0, // Default to 0 if likes are not provided
//     });

//     const property = await newProperty.save();
//     res.json(property);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// // Update a property
// exports.updateProperty = async (req, res) => {
//   const {
//     place,
//     area,
//     bedrooms,
//     bathrooms,
//     nearby,
//     price,
//     rating,
//     description,
//     likes,
//   } = req.body;

//   try {
//     let property = await Property.findById(req.params.id);

//     if (!property) {
//       return res.status(404).json({ msg: "Property not found" });
//     }

//     if (property.userId.toString() !== req.user.id || !req.user.isSeller) {
//       return res
//         .status(401)
//         .json({ msg: "Unauthorized. Only sellers can update properties." });
//     }

//     property = await Property.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           place,
//           area,
//           bedrooms,
//           bathrooms,
//           nearby,
//           price,
//           rating,
//           description,
//           likes,
//         },
//       },
//       { new: true }
//     );

//     res.json(property);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// // Delete a property
// exports.deleteProperty = async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);

//     if (!property) {
//       return res.status(404).json({ msg: "Property not found" });
//     }

//     if (property.userId.toString() !== req.user.id || !req.user.isSeller) {
//       return res
//         .status(401)
//         .json({ msg: "Unauthorized. Only sellers can delete properties." });
//     }

//     await property.deleteOne();
//     res.json({ msg: "Property removed" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// // Like a property
// exports.likeProperty = async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);

//     if (!property) {
//       return res.status(404).json({ msg: "Property not found" });
//     }

//     property.likes.push(req.user.id);
//     await property.save();

//     res.json(property);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

const Property = require("../models/Property");

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Create a property
exports.createProperty = async (req, res) => {
  const {
    place,
    area,
    bedrooms,
    bathrooms,
    nearby,
    price,
    rating,
    description,
  } = req.body;

  try {
    const newProperty = new Property({
      userId: req.user.id,
      place,
      area,
      bedrooms,
      bathrooms,
      nearby,
      price,
      rating,
      description,
    });

    const property = await newProperty.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  const {
    place,
    area,
    bedrooms,
    bathrooms,
    nearby,
    price,
    rating,
    description,
  } = req.body;

  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    if (property.userId.toString() !== req.user.id || !req.user.isSeller) {
      return res
        .status(401)
        .json({ msg: "Unauthorized. Only sellers can update properties." });
    }

    property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          place,
          area,
          bedrooms,
          bathrooms,
          nearby,
          price,
          rating,
          description,
        },
      },
      { new: true }
    );

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    if (property.userId.toString() !== req.user.id || !req.user.isSeller) {
      return res
        .status(401)
        .json({ msg: "Unauthorized. Only sellers can delete properties." });
    }

    await property.deleteOne();
    res.json({ msg: "Property removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Like a property
exports.likeProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    property.likes.push(req.user.id);
    await property.save();

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
