import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";

// Define an interface for the Open Graph data
interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url } = req.query;

  if (typeof url !== "string") {
    return res
      .status(400)
      .json({ error: "URL query parameter is required and must be a string." });
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const ogData: OpenGraphData = {}; // Use the interface here

    const ogTags = [
      { property: "og:title", key: "title" },
      { property: "og:description", key: "description" },
      { property: "og:image", key: "image" },
      { property: "og:url", key: "url" },
    ];

    ogTags.forEach(({ property, key }) => {
      const content = $(`meta[property='${property}']`).attr("content");
      if (content) {
        // Correctly asserting that `key` is a key of `OpenGraphData`
        ogData[key as keyof OpenGraphData] = content;
      }
    });

    res.status(200).json(ogData);
  } catch (error) {
    console.error("Error fetching Open Graph data:", error);
    res.status(500).json({ error: "Failed to fetch Open Graph data." });
  }
}
