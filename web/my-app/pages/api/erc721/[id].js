// web/pages/api/erc721/[id].js

const metadata = {
  1: {
    attributes: [
      {
        trait_type: "Shape",
        value: "Circle",
      },
      {
        trait_type: "Mood",
        value: "Sad",
      },
    ],
    description: "A sad circle.",
    image: "https://i.imgur.com/Qkw9N0A.jpeg",
    name: "Sad Circle",
  },
  2: {
    attributes: [
      {
        trait_type: "Shape",
        value: "Rectangle",
      },
      {
        trait_type: "Mood",
        value: "Angry",
      },
    ],
    description: "An angry rectangle.",
    image: "https://i.imgur.com/SMneO6k.jpeg",
    name: "Angry Rectangle",
  },
  3: {
    attributes: [
      {
        trait_type: "Shape",
        value: "Triangle",
      },
      {
        trait_type: "Mood",
        value: "Bored",
      },
    ],
    description: "An bored triangle.",
    image: "https://i.imgur.com/hMVRFoJ.jpeg",
    name: "Bored Triangle",
  },
};

export default function handler(req, res) {
  res.status(200).json(metadata[req.query.id] || {});
}